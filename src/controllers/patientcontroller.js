import Patient from '../models/patients.js';

const addPatient = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = { ...req.body, userId };
        const patient = await Patient.create(data);
        res.status(201).json({ message: 'Patient added', patient });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(e => e.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Error adding patient', error: err.message });
    }
};

const getAllPatients = async (req, res) => {
    try {

        const userId = req.user.id; 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';


        const { count, rows: patients } = await Patient.findAndCountAll({
            where: { userId },
            attributes: ['id', 'name', 'age', 'gender', 'disease', 'city', 'phone', 'lastVisitedDate'],
            limit,
            offset,
            order: [[sortBy , sortOrder ]]
        });


        // const formatted = patients.map(p => ({
        //     id: p.id,
        //     name: p.name,
        //     age: p.age,
        //     gender: p.gender,
        //     disease: p.disease,
        //     city: p.city,
        //     phone: p.phone,
        //     lastVisitedDate: p.lastVisitedDate
        // }));

        res.status(200).json({
            totalPatients: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            patients
        });

    } catch (err) {
        res.status(500).json({ message: 'Error fetching patients', error: err.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const id = req.params.id;
        const patient = await Patient.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'age', 'gender', 'disease', 'city', 'phone', 'lastVisitedDate']
        });
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving patient', error: err.message });
    }
};

const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Ensure only the owner (creator) can update
        if (patient.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to update this patient' });
        }

        // Avoid overriding sensitive fields like userId or id
        delete req.body.id;
        delete req.body.userId;

        await patient.update(req.body);
        res.json({ message: 'Patient updated successfully', patient });

    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(e => e.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Error updating patient', error: err.message });
    }
};


const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        await patient.destroy();
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting patient', error: err.message });
    }
};


const patientInfo = {
    addPatient,
    updatePatient,
    deletePatient,
    getAllPatients,
    getPatientById
};
export default patientInfo;