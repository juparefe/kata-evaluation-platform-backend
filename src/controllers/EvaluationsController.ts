import { NextFunction, Request, Response, Router } from "express";
import EvaluationsService from "../services/EvaluationsService";

const evaluationsController = Router();

evaluationsController.get("/V1/data/scores",
  async (req: Request, res: Response, next: NextFunction) => {
    await EvaluationsService.getEvaluations(req, res, next);
  }  
);

evaluationsController.get("/V1/data/scores/summary",
  async (req: Request, res: Response, next: NextFunction) => {
    await EvaluationsService.getEvaluationsSummary(req, res, next);
  }  
);

evaluationsController.post("/V1/data/scores",
  async (req: Request, res: Response, next: NextFunction) => {
    await EvaluationsService.saveEvaluation(req, res, next);
  }  
);

export default evaluationsController;
