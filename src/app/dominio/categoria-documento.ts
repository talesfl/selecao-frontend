export class CategoriaDocumento {
    id: number;
    nome: string;
    descricao: string;

    constructor(categoria: Partial<CategoriaDocumento>) {
        Object.assign(this, categoria);
    }
}