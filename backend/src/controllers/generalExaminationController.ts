import _ from "lodash";
import { IGeneralExamination } from "../preload";
import GeneralExamination from "../models/General Examination";

interface IPost extends IGeneralExamination {}

const GeneralExaminationController: IGeneralExaminationController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const bp = args.bp;
			const oxygen_saturation = args.oxygen_saturation;
			const temperature = args.temperature;

			await GeneralExamination.create({
				treatmentDetailId: 1,
				bp: bp,
				temperature: temperature,
				oxygen_saturation: oxygen_saturation,
			});

			return {
				status: 200,
				message: `General Examination ${treatment_detail_id} successfully`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async get(
		event: any,
		args: {
			treatmentDetailId: number;
			multiple: boolean;
			multipleIds: number[];
		}
	) {
		try {
			const TreatmentDetailId = args.treatmentDetailId;
			let generalExaminations = await GeneralExamination.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
				order: [["createdAt", "DESC"]],
			});
			return {
				status: 200,
				data: generalExaminations,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const generalExaminationId = args.id;
			let deleteEntry = await GeneralExamination.destroy({
				where: {
					id: generalExaminationId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${generalExaminationId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Past Surgical History ${generalExaminationId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IGeneralExaminationController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default GeneralExaminationController;
