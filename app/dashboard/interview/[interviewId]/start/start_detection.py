from flask import Flask, jsonify
import cv2

app = Flask(__name__)
camera = cv2.VideoCapture(0)  # Access the webcam

@app.route('/start_detection')
def start_detection():
    return jsonify({"status": "Detection started"})

@app.route('/detection_results')
def detection_results():
    ret, frame = camera.read()
    num_people = detect_people(frame)  # Call your face detection function
    return jsonify({"num_people": num_people})

def detect_people(frame):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    return len(faces)  # Number of faces detected

if __name__ == '__main__':
    app.run(debug=True)
