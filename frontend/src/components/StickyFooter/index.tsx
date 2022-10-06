import { AppBar, Box, Button } from "@mui/material";
import React from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { setInputDialogState } from "../../redux/Reducers/utilDataReducer";
import { useNavigate } from "react-router-dom";
import { IStore } from "../../helpers/interfaces";
import { setSelectedPatientConsultation } from "../../redux/Reducers/appStateDataReducer";

const StickyFooter = () => {
	let dispatch = useDispatch();

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
					multiple: true,
				})
			);
			navigate("/", { replace: true });
		} catch (err) {
			console.log(err);
		}
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
				<Button variant="outlined">Next</Button>
				<Button
					variant="outlined"
					sx={{ alignContent: "baseline" }}
					onClick={goToTop}
				>
					<NavigationIcon /> Top
				</Button>
				<Button
					variant="contained"
					color="success"
					onClick={handleOpenInputDialog}
				>
					New
				</Button>
			</Box>
		</AppBar>
	);
};

export default StickyFooter;
