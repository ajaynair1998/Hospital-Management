import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../../helpers/interfaces";
import Patients from "./Patients";

export const FunctionalitySwitch = (): JSX.Element => {
	const { data } = useSelector((state: IStore) => state.applicationDataStore);
	switch (data.location) {
		case "dashboard":
			return <></>;
		case "patients":
			return <Patients />;
		case "payments":
			return <></>;
		case "calendar":
			return <></>;
		case "settings":
			return <></>;
		default:
			return <React.Fragment />;
	}
};