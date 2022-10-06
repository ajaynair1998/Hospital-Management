import React, { useEffect } from "react";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";
import DiagnosisDataEntries from "../../../../components/DiagnosisDataEntries";
import { useSelector } from "react-redux";
import { IStore } from "../../../../helpers/interfaces";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const Diagnosis: React.FC<Props> = ({}) => {
	let { multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	return (
		<Container>
			{!multiple ? <Favourites /> : <React.Fragment />}
			{/* <ClinicalDiagnosisInput /> */}
			<DiagnosisDataEntries />
		</Container>
	);
};

export default Diagnosis;
