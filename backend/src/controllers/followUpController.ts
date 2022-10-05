import _ from "lodash";
import FollowUp from "../models/Follow Up";
import { IFollowUp } from "../preload";
interface IPost extends IFollowUp {}

const FollowUpController: IFollowUpController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const follow_up_text = args.follow_up_text;
			const follow_up_date = args.follow_up_date;
			const purpose = args.purpose;

			await FollowUp.create({
				treatmentDetailId: treatment_detail_id,
				follow_up_date: follow_up_date,
				follow_up_text: follow_up_text,
				purpose: purpose,
			});

			return {
				status: 200,
				message: `Treatment Detail ${treatment_detail_id} updated Follow Ups successfully`,
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
			let allFollowUps = await FollowUp.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
				order: [["createdAt", "DESC"]],
			});
			return {
				status: 200,
				data: allFollowUps,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const followUpId = args.id;
			let deleteEntry = await FollowUp.destroy({
				where: {
					id: followUpId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${followUpId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Diagnosis ${followUpId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IFollowUpController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default FollowUpController;
