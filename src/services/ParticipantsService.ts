import { Request, Response, NextFunction, Router } from "express";
import { Insert, Select } from '../database/actions';
import bcrypt from 'bcrypt';

export default class ParticipantsService {
    router = Router();

    public static async find(email: string) {
        try {
            const result: any | { error: boolean; message: string } = await Select("participants",{email});
            console.log("Result part: ", result);
            if ("error" in result) {
                console.error("Error en find:", result.message);
                return null;
            }
            return result;
        } catch (error) {
            console.error("Error al consultar BD: ",error);
            return null;
        }
    }

    public static async getParticipants(req: Request, res: Response, next: NextFunction) {
        try {
            const result: any[] | { error: boolean; message: string } = await Select("participants");
            if ("error" in result) {
                return res.status(500).json({ message: result.message });
            }
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    public static async saveParticipant(req: Request, res: Response, next: NextFunction) {
        try {
            const { full_name, email, profile, password } = req.body;

            if (!full_name || !email || !password) {
                return res.status(400).json({ message: "Nombre, correo y contraseña son requeridos" });
            }

            const password_hash = await bcrypt.hash(password, 10);
            console.log({email,password_hash})
            
            const payload = {
                full_name,
                email,
                profile: profile || null,
                password_hash
            };

            const result: any | { error: boolean; message: string } = await Insert("participants", payload);

            if (result && "error" in result) {
                return res.status(500).json({ message: result.message });
            }

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
}