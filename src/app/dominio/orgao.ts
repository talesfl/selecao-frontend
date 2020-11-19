export class Orgao {
    id: number;
    nome: string;
    descricao: string;

    constructor(orgao?: Partial<Orgao>) {
        Object.assign(this, orgao);
    }
}