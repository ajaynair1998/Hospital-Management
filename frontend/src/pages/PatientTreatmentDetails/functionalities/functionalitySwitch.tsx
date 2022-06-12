import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../../helpers/interfaces";
import ChiefComplaints from "./ChiefComplaints";
import ClinicalDiagnosis from "./ClinicalDiagnosis";
import Diagnosis from "./Diagnosis";
import GeneralExamination from "./GeneralExamination";
import LocalExamination from "./LocalExamination";
import PastMedicalHistory from "./PastMedicalHistory";
import PastSurgicalHistory from "./PastSurgicalHistory";
import TreatmentPlan from "./TreatmentPlan";

export const FunctionalitySwitch = (): JSX.Element => {
	const { data } = useSelector((state: IStore) => state.categoriesStore);
	switch (data.location) {
		case "chief_complaint":
			return <ChiefComplaints />;
		case "clinical_diagnosis":
			return <ClinicalDiagnosis />;
		case "diagnosis":
			return <Diagnosis />;
		case "drug_allergy":
			return <React.Fragment />;
		case "general_examination":
			return <GeneralExamination />;
		case "treatment_plan":
			return <TreatmentPlan />;
		case "local_examination":
			return <LocalExamination />;
		case "past_surgical_history":
			return <PastSurgicalHistory />;
		case "past_medical_history":
			return <PastMedicalHistory />;
		case "investigation":
			return <React.Fragment />;
		case "medicine":
			return <React.Fragment />;

		case "follow_up":
			return <React.Fragment />;

		default:
			return <ChiefComplaints />;
	}
};
