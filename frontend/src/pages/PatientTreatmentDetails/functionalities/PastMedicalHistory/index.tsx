import React, { useEffect } from "react";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";

import PastMedicalHistoryDataEntries from "../../../../components/PastMedicalHistoryDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const PastMedicalHistory: React.FC<Props> = ({}) => {
	return (
		<Container>
			<PastMedicalHistoryDataEntries />
		</Container>
	);
};

export default PastMedicalHistory;
