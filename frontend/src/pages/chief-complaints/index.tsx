import React from "react";
import styled from "styled-components";
import Favourites from "../../components/favourites";
import BasicSaveAllButton from "../../components/save-all-button";
import SelectionArray from "../../components/selection-array";
import TextFieldComponent from "../../components/text-field";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;
const ChiefComplaints = () => {
	return (
		<Container>
			<Favourites />
			<SelectionArray />
			<TextFieldComponent />
			<BasicSaveAllButton onClick={() => {}} text={"Save"} />
		</Container>
	);
};

export default ChiefComplaints;
