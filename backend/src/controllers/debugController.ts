import fs from 'fs';
import path from 'path';

const DebugController: IDebugController = {
    get: async () => {
        try {
            const files2 = fs.readdirSync('./');
            return {
                status: 200,
                data: {
                    files2
                }
            };
        } catch (err) {
            console.log(err);
            return { status: 500, message: err };
        }
    }
};

interface IDebugController {
    get: () => Promise<any>;
}

export default DebugController;
