import React, { useEffect } from "react";
import styled from "styled-components";
import GeneralExaminationDataEntries from "../../../../components/GeneralExaminationDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const GeneralExamination: React.FC<Props> = ({}) => {
	return (
		<Container>
			<GeneralExaminationDataEntries />
		</Container>
	);
};

export default GeneralExamination;
