import React, { useEffect } from "react";
import { IStore } from "../../../../helpers/interfaces";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";
import BasicSaveAllButton from "../../../../components/SaveAllButton";
import SelectionArray from "../../../../components/SelectionArray";
import TextFieldComponent from "../../../../components/TextField";
import AddFavourite from "../../../../components/AddFavourite";
import ChiefComplaintInput from "../../../../components/ChiefComplaintInput";
import StickyFooter from "../../../../components/StickyFooter";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const ChiefComplaints: React.FC<Props> = ({}) => {
	return (
		<Container>
			<Favourites />
			<SelectionArray />
			<ChiefComplaintInput />
		</Container>
	);
};

export default ChiefComplaints;
