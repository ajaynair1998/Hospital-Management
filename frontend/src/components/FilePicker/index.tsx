import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Grid, Typography } from "@mui/material";
import { IFile } from "../InvestigationInput";
import { shrinkName } from "../../helpers/functions";

interface IProps {
	handleChange?: Function;
	fileName?: string | undefined;
}
const FilePickerComponent = ({ handleChange, fileName }: IProps) => {
	const [file, setFile] = useState<string | null | FileList>("");

	const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e === null || e.target === null || e.target.files === null) return;
		let reader = new window.FileReader();
		const file = e.target.files[0];

		const file_name = file.name;
		const file_size = file.size;
		const file_type = file.type;
		reader.onloadend = () => {
			console.log(reader.result);
			console.log("reader load complete");
			handleChange
				? handleChange({
						file_name: file_name,
						file_size: file_size,
						file_type: file_type,
						file_data: reader.result,
				  })
				: console.log("handlechange was not passed in for image upload");
		};
		reader.readAsDataURL(file);
	};

	return (
		<Box>
			<Grid container direction={"column"}>
				<Grid item>
					<Typography variant="body1">Select file </Typography>
				</Grid>
				<Divider sx={{ mt: 1 }} />
				<Grid item xs container direction={"row"} alignItems={"center"}>
					<Grid item mt={2} container xs={4}>
						<Button variant="contained">
							<label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
								Browse
							</label>
							&nbsp;
							<CloudUploadIcon />
						</Button>

						<input
							type="file"
							name="photo"
							id="upload-photo"
							style={{ opacity: 0 }}
							onChange={(e) => {
								uploadImage(e);
							}}
						/>
					</Grid>
					<Grid item xs={8}>
						{fileName ? (
							<Typography variant="subtitle1">
								{shrinkName(fileName, 30)}
							</Typography>
						) : (
							<Typography variant="subtitle1">No files selected</Typography>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default FilePickerComponent;
