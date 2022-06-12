import React, { useEffect } from "react";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";
import DiagnosisDataEntries from "../../../../components/DiagnosisDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const Diagnosis: React.FC<Props> = ({}) => {
	return (
		<Container>
			<Favourites />
			{/* <ClinicalDiagnosisInput /> */}
			<DiagnosisDataEntries />
		</Container>
	);
};

export default Diagnosis;
