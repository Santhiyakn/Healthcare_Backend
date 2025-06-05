import express from 'express';
import authenticate from '../middleware/authmiddleware.js';
import patientInfo from '../controllers/patientcontroller.js';

const {authenticateUser} = authenticate;


const {
    addPatient,
    updatePatient,
    deletePatient,
    getAllPatients,
    getPatientById
} = patientInfo;
const router = express.Router();

router.post('/', authenticateUser, addPatient);
router.get('/', authenticateUser, getAllPatients);
router.get('/:id', authenticateUser, getPatientById);
router.put('/:id', authenticateUser, updatePatient);
router.delete('/:id', authenticateUser, deletePatient);

export default router;
