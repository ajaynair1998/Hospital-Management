import Patient from "./Patient";
import ChiefComplaint from "./Chief Complaint";
import PastMedicalHistory from "./Past Medical History";
import PastDentalHistory from "./Past Medical History";
import DrugAllergy from "./Drug Allergy";
import GeneralExamination from "./General Examination";
import LocalExamination from "./Local Examination";
import ClinicalDiagnosis from "./Clinical Diagnosis";
import Investigation from "./Investigation";
import Diagnosis from "./Diagnosis";
import TreatmentPlan from "./Treatment Plan";
import Medicine from "./Medicine";
import FollowUp from "./Follow Up";
import Favourite from "./Favourite";

import { IDb } from "../helpers/interfaces";

// ASSOCIATIONS
Patient.hasMany(ChiefComplaint);
ChiefComplaint.belongsTo(Patient);

Patient.hasMany(PastMedicalHistory);
PastMedicalHistory.belongsTo(Patient);

Patient.hasMany(PastDentalHistory);
PastDentalHistory.belongsTo(Patient);

Patient.hasMany(DrugAllergy);
DrugAllergy.belongsTo(Patient);

Patient.hasMany(GeneralExamination);
GeneralExamination.belongsTo(Patient);

Patient.hasMany(LocalExamination);
LocalExamination.belongsTo(Patient);

Patient.hasMany(ClinicalDiagnosis);
ClinicalDiagnosis.belongsTo(Patient);

Patient.hasMany(Investigation);
Investigation.belongsTo(Patient);

Patient.hasMany(Diagnosis);
Diagnosis.belongsTo(Patient);

Patient.hasMany(TreatmentPlan);
TreatmentPlan.belongsTo(Patient);

Patient.hasMany(Medicine);
Medicine.belongsTo(Patient);

Patient.hasMany(FollowUp);
FollowUp.belongsTo(Patient);

const db: IDb = {
	Patient: Patient,
	ChiefComplaint: ChiefComplaint,
	PastMedicalHistory: PastMedicalHistory,
	PastDentalHistory: PastDentalHistory,
	DrugAllergy: DrugAllergy,
	GeneralExamination: GeneralExamination,
	LocalExamination: LocalExamination,
	ClinicalDiagnosis: ClinicalDiagnosis,
	Investigation: Investigation,
	Diagnosis: Diagnosis,
	TreatmentPlan: TreatmentPlan,
	Medicine: Medicine,
	FollowUp: FollowUp,
	Favourite: Favourite,
};

export default db;
