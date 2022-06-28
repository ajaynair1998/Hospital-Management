import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import Stack from "@mui/material/Stack";

interface Iprops {
	handleChange: React.Dispatch<React.SetStateAction<Date | null>>;
	value: Date | null;
}
export default function DateInput({ value, handleChange }: Iprops) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Stack spacing={3}>
				<MobileDateTimePicker
					label="Set Date for follow up"
					value={value}
					onChange={(newValue) => {
						handleChange(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
				{/* <DesktopDateTimePicker
					label="For desktop"
					value={value}
					onChange={(newValue) => {
						setValue(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
				<DateTimePicker
					label="Responsive"
					renderInput={(params) => <TextField {...params} />}
					value={value}
					onChange={(newValue) => {
						setValue(newValue);
					}}
				/> */}
			</Stack>
		</LocalizationProvider>
	);
}
