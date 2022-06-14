import React, { useEffect } from "react";
import styled from "styled-components";
import { DrugAllergyDataEntries } from "../../../../components/DrugAllergyDataEntries";
import Favourites from "../../../../components/Favourites";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const DrugAllergy: React.FC<Props> = ({}) => {
	return (
		<Container>
			<Favourites />
			<DrugAllergyDataEntries />
		</Container>
	);
};

export default DrugAllergy;
