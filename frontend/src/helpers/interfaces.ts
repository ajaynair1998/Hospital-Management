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
	PastMedicalHistoryApi: {
		post: (req: any) => Promise<any>;
		get: (req: any) => Promise<any>;
		delete: (req: any) => Promise<any>;
	};
	PastSurgicalHistoryApi: {
		post: (req: any) => Promise<any>;
		get: (req: any) => Promise<any>;
		delete: (req: any) => Promise<any>;
	};
	GeneralExaminationApi: {
		post: (req: any) => Promise<any>;
		get: (req: any) => Promise<any>;
		delete: (req: any) => Promise<any>;
	};
	TreatmentPlanApi: {
		post: (req: any) => Promise<any>;
		get: (req: any) => Promise<any>;
		delete: (req: any) => Promise<any>;
	};
	LocalExaminationApi: {
		post: (req: any) => Promise<any>;
		get: (req: any) => Promise<any>;
		delete: (req: any) => Promise<any>;
	};
	DiagnosisApi: {
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
		data: { location: any; category_name: any };
	};
	favouritesDataStore: {
		data: any[];
	};
	patientTreatmentDetailsDataStore: {
		treatment_details_id: number;
		chief_complaints: IChiefComplaint[];
		clinical_diagnosis: IClinicalDiagnosis[];
		past_medical_history: IPastMedicalHistory[];
		past_surgical_history: IPastSurgicalHistory[];
		general_examination: IGeneralExamination[];
		treatment_plan: ITreatmentPlan[];
		local_examination: ILocalExamination[];
		diagnosis: IDiagnosis[];
	};
	utilDataStore: {
		data: {
			inputValue: string;
			snackBarOpen: boolean;
			snackBarText: string;
			inputDialogOpen: boolean;
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

export interface IPastMedicalHistory {
	id: number;
	duration: string;
	history: string;
	details: string;
	createdAt: string;
}

export interface IPastSurgicalHistory {
	id: number;
	duration: string;
	history: string;
	details: string;
	createdAt: string;
}

export interface IGeneralExamination {
	id: number;
	bp: string;
	temperature: string;
	oxygen_saturation: string;
	createdAt: string;
}

export interface ITreatmentPlan {
	id: number;
	duration: string;
	treatment: string;
	details: string;
	createdAt: string;
}

export interface ILocalExamination {
	id: number;
	extra_oral: string;
	intra_oral: string;
	createdAt: string;
}

export interface IDiagnosis {
	id: number;
	diagnosis: string;
	details: string;
	createdAt: string;
}
