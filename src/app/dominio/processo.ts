export class Processo {
    id: number;
    nome: string;
    descricao: string;
    dataCriacao: Date;
    servidorId: number;
    beneficioId: number;

    constructor(processo: Partial<Processo>) {
        Object.assign(this, processo);
    }
}