import React, { useEffect } from "react";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";
import TreatmentDoneDataEntries from "../../../../components/TreatmentDoneDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const TreatmentDone: React.FC<Props> = ({}) => {
	return (
		<Container>
			<Favourites />
			<TreatmentDoneDataEntries />
		</Container>
	);
};

export default TreatmentDone;
