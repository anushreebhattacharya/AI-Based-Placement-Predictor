# 🎯 AI Placement Predictor & Skill Gap Analyzer

An AI-powered full-stack web application that predicts a student's placement outcome and analyzes their skill gaps to provide personalized recommendations for improving placement readiness.

The platform combines **Machine Learning, MERN Stack, and Flask** to create an end-to-end placement assistance system.

---

## 🚀 Live Demo

> 🔗 **Live Application:** Coming Soon

---

## 📌 Overview

The **AI Placement Predictor** helps students understand their current placement readiness using academic, technical, aptitude, and extracurricular information.

Users can:

* Create and manage their profile
* Enter placement-related information
* Get an AI-based placement prediction
* View prediction history
* Analyze skill gaps
* Receive personalized improvement recommendations
* Track their placement preparation

The application uses a Machine Learning model to classify whether a student is likely to be placed based on multiple student-related features.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected routes
* Persistent login using LocalStorage
* Secure user profile management

### 👤 Student Profile

Users can manage their personal and academic information, including:

* CGPA
* Internships
* Projects
* Workshops & Certifications
* Aptitude Test Score
* Soft Skills Rating
* Extracurricular Activities
* Placement Training
* SSC Marks
* HSC Marks

### 🤖 AI Placement Prediction

The application uses a trained Machine Learning model to predict:

* **Placement Status**
* **Prediction Probability**

The prediction is generated based on the student's submitted profile and placement-related features.

### 📊 Prediction History

Users can:

* View previous predictions
* Track their prediction history
* Open individual prediction results
* Delete previous prediction records

### 🧠 Skill Gap Analyzer

The Skill Gap Analyzer identifies areas where a student can improve their placement readiness.

It analyzes the student's profile and provides:

* Identified skill gaps
* Areas requiring improvement
* Personalized recommendations
* Actionable preparation suggestions

### 📈 Dashboard

The dashboard provides a centralized view of the student's placement preparation, including:

* Latest prediction
* Placement result
* Skill gap analysis
* Previous prediction activity
* Student profile information

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router
* Axios
* Lucide React
* JavaScript (ES6+)
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Axios
* REST APIs

## Machine Learning

* Python
* Flask
* Scikit-learn
* Pandas
* NumPy
* Joblib

## Database

* MongoDB
* MongoDB Atlas

## Deployment

* Vercel — Frontend
* Render — Backend & ML API
* MongoDB Atlas — Database

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │     React Frontend   │
                         │   React + Tailwind    │
                         └───────────┬──────────┘
                                     │
                                     │ REST API
                                     ▼
                         ┌──────────────────────┐
                         │   Node.js Backend    │
                         │   Express + JWT      │
                         └───────┬────────┬─────┘
                                 │        │
                     MongoDB     │        │ ML Request
                                 ▼        ▼
                    ┌───────────────┐  ┌─────────────────┐
                    │ MongoDB Atlas │  │   Flask ML API  │
                    │               │  │                 │
                    └───────────────┘  │ Scikit-learn    │
                                       │ Trained Model    │
                                       └─────────────────┘
```

---

# 📂 Project Structure

```text
AI-Placement-Predictor/
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── ml-api/
│   │
│   ├── app.py
│   ├── train.py
│   ├── gap_analyzer.py
│   ├── placement_model.pkl
│   ├── encoders.pkl
│   ├── requirements.txt
│   └── ...
│
├── .gitignore
├── .env.example
└── README.md
```

---

# 📊 Machine Learning Model

The Machine Learning component predicts placement outcomes using student-related features.

### Input Features

| Feature                    | Description                                 |
| -------------------------- | ------------------------------------------- |
| CGPA                       | Student's academic performance              |
| Internships                | Number of internships completed             |
| Projects                   | Number of projects completed                |
| Workshops/Certifications   | Workshops and certifications completed      |
| Aptitude Test Score        | Aptitude assessment score                   |
| Soft Skills Rating         | Student's soft-skill rating                 |
| Extracurricular Activities | Participation in extracurricular activities |
| Placement Training         | Placement training participation            |
| SSC Marks                  | Class 10 percentage                         |
| HSC Marks                  | Class 12 percentage                         |

### Output

The model predicts:

```text
Placement Status
        +
Prediction Probability
```

Example:

```text
Prediction: Placed
Probability: 87%
```

> The prediction is generated by the trained ML model and should be treated as an estimation rather than a guarantee of placement.

---

# 🧠 Skill Gap Analysis

The Skill Gap Analyzer complements the placement prediction model by focusing on **what the student can improve**.

Instead of only answering:

> "Will I get placed?"

the application also tries to answer:

> "What should I improve to become more placement-ready?"

The analyzer evaluates relevant student attributes and generates personalized recommendations.

---

# 🔄 Application Workflow

```text
1. User Registration
        ↓
2. Login
        ↓
3. Student Profile
        ↓
4. Enter Placement Information
        ↓
5. Submit Prediction
        ↓
6. Node.js Backend
        ↓
7. Flask ML API
        ↓
8. Machine Learning Model
        ↓
9. Prediction Result
        ↓
10. Store Result in MongoDB
        ↓
11. Display Result on Dashboard
        ↓
12. Analyze Skill Gaps
        ↓
13. Generate Recommendations
```

---

# 🔑 API Modules

The backend is organized around REST APIs for authentication, user profiles, predictions, prediction history, and skill-gap analysis.

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### User Profile

```text
GET  /api/user/profile
PUT  /api/user/profile
```

### Prediction

```text
POST   /api/prediction/predict
GET    /api/prediction/history
GET    /api/prediction/:id
DELETE /api/prediction/:id
```

### Skill Gap Analysis

```text
POST /api/gap/analyze-gap
```

> API paths may vary depending on the final backend route configuration.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Placement-Predictor.git
```

```bash
cd AI-Placement-Predictor
```

---

# 🖥️ Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5002
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal and navigate to:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ML_API_URL=http://localhost:5000
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5002
```

---

# 🤖 ML API Setup

Navigate to:

```bash
cd ml-api
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The ML API will run on:

```text
http://localhost:5000
```

---

# 🔐 Environment Variables

The project uses environment variables to keep sensitive configuration outside the source code.

### Backend

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ML_API_URL=http://localhost:5000
```

### Frontend

```env
VITE_API_URL=http://localhost:5002
```

**Never commit `.env` files or real credentials to GitHub.**

Use `.env.example` to document the required variables.

---

# 🗄️ Database

The application uses **MongoDB** to store application data such as:

* User accounts
* User profiles
* Prediction results
* Prediction history

MongoDB Atlas can be used as the production database.

---

# 🔒 Security

The application implements:

* JWT-based authentication
* Protected backend routes
* Password authentication
* Environment variables for secrets
* CORS configuration
* Server-side authentication middleware

Sensitive credentials are excluded from version control.

---

# 🚀 Deployment

The application can be deployed using:

```text
Frontend
   ↓
Vercel

Backend
   ↓
Render

ML API
   ↓
Render

Database
   ↓
MongoDB Atlas
```

Production environment variables should be configured through the respective deployment platforms instead of committing them to GitHub.

---

# 📸 Screenshots

> Add screenshots of the application here after the UI is finalized.

Recommended screenshots:

1. Home Page
2. Login/Register
3. Dashboard
4. Prediction Form
5. Prediction Result
6. Skill Gap Analyzer
7. Prediction History
8. Profile Page

Example:

```markdown
![Dashboard](screenshots/dashboard.png)
```

---

# 🌱 Future Improvements

Planned improvements include:

* [ ] Advanced ML model comparison
* [ ] Improved placement probability visualization
* [ ] More detailed skill recommendations
* [ ] Resume analysis
* [ ] Job-role recommendations
* [ ] Personalized preparation roadmap
* [ ] Interview preparation module
* [ ] Resume-to-job matching
* [ ] Real-time placement trends
* [ ] Model performance monitoring
* [ ] More training data
* [ ] Explainable AI for predictions

---

# 🎯 Project Goals

The primary goal of this project is to build a practical AI-assisted platform that helps students:

* Understand their current placement readiness
* Identify areas for improvement
* Make data-driven preparation decisions
* Track their progress
* Improve their chances of placement

---

# 👩‍💻 Author

**Anushree Bhattacharya**

B.Tech — Information Technology

---

# ⭐ If You Like This Project

If you find this project useful or interesting, consider giving the repository a ⭐.

---

## 📄 License

This project is developed for educational and portfolio purposes.
