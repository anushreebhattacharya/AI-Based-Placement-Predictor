from flask import Flask, request, jsonify
import pandas as pd
import joblib
from gap_analyzer import analyze_gap
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# =====================
# LOAD MODEL & ENCODERS
# =====================
model = joblib.load("placement_model.pkl")
encoders = joblib.load("encoders.pkl")

extra_encoder = encoders["extracurricular"]
training_encoder = encoders["training"]


# Robust Helper function to handle label transformation safely
def encode_value(val, encoder):
    if isinstance(val, (int, float)):
        return int(val)

    val_str = str(val).strip()

    # Normalize numeric string values if passed instead of words
    if val_str == "1":
        val_str = "Yes"
    elif val_str == "0":
        val_str = "No"

    try:
        return int(encoder.transform([val_str])[0])
    except Exception:
        # Fallback if label is missing from encoder classes
        return 1 if val_str.lower() in ["yes", "1", "true"] else 0


# =====================
# PREDICT ROUTE
# =====================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        if not data:
            return jsonify({"success": False, "message": "No input data provided."}), 400

        # 1. Encode categorical values safely
        extracurricular = encode_value(data.get("ExtracurricularActivities"), extra_encoder)
        placement_training = encode_value(data.get("PlacementTraining"), training_encoder)

        # 2. Build model input DataFrame
        input_data = pd.DataFrame([{
            "CGPA": float(data["CGPA"]),
            "Internships": int(data["Internships"]),
            "Projects": int(data["Projects"]),
            "Workshops/Certifications": int(data["Workshops/Certifications"]),
            "AptitudeTestScore": float(data["AptitudeTestScore"]),
            "SoftSkillsRating": float(data["SoftSkillsRating"]),
            "ExtracurricularActivities": extracurricular,
            "PlacementTraining": placement_training,
            "SSC_Marks": float(data["SSC_Marks"]),
            "HSC_Marks": float(data["HSC_Marks"])
        }])

        # 3. Get model prediction & probability
        prediction = model.predict(input_data)[0]
        probability = round(model.predict_proba(input_data)[0][1] * 100, 2)

        # 4. Prepare data for gap analyzer
        gap_input_data = data.copy()
        gap_input_data["PlacementTraining"] = placement_training
        gap_input_data["ExtracurricularActivities"] = extracurricular

        gap_result = analyze_gap(gap_input_data)

        # 5. Build and return response
        result = {
            "prediction": "Placed" if int(prediction) == 1 else "Not Placed",
            "placement_probability": probability,
            "strengths": gap_result.get("strengths", []),
            "weaknesses": gap_result.get("weaknesses", []),
            "recommendations": gap_result.get("recommendations", [])
        }

        return jsonify(result), 200

    except Exception as e:
        print(f"Error in /predict endpoint: {str(e)}")
        return jsonify({"success": False, "message": f"ML Model Error: {str(e)}"}), 500


# =====================
# ANALYZE GAP ROUTE
# =====================
@app.route("/analyze-gap", methods=["POST"])
def analyze_gap_route():
    try:
        data = request.json
        if not data:
            return jsonify({"success": False, "message": "No input data provided."}), 400

        extracurricular = encode_value(data.get("ExtracurricularActivities"), extra_encoder)
        placement_training = encode_value(data.get("PlacementTraining"), training_encoder)

        gap_input_data = data.copy()
        gap_input_data["PlacementTraining"] = placement_training
        gap_input_data["ExtracurricularActivities"] = extracurricular

        gap_result = analyze_gap(gap_input_data)
        return jsonify(gap_result), 200

    except Exception as e:
        print(f"Error in /analyze-gap endpoint: {str(e)}")
        return jsonify({"success": False, "message": f"Gap Analyzer Error: {str(e)}"}), 500


# =====================
# RUN SERVER
# =====================
if __name__ == "__main__":
    print("Starting Flask Server on port 5000...")
    app.run(host="127.0.0.1", port=5000, debug=True)