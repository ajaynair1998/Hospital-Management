import { Box, Button, Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import AsyncSearchBar from "../../../../components/AsyncSearchBar";
import AddIcon from "@mui/icons-material/Add";
import AddNewPatientInputModal from "../../../../components/AddNewPatientModal";
import AddNewPatient from "./AddNewPatient";
import { setAddNewPatientInputDialogState } from "../../../../redux/Reducers/utilDataReducer";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Patients = () => {
	let dispatch = useDispatch();
	const handleClickAddPatient = () => {
		try {
			dispatch(
				setAddNewPatientInputDialogState({ addNewPatientInputDialogOpen: true })
			);
		} catch (err) {
			console.log(err);
		}
	};
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
								onClick={handleClickAddPatient}
							>
								<p>Add patient </p> &nbsp;
								<AddIcon />
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<AddNewPatient />
		</React.Fragment>
	);
};

export default Patients;
