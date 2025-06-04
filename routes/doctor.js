import express from 'express';
import { authenticateUser } from '../middleware/authmiddleware.js';
import doctorInfo from '../controllers/doctorcontroller.js';


const {
    addDoctor,
    updateDoctor,
    getAllDoctors,
    getDoctorById,
    deleteDoctor
} = doctorInfo;

const router = express.Router();

router.post('/', authenticateUser, addDoctor);
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.put('/:id', authenticateUser, updateDoctor);
router.delete('/:id', authenticateUser, deleteDoctor);

export default router;
