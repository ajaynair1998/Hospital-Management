import React, { useEffect } from "react";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";
import DiagnosisDataEntries from "../../../../components/DiagnosisDataEntries";
import FollowUpDataEntries from "../../../../components/FollowUpDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const FollowUps: React.FC<Props> = ({}) => {
	return (
		<Container>
			{/* <ClinicalDiagnosisInput /> */}
			<FollowUpDataEntries />
		</Container>
	);
};

export default FollowUps;
