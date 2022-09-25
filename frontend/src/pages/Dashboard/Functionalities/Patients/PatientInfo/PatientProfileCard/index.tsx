import { Box, Button, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IStore } from "../../../../../../helpers/interfaces";
import { generateMaximumLengthString } from "../../../../../../helpers";
import { shrinkName } from "../../../../../../helpers/functions";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const PatientProfileCard = () => {
	let patientProfileDetails = useSelector(
		(state: IStore) =>
			state.applicationDataStore.selectedPatient.patientProfileDetails
	);
	let patientSelected = useSelector(
		(state: IStore) => state.applicationDataStore.selectedPatient.selected
	);
	const [patients, setPatients] = useState<any>([]);
	let dispatch = useDispatch();

	const handleClickGoToConsultations = () => {
		console.log("clicked go to consultations");
	};

	return patientSelected && patientProfileDetails ? (
		<React.Fragment>
			<Container>
				<Box
					sx={{ bgcolor: "#fff", pt: 4, height: "600px" }}
					component={Paper}
					elevation={1}
				>
					<Grid
						container
						direction={"column"}
						spacing={3}
						justifyContent={"flex-start"}
						alignItems={"center"}
						className={"patient card grid"}
						sx={{ px: 5 }}
					>
						<Grid
							item
							container
							direction={"row"}
							spacing={1}
							justifyContent={"space-between"}
							alignItems={"center"}
							className="profile photo,name,age,profession"
						>
							<Grid item className="profile photo">
								<CardMedia
									component="img"
									sx={{
										width: "100px",
										height: "100px",
										// p: 1,
										// pl:0,
										borderRadius: "70px",
									}}
									src={"./assets/pdf-placeholder.png"}
									alt="file"
								/>
							</Grid>
							<Grid
								item
								justifyContent={"flex-start"}
								alignItems={"start"}
								className="name,age,profession"
								sx={{ width: "150px" }}
							>
								<Grid item>
									{" "}
									<Typography variant="h6">
										{patientProfileDetails.name == "" ||
										!patientProfileDetails.name
											? "Unavailable"
											: generateMaximumLengthString(
													patientProfileDetails.name,
													15
											  )}
									</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle1">
										{/* 24 year old engineer */}
										{`${
											patientProfileDetails.age
												? `${patientProfileDetails.age} years old`
												: ""
										} ${
											patientProfileDetails.occupation
												? patientProfileDetails.occupation
												: ""
										}`}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							container
							direction={"row"}
							spacing={1}
							justifyContent={"space-between"}
							alignItems={"center"}
							className={"country,gender,blood group"}
						>
							<Grid
								item
								justifyContent={"center"}
								alignItems={"center"}
								className={"blood group"}
							>
								<Grid item>
									{" "}
									<Typography variant="subtitle2" align="center">
										Blood Group
									</Typography>
								</Grid>
								<Grid item>
									{" "}
									<Typography variant="subtitle1" align="center">
										{/* O+ve */}
										{patientProfileDetails.blood_group == "not_selected" ||
										!patientProfileDetails.blood_group
											? "Unavailable"
											: patientProfileDetails.blood_group}
									</Typography>
								</Grid>
							</Grid>
							<Grid
								item
								justifyContent={"center"}
								alignItems={"center"}
								className={"Gender"}
							>
								<Grid item>
									{" "}
									<Typography variant="subtitle2" align="center">
										Gender
									</Typography>
								</Grid>
								<Grid item>
									{" "}
									<Typography variant="subtitle1" align="center">
										{patientProfileDetails.gender == "not_selected"
											? "Unavailable"
											: patientProfileDetails.gender}
									</Typography>
								</Grid>
							</Grid>
							<Grid
								item
								justifyContent={"center"}
								alignItems={"center"}
								className={"blood group"}
							>
								<Grid item>
									{" "}
									<Typography variant="subtitle2" align="center">
										Country
									</Typography>
								</Grid>
								<Grid item>
									{" "}
									<Typography variant="subtitle1" align="center">
										{generateMaximumLengthString(
											patientProfileDetails.nationality
										)}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							container
							direction={"row"}
							spacing={1}
							justifyContent={"space-between"}
							alignItems={"flex-start"}
							className={"Address"}
						>
							<Grid
								item
								justifyContent={"center"}
								alignItems={"flex-start"}
								className={"Address"}
							>
								<Grid item>
									{" "}
									<Typography variant="subtitle2" align="left">
										Address
									</Typography>
								</Grid>
								<Grid item>
									{" "}
									<Typography variant="subtitle1" align="left">
										{!patientProfileDetails.address
											? "Unavailable"
											: patientProfileDetails.address}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							container
							direction={"row"}
							spacing={1}
							justifyContent={"space-between"}
							alignItems={"flex-start"}
							className={"Phone Number"}
						>
							<Grid
								item
								justifyContent={"center"}
								alignItems={"flex-start"}
								className={"Phone Number"}
							>
								<Grid item>
									{" "}
									<Typography variant="subtitle2" align="left">
										Phone Number
									</Typography>
								</Grid>
								<Grid item>
									{" "}
									<Typography variant="subtitle1" align="left">
										{patientProfileDetails.phone_number
											? patientProfileDetails.phone_number
											: "Unavailable"}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid
							item
							container
							direction={"row"}
							spacing={1}
							justifyContent={"space-between"}
							alignItems={"flex-start"}
							className={"Phone Number"}
						>
							<Grid
								item
								justifyContent={"center"}
								alignItems={"flex-start"}
								className={"Consultations"}
							>
								<Grid item>
									{" "}
									<Button
										variant="text"
										sx={{ alignItems: "center", pl: 0 }}
										onClick={handleClickGoToConsultations}
									>
										<Typography
											variant="subtitle2"
											alignContent={"center"}
											alignItems="center"
										>
											All Consultations &nbsp;
										</Typography>
										<ArrowForwardIcon fontSize="small" />
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid item></Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	) : (
		<React.Fragment />
	);
};

export default PatientProfileCard;
