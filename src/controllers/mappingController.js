import db from '../models/index.js';
const { Doctor, Patient, PatientDoctorMapping } = db;

const assignDoctor = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;


        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: `Patient with ID ${patientId} not found` });
        }


        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: `Doctor with ID ${doctorId} not found` });
        }

        const exists = await PatientDoctorMapping.findOne({ where: { patientId, doctorId } });
        if (exists) {
            return res.status(400).json({ message: 'This doctor is already assigned to the patient.' });
        }


        const mapping = await PatientDoctorMapping.create({ patientId, doctorId });
        res.status(201).json({ message: 'Doctor assigned to patient successfully', mapping });

    } catch (err) {
        res.status(500).json({ message: 'Error assigning doctor to patient', error: err.message });
    }
};

const getAllMappings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        const { count, rows: mappings } = await PatientDoctorMapping.findAndCountAll({
            include: [
                { model: Patient, attributes: ['id', 'name'] },
                { model: Doctor, attributes: ['id', 'name', 'specialization'] }
            ],
            limit,
            offset,
            order: [[sortBy, sortOrder]]
        });

        res.status(200).json({
            totalMappings: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            mappings
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching mappings', error: err.message });
    }
};

const getMappingsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: `Patient with ID ${patientId} not found` });
        }

        const mappings = await PatientDoctorMapping.findAll({
            where: { patientId },
            include: [
                { model: Doctor, attributes: ['id', 'name', 'specialization'] }
            ]
        });

        res.json(mappings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching mappings', error: err.message });
    }
};

const deleteMapping = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await PatientDoctorMapping.destroy({ where: { id } });

        if (deleted) {
            res.json({ message: 'Mapping deleted successfully' });
        } else {
            res.status(404).json({ message: 'Mapping not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting mapping', error: err.message });
    }
};

const mappingInfo = {
    assignDoctor,
    getAllMappings,
    getMappingsByPatientId,
    deleteMapping
}

export default mappingInfo;