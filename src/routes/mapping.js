import express from 'express';
import mappingInfo from '../controllers/mappingController.js';
import authenticate  from '../middleware/authmiddleware.js';


const {authenticateUser} = authenticate;

const { assignDoctor,
    getAllMappings,
    getMappingsByPatientId,
    deleteMapping } = mappingInfo;
    
const router = express.Router();

router.post('/', authenticateUser, assignDoctor);
router.get('/', authenticateUser, getAllMappings);
router.get('/:patientId', authenticateUser, getMappingsByPatientId);
router.delete('/:id', authenticateUser, deleteMapping);

export default router;
