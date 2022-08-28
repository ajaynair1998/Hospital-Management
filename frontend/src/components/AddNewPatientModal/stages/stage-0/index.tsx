import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CountrySelect from "../../../CountrySelect";
import DateInput from "../../../DateInput";

const StageZero = () => {
	let [date, setDate] = useState<Date | null>(new Date());
	let [gender, setGender] = useState<string>("male");
	const handleChangeDate = (value: Date) => {
		try {
			setDate(value);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<React.Fragment>
			<Box
				component="form"
				sx={{
					// "& > :not(style)": { m: 2, width: "25ch" },
					"& > :not(style)": { m: 2, width: "90%" },
				}}
				noValidate
				autoComplete="off"
				display={"flex"}
				flexDirection={"column"}
			>
				<TextField
					id="outlined-basic"
					label="Name"
					variant="outlined"
					value={""}
					// sx={{ width: "200px!important" }}

					// onChange={}
				/>

				<DateInput
					handleChange={handleChangeDate}
					value={date}
					label={"Date"}
				/>

				<CountrySelect />

				<FormControl>
					<InputLabel id="demo-simple-select-label"> type</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={gender}
						label="Gender"
						onChange={(e) => setGender(e.target.value)}
					>
						<MenuItem value={"male"}>Male</MenuItem>
						<MenuItem value={"female"}>Female</MenuItem>
						<MenuItem value={"other"}>Other</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</React.Fragment>
	);
};

export default StageZero;
