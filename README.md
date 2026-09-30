#SYMPTOM_CHECKER
# 🩺 AI & Rule-Based Symptom Checker & Clinical Triage Application

A dynamic, web-based intelligent symptom assessment tool designed to analyze patient-reported symptoms, compute condition probability scores using weighted inference logic, and provide actionable clinical triage recommendations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🌟 Key Features

- **Multi-Step Assessment Workflow**: User-friendly form flow guiding patients through demographics, symptom selection, and severity indicators.
- **Weighted Clinical Decision Engine**: Calculates accurate match percentages based on primary (cardinal), secondary, and exclusion symptoms rather than simple keyword searching.
- **Dynamic Risk & Triage Categorization**:
  - 🔴 **Emergency Alert**: Immediate flag for life-threatening red-flag symptoms.
  - 🟠 **Urgent Consultation**: Suggests prompt medical evaluation.
  - 🟢 **Routine Home Care**: Mild symptom management and routine doctor visits.
- **Interactive UI**: Searchable multi-select symptom tags, progress indicators, and condition accordions.
- **Medical Safety Standards**: Automated emergency safety prompts and built-in medical disclaimers.

---

## 🛠️ Tech Stack & Tools

- **Front-End Framework**: HTML5, JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN) & FontAwesome Icons
- **Data Architecture**: Embedded JSON Object Schema for clinical conditions
- **Deployment**: Vercel / GitHub Pages

---

## 🚀 Live Demo

Check out the live deployment here:  
 👉**[SYMPTOM_CHECKER](https://symptomchecker-one.vercel.app/)**

---

## 📂 Project Structure

```text
├── index.html         # Complete Single-Page Application (HTML + Tailwind + Engine Logic)
└── README.md          # Project documentation
