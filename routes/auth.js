import { Router } from 'express';
const router = Router();
import auth from '../controllers/authcontroller.js';
const { register, login } = auth;
router.post('/register', register);
router.post('/login', login);

export default router;
