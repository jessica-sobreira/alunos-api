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

            if(!disciplina || !nota) {
                return camposNaoInformados(res);
            }

            const aluno = await repository.aluno.findUnique({
                where: {
                    id
                }
            })

            if(!aluno) {
                return erroNaoEncontrado(res, "Aluno");
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
            })

        } catch(error: any) {
            return erroServidor(res, error);

        }
    }
}