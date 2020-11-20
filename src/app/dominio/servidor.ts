import { Orgao } from './orgao';

export class Servidor {
    matricula: number;
    orgao: Orgao;
    cpf: number;
    nome: string;

    constructor(servidor?: Partial<Servidor>) {
        Object.assign(this, servidor);
    }
}

