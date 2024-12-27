import cv2
import mediapipe as mp
import math
from scipy.spatial import distance
from pygame import mixer
import numpy as np
import dlib
from imutils import face_utils

# Initialize MediaPipe Hands and Face Mesh
mp_hands = mp.solutions.hands
mp_face_mesh = mp.solutions.face_mesh
mp_drawing = mp.solutions.drawing_utils

# Initialize mixer for audio alert
mixer.init()
mixer.music.load("alert.mp3")  # Replace "alert.mp3" with your desired sound file

# Helper function to calculate Euclidean distance
def calculate_distance(point1, point2):
    return math.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2 + (point1[2] - point2[2]) ** 2)

# Function to calculate Eye Aspect Ratio (EAR)
def eye_aspect_ratio(eye):
    try:
        # Ensure eye points are numpy arrays
        p1 = np.array(eye[1])
        p2 = np.array(eye[5])
        p3 = np.array(eye[2])
        p4 = np.array(eye[4])
        p5 = np.array(eye[0])
        p6 = np.array(eye[3])

        # Calculate distances
        A = np.linalg.norm(p1 - p2)  # Vertical distance
        B = np.linalg.norm(p3 - p4)  # Vertical distance
        C = np.linalg.norm(p5 - p6)  # Horizontal distance
        
        # Compute EAR
        ear = (A + B) / (2.0 * C)
        return ear
    except Exception as e:
        print(f"Error in EAR calculation: {e}")
        return 1.0  # Return a safe default value to avoid crashesalue to avoid crashes

# Parameters for drowsiness detection
thresh = 0.25
frame_check = 20
flag = 0

# Load shape predictor for drowsiness detection


detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["right_eye"]

# Initialize webcam
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

with mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7) as hands, \
     mp_face_mesh.FaceMesh(min_detection_confidence=0.7, min_tracking_confidence=0.7) as face_mesh:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("Failed to capture frame. Exiting...")
            break

        # Flip and convert frame to RGB
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Detect face and hands
        face_results = face_mesh.process(rgb_frame)
        hand_results = hands.process(rgb_frame)

        # Get grayscale frame for drowsiness detection
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        subjects = detector(gray_frame)

        # Drowsiness detection
        for subject in subjects:
            shape = predictor(gray_frame, subject)
            shape = face_utils.shape_to_np(shape)
            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]
            leftEAR = eye_aspect_ratio(leftEye)
            rightEAR = eye_aspect_ratio(rightEye)
            ear = (leftEAR + rightEAR) / 2.0

            # Draw eye contours
            leftEyeHull = cv2.convexHull(leftEye)
            rightEyeHull = cv2.convexHull(rightEye)
            cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
            cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

            # Check for drowsiness
            if ear < thresh:
                flag += 1
                if flag >= frame_check:
                    cv2.putText(frame, "Drowsiness Detected!", (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    mixer.music.play()
                    #if not mixer.music.get_busy():
                    
            else:
                flag = 0
                mixer.music.stop()

        # Phone usage detection
        phone_usage_detected = False
        if hand_results.multi_hand_landmarks and face_results.multi_face_landmarks:
            for face_landmark in face_results.multi_face_landmarks:
                for hand_landmarks in hand_results.multi_hand_landmarks:
                    try:
                        mp_drawing.draw_landmarks(
                            frame, hand_landmarks, mp_hands.HAND_CONNECTIONS,
                            mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                            mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=2, circle_radius=2)
                        )

                        # Get hand landmarks (e.g., wrist)
                        wrist = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST]

                        # Check proximity of hand to face
                        for idx in range(0, len(face_landmark.landmark), 10):  # Sample face landmarks
                            face_point = face_landmark.landmark[idx]
                            wrist_coords = (wrist.x, wrist.y, getattr(wrist, 'z', 0))
                            face_coords = (face_point.x, face_point.y, getattr(face_point, 'z', 0))
                            distance = calculate_distance(wrist_coords, face_coords)
                            if distance < 0.05:  # Threshold for phone usage detection
                                phone_usage_detected = True
                                break
                    except Exception as e:
                        print(f"Error in hand-face detection: {e}")

        # Display phone usage alert
        if phone_usage_detected:
            cv2.putText(frame, "Phone Usage Detected!", (50, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            if not mixer.music.get_busy():
                mixer.music.play()
        else:
            mixer.music.stop()

        # Show frame
        cv2.imshow("Driver Monitoring System", frame)

        # Exit on 'q' key press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
