import TreatmentPlan from "../models/Treatment Plan";
import _ from "lodash";
import { ITreatmentPlan } from "../preload";

interface IPost extends ITreatmentPlan {}

const TreatmentPlanController: ITreatmentPlanController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const details = args.details;
			const duration = args.duration;
			const treatment = args.treatment;

			await TreatmentPlan.create({
				treatmentDetailId: 1,
				treatment: treatment,
				duration: duration,
				details: details,
			});

			return {
				status: 200,
				message: `Treatment Detail ${treatment_detail_id} updated treatment plan successfully`,
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
			let treatments = await TreatmentPlan.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
				order: [["createdAt", "DESC"]],
			});
			return {
				status: 200,
				data: treatments,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const treatmentPlanId = args.id;
			let deleteEntry = await TreatmentPlan.destroy({
				where: {
					id: treatmentPlanId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${treatmentPlanId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Treatment Plan ${treatmentPlanId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface ITreatmentPlanController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default TreatmentPlanController;
