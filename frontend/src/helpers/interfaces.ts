export interface IElectronAPI {
	notificationApi: { sendNotification: (message: string) => Promise<void> };
	favouritesApi: {
		get: (req: any) => Promise<any>;
		post: (req: any) => Promise<any>;
		delete: (req: any) => Promise<any>;
	};
}

export interface IStore {
	userDataStore: {
		data: any;
	};
	categoriesStore: {
		data: any;
	};
	favouritesDataStore: {
		data: any;
	};
}

export interface ICategory {
	key: number;
	category_name: string;
	category_icon: any;
	location: string;
}
