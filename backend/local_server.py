from flask import Flask, render_template, Response, send_file, jsonify, request
from flask_cors import CORS, cross_origin
import webbrowser

from object_detection_picamera import ObjectDetector

deviceIp = """ Your Raspberry Pi IP Address Here """
serverPort = 5000
motionPort = 8081
motionUrl = 'http://%s:%s' % (deviceIp, motionPort)

detector = ObjectDetector(motionUrl)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/camera_stream', methods=['GET', 'POST'])
@cross_origin()
def camera_stream():
    return Response(detector.gen(object_detection=False), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/camera_stream_object_detection', methods=['GET', 'POST'])
@cross_origin()
def camera_stream_object_detection():
    return Response(detector.gen(object_detection=True), mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/get_settings', methods=['GET', 'POST'])
@cross_origin()
def get_settings():
    return jsonify(detector.getSettings())

@app.route('/update_settings', methods=['POST'])
@cross_origin()
def update_settings():
    request_data = request.get_json()
    minConfidence = request_data['minConfidence']
    model = request_data['model']
    dataset = request_data['dataset']
    detector.setSettings(minConfidence, model, dataset)
    return 'success', 200

@app.route('/get_gallery_images', methods=['GET', 'POST'])
@cross_origin()
def get_gallery_images():
    return jsonify(detector.getImages())
    
@app.route('/get_picture', methods=['GET', 'POST'])
@cross_origin()
def get_picture():
    image_path = detector.getPhoto()
    return send_file(image_path, as_attachment=True, cache_timeout=0)

if __name__ == '__main__':
    webbrowser.open('http://%s:%s' % (deviceIp, serverPort))
    app.run(host=deviceIp, port=serverPort, debug=True, use_reloader=False)