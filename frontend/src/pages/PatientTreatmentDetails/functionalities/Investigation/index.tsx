import React, { useEffect } from "react";
import styled from "styled-components";
import InvestigationDataEntries from "../../../../components/InvestigationDataEntries";
import LocalExaminationDataEntries from "../../../../components/LocalExaminationDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const Investigation: React.FC<Props> = ({}) => {
	return (
		<Container>
			<InvestigationDataEntries />
		</Container>
	);
};

export default Investigation;
