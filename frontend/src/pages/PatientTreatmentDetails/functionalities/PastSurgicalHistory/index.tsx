import React, { useEffect } from "react";
import styled from "styled-components";
import Favourites from "../../../../components/favourites";

import PastSurgicalHistoryDataEntries from "../../../../components/PastSurgicalHistoryDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const PastSurgicalHistory: React.FC<Props> = ({}) => {
	return (
		<Container>
			{/* <Favourites /> */}
			<PastSurgicalHistoryDataEntries />
		</Container>
	);
};

export default PastSurgicalHistory;
