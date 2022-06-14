import Patient from "./Patient";
import ChiefComplaint from "./Chief Complaint";
import PastMedicalHistory from "./Past Medical History";
import PastSurgicalHistory from "./Past Surgical History";
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
import Favourite from "./Favourite";
import HistoryOfComplaint from "./History Of Complaint";

// ASSOCIATIONS
Patient;
ChiefComplaint;
PastMedicalHistory;
PastSurgicalHistory;
DrugAllergy;
GeneralExamination;
LocalExamination;
ClinicalDiagnosis;
Investigation;
Diagnosis;
TreatmentPlan;
Medicine;
FollowUp;
TreatmentDetail;
Favourite;
HistoryOfComplaint;
DrugAllergy;

// Patient.hasMany(TreatmentDetail);
// TreatmentDetail.belongsTo(Patient);

// TreatmentDetail.hasMany(ChiefComplaint);
// ChiefComplaint.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(PastMedicalHistory);
// PastMedicalHistory.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(PastDentalHistory);
// PastDentalHistory.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(DrugAllergy);
// DrugAllergy.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(GeneralExamination);
// GeneralExamination.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(LocalExamination);
// LocalExamination.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(ClinicalDiagnosis);
// ClinicalDiagnosis.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(Investigation);
// Investigation.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(Diagnosis);
// Diagnosis.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(TreatmentPlan);
// TreatmentPlan.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(Medicine);
// Medicine.belongsTo(TreatmentDetail);

// TreatmentDetail.hasMany(FollowUp);
// FollowUp.belongsTo(TreatmentDetail);
