import { NextFunction, Request, Response, Router } from "express";
import AuthService from "../services/AuthService";

const participantsController = Router();

participantsController.post("/V1/login",
  async (req: Request, res: Response, next: NextFunction) => {
    await AuthService.login(req, res, next);
  }  
);

export default participantsController;
