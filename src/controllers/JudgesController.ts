import { NextFunction, Request, Response, Router } from "express";
import JudgesService from "../services/JudgesService";

const judgesController = Router();

judgesController.get("/V1/data/judges",
  async (req: Request, res: Response, next: NextFunction) => {
    await JudgesService.getJudges(req, res, next);
  }  
);

judgesController.post("/V1/data/judges",
  async (req: Request, res: Response, next: NextFunction) => {
    await JudgesService.saveJudge(req, res, next);
  }  
);

export default judgesController;
