import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Favourites from "../../../../components/favourites";

import { HistoryOfComplaintDataEntries } from "../../../../components/HistoryOfComplaintsDataEntries";
import { IStore } from "../../../../helpers/interfaces";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const HistoryOfComplaints: React.FC<Props> = ({}) => {
	let { multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	return (
		<Container>
			{!multiple ? <Favourites /> : <React.Fragment />}
			{/* <ClinicalDiagnosisInput /> */}
			<HistoryOfComplaintDataEntries />
		</Container>
	);
};

export default HistoryOfComplaints;
