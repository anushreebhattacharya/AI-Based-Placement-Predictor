import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# ==========================
# LOAD DATASET
# ==========================

df = pd.read_csv("Dataset.csv")

print("Dataset Shape:", df.shape)

# ==========================
# DROP ID COLUMN
# ==========================

df.drop(columns=["StudentID"], inplace=True)

# ==========================
# ENCODE CATEGORICAL COLUMNS
# ==========================

placement_encoder = LabelEncoder()
extra_encoder = LabelEncoder()
training_encoder = LabelEncoder()

df["PlacementStatus"] = placement_encoder.fit_transform(
    df["PlacementStatus"]
)

df["ExtracurricularActivities"] = extra_encoder.fit_transform(
    df["ExtracurricularActivities"]
)

df["PlacementTraining"] = training_encoder.fit_transform(
    df["PlacementTraining"]
)

# ==========================
# CORRELATION ANALYSIS
# ==========================

print("\nCorrelation With Placement Status:\n")

corr = (
    df.corr(numeric_only=True)["PlacementStatus"]
    .sort_values(ascending=False)
)

print(corr)

# ==========================
# FEATURES AND TARGET
# ==========================

X = df.drop(columns=["PlacementStatus"])
y = df["PlacementStatus"]

# ==========================
# TRAIN TEST SPLIT
# ==========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# ==========================
# TRAIN MODEL
# ==========================

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=10,
    random_state=42
)

model.fit(X_train, y_train)

# ==========================
# PREDICTIONS
# ==========================

y_pred = model.predict(X_test)

# ==========================
# EVALUATION
# ==========================

print("\n" + "="*50)
print("MODEL PERFORMANCE")
print("="*50)

accuracy = accuracy_score(y_test, y_pred)

print(f"\nAccuracy: {accuracy:.4f}")

print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:\n")
print(confusion_matrix(y_test, y_pred))

# ==========================
# FEATURE IMPORTANCE
# ==========================

importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})

importance = importance.sort_values(
    by="Importance",
    ascending=False
)

print("\n" + "="*50)
print("FEATURE IMPORTANCE")
print("="*50)

print(importance)

# ==========================
# SAVE MODEL
# ==========================

joblib.dump(model, "placement_model.pkl")

joblib.dump(
    {
        "placement": placement_encoder,
        "extracurricular": extra_encoder,
        "training": training_encoder
    },
    "encoders.pkl"
)

print("\nModel Saved Successfully!")