import express from "express";
import StudentController from "../controllers/studentController.js";

const router = express.Router();

router.post("/aluno/cadastrar", StudentController.createStudent);
router.get("/alunos", StudentController.getStudents);
router.put("/aluno/:id", StudentController.updateStudent);
router.delete("/aluno/:id", StudentController.deleteStudent);

export default router;