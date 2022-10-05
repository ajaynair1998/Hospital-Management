import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider, Grid } from "@mui/material";
interface IProps {
	id: number | string;
	heading: string;
	handleDelete?: Function;
	details: string;
	createdAt?: string | undefined;
	arrayOfItems?: boolean;
}

export default function BasicAccordion({
	id,
	heading,
	handleDelete,
	details,
	createdAt,
	arrayOfItems,
}: IProps) {
	let headings: string[] = [];
	if (arrayOfItems) {
		headings = heading.split(",");
	}
	return (
		<div key={id} style={{ marginBottom: 15 }}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					sx={{ pl: 3 }}
				>
					{!arrayOfItems ? (
						<Typography
							sx={{ width: `${createdAt ? "33%" : "100%"}`, flexShrink: 0 }}
						>
							{heading}
						</Typography>
					) : (
						<React.Fragment>
							<Grid item xs direction="row" gap={2} container>
								{headings.length > 0 ? (
									headings.map((item: string, index: number) => {
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
					)}
					{createdAt && (
						<div
							style={{
								flexGrow: 1,
								flexDirection: "row",
								justifyContent: "flex-end",
							}}
						>
							<Typography
								sx={{
									color: "text.secondary",
									// maxWidth: "200px!important",
								}}
							>
								{createdAt}
							</Typography>
						</div>
					)}
				</AccordionSummary>
				<AccordionDetails sx={{ pl: 3 }}>
					{details && (
						<Box>
							<Typography variant="body2" gutterBottom mt={0}>
								Details
							</Typography>
							<Divider />
							<Typography variant="body2" gutterBottom mt={1}>
								{details}
							</Typography>
						</Box>
					)}
					{handleDelete && (
						<Grid
							container
							direction="row"
							spacing={2}
							sx={{ pl: "0!important" }}
						>
							<Grid item>
								<Button
									sx={{ color: "#ea2929" }}
									onClick={() => handleDelete(id)}
								>
									Remove &nbsp;
									<DeleteIcon />
								</Button>
							</Grid>{" "}
							{/* <Grid item>
							<Button>Edit</Button>
						</Grid> */}
						</Grid>
					)}
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
