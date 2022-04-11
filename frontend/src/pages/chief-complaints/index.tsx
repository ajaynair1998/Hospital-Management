import React from "react";
import styled from "styled-components";
import Favourites from "../../components/favourites";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;
const ChiefComplaints = () => {
	return (
		<Container>
			<Favourites />
		</Container>
	);
};

export default ChiefComplaints;
