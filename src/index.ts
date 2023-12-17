import express, { Request, Response } from "express";
import { Aluno } from "./models/aluno.model";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const repository = new PrismaClient();

app.post("/aluno", async (req: Request, res: Response ) => {
    const { nome, email, senha, idade } = req.body;
    
    if(!nome || !email || !senha) {
        return res.status(400).send({
            ok: false,
            message: "Os campos obrigatórios não foram informados!"

        });
    }

    const novoAluno = new Aluno (nome, email, senha, idade);

    const result = await repository.aluno.create({
        data: novoAluno
    });

    return res.status(201).send({
        ok: true,
        message: "Aluno criado com sucesso!",
        data: result, 
    })

});

app.listen(3008, () => {
    console.log("Api está rodando!");
    
});