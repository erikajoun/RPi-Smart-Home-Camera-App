# Raspberry Pi Smart Home Camera App
A React app that connects locally to your Raspberry Pi with camera and lets you view the live camera stream and object detection gallery. Automatically takes and saves pictures to the gallery when objects are detected in the camera view (people, pets, animals, cars, etc). Can be used indoors or right outside the home for surveilance.

## List of Current Features
### Frontend Client-Side Application
- View the live camera stream from the Raspberry Pi
- View the object detection gallery photos with and without the object bounding boxes
- Able to navigate the gallery from both the small image view and the enlarged image view
- Use the searchbar to look for photos of specific objects in the gallery
- Option to take picture manually of the content currently shown on the camera stream and download the image to your device

### Backend Flask Server for Raspberry Pi with Camera
- Streams camera content to app (works with many types of cameras)
- Runs object detection algorithm to autonomously take and save pictures whenever an object is in frame

## Demo Video
- To Do
