import React, { useEffect } from "react";
import { IStore } from "../../../../helpers/interfaces";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";
import BasicSaveAllButton from "../../../../components/SaveAllButton";
import SelectionArray from "../../../../components/SelectionArray";
import TextFieldComponent from "../../../../components/TextField";
import AddFavourite from "../../../../components/AddFavourite";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {
	addNewFavourite: (category: string, data: string) => Promise<any>;
	favourites: any[];
}
const ChiefComplaints: React.FC<Props> = ({ addNewFavourite, favourites }) => {
	return (
		<Container>
			<Favourites favourites={favourites} />
			<SelectionArray />
			<TextFieldComponent />
			<AddFavourite
				addNewFavourite={addNewFavourite}
				category={"chief_complaint"}
			/>
			<BasicSaveAllButton onClick={() => {}} text={"Save"} />
		</Container>
	);
};

export default ChiefComplaints;
