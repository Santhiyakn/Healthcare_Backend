import {  compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;
import User from '../models/user.js';
import {tokenblacklist} from '../services/authservices.js'

const register = async (req, res) =>{
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
}

const  login =async(req, res)=> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
}



const logOut =async (req, res) => {
    try {
        
        const token = req.header('Authorization');
        if (!token) {
            return res.status(400).json({
                status: 'Error',
                message: 'Access denied',
                data:[token]
            });
        }
        const actualToken = token.split(' ')[1];
        if (tokenblacklist.has(actualToken)) {
            return res.status(402).json({
                status: 'Error',
                message: 'Token  invalidated. Please log in again.',
                data:[]
            });
        }
        tokenblacklist.add(actualToken);

        return res.status(201).json({
            status: 'success',
            message: 'Logged out successfully',
            data:[]
        });
    }
    catch (error) {
        return res.status(500)
            .json({
                status: 'Error',
                message: error.message,
                data:[]
            });
    }
}

const auth = {
  register,
  login
}

export default  auth;
