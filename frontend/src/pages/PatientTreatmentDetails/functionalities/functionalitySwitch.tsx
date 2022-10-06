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
	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
			/* you can also use 'auto' behaviour
         in place of 'smooth' */
		});
	};
	switch (data.location) {
		case "chief_complaint":
			goToTop();
			return <ChiefComplaints />;
		case "clinical_diagnosis":
			goToTop();
			return <ClinicalDiagnosis />;
		case "diagnosis":
			goToTop();
			return <Diagnosis />;
		case "drug_allergy":
			goToTop();
			return <DrugAllergy />;
		case "general_examination":
			goToTop();
			return <GeneralExamination />;
		case "treatment_plan":
			goToTop();
			return <TreatmentPlan />;
		case "treatment_done":
			goToTop();
			return <TreatmentDone />;
		case "local_examination":
			goToTop();
			return <LocalExamination />;
		case "past_surgical_history":
			goToTop();
			return <PastSurgicalHistory />;
		case "past_medical_history":
			goToTop();
			return <PastMedicalHistory />;
		case "investigation":
			goToTop();
			return <Investigation />;
		case "prescription":
			goToTop();
			return <PrescriptionDataEntries />;
		case "follow_up":
			goToTop();
			return <FollowUps />;
		case "history_of_complaints":
			goToTop();
			return <HistoryOfComplaints />;
		default:
			goToTop();
			return <ChiefComplaints />;
	}
};
