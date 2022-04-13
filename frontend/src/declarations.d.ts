import { IElectronAPI } from "./helpers/interfaces";
declare global {
	interface Window {
		electron: IElectronAPI;
	}
}
