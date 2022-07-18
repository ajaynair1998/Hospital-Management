import * as React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import BiotechIcon from "@mui/icons-material/Biotech";
import HealingIcon from "@mui/icons-material/Healing";
import HistoryIcon from "@mui/icons-material/History";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import TodayIcon from "@mui/icons-material/Today";

import { ICategory } from "../../helpers/interfaces";

export const categoriesList: ICategory[] = [
	{
		key: 0,
		category_name: "Chief Complaint",
		category_icon: <AddShoppingCartIcon />,
		location: "chief_complaint",
	},

	{
		key: 1,
		category_name: "Clinical Diagnosis",
		category_icon: <ManageSearchIcon />,
		location: "clinical_diagnosis",
	},

	{
		key: 3,
		category_name: "Diagnosis",
		category_icon: <ContentPasteSearchIcon />,
		location: "diagnosis",
	},
	{
		key: 4,
		category_name: "Drug Allergy",
		category_icon: <PersonAddDisabledIcon />,
		location: "drug_allergy",
	},
	{
		key: 5,
		category_name: "General Examination",
		category_icon: <LocationSearchingIcon />,
		location: "general_examination",
	},
	{
		key: 6,
		category_name: "Investigation",
		category_icon: <PersonSearchIcon />,
		location: "investigation",
	},
	{
		key: 7,
		category_name: "Local Examinations",
		category_icon: <BiotechIcon />,
		location: "local_examination",
	},
	{
		key: 8,
		category_name: "Medicines",
		category_icon: <HealingIcon />,
		location: "medicine",
	},
	{
		key: 9,
		category_name: "Past Medical Histories",
		category_icon: <HistoryIcon />,
		location: "past_medical_history",
	},
	{
		key: 10,
		category_name: "Treatment Plans",
		category_icon: <NextPlanIcon />,
		location: "treatment_plan",
	},
	{
		key: 11,
		category_name: "Follow Ups",
		category_icon: <TodayIcon />,
		location: "follow_up",
	},
	{
		key: 12,
		category_name: "Past Surgical Histories",
		category_icon: <HistoryIcon />,
		location: "past_surgical_history",
	},
	{
		key: 13,
		category_name: "History Of Complaints",
		category_icon: <PersonAddDisabledIcon />,
		location: "history_of_complaints",
	},
	{
		key: 14,
		category_name: "Treatment Done",
		category_icon: <NextPlanIcon />,
		location: "treatment_done",
	},
];
