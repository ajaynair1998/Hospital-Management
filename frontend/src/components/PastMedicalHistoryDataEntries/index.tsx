import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IPastMedicalHistory, IStore } from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setPastMedicalHistory,
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
	history: string;
	details?: string;
	duration?: string;
	id?: number;
	handleSelectHistory: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedHistoryText: React.Dispatch<React.SetStateAction<string>>;
}

const PastMedicalHistoryDataEntries = () => {
	const [selectedHistory, setSelectedHistory] = React.useState(null);
	const [selectedHistoryText, setSelectedHistoryText] = React.useState("");
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const past_medical_histories = useSelector(
		(state: IStore) =>
			state.patientTreatmentDetailsDataStore.past_medical_history
	);
	let dispatch = useDispatch();
	const fetchAllExistingPastMedicalHistories = async () => {
		let response = await window.electron.PastMedicalHistoryApi.get({
			treatmentDetailId: 1,
		});
		if (response.status === 200) {
			dispatch(setPastMedicalHistory(response.data));
		}
	};
	const handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.PastMedicalHistoryApi.delete({
				id: selectedHistory,
			});
			setDialogOpen(false);
			await fetchAllExistingPastMedicalHistories();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingPastMedicalHistories();
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
				{past_medical_histories &&
					past_medical_histories.map((item: IPastMedicalHistory) => {
						return (
							<ChiefComplaintDataEntry
								createdAt={item.createdAt}
								history={item.history}
								details={item.details}
								duration={item.duration}
								id={item.id}
								key={item.id}
								handleSelectHistory={setSelectedHistory}
								openDialog={setDialogOpen}
								setSelectedHistoryText={setSelectedHistoryText}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove ${selectedHistoryText} ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	);
};

export function ChiefComplaintDataEntry({
	createdAt,
	history,
	details,
	duration,
	id,
	handleSelectHistory,
	openDialog,
	setSelectedHistoryText,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [PastMedicalHistory, setPastMedicalHistory] = React.useState<any>("");
	const [durationValue, setDuration] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setPastMedicalHistory(history);
		setDuration(duration);
		setDetail(details);
	}, []);

	const handleRemoveButton = async () => {
		try {
			handleSelectHistory(id);
			setSelectedHistoryText(history);
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
								{history}
							</Typography>
							<Typography variant="body2" color="text.secondary" gutterBottom>
								{durationValue}
							</Typography>
							<Typography variant="body2" gutterBottom>
								{detailValue}
							</Typography>
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

export default PastMedicalHistoryDataEntries;
