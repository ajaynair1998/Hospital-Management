import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { generateUniqueId } from "../../helpers";

interface ChipData {
	key: number;
	label: string;
}

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

interface ISelectedArrayProps {
	items?: string[];
	side?: boolean;
	color?: string;
}

export default function SelectedArray({
	items,
	side,
	color,
}: ISelectedArrayProps) {
	return (
		<Paper
			elevation={0}
			sx={{
				display: "flex",
				justifyContent: `${!side ? "center" : "flex-start"}`,
				flexWrap: "wrap",
				listStyle: "none",
				p: 0.5,
				m: 0,
				background: "#ffffff",
			}}
			component="ul"
		>
			{items?.map((item, index) => {
				let icon;

				return (
					<ListItem key={index}>
						<Chip
							icon={icon}
							label={item}
							style={{
								background: `  ${!color ? "#b2bcef" : color}`,
							}}
							// sx={{
							// 	ml: "0px!important",
							// 	mr: "5px!important",
							// 	pl: "0!important",
							// }}
						/>
					</ListItem>
				);
			})}
		</Paper>
	);
}
