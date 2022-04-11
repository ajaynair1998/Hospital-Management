import { IElectronAPI } from "./models/electronApi";
declare global {
	interface Window {
		electron: IElectronAPI;
	}
}
declare module "styled-components";
