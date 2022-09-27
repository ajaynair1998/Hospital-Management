import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {
	AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { PanToolSharp } from "@mui/icons-material";

interface IProps {
	label: string;
	handleChange: (e: string) => Promise<void>;
	valuesFromSearch: any[];
	equalityKeyword: string;
	sortFirstLetterProperty: string;
	selectionOnChange: (e: React.SyntheticEvent<Element, Event>, v: any) => void;
	componantToDisplayOnSearch: (
		props: React.HTMLAttributes<HTMLLIElement>,
		option: any,
		state: AutocompleteRenderOptionState
	) => React.ReactNode;
}
export default function AutoCompleteTemplate(props: IProps) {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<readonly any[]>([]);
	const loading = false;

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	React.useEffect(() => {
		setOptions(props.valuesFromSearch);
		console.log(options);
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
			groupBy={(option) =>
				option[props.sortFirstLetterProperty]
					? option[props.sortFirstLetterProperty][0]
					: undefined
			}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option, value) => {
				if (
					option[props.equalityKeyword] === "" ||
					value[props.equalityKeyword] === ""
				) {
					return true;
				}

				return option[props.equalityKeyword] === value[props.equalityKeyword];
			}}
			getOptionLabel={(option) => option[props.equalityKeyword]}
			options={options}
			loading={loading}
			onChange={(e, v) => props.selectionOnChange(e, v)}
			renderOption={props.componantToDisplayOnSearch}
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
