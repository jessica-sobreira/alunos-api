import { Request, Response } from "express";
import { camposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { Avaliacao } from "../models/avaliacao.model";
import { adaptAlunoPrisma } from "../util/aluno.adapter";

export class AvaliacaoController {
    public async criarAvaliacao(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { disciplina, nota } = req.body;
            const { authorization } = req.headers;

            if(!disciplina || !nota) {
                return camposNaoInformados(res);
            }

            if(!authorization) {
                return res.status(401).send({
                    ok: false,
                    message: "Token de autorização não informado",
                });
            }

            const aluno = await repository.aluno.findUnique({
                where: {
                    id
                }
            })

            if(!aluno) {
                return erroNaoEncontrado(res, "Aluno");
            }

            if(aluno.token !== authorization) {
                return res.status(401).send({
                    ok: false,
                    message: "Token de autorização inválido",
                });
            }

            //adapt do aluno(prima) para o aluno(backend)
            const alunoModel = adaptAlunoPrisma(aluno);

            const avaliacao = new Avaliacao(disciplina, nota, alunoModel);

            const result = await repository.avaliacao.create({
                data: {
                    id: avaliacao.id,
                    disciplina: avaliacao.disciplina,
                    nota: avaliacao.nota,
                    idAluno: aluno.id,
                },
            })

            return res.status(201).send({
                ok: true,
                message: "Avaliação criada com sucesso!",
                data: result,
            });

        } catch(error: any) {
            return erroServidor(res, error);

        }
    }
    
    public async listarAvaliacoes(req: Request, res: Response) {
    try {
    
        const { id } = req.params;

        const aluno = await repository.aluno.findUnique({
            where: {
                id,
            },
            include: {
                avaliacoes: true,
            },
        });

        if (!aluno) {
            return erroNaoEncontrado(res, "Aluno");
        }

        return res.status(200).send({
            ok: true,
            message: "Avaliações listadas com sucesso",
            data: aluno.avaliacoes,
        });
    } catch (error: any) {
        return erroServidor(res, error);
    }
}

//Atualizar
    public async atualizarAvaliacao(req: Request, res: Response) {
        try {
        
            const { id, idAvaliacao } = req.params;
            const { nota } = req.body;

            if (!nota) {
                return camposNaoInformados(res);
            }


        const aluno = await repository.aluno.findUnique({
            where: {
                id,
            },
        });

        if (!aluno) {
            return erroNaoEncontrado(res, "Aluno");
        }

        const avaliacao = await repository.avaliacao.findUnique({
            where: {
                id: idAvaliacao,
            },
        });

        if (!avaliacao) {
            return erroNaoEncontrado(res, "Avaliação");
        }

        //Atualizar a avaliação
        const result = await repository.avaliacao.update({
            where: {
                id: idAvaliacao,
            },
            data: {
                nota,
            },
        });

 
        return res.status(200).send({
            ok: true,
            message: "Avaliação atualizada com sucesso",
            data: result,
        });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}

