import { Beneficio } from './beneficio';
import { Servidor } from './servidor';

export class Processo {
    id: number;
    nome: string;
    descricao: string;
    dataCriacao: string;
    servidor: Servidor;
    beneficio: Beneficio;

    constructor(processo?: Partial<Processo>) {
        Object.assign(this, processo);
    }
}