import PastSurgicalHistory from "../models/Past Surgical History";
import _ from "lodash";

interface IPost extends IPastSurgicalHistory {}

const PastSurgicalHistoryController: IPastSurgicalHistoryController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const details = args.details;
			const duration = args.duration;
			const history = args.history;

			await PastSurgicalHistory.create({
				treatmentDetailId: 1,
				history: history,
				duration: duration,
				details: details,
			});

			return {
				status: 200,
				message: `Treatment Detail ${treatment_detail_id} updated Past medical History successfully`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async get(event: any, args: { treatmentDetailId: number }) {
		try {
			const TreatmentDetailId = args.treatmentDetailId;
			let histories = await PastSurgicalHistory.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
				order: [["createdAt", "DESC"]],
			});
			return {
				status: 200,
				data: histories,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const pastSurgicalHistoryId = args.id;
			let deleteEntry = await PastSurgicalHistory.destroy({
				where: {
					id: pastSurgicalHistoryId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${pastSurgicalHistoryId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Past Surgical History ${pastSurgicalHistoryId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IPastSurgicalHistoryController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default PastSurgicalHistoryController;
