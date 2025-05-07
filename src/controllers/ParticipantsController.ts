import { NextFunction, Request, Response, Router } from "express";
import ParticipantsService from "../services/ParticipantsService";

const participantsController = Router();

participantsController.get("/V1/data/participants",
  async (req: Request, res: Response, next: NextFunction) => {
    await ParticipantsService.getParticipants(req, res, next);
  }  
);

participantsController.post("/V1/data/participants",
  async (req: Request, res: Response, next: NextFunction) => {
    await ParticipantsService.saveParticipant(req, res, next);
  }  
);

export default participantsController;
