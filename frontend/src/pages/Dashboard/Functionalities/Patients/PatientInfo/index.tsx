import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import PatientProfileCard from "./PatientProfileCard";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const PatientInfo = () => {
	const [patients, setPatients] = useState<any>([]);
	let dispatch = useDispatch();

	return (
		<React.Fragment>
			<Container>
				<Box sx={{ mt: 1 }}>
					<Grid
						container
						direction={"row"}
						spacing={3}
						justifyContent={"flex-start"}
						alignItems={"center"}
					>
						<Grid item>
							<PatientProfileCard />
						</Grid>
						<Grid item></Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default PatientInfo;
