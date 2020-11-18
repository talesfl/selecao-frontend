export class MovimentoProcesso {
    id: number;
    dataTramitacao: Date;
    orgaoOrigemId: number;
    orgaoDestinoId: number;
    usuario: number;
    processoId: number;

    constructor(movimento: Partial<MovimentoProcesso>) {
        Object.assign(this, movimento);
    }
}