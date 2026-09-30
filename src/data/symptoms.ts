import type { SymptomDef, Category } from '@/types/clinical';

// Master list of all selectable symptoms, grouped by clinical category.
// Red-flag symptoms trigger the emergency interceptor regardless of condition match.

export const SYMPTOMS: SymptomDef[] = [
  // Respiratory
  { symptom_id: 'cough', name: 'Cough', category: 'Respiratory' },
  { symptom_id: 'dry_cough', name: 'Dry (non-productive) cough', category: 'Respiratory' },
  { symptom_id: 'wet_cough', name: 'Wet/productive cough', category: 'Respiratory' },
  { symptom_id: 'sore_throat', name: 'Sore throat', category: 'Respiratory' },
  { symptom_id: 'shortness_breath', name: 'Shortness of breath', category: 'Respiratory', red_flag: true },
  { symptom_id: 'wheezing', name: 'Wheezing', category: 'Respiratory' },
  { symptom_id: 'runny_nose', name: 'Runny or stuffy nose', category: 'Respiratory' },
  { symptom_id: 'nasal_congestion', name: 'Nasal congestion', category: 'Respiratory' },
  { symptom_id: 'sneezing', name: 'Sneezing', category: 'Respiratory' },
  { symptom_id: 'loss_smell', name: 'Loss of smell or taste', category: 'Respiratory' },
  { symptom_id: 'chest_tightness', name: 'Chest tightness', category: 'Respiratory' },

  // Gastrointestinal
  { symptom_id: 'nausea', name: 'Nausea', category: 'Gastrointestinal' },
  { symptom_id: 'vomiting', name: 'Vomiting', category: 'Gastrointestinal' },
  { symptom_id: 'diarrhea', name: 'Diarrhea', category: 'Gastrointestinal' },
  { symptom_id: 'abdominal_pain', name: 'Abdominal pain', category: 'Gastrointestinal' },
  { symptom_id: 'abdominal_cramps', name: 'Abdominal cramps', category: 'Gastrointestinal' },
  { symptom_id: 'bloating', name: 'Bloating', category: 'Gastrointestinal' },
  { symptom_id: 'heartburn', name: 'Heartburn / acid reflux', category: 'Gastrointestinal' },
  { symptom_id: 'constipation', name: 'Constipation', category: 'Gastrointestinal' },
  { symptom_id: 'blood_stool', name: 'Blood in stool', category: 'Gastrointestinal', red_flag: true },
  { symptom_id: 'jaundice', name: 'Yellowing of skin/eyes (jaundice)', category: 'Gastrointestinal' },

  // Cardiovascular
  { symptom_id: 'chest_pain', name: 'Chest pain', category: 'Cardiovascular', red_flag: true },
  { symptom_id: 'radiating_chest_pain', name: 'Chest pain radiating to arm/jaw', category: 'Cardiovascular', red_flag: true },
  { symptom_id: 'palpitations', name: 'Palpitations (racing heart)', category: 'Cardiovascular' },
  { symptom_id: 'irregular_heartbeat', name: 'Irregular heartbeat', category: 'Cardiovascular' },
  { symptom_id: 'leg_swelling', name: 'Swelling in legs/ankles', category: 'Cardiovascular' },
  { symptom_id: 'cold_extremities', name: 'Cold hands and feet', category: 'Cardiovascular' },
  { symptom_id: 'fainting', name: 'Fainting / loss of consciousness', category: 'Cardiovascular', red_flag: true },

  // Neurological
  { symptom_id: 'headache', name: 'Headache', category: 'Neurological' },
  { symptom_id: 'severe_headache', name: 'Sudden severe headache (thunderclap)', category: 'Neurological', red_flag: true },
  { symptom_id: 'migraine', name: 'Throbbing migraine (one-sided)', category: 'Neurological' },
  { symptom_id: 'dizziness', name: 'Dizziness / lightheadedness', category: 'Neurological' },
  { symptom_id: 'confusion', name: 'Confusion or disorientation', category: 'Neurological', red_flag: true },
  { symptom_id: 'sudden_numbness', name: 'Sudden numbness or weakness (one side)', category: 'Neurological', red_flag: true },
  { symptom_id: 'slurred_speech', name: 'Slurred speech', category: 'Neurological', red_flag: true },
  { symptom_id: 'vision_loss', name: 'Sudden vision loss / blurred vision', category: 'Neurological', red_flag: true },
  { symptom_id: 'seizure', name: 'Seizure', category: 'Neurological', red_flag: true },
  { symptom_id: 'neck_stiffness', name: 'Neck stiffness', category: 'Neurological' },
  { symptom_id: 'photophobia', name: 'Sensitivity to light', category: 'Neurological' },
  { symptom_id: 'memory_loss', name: 'Memory loss', category: 'Neurological' },
  { symptom_id: 'tremor', name: 'Tremor / shaking', category: 'Neurological' },

  // Dermatological
  { symptom_id: 'rash', name: 'Skin rash', category: 'Dermatological' },
  { symptom_id: 'itching', name: 'Itching', category: 'Dermatological' },
  { symptom_id: 'hives', name: 'Hives / welts', category: 'Dermatological' },
  { symptom_id: 'dry_skin', name: 'Dry, flaky skin', category: 'Dermatological' },
  { symptom_id: 'red_patches', name: 'Red, scaly patches', category: 'Dermatological' },
  { symptom_id: 'blisters', name: 'Blisters', category: 'Dermatological' },
  { symptom_id: 'skin_lesion', name: 'Changing skin lesion / mole', category: 'Dermatological' },
  { symptom_id: 'swelling_face', name: 'Facial swelling', category: 'Dermatological' },
  { symptom_id: 'petechiae', name: 'Pinpoint red/purple spots', category: 'Dermatological', red_flag: true },

  // Infections / Systemic
  { symptom_id: 'fever', name: 'Fever', category: 'Infections' },
  { symptom_id: 'high_fever', name: 'High fever (≥39°C / 102°F)', category: 'Infections', red_flag: true },
  { symptom_id: 'chills', name: 'Chills', category: 'Infections' },
  { symptom_id: 'body_aches', name: 'Body aches', category: 'Infections' },
  { symptom_id: 'fatigue', name: 'Fatigue', category: 'Infections' },
  { symptom_id: 'night_sweats', name: 'Night sweats', category: 'Infections' },
  { symptom_id: 'swollen_lymph', name: 'Swollen lymph nodes', category: 'Infections' },
  { symptom_id: 'stiff_neck_fever', name: 'Stiff neck with fever', category: 'Infections', red_flag: true },

  // Metabolic
  { symptom_id: 'excessive_thirst', name: 'Excessive thirst', category: 'Metabolic' },
  { symptom_id: 'frequent_urination', name: 'Frequent urination', category: 'Metabolic' },
  { symptom_id: 'increased_hunger', name: 'Increased hunger', category: 'Metabolic' },
  { symptom_id: 'unexplained_weight_loss', name: 'Unexplained weight loss', category: 'Metabolic' },
  { symptom_id: 'unexplained_weight_gain', name: 'Unexplained weight gain', category: 'Metabolic' },
  { symptom_id: 'dehydration', name: 'Signs of dehydration', category: 'Metabolic' },
  { symptom_id: 'sweet_breath', name: 'Fruity/sweet breath odor', category: 'Metabolic', red_flag: true },

  // Endocrine
  { symptom_id: 'heat_intolerance', name: 'Heat intolerance', category: 'Endocrine' },
  { symptom_id: 'cold_intolerance', name: 'Cold intolerance', category: 'Endocrine' },
  { symptom_id: 'goiter', name: 'Neck swelling / goiter', category: 'Endocrine' },
  { symptom_id: 'bulging_eyes', name: 'Bulging eyes', category: 'Endocrine' },
  { symptom_id: 'hair_loss', name: 'Hair loss / thinning', category: 'Endocrine' },
  { symptom_id: 'dry_skin_endo', name: 'Dry skin (endocrine)', category: 'Endocrine' },
  { symptom_id: 'irregular_periods', name: 'Irregular menstrual periods', category: 'Endocrine' },

  // Musculoskeletal
  { symptom_id: 'joint_pain', name: 'Joint pain', category: 'Musculoskeletal' },
  { symptom_id: 'muscle_pain', name: 'Muscle pain', category: 'Musculoskeletal' },
  { symptom_id: 'back_pain', name: 'Back pain', category: 'Musculoskeletal' },
  { symptom_id: 'joint_stiffness', name: 'Joint stiffness', category: 'Musculoskeletal' },
  { symptom_id: 'reduced_mobility', name: 'Reduced range of motion', category: 'Musculoskeletal' },
];

export const SYMPTOM_MAP: Record<string, SymptomDef> = Object.fromEntries(
  SYMPTOMS.map((s) => [s.symptom_id, s])
);

export const CATEGORIES: Category[] = [
  'Respiratory',
  'Gastrointestinal',
  'Cardiovascular',
  'Neurological',
  'Dermatological',
  'Infections',
  'Metabolic',
  'Endocrine',
  'Musculoskeletal',
];

export function symptomsByCategory(category: Category): SymptomDef[] {
  return SYMPTOMS.filter((s) => s.category === category);
}
