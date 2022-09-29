import React from "react";
import { useSelector } from "react-redux";
import { PrescriptionDataEntries } from "../../../components/PrescriptionDataEntries";
import { IStore } from "../../../helpers/interfaces";
import ChiefComplaints from "./ChiefComplaints";
import ClinicalDiagnosis from "./ClinicalDiagnosis";
import Diagnosis from "./Diagnosis";
import DrugAllergy from "./DrugAllergy";
import FollowUps from "./FollowUps";
import GeneralExamination from "./GeneralExamination";
import HistoryOfComplaints from "./HistoryOfComplaints";
import Investigation from "./Investigation";
import LocalExamination from "./LocalExamination";
import PastMedicalHistory from "./PastMedicalHistory";
import PastSurgicalHistory from "./PastSurgicalHistory";
import TreatmentDone from "./TreatmentDone";
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
			return <DrugAllergy />;
		case "general_examination":
			return <GeneralExamination />;
		case "treatment_plan":
			return <TreatmentPlan />;
		case "treatment_done":
			return <TreatmentDone />;
		case "local_examination":
			return <LocalExamination />;
		case "past_surgical_history":
			return <PastSurgicalHistory />;
		case "past_medical_history":
			return <PastMedicalHistory />;
		case "investigation":
			return <Investigation />;
		case "prescription":
			return <PrescriptionDataEntries />;
		case "follow_up":
			return <FollowUps />;
		case "history_of_complaints":
			return <HistoryOfComplaints />;

		default:
			return <ChiefComplaints />;
	}
};
