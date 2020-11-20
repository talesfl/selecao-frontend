import { Orgao } from './orgao';
import { Processo } from './processo';

export class MovimentoProcesso {
    id: number;
    dataTramitacao: Date;
    orgaoOrigem: Orgao;
    orgaoDestino: Orgao;
    usuario: number;
    processo: Processo;

    constructor(movimento?: Partial<MovimentoProcesso>) {
        Object.assign(this, movimento);
    }
}