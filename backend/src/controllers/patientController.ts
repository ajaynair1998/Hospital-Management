import _ from "lodash";
import Patient from "../models/Patient";
import { ILocalExamination } from "../preload";
interface IPost extends ILocalExamination {}

const PatientController: IPatientController = {
	async post(event, args: IPost) {
		try {
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async get(event: any, args: { treatmentDetailId: number }) {
		try {
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const PatientId = args.id;
			let deleteEntry = await Patient.destroy({
				where: {
					id: PatientId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${PatientId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Past Surgical History ${PatientId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IPatientController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default PatientController;
