import { format, createLogger, transports } from "winston";
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "winston custom format";

//Using the printf format.
// @ts-ignore
const customFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
	level: "debug",
	format: combine(
		label({ label: CATEGORY }),
		timestamp({
			format: "MMM-DD-YYYY HH:mm:ss",
		}),
		prettyPrint({ colorize: false })
	),
	transports: [
		new transports.Console(),
		new transports.File({ filename: "./logs/combined.log" }),
	],
});
export default logger;
