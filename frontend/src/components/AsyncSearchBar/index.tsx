import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { PanToolSharp } from "@mui/icons-material";

interface Film {
	title: string;
	year: number;
}

function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

interface IProps {
	label: string;
	handleChange: (e: string) => Promise<void>;
	valuesFromSearch: any[];
	selectionOnChange: (e: React.SyntheticEvent<Element, Event>, v: any) => void;
}
export default function AsyncSearchBar(props: IProps) {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<readonly any[]>([]);
	// const loading = open && options.length === 0;
	const loading = false;

	// React.useEffect(() => {
	// 	let active = true;

	// 	if (!loading) {
	// 		return undefined;
	// 	}

	// 	(async () => {
	// 		await sleep(1000);

	// 		if (active) {
	// 			setOptions(props.valuesFromSearch);
	// 		}
	// 	})();

	// 	return () => {
	// 		active = false;
	// 	};
	// }, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	React.useEffect(() => {
		setOptions(props.valuesFromSearch);
	}, [props.valuesFromSearch]);

	return (
		<Autocomplete
			id="async-search-bar"
			sx={{ width: 300 }}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			blurOnSelect
			groupBy={(option) => (option.name ? option.name[0] : undefined)}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option, value) => {
				if (option.name === "" || value.name === "") {
					return true;
				}

				return option.name === value.name;
			}}
			getOptionLabel={(option) => option.name}
			options={options}
			loading={loading}
			onChange={(e, v) => props.selectionOnChange(e, v)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{option.name}
					</li>
				);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					onChange={(e) => props.handleChange(e.target.value)}
					label={props.label}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? (
									<CircularProgress color="inherit" size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	);
}
