import { Orgao } from './orgao';
import { Processo } from './processo';

export class MovimentacaoProcesso {
    id: number;
    dataTramitacao: Date;
    orgaoOrigem: Orgao;
    orgaoDestino: Orgao;
    usuario: number;
    processo: Processo;

    constructor(movimento?: Partial<MovimentacaoProcesso>) {
        Object.assign(this, movimento);
    }
}