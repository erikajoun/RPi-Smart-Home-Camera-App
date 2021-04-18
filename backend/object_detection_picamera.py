## Some of the code is copied from EdjeElectronics's tutorial at
## https://github.com/EdjeElectronics/TensorFlow-Object-Detection-on-the-Raspberry-Pi

import os
import pathlib
import cv2
import numpy as np
from picamera.array import PiRGBArray
from picamera import PiCamera
import tensorflow.compat.v1 as tf
import sys
import io
from PIL import Image
import uuid
import pickle
import base64
from utils import label_map_util
from utils import visualization_utils as vis_util

IM_WIDTH = 640   
IM_HEIGHT = 480
    
MODEL_NAME = 'ssdlite_mobilenet_v2_coco_2018_05_09'
CWD_PATH = '/home/pi/tensorflow1/models/research' 
PATH_TO_CKPT = os.path.join(CWD_PATH,MODEL_NAME, 'frozen_inference_graph.pb')
PATH_TO_LABELS = os.path.join(CWD_PATH,'data', 'mscoco_label_map.pbtxt')
PATH_TO_IMAGES_DIR = 'images'
PATH_TO_IMAGES_DATA_DIR = 'images_data'

NUM_CLASSES = 90

class ObjectDetector:
    def __init__(self, motionUrl):
        self.motionUrl = motionUrl
        
        tf.disable_v2_behavior()
        sys.path.append('..')
        label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
        categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
        self.category_index = label_map_util.create_category_index(categories)

        # Load the Tensorflow model
        detection_graph = tf.Graph()
        with detection_graph.as_default():
            od_graph_def = tf.GraphDef()
            with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
                serialized_graph = fid.read()
                od_graph_def.ParseFromString(serialized_graph)
                tf.import_graph_def(od_graph_def, name='')

            self.sess = tf.Session(graph=detection_graph)

        self.image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
        self.detection_boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
        self.detection_scores = detection_graph.get_tensor_by_name('detection_scores:0')
        self.detection_classes = detection_graph.get_tensor_by_name('detection_classes:0')
        self.num_detections = detection_graph.get_tensor_by_name('num_detections:0')
        
        # Default Settings
        if not os.path.exists('config.p'):
            pickle.dump({'minConfidence': 80, 'model': 'ssdlite_mobilenet_v2', 'dataset': 'coco'}, open('config.p', 'wb'))

        # Create folders where object detection images will be saved
        if not os.path.exists(PATH_TO_IMAGES_DIR):
            os.mkdir(PATH_TO_IMAGES_DIR)
        if not os.path.exists(PATH_TO_IMAGES_DATA_DIR):
            os.mkdir(PATH_TO_IMAGES_DATA_DIR)

    def get_frame(self, camera, object_detection):
        camera = cv2.VideoCapture(self.motionUrl)
        ret, frame = camera.read()
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame_expanded = np.expand_dims(frame_rgb, axis=0)

        scores = None
        classes=None
        cv_frame = frame.copy()

        if object_detection:
            # Perform the actual detection by running the model with the image as input
            (boxes, scores, classes, num) = self.sess.run(
                [self.detection_boxes, self.detection_scores, self.detection_classes, self.num_detections],
                feed_dict={self.image_tensor: frame_expanded})
        
            # Draw the results of the detection (aka 'visulaize the results')
            vis_util.visualize_boxes_and_labels_on_image_array(
            cv_frame,
            np.squeeze(boxes),
            np.squeeze(classes).astype(np.int32),
            np.squeeze(scores),
            self.category_index,
            use_normalized_coordinates=True,
            line_thickness=8,
            min_score_thresh=self.getMinConfidence())
    
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
    
        ret, buffer = cv2.imencode('.jpg', cv_frame)
        cv_frame = buffer.tobytes()
        return frame, cv_frame, scores, classes

    def getMinConfidence(self):
        return pickle.load(open('config.p', 'rb'))['minConfidence'] / 100

    def gen(self, object_detection):
        camera = cv2.VideoCapture(self.motionUrl)
        camera.set(3,IM_WIDTH)
        camera.set(4,IM_HEIGHT)
        cur_frame = 20
    
        while(True):
            cur_frame += 1
            t1 = cv2.getTickCount()

            frame, cv_frame, scores, classes = self.get_frame(camera, object_detection)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + cv_frame + b'\r\n')
        
            if (object_detection and scores[0][0] >= self.getMinConfidence() and cur_frame > 20):
                image = Image.open(io.BytesIO(cv_frame))
                img_id = str(uuid.uuid4())
                image_path = os.path.join(PATH_TO_IMAGES_DIR, img_id + '_labels.jpg')
                image.save(image_path)
                im = cv2.imread(image_path)
                is_success, im_buf_arr = cv2.imencode(".jpg", im)
                byte_im_labeled = base64.b64encode(im_buf_arr.tobytes())
            
                image = Image.open(io.BytesIO(frame))
                image_path = os.path.join(PATH_TO_IMAGES_DIR, img_id + '.jpg')
                image.save(image_path)
                im = cv2.imread(image_path)
                is_success, im_buf_arr = cv2.imencode(".jpg", im)
                byte_im = base64.b64encode(im_buf_arr.tobytes())
 
            
                img_obj = {}
                img_obj['img'] = byte_im
                img_obj['labeled_img'] = byte_im_labeled
                
                obj_arr = []
                score_i = 0
                while scores[0][score_i] > self.getMinConfidence():
                    obj_arr.append({'label': self.category_index[classes[0][score_i]]['name'], 'confidence': scores[0].tolist()[score_i]})
                    score_i += 1
                img_obj['objects'] = obj_arr
            
                # Save file using pickle with the filename of the id
                pickle.dump({'img_id': img_id, 'img_obj': img_obj}, open(os.path.join(PATH_TO_IMAGES_DATA_DIR, img_id + '.p'), 'wb'))
            
                cur_frame = 0
                
    def getPhoto(self):
        camera = cv2.VideoCapture(self.motionUrl)
        camera.set(3,IM_WIDTH)
        camera.set(4,IM_HEIGHT)
        frame, cv_frame, scores, classes = self.get_frame(camera, False)
        image = Image.open(io.BytesIO(cv_frame))
        imagePath = os.path.join(os.getcwd(), 'image.jpg')
        image.save(imagePath)
        return imagePath
                
    def getSettings(self):
        return pickle.load(open('config.p', 'rb'))
    
    def setSettings(self,minConfidence, model, dataset):
        pickle.dump({'minConfidence': minConfidence, 'model': model, 'dataset': dataset}, open('config.p', 'wb'))
    
    def getImages(self):
        all_data = []
        d = PATH_TO_IMAGES_DATA_DIR
        files = [os.path.join(d, file) for file in os.listdir(d) if (file.lower().endswith('.p'))]
        
        for file in sorted(files,key=os.path.getmtime, reverse=True):
            all_data.append(pickle.load(open(file, 'rb')))
            
        return all_data