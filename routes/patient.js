import express from 'express';
import  {authenticateUser}  from '../middleware/authmiddleware.js';
import patientInfo from '../controllers/patientcontroller.js';

const {
    addPatient,
    updatePatient,
    deletePatient,
    getAllPatients,
    getPatientById
} = patientInfo;
const router = express.Router();

router.post('/', authenticateUser, addPatient);
router.get('/:id', authenticateUser, getPatientById);
router.get('/', authenticateUser, getAllPatients);
router.put('/:id', authenticateUser, updatePatient);
router.delete('/:id', authenticateUser, deletePatient);

export default router;
