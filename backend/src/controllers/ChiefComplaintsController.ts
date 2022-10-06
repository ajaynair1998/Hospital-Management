import ChiefComplaint from '../models/Chief Complaint';
import _ from 'lodash';
import { IChiefComplaint } from '../preload';
// @ts-ignore
import { Op, QueryTypes } from 'sequelize';
import { database as sequelize } from '../configs/sqlite';

interface IPost extends IChiefComplaint {}

const ChiefComplaintsController: IChiefComplaintsController = {
    async post(event, args: IPost) {
        try {
            const treatment_detail_id = args.treatmentDetailId;
            const details = args.details;
            const duration = args.duration;
            const complaint = args.complaint;

            // await Patient.create({
            // 	name: "ajay",
            // });

            // await TreatmentDetail.create({
            // 	patientId: 1,
            // });

            await ChiefComplaint.create({
                treatmentDetailId: treatment_detail_id,
                complaint: complaint,
                duration: duration,
                details: details
            });

            return {
                status: 200,
                message: `Treatment Detail ${treatment_detail_id} updated chief complaint successfully`
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
            multipleIds: number[];
        }
    ) {
        try {
            if (!args.multiple) {
                const TreatmentDetailId = args.treatmentDetailId;
                let complaints = await ChiefComplaint.findAll({
                    where: {
                        treatmentDetailId: TreatmentDetailId
                    },
                    raw: true,
                    order: [['createdAt', 'DESC']]
                });
                return {
                    status: 200,
                    data: complaints
                };
            } else if (args.multiple && args.patientId) {
                let complaints = await sequelize.query(
                    `SELECT cc.* from Patients as p INNER JOIN TreatmentDetails as td ON p.id = td.patientId INNER JOIN ChiefComplaints as cc on cc.treatmentDetailId = td.id WHERE 
					p.id = ${args.patientId} `,
                    {
                        type: QueryTypes.SELECT
                    }
                );
                return {
                    status: 200,
                    data: complaints
                };
            } else {
                return {
                    status: 500,
                    message: 'Invalid code path'
                };
            }
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    },
    async delete(event: any, args: { id: number }) {
        try {
            const chiefComplaintId = args.id;
            let deleteEntry = await ChiefComplaint.destroy({
                where: {
                    id: chiefComplaintId
                }
            });

            if (deleteEntry === 1) {
                return {
                    status: 200,
                    message: `Deleted ${chiefComplaintId} successfully`
                };
            }

            return {
                status: 500,
                message: `Chief complaint ${chiefComplaintId} doesnt exist`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface IChiefComplaintsController {
    post: (event: any, args: any) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
}

export default ChiefComplaintsController;
