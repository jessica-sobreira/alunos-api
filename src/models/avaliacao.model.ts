import { randomUUID } from "crypto";
import { Aluno } from "./aluno.model";


export class Avaliacao {
    public id: string;

    constructor(public disciplina: string, public nota: number, aluno: Aluno) {
        this.id = randomUUID();
    }
}

const jessica = new Aluno("Jessica", "jessica@me.com", "123456");

const avaliacaoJessica = new Avaliacao("Programação", 10, jessica);