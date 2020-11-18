export class Documento {
    id: string;
    nome: string;
    conteudo: Int8Array;
    tipo: string;
    dataInsercao: Date;
    categoriaId: number;
    processoId: number;

    constructor(Documento: Partial<Documento>) {
        Object.assign(this, Documento);
    }
}