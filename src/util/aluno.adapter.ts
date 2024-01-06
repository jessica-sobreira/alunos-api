import { Aluno } from "@prisma/client";
import { Aluno as AlunoModel } from "../models/aluno.model";

export function adaptAlunoPrisma(aluno: Aluno): AlunoModel {
    const novoAluno = new AlunoModel(aluno.nome, aluno.email, aluno.senha, aluno.idade ?? undefined);
    novoAluno.id = aluno.id;
    return novoAluno;

}