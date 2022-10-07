import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	IDrugAllergy,
	IPastMedicalHistory,
	IPastSurgicalHistory,
	IStore,
} from "../../helpers/interfaces";
import { IChiefComplaint, ITreatmentPlan } from "../../helpers/interfaces";
import {
	setChiefComplaints,
	setDrugAllergies,
	setPastMedicalHistory,
	setPastSurgicalHistory,
	setTreatmentPlan,
} from "../../redux/Reducers/patientTreatmentDetailsReducer";
import { convertToReadableDate } from "../../helpers";
import AlertDialog from "../Dialog";
import SelectedArray from "../SelectedArray";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	key: number;
	createdAt?: string;
	histories: string[];
	id?: number;
	handleSelectPastSurgicalHistory: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const PastSurgicalHistoryDataEntries = () => {
	const [selectedHistory, setSelectedHistory] = React.useState(null);
	const [dialogIsOpen, setDialogOpen] = React.useState(false);
	const past_surgical_histories = useSelector(
		(state: IStore) =>
			state.patientTreatmentDetailsDataStore.past_surgical_history
	);
	const patientTreatmentDetailId = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation.id
	);

	let { patientId, multiple } = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatientConsultation
	);
	let dispatch = useDispatch();
	const fetchAllExistingPastSurgicalHistory = async () => {
		let response = await window.electron.PastSurgicalHistoryApi.get({
			treatmentDetailId: patientTreatmentDetailId,
			multiple: multiple ? multiple : false,
			patientId: patientId,
		});
		console.log(
			"🚀 ~ file: index.tsx ~ line 64 ~ fetchAllExistingPastSurgicalHistory ~ response",
			response
		);
		if (response.status === 200) {
			dispatch(setPastSurgicalHistory(response.data));
		}
	};
	let handleRemoveButton = async () => {
		try {
			let deleted = await window.electron.PastSurgicalHistoryApi.delete({
				id: selectedHistory,
			});
			setDialogOpen(false);
			await fetchAllExistingPastSurgicalHistory();
		} catch (err: any) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchAllExistingPastSurgicalHistory();
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
				{past_surgical_histories &&
					past_surgical_histories.map((item: IPastSurgicalHistory) => {
						return (
							<PastSurgicalHistoryDataEntry
								createdAt={item.createdAt}
								histories={item.history}
								id={item.id}
								key={item.id}
								handleSelectPastSurgicalHistory={setSelectedHistory}
								openDialog={setDialogOpen}
							/>
						);
					})}
			</Box>
			<AlertDialog
				action={handleRemoveButton}
				isOpen={dialogIsOpen}
				text={`Do you want to remove these allergies ?`}
				close={() => setDialogOpen(false)}
			/>
		</React.Fragment>
	);
};

export function PastSurgicalHistoryDataEntry({
	key,
	createdAt,
	histories,
	id,
	handleSelectPastSurgicalHistory,
	openDialog,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [drugAllergy, setDrugAllergy] = React.useState<any>("");
	const [durationValue, setDuration] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	React.useEffect(() => {
		console.log(histories);
		setCreatedAt(createdAt);
		setDrugAllergy(histories);
	}, []);

	let handleRemoveButton = async () => {
		try {
			handleSelectPastSurgicalHistory(id);
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
				<Grid item xs={12} sm container direction={'column-reverse'}>
					<Grid item xs container direction="column" spacing={2}>
						<Grid
							item
							xs
							sx={{
								mx: 1,
							}}
						>
							
							<Typography variant="body2" color="text.secondary" gutterBottom>
								{durationValue}
							</Typography>
							{/* <Typography variant="body2" gutterBottom>
								{detailValue}
							</Typography> */}
							<React.Fragment>
								<Grid item xs direction="row" gap={2} container>
									{histories.length > 0 ? (
										histories.map((item: string, index: number) => {
											return (
												<Button variant="contained" color="primary" key={index}>
													{item}
												</Button>
											);
										})
									) : (
										<React.Fragment />
									)}
								</Grid>
							</React.Fragment>
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
						<Typography variant="subtitle1" component="div" sx={{ mx: 1 }}>
							{created_at_readable_format}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default PastSurgicalHistoryDataEntries;
