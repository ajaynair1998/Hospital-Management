import _ from 'lodash';
import { IGeneralExamination } from '../preload';
import GeneralExamination from '../models/General Examination';
import { database as sequelize } from '../configs/sqlite';
import { QueryTypes } from 'sequelize';

interface IPost extends IGeneralExamination {}

const GeneralExaminationController: IGeneralExaminationController = {
    async post(event, args: IPost) {
        try {
            const treatment_detail_id = args.treatmentDetailId;
            const bp = args.bp;
            const oxygen_saturation = args.oxygen_saturation;
            const temperature = args.temperature;
            const pulse = args.pulse;
            const respiration_rate = args.respiration_rate;

            await GeneralExamination.create({
                treatmentDetailId: treatment_detail_id,
                bp: bp,
                temperature: temperature,
                oxygen_saturation: oxygen_saturation,
                pulse: pulse,
                respiration_rate: respiration_rate
            });

            return {
                status: 200,
                message: `General Examination ${treatment_detail_id} successfully`
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
                let generalExaminations = await GeneralExamination.findAll({
                    where: {
                        treatmentDetailId: TreatmentDetailId
                    },
                    raw: true,
                    order: [['createdAt', 'DESC']]
                });
                return {
                    status: 200,
                    data: generalExaminations
                };
            } else if (args.multiple && args.patientId) {
                let generalExaminations = await sequelize.query(
                    `SELECT ge.* from Patients as p INNER JOIN TreatmentDetails as td ON p.id = td.patientId INNER JOIN GeneralExaminations as ge on ge.treatmentDetailId = td.id WHERE 
					p.id = ${args.patientId} `,
                    {
                        type: QueryTypes.SELECT
                    }
                );
                return {
                    status: 200,
                    data: generalExaminations
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
            const generalExaminationId = args.id;
            let deleteEntry = await GeneralExamination.destroy({
                where: {
                    id: generalExaminationId
                }
            });

            if (deleteEntry === 1) {
                return {
                    status: 200,
                    message: `Deleted ${generalExaminationId} successfully`
                };
            }

            return {
                status: 500,
                message: `Past Surgical History ${generalExaminationId} doesnt exist`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface IGeneralExaminationController {
    post: (event: any, args: any) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
}

export default GeneralExaminationController;
