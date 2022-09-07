import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import Stack from "@mui/material/Stack";
import moment from "moment";

interface Iprops {
	// handleChange: React.Dispatch<React.SetStateAction<Date | null | string>>;
	handleChange: Function;
	value: Date | string | null;
	label: string;
	minDate?: string;
}
export default function DateInput({
	value,
	handleChange,
	label,
	minDate,
}: Iprops) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Stack spacing={3}>
				<MobileDateTimePicker
					label={label}
					value={value}
					onChange={(newValue) => {
						handleChange(newValue);
					}}
					minDate={minDate ? moment().clone().add(minDate, "days") : undefined}
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
