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
	IHistoryOfComplaint,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setClinicalDiagnosis,
	setHistoryOfComplaints,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import DeleteIcon from "@mui/icons-material/Delete";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	complaint: string;
	details: string;
	duration?: string;
	id?: number;
	handleSelectHistoryOfComplaint: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedHistoryOfComplaintText: React.Dispatch<
		React.SetStateAction<string>
	>;
}

export const HistoryOfComplaintDataEntries = (props: { summary?: boolean }) => {
	const [selectedHistoryOfComplaint, setSelectedHistoryOPfComplaint] =
		React.useState(null);
	const [selectedHistoryOfComplaintText, setSelectedHistoryofComplaintText] =
		React.useState("");
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const history_of_complaints = useSelector(
		(state: IStore) =>
			state.patientTreatmentDetailsDataStore.history_of_complaints
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);
	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	let dispatch = useDispatch();
	const fetchAllExistingHistoryOfComplaints = async () => {
		let response = await window.electron.HistoryOfComplaintsApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		if (response.status === 200) {
			dispatch(setHistoryOfComplaints(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.HistoryOfComplaintsApi.delete({
				id: selectedHistoryOfComplaint,
			});
			setDialogOpen(false);
			await fetchAllExistingHistoryOfComplaints();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingHistoryOfComplaints();
	}, []);
	return history_of_complaints.length ? (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="subtitle2" component="div">
							{props.summary ? "HISTORY OF COMPLAINTS" : "DATA ENTRIES"}
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />
			<Box m={2}>
				{history_of_complaints &&
					history_of_complaints.map((item: IHistoryOfComplaint) => {
						return (
							<HistoryOfComplaintDataEntry
								createdAt={item.createdAt}
								complaint={item.complaint}
								details={item.details}
								id={item.id}
								key={item.id}
								handleSelectHistoryOfComplaint={setSelectedHistoryOPfComplaint}
								openDialog={setDialogOpen}
								setSelectedHistoryOfComplaintText={
									setSelectedHistoryofComplaintText
								}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove ${selectedHistoryOfComplaintText} ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	) : (
		<React.Fragment />
	);
};

export default function HistoryOfComplaintDataEntry({
	createdAt,
	complaint,
	details,
	duration,
	id,
	handleSelectHistoryOfComplaint,
	openDialog,
	setSelectedHistoryOfComplaintText,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [historyOfComplaint, setHistoryOfComplaint] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setHistoryOfComplaint(complaint);
		setDetail(details);
	}, []);

	const handleRemoveButton = async () => {
		try {
			handleSelectHistoryOfComplaint(id);
			setSelectedHistoryOfComplaintText(complaint);
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
				<Grid item xs={12} sm container direction={"column-reverse"}>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs sx={{ mx: 1 }}>
							<Typography gutterBottom variant="subtitle1" component="div">
								{complaint}
							</Typography>
							{details && (
								<Box>
									<Typography
										variant="caption"
										gutterBottom
										mt={0}
										fontSize={10}
									>
										DETAILS
									</Typography>
									<Divider />
									<Typography variant="body2" gutterBottom mt={1}>
										{details}
									</Typography>
								</Box>
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
