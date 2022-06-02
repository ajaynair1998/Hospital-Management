import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import ChiefComplaintInput from "../ChiefComplaintInput";
import ClinicalDiagnosisInput from "../ClinicalDiagnosisInput";
import GeneralExaminationInput from "../GeneralExaminationInput";
import PastMedicalHistoryInput from "../PastMedicalHistoryInput";
import PastSurgicalHistoryInput from "../PastSurgicalHistoryInput";

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
		case "past_surgical_history":
			return <PastSurgicalHistoryInput />;
		case "general_examination":
			return <GeneralExaminationInput />;
		default:
			return <React.Fragment />;
	}
};
