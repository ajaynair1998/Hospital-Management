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
	Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	setChiefComplaints,
	setPrescription,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { IMedicine, IStore } from "../../helpers/interfaces";
import {
	setInputDialogState,
	setSelectedInputValue,
	setSnackBarState,
} from "../../redux/Reducers/utilDataReducer";
import { getFavourites, timeout } from "../../helpers/functions";
import { setFavourites } from "../../redux/Reducers/favouritesDataReducer";
import { setTimeout } from "timers/promises";
import AutoCompleteTemplate from "../AutoCompleteTemplate";
import DateInput from "../DateInput";
import moment from "moment";
import { convertToReadableDate } from "../../helpers";
let todaysDate = new Date();
let tomorrowsDate = new Date(
	todaysDate.getFullYear(),
	todaysDate.getMonth(),
	todaysDate.getDate() + 1
);

const PrescriptionInput = () => {
	const dispatch = useDispatch();
	let [treatmentDetailId, setTreatmentDetailId] = useState(1);
	let [medicine, setMedicine] = useState<IMedicine>({} as IMedicine);
	let [medicineForm, setMedicineForm] = useState("");
	let [from, setFrom] = useState<Date | null | string>(todaysDate);
	let [to, setTo] = useState<Date | null | string>(tomorrowsDate);
	let [morning, setMorning] = useState(0);
	let [afternoon, setAfternoon] = useState(0);
	let [evening, setEvening] = useState(0);
	let [complaint, setComplaint] = useState("");
	let [type, setType] = useState("hours");
	let [duration, setDuration] = useState(0);
	let [details, setDetails] = useState("");
	let [medicines, setMedicines] = useState([]);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);

	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);

	let { inputValue } = useSelector((state: IStore) => state.utilDataStore.data);

	let handleChangeType = (e: SelectChangeEvent<string>) => {
		setType(e.target.value);
	};

	useEffect(() => {
		setComplaint(inputValue);
	}, [inputValue]);

	const handleInputValueChange = async (e: any, value: any) => {
		try {
			if (value && value.name && value.medicine_form) {
				setMedicine(value);
				setMedicineForm(value.medicine_form);
			}
			getAllMedicines();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllMedicines();
	}, []);

	const handleAdd = async () => {
		try {
			// check whether this exists in the favourites , if not
			// add it into the facourites data
			if (medicine && medicine.id) {
				let dosage = {
					morning,
					afternoon,
					evening,
				};

				let fromDate = convertToReadableDate(from);
				let toDate = convertToReadableDate(to);
				const response = await window.electron.PrescriptionApi.post({
					treatmentDetailId: patientTreatmentDetailId,
					details: details,
					medicine_id: medicine.id,
					medicine_form: medicineForm,
					duration: duration + " " + type,
					dosage: dosage,
					start_date: fromDate,
					end_date: toDate,
				});

				let allPrescriptions = await window.electron.PrescriptionApi.get({
					treatmentDetailId: patientTreatmentDetailId,
					multiple: multiple ? multiple : false,
					patientId: patientId,
				});

				dispatch(setPrescription(allPrescriptions.data));
				setType("days");
				setDuration(0);
				setDetails("");

				if (response.status === 200) {
					dispatch(setSnackBarState({ snackBarOpen: true, text: "Success" }));
					dispatch(setInputDialogState({ inputDialogOpen: false }));
				}
			} else {
				dispatch(setSnackBarState({ snackBarOpen: true, text: "Failure" }));
				// dispatch(setInputDialogState({ inputDialogOpen: false }));
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const getAllMedicines = async () => {
		try {
			let medicines = await window.electron.MedicineApi.get({});
			if (medicines.status === 200) {
				setMedicines(medicines.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleSearchChange = async (value: string): Promise<void> => {
		try {
			setMedicineForm("");
			setMedicine({} as IMedicine);
			await getAllMedicines();
		} catch (err) {
			console.log(err);
		}
	};

	const handleChangeFrequency = (type: string, frequencyAsString: string) => {
		try {
			let frequency = Number(frequencyAsString);
			if (type === "morning") {
				if (frequency >= 0) {
					setMorning(frequency);
				}
			} else if (type === "afternoon") {
				if (frequency! >= 0) {
					setAfternoon(frequency);
				}
			} else if (type === "evening") {
				if (frequency! >= 0) {
					setEvening(frequency);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleChangeDuration = (durationAsString: string) => {
		try {
			let duration = Number(durationAsString);
			if (duration >= 0) {
				setDuration(duration);
			}
		} catch (err) {
			console.log(err);
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
				<AutoCompleteTemplate
					equalityKeyword="name"
					valuesFromSearch={medicines}
					label={"Medicine"}
					selectionOnChange={handleInputValueChange}
					sortFirstLetterProperty={"name"}
					handleChange={(value: string) => handleSearchChange(value)}
					componantToDisplayOnSearch={(propsFromRender: any, option: any) => {
						return (
							<li {...propsFromRender} key={option.id}>
								{option.name} &nbsp; &nbsp; ({option.medicine_form})
							</li>
						);
					}}
				/>
				<TextField
					id="outlined-basic"
					label="Medicine Form"
					variant="outlined"
					value={medicineForm}
					disabled={true}
					// sx={{ width: "200px!important" }}
					// onChange={(e) => setDuration(e.target.value)}
				/>

				<Grid container spacing={0} justifyContent={"flex-start"} gap={2}>
					<Grid item xs={5}>
						<DateInput handleChange={setFrom} value={from} label={"From"} />
					</Grid>
					<Grid item xs={5}>
						<DateInput
							handleChange={setTo}
							value={to}
							label={"To"}
							minDate={"1"}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={0} justifyContent={"flex-start"} gap={2}>
					<Grid item xs={3}>
						<TextField
							id="standard-number"
							label="Morning"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
							value={morning}
							onChange={(e) => handleChangeFrequency("morning", e.target.value)}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							id="standard-number"
							label="Afternoon"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
							value={afternoon}
							onChange={(e) =>
								handleChangeFrequency("afternoon", e.target.value)
							}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							id="standard-number"
							label="Evening"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
							value={evening}
							onChange={(e) => handleChangeFrequency("evening", e.target.value)}
						/>
					</Grid>
				</Grid>

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

export default PrescriptionInput;
