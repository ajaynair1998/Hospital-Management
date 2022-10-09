import React, { useEffect } from "react";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";
import { PrescriptionDataEntries } from "../../../../components/PrescriptionDataEntries";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const Prescriptions: React.FC<Props> = ({}) => {
	return (
		<Container>
			<Favourites />
			{/* <ChiefComplaintInput /> */}
			<PrescriptionDataEntries />
		</Container>
	);
};

export default Prescriptions;
