import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IPrescription, IStore } from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setPrescription,
} from "../../redux/reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import appStateDataReducer from "../../redux/reducers/appStateDataReducer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	name: string;
	medicine_id: number;
	medicine_form: string;
	frequency: string;
	start_date: string;
	end_date: string;
	duration: string;
	dosage: {
		morning: number;
		afternoon: number;
		evening: number;
	};
	id?: number;
	handleSelectPresciption: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedPrescriptionText: React.Dispatch<React.SetStateAction<string>>;
}

export const PrescriptionDataEntries = (props: { summary?: boolean }) => {
	const [selectedPrescription, setSelectedPrescription] = React.useState(null);
	const [selectedPrescriptionText, setSelectedPrescriptionText] =
		React.useState("");
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const prescriptions = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.prescription
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);

	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	let dispatch = useDispatch();
	const fetchAllExistingPrescriptions = async () => {
		let response = await window.electron.PrescriptionApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		if (response.status === 200) {
			dispatch(setPrescription(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.PrescriptionApi.delete({
				id: selectedPrescription,
			});
			setDialogOpen(false);
			await fetchAllExistingPrescriptions();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingPrescriptions();
	}, []);
	return prescriptions.length ? (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="subtitle2" component="div">
							{props.summary ? "PRESCRIPTIONS" : "DATA ENTRIES"}
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box m={2}>
				{prescriptions &&
					prescriptions.map((item: IPrescription) => {
						return (
							<PrescriptionDataEntry
								createdAt={item.createdAt}
								name={item.name}
								medicine_id={item.medicine_id}
								dosage={item.dosage}
								medicine_form={item.medicine_form}
								start_date={item.start_date}
								end_date={item.end_date}
								frequency={item.frequency}
								key={item.id}
								duration={item.duration}
								handleSelectPresciption={setSelectedPrescription}
								openDialog={setDialogOpen}
								setSelectedPrescriptionText={setSelectedPrescriptionText}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove ${selectedPrescriptionText} ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	) : (
		<React.Fragment />
	);
};

export default function PrescriptionDataEntry({
	createdAt,
	name,
	medicine_id,
	medicine_form,
	dosage,
	start_date,
	end_date,
	frequency,
	duration,
	handleSelectPresciption,
	setSelectedPrescriptionText,
	id,
	openDialog,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [prescriptionName, setPrescriptionName] = React.useState<any>("");
	const [medicineForm, setMedicineForm] = React.useState<any>("");
	const [dosageValue, setDosageValue] = React.useState<any>("");
	const [fromValue, setFromValue] = React.useState<any>("");
	const [toValue, setToValue] = React.useState<any>("");
	const [frequencyValue, setFrequencyValue] = React.useState<any>("");
	const [durationValue, setDurationValue] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setPrescriptionName(name);
		setDosageValue(dosage);
		setFromValue(start_date);
		setToValue(end_date);
		setFrequencyValue(frequency);
		setDurationValue(duration);
		setMedicineForm(medicine_form);
	}, []);

	const handleRemoveButton = async () => {
		try {
			handleSelectPresciption(id);
			setSelectedPrescriptionText(prescriptionName);
			openDialog(true);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	return (
		<Paper
			key={id}
			elevation={2}
			sx={{
				p: 2,
				mb: 2,

				// margin: 2,
				// maxWidth: 500,
				flexGrow: 1,
				backgroundColor: (theme) =>
					theme.palette.mode === "dark" ? "#1A2027" : "#fff",
			}}
		>
			<Grid container spacing={2}>
				{/* <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid> */}
				<Grid item xs={12} sm container direction={"column-reverse"}>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs sx={{ mx: 1 }}>
							<Typography gutterBottom variant="subtitle1" component="div">
								{prescriptionName} {medicineForm && `(${medicineForm})`}
							</Typography>
							<Grid
								container
								direction={"row"}
								justifyContent={"flex-start"}
								spacing={2}
							>
								<Grid item>
									<Typography
										variant="body2"
										color="text.secondary"
										gutterBottom
									>
										{fromValue}
									</Typography>
								</Grid>
								<Grid
									item
									sx={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
									}}
								>
									<ArrowForwardIcon fontSize="small" />
								</Grid>

								<Grid item>
									<Typography
										variant="body2"
										color="text.secondary"
										gutterBottom
										textAlign={"end"}
									>
										{toValue}
									</Typography>
								</Grid>
							</Grid>
							{/* <Grid container direction={"row"}> */}
							<Stack direction="row" spacing={1} sx={{ mt: 1 }}>
								<Chip
									label={`morning - ${dosage.morning}`}
									color={"success"}
									sx={{ borderRadius: 1 }}
								/>
								<Chip
									label={`afternoon - ${dosage.afternoon}`}
									color={"default"}
									sx={{ borderRadius: 1 }}
								/>
								<Chip
									label={`evening - ${dosage.evening}`}
									color={"secondary"}
									sx={{ borderRadius: 1 }}
								/>
							</Stack>
							{/* </Grid> */}

							{frequencyValue && (
								<React.Fragment>
									<Typography variant="body2" gutterBottom mt={2}>
										Frequency
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{frequencyValue}
									</Typography>
								</React.Fragment>
							)}
						</Grid>

						<Grid item xs container direction="row" spacing={2}>
							<Grid item>
								<Button
									sx={{
										color: "#ea2929",
										borderColor: "#ea2929",
										ml: 1,
										width: "90px",
										"&:hover": {
											borderColor: "#ea2929",
											color: "#ea2929",
										},
									}}
									disableFocusRipple
									onClick={handleRemoveButton}
									variant="outlined"
								>
									<Typography
										variant="caption"
										fontSize={10}
										sx={{ pb: 0 }}
										onClick={handleRemoveButton}
									>
										REMOVE
									</Typography>
								</Button>
							</Grid>
							{/* <Grid item>
								<Button>Edit</Button>
							</Grid> */}
						</Grid>
					</Grid>
					<Grid item container justifyContent={"flex-end"}>
						<Typography variant="subtitle1" component="div" sx={{ mx: 1 }}>
							{created_at_readable_format}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
