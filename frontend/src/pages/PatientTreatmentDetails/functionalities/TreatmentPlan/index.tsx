import React, { useEffect } from "react";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";

import TreatmentPlanDataEntries from "../../../../components/TreatmentPlanDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const TreatmentPlan: React.FC<Props> = ({}) => {
	return (
		<Container>
			<Favourites />
			<TreatmentPlanDataEntries />
		</Container>
	);
};

export default TreatmentPlan;
