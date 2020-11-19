export class Beneficio {
    id: number;
    nome: string;
    descricao: string;

    constructor(beneficio?: Partial<Beneficio>) {
        Object.assign(this, beneficio);
    }
}