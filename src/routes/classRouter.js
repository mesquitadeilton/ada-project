import express from "express";
import ClassController from "../controllers/classController.js";

const router = express.Router();

router.post("/turma/criar", ClassController.createClass);
router.post("/turma/adicionar_aluno", ClassController.addStudentToClass);
router.get("/turmas", ClassController.getClasses);

router.post("/turmas/aluno", ClassController.getClassesByStudent);
router.post("/turmas/professor", ClassController.getClassesByProfessor);

router.get('/turma', ClassController.getClassByCod);

export default router;