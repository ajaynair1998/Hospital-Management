import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import ClinicalDiagnosis from "../../pages/PatientTreatmentDetails/Functionalities/ClinicalDiagnosis";
import ChiefComplaintInput from "../ChiefComplaintInput";
import ClinicalDiagnosisInput from "../ClinicalDiagnosisInput";
import PastMedicalHistoryInput from "../PastMedicalHistoryInput";

export const InputSwitcher = () => {
	let { location, category_name } = useSelector(
		(state: IStore) => state.categoriesStore.data
	);

	switch (location) {
		case "chief_complaint":
			return <ChiefComplaintInput />;
		case "clinical_diagnosis":
			return <ClinicalDiagnosisInput />;
		case "past_medical_history":
			return <PastMedicalHistoryInput />;
		default:
			return <React.Fragment />;
	}
};
