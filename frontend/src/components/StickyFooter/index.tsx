import { AppBar, Box, Button } from "@mui/material";
import React from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useDispatch, useSelector } from "react-redux";
import {
	setInputDialogState,
	setSummaryDialogState,
} from "../../redux/Reducers/utilDataReducer";
import { useNavigate } from "react-router-dom";
import { IStore } from "../../helpers/interfaces";
import { setSelectedPatientConsultation } from "../../redux/Reducers/appStateDataReducer";
import { resetAllDataInPatientTreatmentDetails } from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { setSelectedCategory } from "../../redux/Reducers/categoriesDataReducer";
import { handleClickGoToNextCategory } from "../../helpers/functions";

const StickyFooter = () => {
	let dispatch = useDispatch();
	let { multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	const { data } = useSelector((state: IStore) => state.categoriesStore);

	const navigate = useNavigate();
	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
			/* you can also use 'auto' behaviour
         in place of 'smooth' */
		});
	};
	let handleOpenInputDialog = () => {
		dispatch(setInputDialogState({ inputDialogOpen: true }));
	};
	let patientProfileDetails = useSelector(
		(state: IStore) =>
			state.applicationDataStore.selectedPatient.patientProfileDetails
	);

	const handleClickExit = () => {
		try {
			dispatch(
				setSelectedPatientConsultation({
					patientId: patientProfileDetails.id,
					multiple: false,
				})
			);
			dispatch(resetAllDataInPatientTreatmentDetails({}));
			navigate("/", { replace: true });
		} catch (err) {
			console.log(err);
		}
	};
	const handleClickNext = () => {
		try {
			let currentLocation = data.location;
			let { next_location, next_category } = handleClickGoToNextCategory({
				location: currentLocation,
			});

			dispatch(
				setSelectedCategory({
					category_name: next_category,
					location: next_location,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleClickOpenSummary = () => {
		dispatch(setSummaryDialogState(true));
	};
	return (
		<AppBar
			elevation={0}
			sx={{
				position: "sticky",
				bottom: "0",
				zIndex: 150,
				backgroundColor: "#ffffff",
				m: 0,
				height: "50px",
				width: "100%",
				borderWidth: 0,
				p: "0!important",
			}}
		>
			<Box
				width="100%"
				sx={{
					flexDirection: "row-reverse",
					alignContent: "center",
					display: "flex",
					alignItems: "center",
					margin: "auto",
					gap: "20px",
					pr: 2,
				}}
			>
				<Button variant="outlined" onClick={handleClickExit}>
					Exit
				</Button>
				{data.location !== "treatment_done" ? (
					<Button variant="outlined" onClick={handleClickNext}>
						Next
					</Button>
				) : (
					<React.Fragment />
				)}
				<Button
					variant="outlined"
					sx={{ alignContent: "baseline" }}
					onClick={goToTop}
				>
					<NavigationIcon /> Top
				</Button>
				{!multiple ? (
					<React.Fragment>
						<Button
							variant="outlined"
							color="primary"
							onClick={handleClickOpenSummary}
						>
							Summary
						</Button>
						<Button
							variant="contained"
							color="success"
							onClick={handleOpenInputDialog}
						>
							New
						</Button>
					</React.Fragment>
				) : (
					<React.Fragment />
				)}
			</Box>
		</AppBar>
	);
};

export default StickyFooter;
