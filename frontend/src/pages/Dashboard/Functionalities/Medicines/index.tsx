import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

import { IStore } from "../../../../helpers/interfaces";
import AddNewMedicine from "./AddNewMedicine";
import { setAddNewMedicineInputDialogState } from "../../../../redux/Reducers/utilDataReducer";
import DataGridComponant from "../../../../components/DataGrid";
import MedicineList from "./MedicineList";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Medicines = () => {
	let dispatch = useDispatch();
	const handleClickAddMedicine = () => {
		try {
			dispatch(
				setAddNewMedicineInputDialogState({
					addNewMedicineInputDialogOpen: true,
				})
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
							<Button
								variant="outlined"
								sx={{ height: "50px", alignContent: "center" }}
								onClick={handleClickAddMedicine}
							>
								<p>Add Medicine </p> &nbsp;
								<AddIcon />
							</Button>
						</Grid>
					</Grid>
					<MedicineList />
				</Box>
			</Container>
			<AddNewMedicine />
		</React.Fragment>
	);
};

export default Medicines;
