import express from "express";
import ProfessorController from "../controllers/professorController.js";

const router = express.Router();

router.post("/professor/cadastrar", ProfessorController.createProfessor);
router.get("/professores", ProfessorController.getProfessors);

export default router;