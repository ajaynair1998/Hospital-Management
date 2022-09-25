import _ from "lodash";
import Investigation from "../models/Investigation";
import { IInvestigation } from "../preload";

interface IPost extends IInvestigation {}

const InvestigationController: IInvestigationController = {
	async post(event, args: IPost) {
		try {
			const treatment_detail_id = args.treatmentDetailId;
			const file_data = args.file_data;
			const file_name = args.file_name;
			const file_type = args.file_type;
			const file_size = args.file_size;

			if (file_size > 5000000) {
				throw new Error("File Size limit exceeded");
			}
			await Investigation.create({
				treatmentDetailId: treatment_detail_id,
				file_data: file_data,
				file_type: file_type,
				file_name: file_name,
			});

			return {
				status: 200,
				message: `Treatment Detail ${treatment_detail_id} updated investigation successfully`,
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
			let investigations = await Investigation.findAll({
				where: {
					treatmentDetailId: TreatmentDetailId,
				},
				raw: true,
				order: [["createdAt", "DESC"]],
			});

			let parsedInvestigations = investigations.map((item) => {
				return {
					...item,
					file_data: item.file_data,
				};
			});
			return {
				status: 200,
				data: parsedInvestigations,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
	async delete(event: any, args: { id: number }) {
		try {
			const investigationId = args.id;
			let deleteEntry = await Investigation.destroy({
				where: {
					id: investigationId,
				},
			});

			if (deleteEntry === 1) {
				return {
					status: 200,
					message: `Deleted ${investigationId} successfully`,
				};
			}

			return {
				status: 500,
				message: `Chief complaint ${investigationId} doesnt exist`,
			};
		} catch (err: any) {
			console.log(err);
			return { status: 500, message: err.message };
		}
	},
};

interface IInvestigationController {
	post: (event: any, args: any) => Promise<any>;
	get: (event: any, args: any) => Promise<any>;
	delete: (event: any, args: any) => Promise<any>;
}

export default InvestigationController;
