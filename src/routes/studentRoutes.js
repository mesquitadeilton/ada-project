import express from "express";
import StudentController from "../controllers/studentController.js";

const router = express.Router();

router.post("/cadastrar/aluno", StudentController.createStudent);
router.get("/cadastrar/aluno", StudentController.getStudents);
router.put("/alunos/:id", StudentController.updateStudent);
router.delete("/alunos/:id", StudentController.deleteStudent);

export default router;