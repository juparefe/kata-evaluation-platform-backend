import { Request, Response, NextFunction, Router } from "express";
import { Insert, Select } from '../database/actions';

export default class EvaluationsService {
    router = Router();

    public static async getEvaluations(req: Request, res: Response, next: NextFunction) {
        try {
            const result: any[] | { error: boolean; message: string } = await Select("participant_results");
            if ("error" in result) {
                return res.status(500).json({ message: result.message });
            }
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    public static async getEvaluationsSummary(req: Request, res: Response, next: NextFunction) {
        try {
            const result: any[] | { error: boolean; message: string } = await Select("participant_results");
            if ("error" in result) {
                return res.status(500).json({ message: result.message });
            }

            const summary = {
                total_participants: result.length,
                approved: result.filter(r => r.status === 'Aprobado').length,
                failed: result.filter(r => r.status === 'Reprobado').length,
                top_3: result.slice(0, 3),
                generated_at: new Date().toISOString()
            };

            res.json(summary);
        } catch (error) {
            next(error);
        }
    }

    public static async saveEvaluation(req: Request, res: Response, next: NextFunction) {
        try {
            const { participant_id, judge_id, profile_score, communication_score, technical_score, extra_points } = req.body;

            if (!participant_id || !judge_id || profile_score === undefined || communication_score === undefined || technical_score === undefined) {
                return res.status(400).json({ message: "Todos los campos (participant_id, judge_id, profile_score, communication_score, technical_score) son requeridos" });
            }

            const evaluation = {
                participant_id,
                judge_id,
                profile_score,
                communication_score,
                technical_score,
                extra_points: extra_points || 0
            };

            const result: any | { error: boolean; message: string } = await Insert("scores", evaluation);

            if (result && "error" in result) {
                return res.status(500).json({ message: result.message });
            }

            res.status(201).json({ message: "Evaluación guardada correctamente", data: result });
        } catch (error) {
            next(error);
        }
    }
}