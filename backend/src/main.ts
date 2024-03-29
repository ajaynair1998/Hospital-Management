import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import favourites from './routes/fovouritesRoute';
import chiefComplaintsRoute from './routes/chiefComplaintsRoute';
import clinicalDiagnosisRoute from './routes/clinicalDiagnosisRoute';
import pastMedicalHistoryRoute from './routes/pastMedicalHistoryRoute';
import pastSurgicalHistoryRoute from './routes/pastSurgicalHistoryRoute';
import generalExaminationRoute from './routes/generalExaminationRoute';
import treatmentPlanRoute from './routes/treatmentPlanRoute';
import localExaminationRoute from './routes/localExaminationRoute';
import diagnosisRoute from './routes/diagnosisRoute';
import historyOfComplaintsRoute from './routes/historyOfComplaintsRoute';
import drugAllergyRoute from './routes/drugAllergyRoute';
import followUpRoute from './routes/followUpRoute';
import investigationRoute from './routes/investigationRoute';
import treatmentDoneRoute from './routes/treatmentDoneRoute';
import patientRoute from './routes/patientRoute';
import treatmentDetailsRoute from './routes/treatmentDetailsRoute';
import medicineRoute from './routes/medicineRoute';
import prescriptionRoute from './routes/prescriptionRoute';
import debugRoute from './routes/debugRoute';

function createWindow(): void {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload'),
            contextIsolation: true
        }
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, './frontend-build/index.html')}`
    );
    if (true) {
        win.webContents.openDevTools({ mode: 'left' });
    }
}

app.whenReady().then(() => {
    createWindow();
});

// expose all routes
favourites;
chiefComplaintsRoute;
clinicalDiagnosisRoute;
pastMedicalHistoryRoute;
pastSurgicalHistoryRoute;
generalExaminationRoute;
treatmentPlanRoute;
localExaminationRoute;
diagnosisRoute;
historyOfComplaintsRoute;
drugAllergyRoute;
followUpRoute;
investigationRoute;
treatmentDoneRoute;
patientRoute;
treatmentDetailsRoute;
medicineRoute;
prescriptionRoute;
debugRoute;

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
