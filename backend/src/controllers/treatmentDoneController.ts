import TreatmentDone from "../models/Treatment Done";
import _ from "lodash";
import { ITreatmentDone } from "../preload";

interface IPost extends ITreatmentDone {}

const TreatmentDoneController: ITreatmentDoneController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const details = args.details;
			const duration = args.duration;
			const treatment = args.treatment;

			await TreatmentDone.create({
				treatmentDetailId: treatment_detail_id,
				treatment: treatment,
				duration: duration,
				details: details,
			});

			return {
				status: 200,
				message: `Treatment Detail ${treatment_detail_id} updated treatment done successfully`,
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
			let treatments = await TreatmentDone.findAll({
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
			const treatmentDoneId = args.id;
			let deleteEntry = await TreatmentDone.destroy({
				where: {
					id: treatmentDoneId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${treatmentDoneId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Treatment Plan ${treatmentDoneId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface ITreatmentDoneController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default TreatmentDoneController;
