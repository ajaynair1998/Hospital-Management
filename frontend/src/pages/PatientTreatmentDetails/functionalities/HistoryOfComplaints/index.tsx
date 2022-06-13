import React, { useEffect } from "react";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";

import { HistoryOfComplaintDataEntries } from "../../../../components/HistoryOfComplaintsDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const HistoryOfComplaints: React.FC<Props> = ({}) => {
	return (
		<Container>
			<Favourites />
			{/* <ClinicalDiagnosisInput /> */}
			<HistoryOfComplaintDataEntries />
		</Container>
	);
};

export default HistoryOfComplaints;
