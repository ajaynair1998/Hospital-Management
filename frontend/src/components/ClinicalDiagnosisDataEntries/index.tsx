import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IClinicalDiagnosis, IStore } from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setClinicalDiagnosis,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	diagnosis?: string;
	details?: string;
	duration?: string;
	id?: number;
	handleSelectDiagnosis: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedDiagnosisText: React.Dispatch<React.SetStateAction<string>>;
}

export const ClinicalDiagnosisDataEntries = () => {
	const [selectedDiagnosis, setSelectedDiagnosis] = React.useState(null);
	const [selectedDiagnosisText, setSelectedDiagnosisText] = React.useState("");
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const clinical_diagnosis = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.clinical_diagnosis
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	let dispatch = useDispatch();
	const fetchAllExistingClinicalDiagnosis = async () => {
		let response = await window.electron.ClinicalDiagnosisApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		if (response.status === 200) {
			dispatch(setClinicalDiagnosis(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.ClinicalDiagnosisApi.delete({
				id: selectedDiagnosis,
			});
			setDialogOpen(false);
			await fetchAllExistingClinicalDiagnosis();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingClinicalDiagnosis();
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
				{clinical_diagnosis &&
					clinical_diagnosis.map((item: IClinicalDiagnosis) => {
						return (
							<ChiefComplaintDataEntry
								createdAt={item.createdAt}
								diagnosis={item.diagnosis}
								details={item.details}
								id={item.id}
								key={item.id}
								handleSelectDiagnosis={setSelectedDiagnosis}
								openDialog={setDialogOpen}
								setSelectedDiagnosisText={setSelectedDiagnosisText}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove ${selectedDiagnosisText} ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	);
};

export default function ChiefComplaintDataEntry({
	createdAt,
	diagnosis,
	details,
	duration,
	id,
	handleSelectDiagnosis,
	openDialog,
	setSelectedDiagnosisText,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [clinicalDiagnosis, setClinicalDiagnosis] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setClinicalDiagnosis(diagnosis);
		setDetail(details);
	}, []);

	const handleRemoveButton = async () => {
		try {
			handleSelectDiagnosis(id);
			setSelectedDiagnosisText(clinicalDiagnosis);
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
				<Grid item xs={12} sm container direction={'column-reverse'}>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs >
							<Typography gutterBottom variant="subtitle1" component="div">
								{clinicalDiagnosis}
							</Typography>
							{detailValue && (
								<React.Fragment>
									<Typography variant="body2" gutterBottom mt={2}>
										Details
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{detailValue}
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
					<Grid item container justifyContent={'flex-end'}>
						<Typography variant="subtitle1" component="div" >
							{created_at_readable_format}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
