import { Request, Response } from "express";
import { Aluno } from "../models/aluno.model";
import repository from "../database/prisma.repository";
import { erroNaoEncontrado } from "../util/response.helper";

export class AlunoController {
    // Criar um novo aluno
    public async criarAluno(req: Request, res: Response) {
        try {
            const { nome, email, senha, idade } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).send({
                    ok: false,
                    message: "Os campos obrigatórios não foram informados",
                });
            }

            const aluno = new Aluno(nome, email, senha, idade);

            const result = await repository.aluno.create({
                data: aluno,
            });

            return res.status(201).send({
                ok: true,
                message: "Usuário criado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // Obter um aluno pelo ID
    public async obterAluno(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
            });

            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno não encontrado",
                });
            }

            return res.status(200).send({
                ok: true,
                message: "Aluno obtido com sucesso",
                data: aluno,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // PUT - atualizar um aluno
    public async atualizarAluno(req: Request, res: Response) {
        try {

            const { id } = req.params;
            const { nome, idade } = req.body;

            if (!nome && !idade) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe ao menos um campo para atualizar",
                });
            }

        //Verificar se o aluno existe
            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
            });

            if (!aluno) {
                return erroNaoEncontrado(res, "Aluno");
            }

        //Atualizar os dados do aluno
            const result = await repository.aluno.update({
                where: {
                    id,
                },
                data: {
                    nome,
                    idade,
                },
            });


            return res.status(200).send({
                ok: true,
                message: "Aluno atualizado com sucesso",
                data: result,
            });
            
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // DELETE - deletar um aluno
    public async deletarAluno(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // verificar se o aluno existe, se não 404
            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
            });

            if (!aluno) {
                return erroNaoEncontrado(res, "Aluno");
            }

        //Deletar o aluno
            await repository.aluno.delete({
                where: {
                    id,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Aluno deletado com sucesso",
            });

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async listarAlunos(req: Request, res: Response) {
        return res.status(200).send(await repository.aluno.findMany());
    }
}