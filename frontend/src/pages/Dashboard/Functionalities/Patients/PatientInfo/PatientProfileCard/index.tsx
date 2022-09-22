import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
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
				<Box sx={{ bgcolor: "#b57979", width: "400px", pt: 2 }}>
					<Grid
						container
						direction={"column"}
						spacing={2}
						justifyContent={"flex-start"}
						alignItems={"center"}
						className={"patient card grid"}
					>
						<Grid
							item
							container
							direction={"row"}
							spacing={1}
							justifyContent={"space-evenly"}
							alignItems={"center"}
							className="profile photo,name,age,profession"
						>
							<Grid item className="profile photo">
								<CardMedia
									component="img"
									sx={{
										width: "100px",
										height: "100px",
										p: 1,
										borderRadius: "70px",
									}}
									src={"./assets/pdf-placeholder.png"}
									alt="file"
								/>
							</Grid>
							<Grid
								item
								direction={"column"}
								spacing={0}
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
							justifyContent={"space-evenly"}
							alignItems={"center"}
							className={"country,gender,blood group"}
						>
							<Grid
								item
								direction={"column"}
								spacing={1}
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
								direction={"column"}
								spacing={1}
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
								direction={"column"}
								spacing={1}
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
						<Grid item></Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default PatientProfileCard;
