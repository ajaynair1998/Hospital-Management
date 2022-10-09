import React, { Fragment } from "react";
import styled from "styled-components";
import FavouritesHook from "../../../hooks/favourites";
import { getFavourites } from "../../../helpers/functions";
import ChiefComplaints from "./ChiefComplaints";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../helpers/interfaces";
import StickyFooter from "../../../components/StickyFooter";
import { FunctionalitySwitch } from "./functionalitySwitch";
import InputDialog from "../../../components/InputDialog";
import DialogSkeleton from "../../../components/DialogSkeleton";
import { setSummaryDialogState } from "../../../redux/Reducers/utilDataReducer";
import Summary from "../../../components/SummaryTreatmentDetails";

let FunctionalityContainer = styled.div`
	min-height: 1000px;
`;

const Functionalities = () => {
	let dispatch = useDispatch();
	let { summaryDialogOpen } = useSelector(
		(state: IStore) => state.utilDataStore.data
	);

	const handleClickSummaryClose = (state: boolean): void => {
		dispatch(setSummaryDialogState(state));
	};
	return (
		<Fragment>
			<FunctionalityContainer>
				<FunctionalitySwitch />
			</FunctionalityContainer>
			<InputDialog />
			<DialogSkeleton
				handleClose={handleClickSummaryClose}
				content={<Summary />}
				open={summaryDialogOpen}
				title={"Summary"}
				width={"700px"}
			/>
			<StickyFooter />
		</Fragment>
	);
};

export default Functionalities;
