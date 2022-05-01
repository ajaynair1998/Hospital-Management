import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";
import { setChiefComplaints } from "../../redux/Reducers/patientTreatmentDetailsReducer";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	createdAt?: string;
	complaint?: string;
	details?: string;
	duration?: string;
	id?: number;
}

export const ChiefComplaintDataEntries = () => {
	const chief_complaints = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore.chief_complaints
	);
	let dispatch = useDispatch();
	const fetchAllExistingChiefComplaints = async () => {
		let response = await window.electron.ChiefComplaintsApi.get({
			treatmentDetailId: 1,
		});
		if (response.status === 200) {
			dispatch(setChiefComplaints(response.data));
		}
	};

	React.useEffect(() => {
		fetchAllExistingChiefComplaints();
	}, []);
	return (
		<Box m={2}>
			{chief_complaints &&
				chief_complaints.map((item: IChiefComplaint) => {
					return (
						<ChiefComplaintDataEntry
							createdAt={item.createdAt}
							complaint={item.complaint}
							details={item.details}
							duration={item.duration}
							id={item.id}
							key={item.id}
						/>
					);
				})}
		</Box>
	);
};

export default function ChiefComplaintDataEntry({
	createdAt,
	complaint,
	details,
	duration,
	id,
}: IProps) {
	const [created_at, setCreatedAt] = React.useState<any>("");
	const [chiefComplaint, setCheifComplaint] = React.useState<any>("");
	const [durationValue, setDuration] = React.useState<any>("");
	const [detailValue, setDetail] = React.useState<any>("");

	React.useEffect(() => {
		setCreatedAt(createdAt);
		setCheifComplaint(complaint);
		setDuration(duration);
		setDetail(details);
	}, []);
	return (
		<Paper
			key={id}
			elevation={5}
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
								{chiefComplaint}
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
								<Button sx={{ color: "#ea2929" }}>Remove</Button>
							</Grid>
							<Grid item>
								<Button>Edit</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant="subtitle1" component="div" sx={{ m: 1 }}>
							{created_at}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
