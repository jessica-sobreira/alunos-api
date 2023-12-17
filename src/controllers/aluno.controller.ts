import { Request, Response } from "express";
import { Aluno } from "../models/aluno.model";
import repository from "../database/prisma.repository";

export class AlunoController {
    public async criarAluno(req: Request, res: Response) {
        try {
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
        
        });
    
        } catch(error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            });

        }
    }
}
    