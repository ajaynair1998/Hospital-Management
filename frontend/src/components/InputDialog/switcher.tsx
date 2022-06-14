import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import ChiefComplaintInput from "../ChiefComplaintInput";
import ClinicalDiagnosisInput from "../ClinicalDiagnosisInput";
import DiagnosisInput from "../DiagnosisInput";
import DrugAllergyInput from "../DrugAllergyInput";
import GeneralExaminationInput from "../GeneralExaminationInput";
import HistoryOfComplaintsInput from "../HistoryOfComplaintsInput";
import LocalExaminationInput from "../LocalExaminationInput";
import PastMedicalHistoryInput from "../PastMedicalHistoryInput";
import PastSurgicalHistoryInput from "../PastSurgicalHistoryInput";
import TreatmentPlanInput from "../TreatmentPlanInput";

export const InputSwitcher = () => {
	let { location, category_name } = useSelector(
		(state: IStore) => state.categoriesStore.data
	);
	console.log(location);
	switch (location) {
		case "chief_complaint":
			return <ChiefComplaintInput />;
		case "clinical_diagnosis":
			return <ClinicalDiagnosisInput />;
		case "past_medical_history":
			return <PastMedicalHistoryInput />;
		case "past_surgical_history":
			return <PastSurgicalHistoryInput />;
		case "general_examination":
			return <GeneralExaminationInput />;
		case "treatment_plan":
			return <TreatmentPlanInput />;
		case "local_examination":
			return <LocalExaminationInput />;
		case "diagnosis":
			return <DiagnosisInput />;
		case "history_of_complaints":
			return <HistoryOfComplaintsInput />;
		case "drug_allergy":
			return <DrugAllergyInput />;
		default:
			return <React.Fragment />;
	}
};
