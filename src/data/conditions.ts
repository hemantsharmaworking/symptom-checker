import type { Condition } from '@/types/clinical';

// Clinical knowledge base — 24 conditions spanning 9 specialties.
// Weights: 5 = pathognomonic, 3-4 = strong, 1-2 = supportive/non-specific.
// This is an educational decision-support tool, NOT a diagnostic device.

export const CONDITIONS: Condition[] = [
  // ── Respiratory ──────────────────────────────────────────────
  {
    condition_id: 'common_cold',
    name: 'Common Cold',
    category: 'Respiratory',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'runny_nose', name: 'Runny or stuffy nose', weight: 4, is_cardinal: true },
      { symptom_id: 'sneezing', name: 'Sneezing', weight: 3, is_cardinal: false },
      { symptom_id: 'sore_throat', name: 'Sore throat', weight: 3, is_cardinal: false },
      { symptom_id: 'cough', name: 'Cough', weight: 2, is_cardinal: false },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 1, is_cardinal: false },
    ],
    exclusion_symptoms: ['high_fever', 'shortness_breath', 'chest_pain'],
    description:
      'A mild viral upper respiratory infection. Symptoms are typically self-limiting and resolve within 7–10 days.',
    first_aid_tips: [
      'Rest and stay hydrated with warm fluids.',
      'Use saline nasal sprays or steam inhalation for congestion.',
      'Over-the-counter decongestants or lozenges may ease symptoms.',
    ],
    recommended_specialist: 'General Practitioner',
  },
  {
    condition_id: 'influenza',
    name: 'Influenza (Flu)',
    category: 'Respiratory',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'fever', name: 'Fever', weight: 4, is_cardinal: true },
      { symptom_id: 'body_aches', name: 'Body aches', weight: 4, is_cardinal: true },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 3, is_cardinal: false },
      { symptom_id: 'dry_cough', name: 'Dry (non-productive) cough', weight: 3, is_cardinal: false },
      { symptom_id: 'sore_throat', name: 'Sore throat', weight: 2, is_cardinal: false },
      { symptom_id: 'chills', name: 'Chills', weight: 2, is_cardinal: false },
      { symptom_id: 'headache', name: 'Headache', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['sneezing'],
    description:
      'A contagious respiratory illness caused by influenza viruses. Onset is typically abrupt with systemic symptoms dominating.',
    first_aid_tips: [
      'Rest, hydrate, and monitor fever.',
      'Antiviral medications may be effective if started within 48 hours — consult a doctor.',
      'Isolate to prevent spread.',
    ],
    recommended_specialist: 'General Practitioner',
  },
  {
    condition_id: 'covid19',
    name: 'COVID-19',
    category: 'Respiratory',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'loss_smell', name: 'Loss of smell or taste', weight: 5, is_cardinal: true },
      { symptom_id: 'fever', name: 'Fever', weight: 3, is_cardinal: false },
      { symptom_id: 'dry_cough', name: 'Dry (non-productive) cough', weight: 3, is_cardinal: false },
      { symptom_id: 'shortness_breath', name: 'Shortness of breath', weight: 4, is_cardinal: false },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 2, is_cardinal: false },
      { symptom_id: 'sore_throat', name: 'Sore throat', weight: 2, is_cardinal: false },
      { symptom_id: 'body_aches', name: 'Body aches', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'A viral infection caused by SARS-CoV-2. Symptoms range from mild to severe; loss of smell/taste is a hallmark of earlier strains.',
    first_aid_tips: [
      'Isolate and take a COVID test.',
      'Monitor oxygen saturation with a pulse oximeter if available.',
      'Seek emergency care if breathing becomes labored.',
    ],
    recommended_specialist: 'General Practitioner or Infectious Disease Specialist',
  },
  {
    condition_id: 'asthma',
    name: 'Asthma Exacerbation',
    category: 'Respiratory',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'wheezing', name: 'Wheezing', weight: 5, is_cardinal: true },
      { symptom_id: 'shortness_breath', name: 'Shortness of breath', weight: 4, is_cardinal: true },
      { symptom_id: 'chest_tightness', name: 'Chest tightness', weight: 4, is_cardinal: true },
      { symptom_id: 'dry_cough', name: 'Dry (non-productive) cough', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['high_fever'],
    description:
      'Acute narrowing of the airways causing wheezing, breathlessness, and chest tightness. Triggers include allergens, exercise, and infections.',
    first_aid_tips: [
      'Use a prescribed rescue inhaler (e.g., albuterol) immediately.',
      'Sit upright and breathe slowly; avoid triggers.',
      'Call emergency services if symptoms do not improve after inhaler use.',
    ],
    recommended_specialist: 'Pulmonologist',
  },
  {
    condition_id: 'pneumonia',
    name: 'Pneumonia',
    category: 'Respiratory',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'wet_cough', name: 'Wet/productive cough', weight: 4, is_cardinal: true },
      { symptom_id: 'fever', name: 'Fever', weight: 3, is_cardinal: false },
      { symptom_id: 'shortness_breath', name: 'Shortness of breath', weight: 4, is_cardinal: true },
      { symptom_id: 'chest_tightness', name: 'Chest tightness', weight: 2, is_cardinal: false },
      { symptom_id: 'chills', name: 'Chills', weight: 2, is_cardinal: false },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'An infection that inflames the air sacs in one or both lungs, which may fill with fluid. Productive cough and breathlessness are typical.',
    first_aid_tips: [
      'Seek medical evaluation; antibiotics may be needed for bacterial pneumonia.',
      'Rest, hydrate, and use a humidifier.',
      'Monitor breathing; go to ER if oxygen levels drop.',
    ],
    recommended_specialist: 'Pulmonologist',
  },

  // ── Gastrointestinal ──────────────────────────────────────────
  {
    condition_id: 'gastroenteritis',
    name: 'Gastroenteritis (Stomach Flu)',
    category: 'Gastrointestinal',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'diarrhea', name: 'Diarrhea', weight: 4, is_cardinal: true },
      { symptom_id: 'vomiting', name: 'Vomiting', weight: 4, is_cardinal: true },
      { symptom_id: 'nausea', name: 'Nausea', weight: 3, is_cardinal: false },
      { symptom_id: 'abdominal_cramps', name: 'Abdominal cramps', weight: 3, is_cardinal: false },
      { symptom_id: 'fever', name: 'Fever', weight: 2, is_cardinal: false },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 1, is_cardinal: false },
    ],
    exclusion_symptoms: ['blood_stool'],
    description:
      'Inflammation of the stomach and intestines, typically from a viral or bacterial infection. Usually self-limiting within a few days.',
    first_aid_tips: [
      'Sip clear fluids and oral rehydration solutions frequently.',
      'Avoid solid foods until vomiting subsides, then reintroduce bland foods.',
      'Seek care if signs of severe dehydration appear.',
    ],
    recommended_specialist: 'General Practitioner',
  },
  {
    condition_id: 'gerd',
    name: 'Gastroesophageal Reflux Disease (GERD)',
    category: 'Gastrointestinal',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'heartburn', name: 'Heartburn / acid reflux', weight: 5, is_cardinal: true },
      { symptom_id: 'nausea', name: 'Nausea', weight: 2, is_cardinal: false },
      { symptom_id: 'sore_throat', name: 'Sore throat', weight: 2, is_cardinal: false },
      { symptom_id: 'dry_cough', name: 'Dry (non-productive) cough', weight: 2, is_cardinal: false },
      { symptom_id: 'bloating', name: 'Bloating', weight: 1, is_cardinal: false },
    ],
    exclusion_symptoms: ['vomiting', 'blood_stool'],
    description:
      'Chronic acid reflux where stomach acid flows back into the esophagus, causing irritation and heartburn.',
    first_aid_tips: [
      'Avoid trigger foods (spicy, fatty, caffeine, alcohol).',
      'Eat smaller meals; do not lie down within 3 hours of eating.',
      'Over-the-counter antacids may provide relief.',
    ],
    recommended_specialist: 'Gastroenterologist',
  },
  {
    condition_id: 'ibs',
    name: 'Irritable Bowel Syndrome (IBS)',
    category: 'Gastrointestinal',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'abdominal_pain', name: 'Abdominal pain', weight: 4, is_cardinal: true },
      { symptom_id: 'bloating', name: 'Bloating', weight: 3, is_cardinal: false },
      { symptom_id: 'diarrhea', name: 'Diarrhea', weight: 2, is_cardinal: false },
      { symptom_id: 'constipation', name: 'Constipation', weight: 2, is_cardinal: false },
      { symptom_id: 'abdominal_cramps', name: 'Abdominal cramps', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['blood_stool', 'high_fever', 'unexplained_weight_loss'],
    description:
      'A chronic functional gastrointestinal disorder causing abdominal pain and altered bowel habits without visible intestinal damage.',
    first_aid_tips: [
      'Identify and avoid dietary triggers (FODMAPs, stress).',
      'Maintain regular meals and hydration.',
      'Consider probiotics and stress management techniques.',
    ],
    recommended_specialist: 'Gastroenterologist',
  },

  // ── Cardiovascular ───────────────────────────────────────────
  {
    condition_id: 'myocardial_infarction',
    name: 'Myocardial Infarction (Heart Attack)',
    category: 'Cardiovascular',
    urgency_level: 'Emergency',
    symptoms: [
      { symptom_id: 'chest_pain', name: 'Chest pain', weight: 5, is_cardinal: true },
      { symptom_id: 'radiating_chest_pain', name: 'Chest pain radiating to arm/jaw', weight: 5, is_cardinal: true },
      { symptom_id: 'shortness_breath', name: 'Shortness of breath', weight: 4, is_cardinal: false },
      { symptom_id: 'cold_extremities', name: 'Cold hands and feet', weight: 2, is_cardinal: false },
      { symptom_id: 'nausea', name: 'Nausea', weight: 2, is_cardinal: false },
      { symptom_id: 'fainting', name: 'Fainting / loss of consciousness', weight: 3, is_cardinal: false },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 1, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'A life-threatening event where blood flow to the heart muscle is blocked. Requires immediate emergency treatment.',
    first_aid_tips: [
      'CALL EMERGENCY SERVICES IMMEDIATELY.',
      'Chew an aspirin (300mg) if not allergic and advised by a dispatcher.',
      'Stay calm, sit still, and loosen tight clothing.',
    ],
    recommended_specialist: 'Cardiologist / Emergency Medicine',
  },
  {
    condition_id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    category: 'Cardiovascular',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'headache', name: 'Headache', weight: 2, is_cardinal: false },
      { symptom_id: 'dizziness', name: 'Dizziness / lightheadedness', weight: 2, is_cardinal: false },
      { symptom_id: 'palpitations', name: 'Palpitations (racing heart)', weight: 2, is_cardinal: false },
      { symptom_id: 'leg_swelling', name: 'Swelling in legs/ankles', weight: 1, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'Persistently elevated blood pressure. Often asymptomatic; diagnosed through measurement. Can lead to serious complications if untreated.',
    first_aid_tips: [
      'Monitor blood pressure regularly.',
      'Reduce sodium intake, exercise, and manage stress.',
      'Follow up with a physician for medication if prescribed.',
    ],
    recommended_specialist: 'Cardiologist',
  },
  {
    condition_id: 'arrhythmia',
    name: 'Cardiac Arrhythmia',
    category: 'Cardiovascular',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'palpitations', name: 'Palpitations (racing heart)', weight: 4, is_cardinal: true },
      { symptom_id: 'irregular_heartbeat', name: 'Irregular heartbeat', weight: 5, is_cardinal: true },
      { symptom_id: 'dizziness', name: 'Dizziness / lightheadedness', weight: 3, is_cardinal: false },
      { symptom_id: 'shortness_breath', name: 'Shortness of breath', weight: 2, is_cardinal: false },
      { symptom_id: 'fainting', name: 'Fainting / loss of consciousness', weight: 3, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'An abnormal heart rhythm — too fast, too slow, or irregular. Some arrhythmias are benign; others require urgent evaluation.',
    first_aid_tips: [
      'Seek medical evaluation, especially if accompanied by fainting or chest pain.',
      'Avoid caffeine, alcohol, and stimulants.',
      'If severe palpitations with chest pain occur, call emergency services.',
    ],
    recommended_specialist: 'Cardiologist / Electrophysiologist',
  },

  // ── Neurological ─────────────────────────────────────────────
  {
    condition_id: 'migraine',
    name: 'Migraine',
    category: 'Neurological',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'migraine', name: 'Throbbing migraine (one-sided)', weight: 5, is_cardinal: true },
      { symptom_id: 'headache', name: 'Headache', weight: 3, is_cardinal: false },
      { symptom_id: 'photophobia', name: 'Sensitivity to light', weight: 4, is_cardinal: true },
      { symptom_id: 'nausea', name: 'Nausea', weight: 3, is_cardinal: false },
      { symptom_id: 'vomiting', name: 'Vomiting', weight: 2, is_cardinal: false },
      { symptom_id: 'dizziness', name: 'Dizziness / lightheadedness', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['severe_headache', 'sudden_numbness', 'slurred_speech'],
    description:
      'A neurological condition causing intense, often one-sided throbbing headaches, frequently with sensory sensitivity and nausea.',
    first_aid_tips: [
      'Rest in a dark, quiet room.',
      'Apply a cold compress to the forehead.',
      'Over-the-counter pain relievers or prescribed triptans may help.',
    ],
    recommended_specialist: 'Neurologist',
  },
  {
    condition_id: 'stroke',
    name: 'Stroke (Cerebrovascular Accident)',
    category: 'Neurological',
    urgency_level: 'Emergency',
    symptoms: [
      { symptom_id: 'sudden_numbness', name: 'Sudden numbness or weakness (one side)', weight: 5, is_cardinal: true },
      { symptom_id: 'slurred_speech', name: 'Slurred speech', weight: 5, is_cardinal: true },
      { symptom_id: 'confusion', name: 'Confusion or disorientation', weight: 4, is_cardinal: false },
      { symptom_id: 'vision_loss', name: 'Sudden vision loss / blurred vision', weight: 4, is_cardinal: false },
      { symptom_id: 'severe_headache', name: 'Sudden severe headache (thunderclap)', weight: 4, is_cardinal: false },
      { symptom_id: 'dizziness', name: 'Dizziness / lightheadedness', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'A medical emergency where blood flow to part of the brain is interrupted. Time-critical — every minute counts (remember FAST).',
    first_aid_tips: [
      'CALL EMERGENCY SERVICES IMMEDIATELY — note the time symptoms began.',
      'Do not give food, drink, or medication.',
      'Lay the person on their side and keep them calm.',
    ],
    recommended_specialist: 'Neurologist / Emergency Medicine',
  },
  {
    condition_id: 'meningitis',
    name: 'Meningitis',
    category: 'Neurological',
    urgency_level: 'Emergency',
    symptoms: [
      { symptom_id: 'stiff_neck_fever', name: 'Stiff neck with fever', weight: 5, is_cardinal: true },
      { symptom_id: 'high_fever', name: 'High fever (≥39°C / 102°F)', weight: 4, is_cardinal: true },
      { symptom_id: 'severe_headache', name: 'Sudden severe headache (thunderclap)', weight: 3, is_cardinal: false },
      { symptom_id: 'photophobia', name: 'Sensitivity to light', weight: 3, is_cardinal: false },
      { symptom_id: 'confusion', name: 'Confusion or disorientation', weight: 3, is_cardinal: false },
      { symptom_id: 'neck_stiffness', name: 'Neck stiffness', weight: 4, is_cardinal: false },
      { symptom_id: 'vomiting', name: 'Vomiting', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'Inflammation of the membranes surrounding the brain and spinal cord, often from infection. A medical emergency requiring prompt treatment.',
    first_aid_tips: [
      'CALL EMERGENCY SERVICES IMMEDIATELY.',
      'Do not delay seeking care — bacterial meningitis can be fatal within hours.',
      'Keep the person still and monitor breathing.',
    ],
    recommended_specialist: 'Neurologist / Infectious Disease / Emergency Medicine',
  },

  // ── Dermatological ───────────────────────────────────────────
  {
    condition_id: 'contact_dermatitis',
    name: 'Contact Dermatitis',
    category: 'Dermatological',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'rash', name: 'Skin rash', weight: 4, is_cardinal: true },
      { symptom_id: 'itching', name: 'Itching', weight: 5, is_cardinal: true },
      { symptom_id: 'red_patches', name: 'Red, scaly patches', weight: 3, is_cardinal: false },
      { symptom_id: 'blisters', name: 'Blisters', weight: 2, is_cardinal: false },
      { symptom_id: 'dry_skin', name: 'Dry, flaky skin', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['high_fever', 'petechiae'],
    description:
      'An itchy, red rash caused by direct contact with a substance or allergic reaction to it. Typically resolves once the irritant is removed.',
    first_aid_tips: [
      'Identify and avoid the trigger substance.',
      'Apply cool, wet compresses and calamine lotion.',
      'Over-the-counter hydrocortisone cream may reduce inflammation.',
    ],
    recommended_specialist: 'Dermatologist',
  },
  {
    condition_id: 'eczema',
    name: 'Atopic Dermatitis (Eczema)',
    category: 'Dermatological',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'dry_skin', name: 'Dry, flaky skin', weight: 4, is_cardinal: true },
      { symptom_id: 'itching', name: 'Itching', weight: 5, is_cardinal: true },
      { symptom_id: 'red_patches', name: 'Red, scaly patches', weight: 4, is_cardinal: true },
      { symptom_id: 'rash', name: 'Skin rash', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['high_fever'],
    description:
      'A chronic inflammatory skin condition causing dry, itchy, red patches. Often associated with allergies and asthma.',
    first_aid_tips: [
      'Moisturize skin regularly with fragrance-free emollients.',
      'Avoid known triggers and hot showers.',
      'Use prescribed topical corticosteroids during flare-ups.',
    ],
    recommended_specialist: 'Dermatologist',
  },
  {
    condition_id: 'urticaria',
    name: 'Urticaria (Hives)',
    category: 'Dermatological',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'hives', name: 'Hives / welts', weight: 5, is_cardinal: true },
      { symptom_id: 'itching', name: 'Itching', weight: 4, is_cardinal: true },
      { symptom_id: 'swelling_face', name: 'Facial swelling', weight: 4, is_cardinal: false },
      { symptom_id: 'rash', name: 'Skin rash', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'Raised, itchy welts caused by an allergic reaction. If accompanied by throat swelling or breathing difficulty, treat as anaphylaxis.',
    first_aid_tips: [
      'Take an antihistamine (e.g., cetirizine or loratadine).',
      'Avoid the suspected allergen.',
      'If breathing is affected or swelling spreads to the throat, call emergency services immediately.',
    ],
    recommended_specialist: 'Dermatologist / Allergist',
  },

  // ── Infections / Systemic ────────────────────────────────────
  {
    condition_id: 'sepsis',
    name: 'Sepsis',
    category: 'Infections',
    urgency_level: 'Emergency',
    symptoms: [
      { symptom_id: 'high_fever', name: 'High fever (≥39°C / 102°F)', weight: 4, is_cardinal: true },
      { symptom_id: 'confusion', name: 'Confusion or disorientation', weight: 4, is_cardinal: true },
      { symptom_id: 'shortness_breath', name: 'Shortness of breath', weight: 3, is_cardinal: false },
      { symptom_id: 'chills', name: 'Chills', weight: 3, is_cardinal: false },
      { symptom_id: 'rapid_heart', name: 'Palpitations (racing heart)', weight: 3, is_cardinal: false },
      { symptom_id: 'petechiae', name: 'Pinpoint red/purple spots', weight: 4, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'A life-threatening, dysregulated immune response to infection that can lead to organ failure. Requires immediate emergency care.',
    first_aid_tips: [
      'CALL EMERGENCY SERVICES IMMEDIATELY.',
      'Do not delay — sepsis progresses rapidly.',
      'Keep the person warm and monitor consciousness.',
    ],
    recommended_specialist: 'Emergency Medicine / Intensive Care',
  },
  {
    condition_id: 'mononucleosis',
    name: 'Infectious Mononucleosis',
    category: 'Infections',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'swollen_lymph', name: 'Swollen lymph nodes', weight: 4, is_cardinal: true },
      { symptom_id: 'sore_throat', name: 'Sore throat', weight: 4, is_cardinal: true },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 4, is_cardinal: true },
      { symptom_id: 'fever', name: 'Fever', weight: 3, is_cardinal: false },
      { symptom_id: 'body_aches', name: 'Body aches', weight: 2, is_cardinal: false },
      { symptom_id: 'headache', name: 'Headache', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'A viral infection (usually EBV) causing extreme fatigue, sore throat, and swollen glands. Common in adolescents and young adults.',
    first_aid_tips: [
      'Rest extensively — recovery can take weeks.',
      'Hydrate and use over-the-counter pain relievers.',
      'Avoid contact sports due to risk of spleen rupture.',
    ],
    recommended_specialist: 'General Practitioner',
  },

  // ── Metabolic ────────────────────────────────────────────────
  {
    condition_id: 'diabetes_type2',
    name: 'Type 2 Diabetes Mellitus',
    category: 'Metabolic',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'excessive_thirst', name: 'Excessive thirst', weight: 4, is_cardinal: true },
      { symptom_id: 'frequent_urination', name: 'Frequent urination', weight: 4, is_cardinal: true },
      { symptom_id: 'increased_hunger', name: 'Increased hunger', weight: 3, is_cardinal: false },
      { symptom_id: 'unexplained_weight_loss', name: 'Unexplained weight loss', weight: 3, is_cardinal: false },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 2, is_cardinal: false },
      { symptom_id: 'dry_skin_endo', name: 'Dry skin (endocrine)', weight: 1, is_cardinal: false },
    ],
    exclusion_symptoms: ['sweet_breath'],
    description:
      'A chronic metabolic disorder characterized by insulin resistance and high blood sugar. Managed through lifestyle changes and medication.',
    first_aid_tips: [
      'Consult a physician for blood glucose testing (HbA1c).',
      'Adopt a balanced, low-sugar diet and regular exercise.',
      'Monitor blood sugar if diagnosed.',
    ],
    recommended_specialist: 'Endocrinologist',
  },
  {
    condition_id: 'dka',
    name: 'Diabetic Ketoacidosis (DKA)',
    category: 'Metabolic',
    urgency_level: 'Emergency',
    symptoms: [
      { symptom_id: 'sweet_breath', name: 'Fruity/sweet breath odor', weight: 5, is_cardinal: true },
      { symptom_id: 'excessive_thirst', name: 'Excessive thirst', weight: 4, is_cardinal: true },
      { symptom_id: 'frequent_urination', name: 'Frequent urination', weight: 4, is_cardinal: true },
      { symptom_id: 'nausea', name: 'Nausea', weight: 3, is_cardinal: false },
      { symptom_id: 'vomiting', name: 'Vomiting', weight: 3, is_cardinal: false },
      { symptom_id: 'confusion', name: 'Confusion or disorientation', weight: 4, is_cardinal: false },
      { symptom_id: 'shortness_breath', name: 'Shortness of breath', weight: 3, is_cardinal: false },
      { symptom_id: 'dehydration', name: 'Signs of dehydration', weight: 3, is_cardinal: false },
    ],
    exclusion_symptoms: [],
    description:
      'A severe complication of diabetes where the body produces excess blood acids (ketones). A life-threatening medical emergency.',
    first_aid_tips: [
      'CALL EMERGENCY SERVICES IMMEDIATELY.',
      'Do not give sugary drinks.',
      'If insulin is prescribed, follow emergency guidance from a physician.',
    ],
    recommended_specialist: 'Endocrinologist / Emergency Medicine',
  },
  {
    condition_id: 'dehydration',
    name: 'Dehydration',
    category: 'Metabolic',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'dehydration', name: 'Signs of dehydration', weight: 5, is_cardinal: true },
      { symptom_id: 'dizziness', name: 'Dizziness / lightheadedness', weight: 3, is_cardinal: false },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 2, is_cardinal: false },
      { symptom_id: 'dry_skin', name: 'Dry, flaky skin', weight: 2, is_cardinal: false },
      { symptom_id: 'headache', name: 'Headache', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['high_fever'],
    description:
      'A condition where the body loses more fluids than it takes in, impairing normal function. Can range from mild to severe.',
    first_aid_tips: [
      'Sip oral rehydration solutions or water frequently.',
      'Move to a cool place and rest.',
      'Seek care if confusion, no urination, or fainting occurs.',
    ],
    recommended_specialist: 'General Practitioner',
  },

  // ── Endocrine ────────────────────────────────────────────────
  {
    condition_id: 'hyperthyroidism',
    name: 'Hyperthyroidism (Overactive Thyroid)',
    category: 'Endocrine',
    urgency_level: 'Urgent',
    symptoms: [
      { symptom_id: 'palpitations', name: 'Palpitations (racing heart)', weight: 4, is_cardinal: true },
      { symptom_id: 'heat_intolerance', name: 'Heat intolerance', weight: 4, is_cardinal: true },
      { symptom_id: 'unexplained_weight_loss', name: 'Unexplained weight loss', weight: 3, is_cardinal: false },
      { symptom_id: 'bulging_eyes', name: 'Bulging eyes', weight: 5, is_cardinal: false },
      { symptom_id: 'tremor', name: 'Tremor / shaking', weight: 3, is_cardinal: false },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 2, is_cardinal: false },
      { symptom_id: 'irregular_periods', name: 'Irregular menstrual periods', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['cold_intolerance'],
    description:
      'Excessive thyroid hormone production accelerating metabolism. Graves\' disease is the most common cause. Treatable with medication, radioiodine, or surgery.',
    first_aid_tips: [
      'Consult an endocrinologist for thyroid function tests.',
      'Avoid excessive iodine and caffeine.',
      'Monitor heart rate; seek urgent care if very rapid.',
    ],
    recommended_specialist: 'Endocrinologist',
  },
  {
    condition_id: 'hypothyroidism',
    name: 'Hypothyroidism (Underactive Thyroid)',
    category: 'Endocrine',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'cold_intolerance', name: 'Cold intolerance', weight: 4, is_cardinal: true },
      { symptom_id: 'fatigue', name: 'Fatigue', weight: 4, is_cardinal: true },
      { symptom_id: 'unexplained_weight_gain', name: 'Unexplained weight gain', weight: 3, is_cardinal: false },
      { symptom_id: 'dry_skin_endo', name: 'Dry skin (endocrine)', weight: 3, is_cardinal: false },
      { symptom_id: 'hair_loss', name: 'Hair loss / thinning', weight: 3, is_cardinal: false },
      { symptom_id: 'goiter', name: 'Neck swelling / goiter', weight: 4, is_cardinal: false },
      { symptom_id: 'irregular_periods', name: 'Irregular menstrual periods', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['heat_intolerance', 'unexplained_weight_loss'],
    description:
      'Insufficient thyroid hormone production slowing metabolism. Managed with daily thyroid hormone replacement (levothyroxine).',
    first_aid_tips: [
      'Consult an endocrinologist for TSH and free T4 testing.',
      'Take prescribed levothyroxine consistently on an empty stomach.',
      'Monitor for improvement over weeks of treatment.',
    ],
    recommended_specialist: 'Endocrinologist',
  },

  // ── Musculoskeletal ─────────────────────────────────────────
  {
    condition_id: 'osteoarthritis',
    name: 'Osteoarthritis',
    category: 'Musculoskeletal',
    urgency_level: 'Routine',
    symptoms: [
      { symptom_id: 'joint_pain', name: 'Joint pain', weight: 5, is_cardinal: true },
      { symptom_id: 'joint_stiffness', name: 'Joint stiffness', weight: 4, is_cardinal: true },
      { symptom_id: 'reduced_mobility', name: 'Reduced range of motion', weight: 3, is_cardinal: false },
      { symptom_id: 'back_pain', name: 'Back pain', weight: 2, is_cardinal: false },
    ],
    exclusion_symptoms: ['high_fever', 'severe_headache'],
    description:
      'Degenerative joint disease where cartilage wears down over time, causing pain, stiffness, and reduced mobility. Most common in older adults.',
    first_aid_tips: [
      'Maintain gentle, regular movement and low-impact exercise.',
      'Apply heat or cold packs to affected joints.',
      'Over-the-counter anti-inflammatories may help; consult a doctor for persistent pain.',
    ],
    recommended_specialist: 'Rheumatologist / Orthopedist',
  },
];

export const CONDITION_MAP: Record<string, Condition> = Object.fromEntries(
  CONDITIONS.map((c) => [c.condition_id, c])
);
