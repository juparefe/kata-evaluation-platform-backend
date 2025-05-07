import { Request, Response, NextFunction, Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ParticipantsService from "./ParticipantsService";
import JudgesService from "./JudgesService";

export default class AuthService {
    router = Router();

    public static async login(req: Request, res: Response, next: NextFunction) {
        console.log("Request: ", req.body)
        try {
            const { email, password } = req.body;
      
            if (!email || !password) {
              return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
            }

            let user = await ParticipantsService.find(email);
            let role = 'participant';

            if (!user || user.length === 0) {
                user = await JudgesService.find(email);
                role = 'judge';
            }

            console.log("User: ", user)
            
            if (!user?.length) {
                return res.status(401).json({ message: 'No se encuentra el correo' });
            } else {
                user = user[0];
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                {
                  id: user.id,
                  full_name: user.full_name,
                  role
                },
                process.env.JWT_SECRET || 'supersecret',
                { expiresIn: '1d' }
            );

            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                user: {
                  id: user.id,
                  full_name: user.full_name,
                  email: user.email
                },
                role,
                token
            });
        } catch (error) {
            next(error);
        }
    }
}