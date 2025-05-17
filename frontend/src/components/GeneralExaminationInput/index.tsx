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
	setGeneralExamination,
	setPastMedicalHistory,
	setPastSurgicalHistory,
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

const GeneralExaminationInput = () => {
	const dispatch = useDispatch();
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [bp, setBp] = useState("");
	let [temperature, setTemperature] = useState("");
	let [oxygen_saturation, setOxygenSaturation] = useState("");
	let [pulse, setPulse] = useState("");
	let [respirationRate, setRespirationRate] = useState("");
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);

	// let { location } = useSelector((state: IStore) => state.categoriesStore.data);

	const handleAdd = async () => {
		try {
			// check whether this exists in the favourites , if not
			// add it into the facourites data

			// let { data } = await getFavourites(location);
			const response = await window.electron.GeneralExaminationApi.post({
				treatmentDetailId: patientTreatmentDetailId,
				bp: bp + "  mmHg",
				temperature: temperature + "  F",
				oxygen_saturation: oxygen_saturation + "  %",
				pulse: pulse + "  beats/minute",
				respiration_rate: respirationRate + "  times/minute",
			});

			let allGeneralExamination =
				await window.electron.GeneralExaminationApi.get({
					treatmentDetailId: patientTreatmentDetailId,
					multiple: multiple ? multiple : false,
					patientId: patientId,
				});

			dispatch(setGeneralExamination(allGeneralExamination.data));
			// dispatch(setFavourites(data));

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
					id="outlined-basic"
					label="Pulse"
					variant="outlined"
					value={pulse}
					// sx={{ width: "200px!important" }}

					onChange={(e) => setPulse(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="BP"
					variant="outlined"
					value={bp}
					// sx={{ width: "200px!important" }}

					onChange={(e) => setBp(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Oxygen Saturation"
					variant="outlined"
					value={oxygen_saturation}
					// sx={{ width: "200px!important" }}
					onChange={(e) => setOxygenSaturation(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Respiration Rate"
					variant="outlined"
					value={respirationRate}
					// sx={{ width: "200px!important" }}

					onChange={(e) => setRespirationRate(e.target.value)}
				/>

				<TextField
					id="outlined-basic"
					label="Temperature"
					variant="outlined"
					value={temperature}
					// sx={{ width: "200px!important" }}
					onChange={(e) => setTemperature(e.target.value)}
				/>

				{/* <DialogActions sx={{ m: 0, p: "0!important" }}>
					<Button
						variant="outlined"
						sx={{
							width: "120px!important",
							mr: 0,
						}}
						onClick={() => handleAdd()}
					>
						Save
					</Button>
				</DialogActions> */}
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
					</Box>
				</AppBar>
			</Box>
		</React.Fragment>
	);
};

export default GeneralExaminationInput;
