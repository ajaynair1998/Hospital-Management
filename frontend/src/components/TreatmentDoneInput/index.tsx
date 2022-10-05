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
	setTreatmentDone,
	setTreatmentPlan,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { IStore } from "../../helpers/interfaces";
import {
	setInputDialogState,
	setSelectedInputValue,
	setSnackBarState,
} from "../../redux/Reducers/utilDataReducer";
import { getFavourites, timeout } from "../../helpers/functions";
import { setFavourites } from "../../redux/Reducers/favouritesDataReducer";
import { setTimeout } from "timers/promises";

const TreatmentDoneInput = () => {
	const dispatch = useDispatch();
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [treatment, setTreatment] = useState("");
	let [type, setType] = useState("hours");
	let [duration, setDuration] = useState("");
	let [details, setDetails] = useState("");

	let { inputValue } = useSelector((state: IStore) => state.utilDataStore.data);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);

	let handleChangeType = (e: SelectChangeEvent<string>) => {
		setType(e.target.value);
	};

	useEffect(() => {
		setTreatment(inputValue);
	}, [inputValue]);

	const handleInputValueChange = (value: string) => {
		dispatch(setSelectedInputValue(value));
	};

	const handleAdd = async () => {
		try {
			// check whether this exists in the favourites , if not
			// add it into the facourites data

			let addedToFavourites = await window.electron.favouritesApi.post({
				category: "treatment_done",
				data: treatment,
			});

			let { data } = await getFavourites("treatment_done");
			const response = await window.electron.TreatmentDoneApi.post({
				treatmentDetailId: patientTreatmentDetailId,
				details: details,
				treatment: treatment,
				duration: duration + " " + type,
			});

			let allTreatments = await window.electron.TreatmentDoneApi.get({
				treatmentDetailId: patientTreatmentDetailId,
			});

			dispatch(setSelectedInputValue(""));
			dispatch(setTreatmentDone(allTreatments.data));
			dispatch(setFavourites(data));
			setTreatment("");
			setType("hours");
			setDuration("");
			setDetails("");

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
					label="Treatment"
					variant="outlined"
					value={treatment}
					// sx={{ width: "200px!important" }}

					onChange={(e) => handleInputValueChange(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="Duration"
					variant="outlined"
					value={duration}
					// sx={{ width: "200px!important" }}
					onChange={(e) => setDuration(e.target.value)}
				/>
				<FormControl>
					<InputLabel id="demo-simple-select-label"> type</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={type}
						label="type"
						onChange={(e) => handleChangeType(e)}
					>
						<MenuItem value={"hours"}>Hours</MenuItem>
						<MenuItem value={"weeks"}>Weeks</MenuItem>
						<MenuItem value={"days"}>Days</MenuItem>
						<MenuItem value={"months"}>Months</MenuItem>
						<MenuItem value={"years"}>Years</MenuItem>
					</Select>
				</FormControl>

				<TextField
					id="outlined-multiline-static"
					label="Details"
					multiline
					rows={4}
					value={details}
					// sx={{ width: "300px!important" }}
					onChange={(e) => setDetails(e.target.value)}
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

export default TreatmentDoneInput;
