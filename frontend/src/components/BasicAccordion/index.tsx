import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid } from "@mui/material";
interface IProps {
	id: number;
	heading: string;
	handleDelete: Function;
	details: string;
}

export default function BasicAccordion({
	id,
	heading,
	handleDelete,
	details,
}: IProps) {
	return (
		<div key={id} style={{ marginBottom: 15 }}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					sx={{ pl: 3 }}
				>
					<Typography sx={{ flexGrow: 1 }}>{heading}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{details && <Typography sx={{ pl: 1, mb: 2 }}>{details}</Typography>}
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
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
