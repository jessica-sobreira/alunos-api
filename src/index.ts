import express from "express";
import cors from "cors";

import { AlunoController } from "./controllers/aluno.controller";
import { AvaliacaoController } from "./controllers/avaliacao.controller";
import { AuthController } from "./controllers/auth.controller";

const app = express();
app.use(express.json());
app.use(cors());

const alunoController = new AlunoController();
const avaliacaoController = new AvaliacaoController(); 
const authController = new AuthController();

//criar novo aluno
app.post("/aluno", alunoController.criarAluno);
app.get("/aluno/:id", alunoController.obterAluno);

//listar alunos
app.get("/aluno", alunoController.listarAlunos);

//deletar aluno
app.delete("/aluno/:id", alunoController.deletarAluno);

//atualizar aluno
app.put("/aluno/:id", alunoController.atualizarAluno);


//criar avaliação
app.post("/aluno/:id/avaliacao", avaliacaoController.criarAvaliacao);

//listar avaliações
app.get("/aluno/:id/avaliacao", avaliacaoController.listarAvaliacoes);

//atualizar avaliação
app.put("/aluno/:id/avaliacao/:idAvaliacao", avaliacaoController.atualizarAvaliacao);

//autenticar
app.post("/login", authController.login);


app.listen(3008, () => {
    console.log("API está rodando!");
    
});