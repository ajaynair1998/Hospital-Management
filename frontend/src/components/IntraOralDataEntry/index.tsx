import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import { IIntraOral } from "../LocalExaminationInput";
import { generateUniqueId } from "../../helpers";
import BasicAccordion from "../BasicAccordion";

const label = { inputProps: { "aria-label": "simple select Checkbox" } };
interface IStringMap {
	[key: number]: boolean;
}

function generate(element: React.ReactElement) {
	return [0, 1, 2, 3, 4, 5, 6, 7].map((value) =>
		React.cloneElement(element, {
			key: value,
		})
	);
}

let teeth = [0, 1, 2, 3, 4, 5, 6, 7];

const Demo = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

interface IProps {
	setFinalData: React.Dispatch<React.SetStateAction<IIntraOral>>;
	toggleAdd?: boolean;
}

interface ISelectedTeethAndDetails {
	[key: string]: {
		teeth: string[];
		details: string;
	};
}

export default function IntraOralInputList({
	setFinalData,
	toggleAdd,
}: IProps) {
	const [dense, setDense] = React.useState(true);
	const [secondary, setSecondary] = React.useState(false);
	const [selectedTooth, setSelectedTooth] = React.useState<IStringMap>({});
	const [detail, setDetail] = React.useState<string>("");
	const [selectedTeethAndDetails, setSelectedTeethAndDetails] =
		React.useState<ISelectedTeethAndDetails>({});

	const addOrRemoveATooth = (tooth: number) => {
		let currentSelection = { ...selectedTooth };

		if (currentSelection[tooth] === true) {
			currentSelection[tooth] = false;
		} else {
			currentSelection[tooth] = true;
		}
		setSelectedTooth(currentSelection);
	};

	let quadrantDictionary = (num: string) => {
		switch (num) {
			case "1":
				return "Q1";
			case "2":
				return "Q2";
			case "3":
				return "Q3";
			case "4":
				return "Q4";
			default:
				return "none";
		}
	};

	let addCurrentIntraOralToList = () => {
		// tooth number in zero index
		// quadrant number in 1 indexed
		let selectedTeeth: string[] = [];
		let uniqueId = generateUniqueId();
		Object.entries(selectedTooth).map((item) => {
			let key = item[0];
			let value = item[1];
			let quadrant = key[0];
			//    0 indexed teeth
			let tooth = Number(key[1]) + 1;
			if (value === true) {
				selectedTeeth.push(quadrantDictionary(quadrant) + " - " + tooth);
			}
		});
		if (selectedTeeth.length === 0) {
			return;
		}
		let currentTeethAndDetails = {
			[`${uniqueId}`]: { teeth: selectedTeeth, details: detail },
		};
		setSelectedTeethAndDetails({
			...selectedTeethAndDetails,
			...currentTeethAndDetails,
		});
		setDetail("");
		setSelectedTooth({});
	};
	React.useEffect(() => {
		setFinalData({ ...selectedTeethAndDetails });
	}, [selectedTeethAndDetails]);

	React.useEffect(() => {
		addCurrentIntraOralToList();
	}, [toggleAdd]);

	return (
		<React.Fragment>
			<Box sx={{ flexGrow: 1, maxWidth: 752 }}>
				{/* <FormGroup row>
				<FormControlLabel
					control={
						<Checkbox
							checked={dense}
							onChange={(event) => setDense(event.target.checked)}
						/>
					}
					label="Enable dense"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={secondary}
							onChange={(event) => setSecondary(event.target.checked)}
						/>
					}
					label="Enable secondary text"
				/>
			</FormGroup> */}
				<Grid container spacing={2}>
					<Grid item xs={6} md={6}>
						<Typography
							sx={{ mt: 4, mb: 2, pl: 2 }}
							variant="h6"
							component="div"
						>
							Q1
						</Typography>
						<Demo>
							<List dense={dense}>
								{teeth.map((item) => (
									<ListItem
										sx={{
											background: !selectedTooth[Number(`1${item}`)]
												? "#fff"
												: "#bac3ca",
											"&:hover": {
												background: "#88a0ec",
												cursor: "pointer",
												transition: "all 0.1s ease-in",
											},
										}}
										key={item}
										// secondaryAction={
										// 	<IconButton edge="end" aria-label="select">
										// 		<Checkbox
										// 			{...label}
										// 			checked={selectedTooth[Number(`1${item}`)]}
										// 			// onChange={() => addOrRemoveATooth(Number(`1${item}`))}
										// 		/>
										// 	</IconButton>
										// }
										onClick={() => addOrRemoveATooth(Number(`1${item}`))}
									>
										<ListItemText
											primary={`Q1 - ${item + 1}`}
											secondary={secondary ? "Secondary text" : null}
										/>
									</ListItem>
								))}
							</List>
						</Demo>
					</Grid>
					<Grid item xs={6} md={6}>
						<Typography
							sx={{ mt: 4, mb: 2, pl: 2 }}
							variant="h6"
							component="div"
						>
							Q2
						</Typography>
						<Demo>
							<List dense={dense}>
								{teeth.map((item) => (
									<ListItem
										key={item}
										sx={{
											background: !selectedTooth[Number(`2${item}`)]
												? "#fff"
												: "#bac3ca",
											"&:hover": {
												background: "#88a0ec",
												cursor: "pointer",
												transition: "all 0.1s ease-in",
											},
										}}
										// secondaryAction={
										// 	<IconButton edge="end" aria-label="select">
										// 		<Checkbox
										// 			{...label}
										// 			checked={
										// 				selectedTooth[Number(`2${item}`)] === undefined ||
										// 				selectedTooth[Number(`2${item}`)] === false
										// 					? false
										// 					: true
										// 			}
										// 			// onChange={() => addOrRemoveATooth(Number(`2${item}`))}
										// 		/>
										// 	</IconButton>
										// }
										onClick={() => addOrRemoveATooth(Number(`2${item}`))}
									>
										{/* <ListItemIcon>
										<FolderIcon />
									</ListItemIcon> */}
										<ListItemText
											primary={`Q2  - ${item + 1}`}
											secondary={secondary ? "Secondary text" : null}
										/>
									</ListItem>
								))}
							</List>
						</Demo>
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={6} md={6}>
						<Typography
							sx={{ mt: 4, mb: 2, pl: 2 }}
							variant="h6"
							component="div"
						>
							Q4
						</Typography>
						<Demo>
							<List dense={dense}>
								{teeth.map((item) => (
									<ListItem
										key={item}
										sx={{
											background: !selectedTooth[Number(`4${item}`)]
												? "#fff"
												: "#bac3ca",
											"&:hover": {
												background: "#88a0ec",
												cursor: "pointer",
												transition: "all 0.1s ease-in",
											},
										}}
										// secondaryAction={
										// 	<IconButton edge="end" aria-label="delete">
										// 		<Checkbox
										// 			checked={
										// 				selectedTooth[Number(`4${item}`)] === undefined ||
										// 				selectedTooth[Number(`4${item}`)] === false
										// 					? false
										// 					: true
										// 			}
										// 			// onChange={() => addOrRemoveATooth(Number(`4${item}`))}
										// 		/>
										// 	</IconButton>
										// }
										onClick={() => addOrRemoveATooth(Number(`4${item}`))}
									>
										{/* <ListItemAvatar>
										<Avatar>
											<FolderIcon />
										</Avatar>
									</ListItemAvatar> */}
										<ListItemText
											primary={`Q4 - ${item + 1}`}
											secondary={secondary ? "Secondary text" : null}
										/>
									</ListItem>
								))}
							</List>
						</Demo>
					</Grid>
					<Grid item xs={6} md={6}>
						<Typography
							sx={{ mt: 4, mb: 2, pl: 2 }}
							variant="h6"
							component="div"
						>
							Q3
						</Typography>
						<Demo>
							<List dense={dense}>
								{teeth.map((item) => (
									<ListItem
										key={item}
										sx={{
											background: !selectedTooth[Number(`3${item}`)]
												? "#fff"
												: "#bac3ca",
											"&:hover": {
												background: "#88a0ec",
												cursor: "pointer",
												transition: "all 0.1s ease-in",
											},
										}}
										// secondaryAction={
										// 	<IconButton edge="end" aria-label="select">
										// 		<Checkbox
										// 			{...label}
										// 			checked={
										// 				selectedTooth[Number(`3${item}`)] === undefined ||
										// 				selectedTooth[Number(`3${item}`)] === false
										// 					? false
										// 					: true
										// 			}
										// 			// onChange={() => addOrRemoveATooth(Number(`3${item}`))}
										// 		/>
										// 	</IconButton>
										// }
										onClick={() => addOrRemoveATooth(Number(`3${item}`))}
									>
										{/* <ListItemAvatar>
										<Avatar>
											<FolderIcon />
										</Avatar>
									</ListItemAvatar> */}
										<ListItemText
											primary={`Q3 - ${item + 1}`}
											secondary={secondary ? "Secondary text" : null}
										/>
									</ListItem>
								))}
							</List>
						</Demo>
					</Grid>
				</Grid>
			</Box>
			<TextField
				id="outlined-multiline-static"
				label="detail"
				multiline
				rows={3}
				value={detail}
				// sx={{ width: "300px!important" }}
				onChange={(e) => setDetail(e.target.value)}
			/>
			<Box>
				{Object.entries(selectedTeethAndDetails)
					.reverse()
					.map((item) => {
						return (
							<BasicAccordion
								details={item[1].details}
								id={item[0]}
								heading={
									item[1].teeth.length > 0 ? item[1].teeth.join(" , ") : ""
								}
							/>
						);
					})}
			</Box>
		</React.Fragment>
	);
}
