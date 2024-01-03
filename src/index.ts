import express from "express";
import { AlunoController } from "./controllers/aluno.controller";

const app = express();
app.use(express.json());

const alunoController = new AlunoController(); 

//criar novo aluno
app.post("/aluno", alunoController.criarAluno);
app.get("/aluno/:id", alunoController.obterAluno);

//listar alunos
app.get("/aluno", alunoController.listarAlunos);

//deletar aluno
app.delete("/aluno/:id", alunoController.deletarAluno);

//atualizar aluno
app.put("/aluno/:id", alunoController.atualizarAluno);


app.listen(3008, () => {
    console.log("API está rodando!");
    
});