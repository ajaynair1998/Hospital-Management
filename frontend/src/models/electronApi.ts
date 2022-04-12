export interface IElectronAPI {
	notificationApi: { sendNotification: (message: string) => Promise<void> };
	favouritesApi: {
		get: (req: any) => Promise<any>;
		post: (req: any) => Promise<any>;
	};
}
