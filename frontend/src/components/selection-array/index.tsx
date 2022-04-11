import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface ChipData {
	key: number;
	label: string;
}

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

export default function SelectionArray() {
	const [chipData, setChipData] = React.useState<readonly ChipData[]>([
		{ key: 0, label: "Angular" },
		{ key: 1, label: "jQuery" },
		{ key: 2, label: "Polymer" },
		{ key: 3, label: "React" },
		{ key: 4, label: "Vue.js" },
	]);

	const handleDelete = (chipToDelete: ChipData) => () => {
		setChipData((chips) =>
			chips.filter((chip) => chip.key !== chipToDelete.key)
		);
	};

	return (
		<React.Fragment>
			<Box sx={{ my: 1, mx: 2 }}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography gutterBottom variant="h5" component="div">
							Selected
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Divider variant="middle" />

			<Paper
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					flexWrap: "wrap",
					listStyle: "none",
					py: 0.5,
					pl: 0,
					m: 2,
					maxWidth: 500,
				}}
				elevation={0}
				component="ul"
			>
				{chipData.map((data) => {
					let icon;

					if (data.label === "React") {
						icon = <TagFacesIcon />;
					}

					return (
						<ListItem key={data.key}>
							<Chip
								icon={icon}
								label={data.label}
								onDelete={
									data.label === "React" ? undefined : handleDelete(data)
								}
							/>
						</ListItem>
					);
				})}
			</Paper>
		</React.Fragment>
	);
}
