import { Box, Button, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import AsyncSearchBar from "../../../../components/AsyncSearchBar";
import AddIcon from "@mui/icons-material/Add";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Patients = () => {
	return (
		<React.Fragment>
			<Container>
				<Box>
					<Grid
						container
						direction={"row"}
						spacing={3}
						justifyContent={"flex-start"}
						alignItems={"center"}
					>
						<Grid item>
							<AsyncSearchBar label={"Search..."} />
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								sx={{ height: "50px", alignContent: "center" }}
							>
								<p>Add patient </p> &nbsp;
								<AddIcon />
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Patients;
