import React, { useState, useEffect } from "react";
import {
	Box,
	TextField,
	Select,
	InputLabel,
	MenuItem,
	SelectChangeEvent,
	FormControl,
	Button,
	Divider,
	DialogActions,
	AppBar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	setChiefComplaints,
	setLocalExamination,
	setTreatmentPlan,
} from "../../redux/reducers/patientTreatmentDetailsReducer";
import { IStore } from "../../helpers/interfaces";
import {
	setInputDialogState,
	setSelectedInputValue,
	setSnackBarState,
} from "../../redux/reducers/utilDataReducer";
import { getFavourites, timeout } from "../../helpers/functions";
import { setFavourites } from "../../redux/reducers/favouritesDataReducer";
import { setTimeout } from "timers/promises";
import IntraOralInputList from "../IntraOralDataEntry";

export interface IIntraOral {
	[key: string]: { teeth: string[]; details: string };
}

const LocalExaminationInput = () => {
	const dispatch = useDispatch();
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [extraoral, setExtraoral] = useState("");
	let [intraoral, setIntraoral] = useState<IIntraOral>({});
	let [toggleAdd, setToggleAdd] = useState<boolean>(false);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);

	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);

	const handleAdd = async () => {
		try {
			// check whether this exists in the favourites , if not
			// add it into the facourites data

			let { data } = await getFavourites("treatment_plan");

			const response = await window.electron.LocalExaminationApi.post({
				treatmentDetailId: patientTreatmentDetailId,
				extraoral: extraoral,
				intraoral: intraoral,
			});

			let allExaminations = await window.electron.LocalExaminationApi.get({
				treatmentDetailId: patientTreatmentDetailId,
				multiple: multiple ? multiple : false,
				patientId: patientId,
			});

			dispatch(setLocalExamination(allExaminations.data));
			dispatch(setFavourites(data));
			setExtraoral("");

			if (response.status === 200) {
				dispatch(setSnackBarState({ snackBarOpen: true, text: "Success" }));
				dispatch(setInputDialogState({ inputDialogOpen: false }));
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};
	return (
		<React.Fragment>
			<Box
				component="form"
				sx={{
					// "& > :not(style)": { m: 2, width: "25ch" },
					"& > :not(style)": { m: 2, width: "90%" },
				}}
				noValidate
				autoComplete="off"
				display={"flex"}
				flexDirection={"column"}
			>
				<TextField
					id="outlined-multiline-static"
					label="Extra oral"
					multiline
					rows={4}
					value={extraoral}
					// sx={{ width: "300px!important" }}
					onChange={(e) => setExtraoral(e.target.value)}
				/>
				<IntraOralInputList setFinalData={setIntraoral} toggleAdd={toggleAdd} />
				{/* <TextField
					id="outlined-multiline-static"
					label="Intra oral"
					multiline
					rows={4}
					value={intraoral}
					// sx={{ width: "300px!important" }}
					onChange={(e) => setIntraoral(e.target.value)}
				/> */}

				<AppBar
					elevation={0}
					sx={{
						position: "sticky",
						bottom: "0",
						zIndex: 150,
						backgroundColor: "#ffffff",
						// m: 0,
						my: "0!important",
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
							// pr: 2,
						}}
					>
						<Button
							variant="outlined"
							sx={{
								width: "120px!important",
								mr: "0",
							}}
							onClick={() => handleAdd()}
						>
							Save
						</Button>

						<Button
							variant="contained"
							color="success"
							sx={{
								width: "120px!important",
								mr: "0",
							}}
							onClick={() => setToggleAdd(!toggleAdd)}
						>
							Add +
						</Button>
					</Box>
				</AppBar>
			</Box>
		</React.Fragment>
	);
};

export default LocalExaminationInput;
