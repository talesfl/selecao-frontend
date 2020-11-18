export class Servidor {
    matricula: number;
    orgao: number;
    cpf: number;
    nome: string;

    constructor(servidor: Partial<Servidor>) {
        Object.assign(this, servidor);
    }
}

