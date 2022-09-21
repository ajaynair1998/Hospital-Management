import moment from "moment";
import winston from "winston";
import { format, createLogger, transports } from "winston";
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "winston custom format";

let currentTimeFormatted = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
//Using the printf format.
// @ts-ignore
const customFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

// filter out only errors
let errorFilter = winston.format((info, opts) => {
	return info.level === "error" ? info : false;
});

// filter out only info
let infoFilter = winston.format((info, opts) => {
	return info.level === "info" ? info : false;
});

// filter out only debug
let debugFilter = winston.format((info, opts) => {
	return info.level === "debug" ? info : false;
});

const logger = createLogger({
	levels: winston.config.npm.levels,

	format: combine(
		label({ label: CATEGORY }),
		timestamp({
			format: () => currentTimeFormatted,
		}),
		prettyPrint({ colorize: false })
	),
	transports: [
		new transports.Console(),
		new transports.File({
			filename: "./logs/combined.log",
		}),
		new transports.File({
			filename: "./logs/errors.log",
			level: "error",
			format: combine(
				errorFilter(),
				label({ label: CATEGORY }),
				timestamp({
					format: () => currentTimeFormatted,
				}),
				prettyPrint({ colorize: false })
			),
		}),
		new transports.File({
			filename: "./logs/debug.log",
			level: "debug",
			format: combine(
				debugFilter(),
				label({ label: CATEGORY }),
				timestamp({
					format: () => currentTimeFormatted,
				}),
				prettyPrint({ colorize: false })
			),
		}),
		new transports.File({
			filename: "./logs/info.log",
			level: "info",
			format: combine(
				infoFilter(),
				label({ label: CATEGORY }),
				timestamp({
					format: () => currentTimeFormatted,
				}),
				prettyPrint({ colorize: false })
			),
		}),
	],
});
export default logger;

// loggin levels
// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }
