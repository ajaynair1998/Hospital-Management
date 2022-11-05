import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import ChiefComplaintInput from "../ChiefComplaintInput";
import ClinicalDiagnosisInput from "../ClinicalDiagnosisInput";
import DiagnosisInput from "../DiagnosisInput";
import DrugAllergyInput from "../DrugAllergyInput";
import FollowUpInput from "../FollowUpInput";
import GeneralExaminationInput from "../GeneralExaminationInput";
import HistoryOfComplaintsInput from "../HistoryOfComplaintsInput";
import InvestigationInput from "../InvestigationInput";
import LocalExaminationInput from "../LocalExaminationInput";
import PastMedicalHistoryInput from "../PastMedicalHistoryInput";
import PastSurgicalHistoryInput from "../PastSurgicalHistoryInput";
import TreatmentDoneInput from "../TreatmentDoneInput";
import TreatmentPlanInput from "../TreatmentPlanInput";
import StageZero from "./stages/stage-0";
import StageOne from "./stages/stage-1";
import StageTwo from "./stages/stage-2";

export const InputSwitcher = () => {
	let { stage } = useSelector(
		(state: IStore) => state.applicationDataStore.editPatient
	);
	switch (stage) {
		case 0:
			return <StageZero />;
		case 1:
			return <StageOne />;
		case 2:
			return <StageTwo />;

		default:
			return <React.Fragment />;
	}
};
