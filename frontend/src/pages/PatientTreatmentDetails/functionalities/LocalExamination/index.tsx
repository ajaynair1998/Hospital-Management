import React, { useEffect } from "react";
import styled from "styled-components";
import LocalExaminationDataEntries from "../../../../components/LocalExaminationDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const LocalExamination: React.FC<Props> = ({}) => {
	return (
		<Container>
			<LocalExaminationDataEntries />
		</Container>
	);
};

export default LocalExamination;
