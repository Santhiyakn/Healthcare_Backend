import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
import User from '../models/user.js';
// import {tokenblacklist} from '../services/authservices.js'

export const authenticateUser = async(req,res,next)=>{
   try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(400).json({
                status: 'Error',
                message: 'Access denied',
                data:[]
            });
        }

        const actualToken = token.split(' ')[1];
        //if having a logout then the token should be inserted into the tokenblacklist  at the time of logout and have to be checked 
        //that the token is not logoutted token
        // if (tokenblacklist.has(actualToken)) {
        //     return res.status(402).json({
        //         status: 'Error',
        //         message: 'Token  invalid. Please log in again.',
        //         data:[]
        //     });
        // }
        const verifyToken = verify(actualToken, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id:verifyToken.id } });

        req.user = user;
        next();

    }
    catch (error) {
        return res.status(500)
            .json({
                status: 'Error',
                message: error.message
            });
    }

}