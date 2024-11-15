import express from "express";
import ProfessorController from "../controllers/professorController.js";

const router = express.Router();

router.post("/cadastrar/professor", ProfessorController.createProfessor);
router.get("/professores", ProfessorController.getProfessors);

export default router;