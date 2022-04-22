import Patient from "./Patient";
import ChiefComplaint from "./Chief Complaint";
import PastMedicalHistory from "./Past Medical History";
import PastDentalHistory from "./Past Dental History";
import DrugAllergy from "./Drug Allergy";
import GeneralExamination from "./General Examination";
import LocalExamination from "./Local Examination";
import ClinicalDiagnosis from "./Clinical Diagnosis";
import Investigation from "./Investigation";
import Diagnosis from "./Diagnosis";
import TreatmentPlan from "./Treatment Plan";
import Medicine from "./Medicine";
import FollowUp from "./Follow Up";
import TreatmentDetail from "./Treatment Detail";
// import Favourite from "./Favourite";

// ASSOCIATIONS

Patient.hasMany(TreatmentDetail);
TreatmentDetail.belongsTo(Patient);

Patient.hasMany(ChiefComplaint);
ChiefComplaint.belongsTo(Patient);
TreatmentDetail.hasMany(ChiefComplaint);
ChiefComplaint.belongsTo(TreatmentDetail);

Patient.hasMany(PastMedicalHistory);
PastMedicalHistory.belongsTo(Patient);
TreatmentDetail.hasMany(ChiefComplaint);
PastMedicalHistory.belongsTo(TreatmentDetail);

Patient.hasMany(PastDentalHistory);
PastDentalHistory.belongsTo(Patient);
TreatmentDetail.hasMany(PastDentalHistory);
PastDentalHistory.belongsTo(TreatmentDetail);

Patient.hasMany(DrugAllergy);
DrugAllergy.belongsTo(Patient);
TreatmentDetail.hasMany(DrugAllergy);
DrugAllergy.belongsTo(TreatmentDetail);

Patient.hasMany(GeneralExamination);
GeneralExamination.belongsTo(Patient);
TreatmentDetail.hasMany(GeneralExamination);
GeneralExamination.belongsTo(TreatmentDetail);

Patient.hasMany(LocalExamination);
LocalExamination.belongsTo(Patient);
TreatmentDetail.hasMany(LocalExamination);
LocalExamination.belongsTo(TreatmentDetail);

Patient.hasMany(ClinicalDiagnosis);
ClinicalDiagnosis.belongsTo(Patient);
TreatmentDetail.hasMany(ClinicalDiagnosis);
ClinicalDiagnosis.belongsTo(TreatmentDetail);

Patient.hasMany(Investigation);
Investigation.belongsTo(Patient);
TreatmentDetail.hasMany(Investigation);
Investigation.belongsTo(TreatmentDetail);

Patient.hasMany(Diagnosis);
Diagnosis.belongsTo(Patient);
TreatmentDetail.hasMany(Diagnosis);
Diagnosis.belongsTo(TreatmentDetail);

Patient.hasMany(TreatmentPlan);
TreatmentPlan.belongsTo(Patient);
TreatmentDetail.hasMany(TreatmentPlan);
TreatmentPlan.belongsTo(TreatmentDetail);

Patient.hasMany(Medicine);
Medicine.belongsTo(Patient);
TreatmentDetail.hasMany(Medicine);
Medicine.belongsTo(TreatmentDetail);

Patient.hasMany(FollowUp);
FollowUp.belongsTo(Patient);
TreatmentDetail.hasMany(FollowUp);
FollowUp.belongsTo(TreatmentDetail);
