import { Box, Button, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

let Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const PatientProfileCard = () => {
	const [patients, setPatients] = useState<any>([]);
	let dispatch = useDispatch();

	return (
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
							>
								<Grid item>
									{" "}
									<Typography variant="h6">Ajay Nair</Typography>
								</Grid>
								<Grid item>
									<Typography variant="subtitle1">
										24 year old engineer
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
										O+ve
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
										Male
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
										India
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
										Sabarmathy,Punnapra p.o,Alappuzha
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
										9539067622
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item></Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default PatientProfileCard;
