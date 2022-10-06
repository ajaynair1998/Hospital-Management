import _ from 'lodash';
import LocalExamination from '../models/Local Examination';
import { ILocalExamination } from '../preload';
interface IPost extends ILocalExamination {}

import { database as sequelize } from '../configs/sqlite';
import { QueryTypes } from 'sequelize';

const LocalExaminationController: ILocalExaminationController = {
    async post(event, args: IPost) {
        try {
            const treatment_detail_id = args.treatmentDetailId;
            const extraoral = args.extraoral;
            const intraoral = args.intraoral;

            await LocalExamination.create({
                treatmentDetailId: treatment_detail_id,
                extra_oral: extraoral,
                intra_oral: JSON.stringify(intraoral)
            });

            return {
                status: 200,
                message: `Local Examination ${treatment_detail_id} successfully`
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
                let LocalExaminations = await LocalExamination.findAll({
                    where: {
                        treatmentDetailId: TreatmentDetailId
                    },
                    raw: true,
                    order: [['createdAt', 'DESC']]
                });
                let LocalExaminationsParsed = LocalExaminations.map((item) => {
                    return {
                        ...item,
                        intra_oral: JSON.parse(item.intra_oral)
                    };
                });
                return {
                    status: 200,
                    data: LocalExaminationsParsed
                };
            } else if (args.multiple && args.patientId) {
                let localExaminations = await sequelize.query(
                    `SELECT le.* from Patients as p INNER JOIN TreatmentDetails as td ON p.id = td.patientId INNER JOIN LocalExaminations as le on le.treatmentDetailId = td.id WHERE 
					p.id = ${args.patientId} `,
                    {
                        type: QueryTypes.SELECT
                    }
                );
                let localExaminationsParsed = localExaminations.map(
                    (item: any) => {
                        return {
                            ...item,
                            intra_oral: JSON.parse(item.intra_oral)
                        };
                    }
                );
                return {
                    status: 200,
                    data: localExaminationsParsed
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
            const localExaminationId = args.id;
            let deleteEntry = await LocalExamination.destroy({
                where: {
                    id: localExaminationId
                }
            });

            if (deleteEntry === 1) {
                return {
                    status: 200,
                    message: `Deleted ${localExaminationId} successfully`
                };
            }

            return {
                status: 500,
                message: `Past Surgical History ${localExaminationId} doesnt exist`
            };
        } catch (err: any) {
            console.log(err);
            return { status: 500, message: err.message };
        }
    }
};

interface ILocalExaminationController {
    post: (event: any, args: any) => Promise<any>;
    get: (event: any, args: any) => Promise<any>;
    delete: (event: any, args: any) => Promise<any>;
}

export default LocalExaminationController;
