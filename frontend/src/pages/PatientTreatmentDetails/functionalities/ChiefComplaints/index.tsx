import React, { useEffect } from "react";
import { IStore } from "../../../../helpers/interfaces";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Favourites from "../../../../components/Favourites";
import BasicSaveAllButton from "../../../../components/SaveAllButton";
import SelectionArray from "../../../../components/SelectionArray";
import TextFieldComponent from "../../../../components/TextField";
import AddFavourite from "../../../../components/AddFavourite";
import ChiefComplaintInput from "../../../../components/ChiefComplaintInput";
import StickyFooter from "../../../../components/StickyFooter";
import { ChiefComplaintDataEntries } from "../../../../components/ChiefComplaintDataEntries";
import { setChiefComplaints } from "../../../../redux/Reducers/patientTreatmentDetailsReducer";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

interface Props {}
const ChiefComplaints: React.FC<Props> = ({}) => {
	return (
		<Container>
			<Favourites />
			<ChiefComplaintInput />
			{/* <ChiefComplaintDataEntries /> */}
			<ChiefComplaintDataEntries />
		</Container>
	);
};

export default ChiefComplaints;
