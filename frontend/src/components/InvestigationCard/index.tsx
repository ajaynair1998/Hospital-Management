import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { IInvestigation } from "../../helpers/interfaces";
import { useDispatch } from "react-redux";
import { convertToReadableDate } from "../../helpers";
import { Button, Grid } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface IProps extends IInvestigation {
	id: number;
	handleSelectInvestigation: Function;
	openDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InvestigationCard({
	createdAt,
	file_data,
	file_name,
	file_type,
	id,
	handleSelectInvestigation,
	openDialog,
}: IProps) {
	const theme = useTheme();
	let dispatch = useDispatch();
	let created_at_readable_format = convertToReadableDate(createdAt);

	let handleRemoveButton = async () => {
		try {
			handleSelectInvestigation(id);
			openDialog(true);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	return (
		<Card
			sx={{
				display: "flex",
				mb: 2,
				flexDirection: "row",
				justifyContent: "space-between",
			}}
			key={id}
		>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto" }}>
					<Typography
						component="div"
						variant="body1"
						sx={{ borderRadius: "5px" }}
					>
						{file_type}
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						{created_at_readable_format}
					</Typography>
				</CardContent>
				<Grid item xs container direction="row" spacing={2} pl={1} pb={1}>
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
					<Grid item>
						<Button
							href={file_data}
							download={`${file_name}`}
							variant="outlined"
						>
							<Typography variant="caption" fontSize={10} sx={{ pb: 0 }}>
								Open
							</Typography>
						</Button>
					</Grid>
				</Grid>
			</Box>

			{file_type == "image/jpeg" ? (
				<CardMedia
					component="img"
					sx={{ width: "151px", height: "129px", p: 1, borderRadius: "20px" }}
					src={file_data}
					alt="file"
				/>
			) : (
				<CardMedia
					component="img"
					sx={{ width: "151px", p: 1, borderRadius: "20px" }}
					src={"./assets/pdf-placeholder.png"}
					alt="file"
				/>
			)}
		</Card>
	);
}
