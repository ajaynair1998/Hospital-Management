export interface IElectronAPI {
	notificationApi: { sendNotification: (message: string) => Promise<void> };
	favouritesApi: {
		get: (req: any) => Promise<any>;
		post: (req: any) => Promise<any>;
		delete: (req: any) => Promise<any>;
	};
	ChiefComplaintsApi: {
		post: (req: any) => Promise<any>;
		get: (req: any) => Promise<any>;
		delete: (req: any) => Promise<any>;
	};
	ClinicalDiagnosisApi: {
		post: (req: any) => Promise<any>;
		get: (req: any) => Promise<any>;
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
	patientTreatmentDetailsDataStore: {
		treatment_details_id: number;
		chief_complaints: IChiefComplaint[];
		clinical_diagnosis: IClinicalDiagnosis[];
	};
	utilDataStore: {
		data: {
			inputValue: string;
			snackBarOpen: boolean;
			snackBarText: string;
		};
	};
}

export interface ICategory {
	key: number;
	category_name: string;
	category_icon: any;
	location: string;
}

export interface IChiefComplaint {
	id: number;
	duration: string;
	complaint: string;
	details: string;
	createdAt: string;
}

export interface IClinicalDiagnosis {
	id: number;
	diagnosis: string;
	details: string;
	createdAt: string;
}
