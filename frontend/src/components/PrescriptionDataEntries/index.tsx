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
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import appStateDataReducer from "../../redux/Reducers/appStateDataReducer";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	medicine_name: string;
	medicine_id: number;
	frequency: string;
	from: string;
	to: string;
	duration: string;
	dosage?: JSON;
	id?: number;
	handleSelectPresciption: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedPrescriptionText: React.Dispatch<React.SetStateAction<string>>;
}

export const PrescriptionDataEntries = () => {
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
	let dispatch = useDispatch();
	const fetchAllExistingPrescriptions = async () => {
		let response = await window.electron.PrescriptionApi.get({
			treatmentDetailId: patientTreatmentDetailId,
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
	return (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="h5" component="div">
							Data Entries
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
								medicine_name={item.medicine_name}
								medicine_id={item.medicine_id}
								dosage={item.dosage}
								from={item.from}
								to={item.to}
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
	);
};

export default function PrescriptionDataEntry({
	createdAt,
	medicine_name,
	medicine_id,
	dosage,
	from,
	to,
	frequency,
	duration,
	handleSelectPresciption,
	setSelectedPrescriptionText,
	id,
	openDialog,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [prescriptionName, setPrescriptionName] = React.useState<any>("");
	const [dosageValue, setDosageValue] = React.useState<any>("");
	const [fromValue, setFromValue] = React.useState<any>("");
	const [toValue, setToValue] = React.useState<any>("");
	const [frequencyValue, setFrequencyValue] = React.useState<any>("");
	const [durationValue, setDurationValue] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setPrescriptionName(medicine_name);
		setDosageValue(dosage);
		setFromValue(from);
		setToValue(to);
		setFrequencyValue(frequency);
		setDurationValue(duration);
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
				<Grid item xs={12} sm container>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs sx={{ m: 1 }}>
							<Typography gutterBottom variant="subtitle1" component="div">
								{medicine_name}
							</Typography>
							<Typography variant="body2" color="text.secondary" gutterBottom>
								{durationValue}
							</Typography>
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
								<Button sx={{ color: "#ea2929" }} onClick={handleRemoveButton}>
									Remove
								</Button>
							</Grid>
							<Grid item>
								<Button>Edit</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant="subtitle1" component="div" sx={{ m: 1 }}>
							{created_at_readable_format}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
