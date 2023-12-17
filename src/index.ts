import express from "express";
import { AlunoController } from "./controllers/aluno.controller";

const app = express();
app.use(express.json());

const alunoController = new AlunoController(); 

app.post("/aluno", alunoController.criarAluno);

app.listen(3008, () => {
    console.log("API está rodando!");
    
});