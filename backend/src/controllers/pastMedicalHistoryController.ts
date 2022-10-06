import PastMedicalHistory from '../models/Past Medical History';
import { IPastMedicalHistory } from '../preload';
import _ from 'lodash';
import { database as sequelize } from '../configs/sqlite';
import { QueryTypes } from 'sequelize';

interface IPost extends IPastMedicalHistory {}

const PastMedicalHistoryController: IPastMedicalHistoryController = {
    async post(event, args: IPost) {
        try {
            const treatment_detail_id = args.treatmentDetailId;
            const history = args.history;

            let historiesAsString = JSON.stringify(history);
            await PastMedicalHistory.create({
                treatmentDetailId: treatment_detail_id,
                history: historiesAsString
            });

            return {
                status: 200,
                message: `Treatment Detail ${treatment_detail_id} updated Past medical History successfully`
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
                let histories = await PastMedicalHistory.findAll({
                    where: {
                        treatmentDetailId: TreatmentDetailId
                    },
                    raw: true,
                    order: [['createdAt', 'DESC']]
                });
                let allHistoriesParsed = histories.map((item) => {
                    return {
                        ...item,
                        history: JSON.parse(item.history)
                    };
                });
                return {
                    status: 200,
                    data: allHistoriesParsed
                };
            } else if (args.multiple && args.patientId) {
                let histories = await sequelize.query(
                    `SELECT pmh.* from Patients as p INNER JOIN TreatmentDetails as td ON p.id = td.patientId INNER JOIN PastMedicalHistories as pmh on pmh.treatmentDetailId = td.id WHERE 
					p.id = ${args.patientId} `,
                    {
                        type: QueryTypes.SELECT
                    }
                );
                let allHistoriesParsed = histories.map((item: any) => {
                    return {
                        ...item,
                        history: JSON.parse(item.history)
                    };
                });
                return {
                    status: 200,
                    data: allHistoriesParsed
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
            const pastMedicalHistoryId = args.id;
            let deleteEntry = await PastMedicalHistory.destroy({
                where: {
                    id: pastMedicalHistoryId
                }
            });

            if (deleteEntry === 1) {
                return {
                    status: 200,
                    message: `Deleted ${pastMedicalHistoryId} successfully`
                };
            }

            return {
                status: 500,
                message: `Past medical history ${pastMedicalHistoryId} doesnt exist`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface IPastMedicalHistoryController {
    post: (event: any, args: any) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
}

export default PastMedicalHistoryController;
