import { Request, Response, NextFunction, Router } from "express";
import { Insert, Select } from '../database/actions';
import bcrypt from 'bcryptjs';

export default class JudgesService {
    router = Router();

    public static async find(email: string) {
        console.log("Entra al fin judge: ", email)
        try {
            const result: any | { error: boolean; message: string } = await Select("judges",{email});
            console.log("Result judge: ", result);
            if ("error" in result) {
                console.error("Error en find:", result.message);
                return null;
            }
            return result;
        } catch (error) {
            return "Error al consultar BD: "+error;
        }
    }

    public static async getJudges(req: Request, res: Response, next: NextFunction) {
        try {
            const result: any[] | { error: boolean; message: string } = await Select("judges");
            if ("error" in result) {
                return res.status(500).json({ message: result.message });
            }
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    public static async saveJudge(req: Request, res: Response, next: NextFunction) {
        try {
            const { full_name, email, password } = req.body;
            
            if (!full_name || !email || !password) {
                return res.status(400).json({ message: "Nombre, correo y contraseña son requeridos" });
            }

            const password_hash = await bcrypt.hash(password,10);

            const payload = {
                full_name,
                email,
                password_hash
            };

            const result: any | { error: boolean; message: string } = await Insert("judges", payload);

            if (result && "error" in result) {
                return res.status(500).json({ message: result.message });
            }

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
}