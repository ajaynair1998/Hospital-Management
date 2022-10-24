import { ipcMain } from 'electron';
import PatientController from '../controllers/patientController';

ipcMain.handle('patient-post', PatientController.post);
ipcMain.handle('patient-put', PatientController.put);
ipcMain.handle('patient-get', PatientController.get);
ipcMain.handle('patient-delete', PatientController.delete);

export default { ipcMain };
