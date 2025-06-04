import Doctor from '../models/doctors.js';

const addDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json({ message: 'Doctor added', doctor });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(e => e.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Error adding doctor', error: err.message });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
         const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';


        const { count, rows: doctors } = await Doctor.findAndCountAll({
            attributes: ['id', 'name', 'specialization', 'phone', 'email'],
            limit,
            offset,
            order: [[sortBy, sortOrder]]
        });

        res.json({
            totalDoctors: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            doctors
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching doctors', error: err.message });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'specialization', 'phone', 'email']
        });
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving doctor', error: err.message });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        await doctor.update(req.body);
        res.json({ message: 'Doctor updated', doctor });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            const errors = err.errors.map(e => e.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Error updating doctor', error: err.message });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        await doctor.destroy();
        res.json({ message: 'Doctor deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting doctor', error: err.message });
    }
};

const doctorInfo = {
addDoctor,
updateDoctor,
getAllDoctors,
getDoctorById,
deleteDoctor
};

export default doctorInfo;