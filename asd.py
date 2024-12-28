import streamlit as st
from scipy.spatial import distance
from imutils import face_utils
from pygame import mixer
import imutils
import dlib
import cv2
import torch

# Initialize Pygame mixer (with error handling)
try:
    mixer.init()
    mixer.music.load("music.wav")  # Make sure "music.wav" exists in the same directory
except pygame.error as e:
    st.error(f"Error loading music: {e}")

# Function to calculate Eye Aspect Ratio (EAR)
def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

# Thresholds and frame-check limit
thresh = 0.25
frame_check = 20
flag = 0

# Load the Dlib and YOLOv5 models (with error handling)
st.write("Loading models...")
try:
    detect = dlib.get_frontal_face_detector()
    predict = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")  # Check if this file exists
    (lStart, lEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["left_eye"]
    (rStart, rEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["right_eye"]
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
    model.eval()
except Exception as e:
    st.error(f"Error loading models: {e}. Check if required files (shape_predictor_68_face_landmarks.dat) are present and you have an internet connection for YOLOv5.")
    st.stop()  # Stop execution if models fail to load.

target_label = 'cell phone'

# Initialize session state
if 'camera_running' not in st.session_state:
    st.session_state.camera_running = False

# Streamlit UI
st.title("Drowsiness and Phone Detection App")
st.sidebar.title("Settings")
confidence_threshold = st.sidebar.slider("Confidence Threshold", 0.0, 1.0, 0.5, 0.01)

start_button = st.button("Start Camera")  # Use a button to start

if start_button:
    st.session_state.camera_running = True

if st.session_state.camera_running:
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        st.error("Could not open webcam. Please check if your camera is connected.")
        st.session_state.camera_running = False  # Reset state if camera fails
        st.stop()

    FRAME_WINDOW = st.image([])
    flag = 0

    stop_button = st.button("Stop Camera")  # Button to stop
    if stop_button:
        st.session_state.camera_running = False
        if 'cap' in locals() and cap.isOpened(): # Check if cap is defined and opened
            cap.release()
        st.experimental_rerun()  # Force a rerun to exit the camera processing

    try:
        while st.session_state.camera_running:  # Check session state directly
            ret, frame = cap.read()
            if not ret:
                st.error("Error reading frame from webcam!")
                st.session_state.camera_running = False  # Important to stop the loop
                break

            frame = imutils.resize(frame, width=450)
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            subjects = detect(gray, 0)

            # Detect eyes for drowsiness
            for subject in subjects:
                shape = predict(gray, subject)
                shape = face_utils.shape_to_np(shape)
                leftEye = shape[lStart:lEnd]
                rightEye = shape[rStart:rEnd]
                leftEAR = eye_aspect_ratio(leftEye)
                rightEAR = eye_aspect_ratio(rightEye)
                ear = (leftEAR + rightEAR) / 2.0

                leftEyeHull = cv2.convexHull(leftEye)
                rightEyeHull = cv2.convexHull(rightEye)
                cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
                cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

                if ear < thresh:
                    flag += 1
                    if flag >= frame_check:
                        cv2.putText(frame, "****************ALERT!****************", (10, 30),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                        mixer.music.play()
                else:
                    flag = 0

            # Use YOLOv5 to detect objects in the frame
            results = model(frame)
            detections = results.pandas().xyxy[0]

            for _, row in detections.iterrows():
                label = row['name']
                confidence = row['confidence']
                x1, y1, x2, y2 = int(row['xmin']), int(row['ymin']), int(row['xmax']), int(row['ymax'])

                if label == target_label and confidence > confidence_threshold:
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)
                    cv2.putText(frame, f"{label} detected", (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

                    for subject in subjects:
                        sx, sy, sw, sh = subject.left(), subject.top(), subject.width(), subject.height()
                        if sx < x1 < sx + sw and sy < y1 < sy + sh:
                            cv2.putText(frame, "ALERT: PHONE DETECTED NEAR FACE", (10, 60),
                                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                            mixer.music.play()
                            break  # Important to avoid multiple alerts

            FRAME_WINDOW.image(frame, channels="BGR")

    except Exception as e:
        st.error(f"An error occurred during processing: {e}")
        st.session_state.camera_running = False  # Ensure camera is stopped on error
    finally:
        if 'cap' in locals() and cap.isOpened():
            cap.release()

if not st.session_state.camera_running:
    st.write("Camera is not running. Click the 'Start Camera' button.")