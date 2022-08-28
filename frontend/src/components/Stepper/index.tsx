import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { nextTick } from "process";

interface IProps {
	steps: number;
	activeStep: number;
	setStep: Function;
	handleSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
interface IPropsNextAndBackButton {
	activeStep: number;
	steps: number;
	handleNext: React.MouseEventHandler<HTMLButtonElement> | undefined;
	handleSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export default function DotsStepper(props: IProps) {
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		props.setStep(activeStep + 1);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		props.setStep(activeStep - 1);
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<MobileStepper
			variant="dots"
			steps={props.steps}
			position="static"
			activeStep={activeStep}
			sx={{ maxWidth: "90%", flexGrow: 1, mx: 2 }}
			nextButton={
				<NextAndBackButtons
					activeStep={activeStep}
					handleNext={handleNext}
					steps={props.steps}
					handleSubmit={props.handleSubmit}
				/>
			}
			backButton={
				<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
					{theme.direction === "rtl" ? (
						<KeyboardArrowRight />
					) : (
						<KeyboardArrowLeft />
					)}
					Back
				</Button>
			}
		/>
	);
}

const NextAndBackButtons = (props: IPropsNextAndBackButton) => {
	const theme = useTheme();

	if (props.activeStep === props.steps - 1) {
		return (
			<Button
				size="small"
				onClick={props.handleSubmit}
				disabled={props.activeStep === props.steps - 1}
				color="success"
			>
				Submit
			</Button>
		);
	} else {
		return (
			<Button
				size="small"
				onClick={props.handleNext}
				disabled={props.activeStep === props.steps - 1}
			>
				Next
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</Button>
		);
	}
};
