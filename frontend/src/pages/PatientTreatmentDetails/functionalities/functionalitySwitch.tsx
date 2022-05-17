import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../../helpers/interfaces";
import ChiefComplaints from "./ChiefComplaints";
import { ClinicalDiagnosis } from "./ClinicalDiagnosis";

export const FunctionalitySwitch = (): JSX.Element => {
	const { data } = useSelector((state: IStore) => state.categoriesStore);
	switch (data.location) {
		case "chief_complaint":
			return <ChiefComplaints />;
		case "clinical_diagnosis":
			return <ClinicalDiagnosis />;
		default:
			return <ChiefComplaints />;
	}
};
