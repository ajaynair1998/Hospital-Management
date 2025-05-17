import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	IClinicalDiagnosis,
	IDiagnosis,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setClinicalDiagnosis,
	setDiagnosis,
} from "../../redux/reducers/patientTreatmentDetailsReducer";
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
	diagnosis_text?: string;
	details?: string;
	duration?: string;
	id?: number;
	handleSelectDiagnosis: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedDiagnosisText: React.Dispatch<React.SetStateAction<string>>;
}

const DiagnosisDataEntries = (props: { summary?: boolean }) => {
	const [selectedDiagnosis, setSelectedDiagnosis] = React.useState(null);
	const [selectedDiagnosisText, setSelectedDiagnosisText] = React.useState("");
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const diagnosis = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.diagnosis
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	let dispatch = useDispatch();
	const fetchAllExistingDiagnosis = async () => {
		let response = await window.electron.DiagnosisApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		if (response.status === 200) {
			dispatch(setDiagnosis(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.DiagnosisApi.delete({
				id: selectedDiagnosis,
			});
			setDialogOpen(false);
			await fetchAllExistingDiagnosis();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingDiagnosis();
	}, []);
	return diagnosis.length ? (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="subtitle2" component="div">
							{props.summary ? "DIAGNOSIS" : "DATA ENTRIES"}
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box m={2}>
				{diagnosis &&
					diagnosis.map((item: IDiagnosis) => {
						return (
							<DiagnosisDataEntry
								createdAt={item.createdAt}
								diagnosis_text={item.diagnosis}
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
	) : (
		<React.Fragment />
	);
};

export function DiagnosisDataEntry({
	createdAt,
	diagnosis_text,
	details,
	duration,
	id,
	handleSelectDiagnosis,
	openDialog,
	setSelectedDiagnosisText,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [diagnosis, setDiagnosis] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setDiagnosis(diagnosis_text);
		setDetail(details);
	}, []);

	const handleRemoveButton = async () => {
		try {
			handleSelectDiagnosis(id);
			setSelectedDiagnosisText(diagnosis);
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
				flexGrow: 1,
				backgroundColor: (theme) =>
					theme.palette.mode === "dark" ? "#1A2027" : "#fff",
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} sm container direction={"column-reverse"}>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs sx={{ mx: 1 }}>
							<Typography gutterBottom variant="subtitle1" component="div">
								{diagnosis}
							</Typography>
							{detailValue && (
								<React.Fragment>
									<Typography
										variant="caption"
										gutterBottom
										mt={2}
										fontSize={10}
									>
										DETAILS
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

export default DiagnosisDataEntries;
