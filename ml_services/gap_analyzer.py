def analyze_gap(student_data):
    strengths = []
    weaknesses = []
    recommendations = []

    # Benchmarks based on placed students
    benchmarks = {
        "CGPA": 8.0,
        "Internships": 1,
        "Projects": 3,
        "Workshops/Certifications": 3,
        "ExtracurricularActivities": 1,
        "AptitudeTestScore": 75,
        "SoftSkillsRating": 75,
        "PlacementTraining": 1
    }

    # CGPA
    if float(student_data["CGPA"]) >= benchmarks["CGPA"]:
        strengths.append("Strong CGPA")
    else:
        weaknesses.append("CGPA below average")
        recommendations.append("Try maintaining CGPA above 8.0")

    # Internships
    if int(student_data["Internships"]) >= benchmarks["Internships"]:
        strengths.append("Has internship experience")
    else:
        weaknesses.append("No internship experience")
        recommendations.append("Complete at least one internship")

    # Projects
    if int(student_data["Projects"]) >= benchmarks["Projects"]:
        strengths.append("Good project portfolio")
    else:
        weaknesses.append("Limited project experience")
        recommendations.append("Build 2-3 quality projects")

    # Certifications
    if int(student_data["Workshops/Certifications"]) >= benchmarks["Workshops/Certifications"]:
        strengths.append("Good certification profile")
    else:
        weaknesses.append("Fewer certifications than average")  # Fixed missing weakness flag
        recommendations.append("Complete more certifications")

    # Aptitude
    if int(student_data["AptitudeTestScore"]) >= benchmarks["AptitudeTestScore"]:
        strengths.append("Strong aptitude skills")
    else:
        weaknesses.append("Low aptitude score")
        recommendations.append("Practice aptitude daily")

    # Soft Skills
    if int(student_data["SoftSkillsRating"]) >= benchmarks["SoftSkillsRating"]:
        strengths.append("Good communication skills")
    else:
        weaknesses.append("Communication skills need improvement")
        recommendations.append("Practice mock interviews and presentations")

    # Placement Training (Now safe from text string crashes)
    if int(student_data["PlacementTraining"]) >= benchmarks["PlacementTraining"]:
        strengths.append("Good to have placement training")
    else:
        weaknesses.append("Need to get a placement training")
        recommendations.append("Get a placement training")

    # Extra Curricular Activities (Now safe from text string crashes)
    if int(student_data["ExtracurricularActivities"]) >= benchmarks["ExtracurricularActivities"]:
        strengths.append("Good to have an extra curricular activity")
    else:
        weaknesses.append("Can have an extra curricular activity")
        recommendations.append("Try to get an extra curricular activity")

    return {
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommendations": recommendations
    }