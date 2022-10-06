import _ from 'lodash';
import HistoryOfComplaint from '../models/History Of Complaint';
import { IHistoryOfComplaints } from '../preload';

import { database as sequelize } from '../configs/sqlite';
import { QueryTypes } from 'sequelize';

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
                details: details
            });

            return {
                status: 200,
                message: `Treatment Detail ${treatment_detail_id} updated History of complaints successfully`
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
            patientId: number;
        }
    ) {
        try {
            if (!args.multiple) {
                const TreatmentDetailId = args.treatmentDetailId;
                let allComplaints = await HistoryOfComplaint.findAll({
                    where: {
                        treatmentDetailId: TreatmentDetailId
                    },
                    raw: true,
                    order: [['createdAt', 'DESC']]
                });
                return {
                    status: 200,
                    data: allComplaints
                };
            } else if (args.multiple && args.patientId) {
                let allComplaints = await sequelize.query(
                    `SELECT hoc.* from Patients as p INNER JOIN TreatmentDetails as td ON p.id = td.patientId INNER JOIN HistoryOfComplaints as hoc on hoc.treatmentDetailId = td.id WHERE 
					p.id = ${args.patientId} `,
                    {
                        type: QueryTypes.SELECT
                    }
                );
                return {
                    status: 200,
                    data: allComplaints
                };
            } else {
                return { status: 500, message: 'Invalid code path' };
            }
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
                    id: complaintId
                }
            });

            if (deleteEntry === 1) {
                return {
                    status: 200,
                    message: `Deleted ${complaintId} successfully`
                };
            }

            return {
                status: 500,
                message: `History of complaint ${complaintId} doesnt exist`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface IHistoryOfComplaintsController {
    post: (event: any, args: any) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
}

export default historyOfComplaintsController;
