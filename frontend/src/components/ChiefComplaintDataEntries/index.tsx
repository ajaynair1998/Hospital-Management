import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { IStore } from "../../helpers/interfaces";
import { IChiefComplaint } from "../../helpers/interfaces";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

interface IProps {
	created_at?: string;
	complaint?: string;
	details?: string;
	duration?: string;
	id?: number;
}

export function DataEntries() {
	let { chief_complaints } = useSelector(
		(state: IStore) => state.patientTreatmentDetailsDataStore
	);
	return (
		<Box m={2}>
			{chief_complaints.map((item: IChiefComplaint) => {
				return ChiefComplaintDataEntry(item);
			})}
		</Box>
	);
}

export default function ChiefComplaintDataEntry({
	created_at,
	complaint,
	details,
	duration,
	id,
}: IProps) {
	const [createdAt, setCreatedAt] = React.useState("23-07-1998");
	const [chiefComplaint, setCheifComplaint] = React.useState("Toothache");
	const [durationValue, setDuration] = React.useState("23 Hours");
	const [detailValue, setDetail] = React.useState(
		"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iurodio nemo ipsum beatae id soluta ea, quod porro ut eveniet,minima odit reiciendis neque, eaque placeat deserunt unde fugiatatque!"
	);
	return (
		<Paper
			sx={{
				p: 2,
				margin: 2,
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
						<Grid item xs>
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
						<Typography variant="subtitle1" component="div">
							{createdAt}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
