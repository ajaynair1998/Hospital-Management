import React from "react";
import { ChiefComplaintDataEntries } from "../ChiefComplaintDataEntries";
import { ClinicalDiagnosisDataEntries } from "../ClinicalDiagnosisDataEntries";
import DiagnosisDataEntries from "../DiagnosisDataEntries";
import DrugAllergyDataEntries from "../DrugAllergyDataEntries";
import FollowUpDataEntries from "../FollowUpDataEntries";
import GeneralExaminationDataEntries from "../GeneralExaminationDataEntries";
import { HistoryOfComplaintDataEntries } from "../HistoryOfComplaintsDataEntries";
import InvestigationDataEntries from "../InvestigationDataEntries";
import LocalExaminationDataEntries from "../LocalExaminationDataEntries";
import PastMedicalHistoryDataEntries from "../PastMedicalHistoryDataEntries";
import PastSurgicalHistoryDataEntries from "../PastSurgicalHistoryDataEntries";
import { PrescriptionDataEntries } from "../PrescriptionDataEntries";
import TreatmentDoneDataEntries from "../TreatmentDoneDataEntries";
import TreatmentPlanDataEntries from "../TreatmentPlanDataEntries";

const Summary = () => {
	return (
		<React.Fragment>
			<ChiefComplaintDataEntries summary />
			<ClinicalDiagnosisDataEntries summary />
			<DiagnosisDataEntries summary />
			<DrugAllergyDataEntries summary />
			<GeneralExaminationDataEntries summary />
			<InvestigationDataEntries summary />
			<LocalExaminationDataEntries summary />
			<PrescriptionDataEntries summary />
			<PastMedicalHistoryDataEntries summary />
			<TreatmentPlanDataEntries summary />
			<FollowUpDataEntries summary />
			<PastSurgicalHistoryDataEntries summary />
			<HistoryOfComplaintDataEntries summary />
			<TreatmentDoneDataEntries summary />
		</React.Fragment>
	);
};

export default Summary;
