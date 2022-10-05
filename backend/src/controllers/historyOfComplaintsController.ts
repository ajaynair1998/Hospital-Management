import _ from "lodash";
import HistoryOfComplaint from "../models/History Of Complaint";
import { IHistoryOfComplaints } from "../preload";

interface IPost extends IHistoryOfComplaints {}

const historyOfComplaintsController: IHistoryOfComplaintsController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const complaint = args.complaint;
			const details = args.details;

			await HistoryOfComplaint.create({
				treatmentDetailId: treatment_detail_id,
				complaint: complaint,
				details: details,
			});

			return {
				status: 200,
				message: `Treatment Detail ${treatment_detail_id} updated History of complaints successfully`,
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
			let allComplaints = await HistoryOfComplaint.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
				order: [["createdAt", "DESC"]],
			});
			return {
				status: 200,
				data: allComplaints,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const complaintId = args.id;
			let deleteEntry = await HistoryOfComplaint.destroy({
				where: {
					id: complaintId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${complaintId} successfully`,
				};
			}

			return {
				status: 500,
				message: `History of complaint ${complaintId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IHistoryOfComplaintsController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default historyOfComplaintsController;
