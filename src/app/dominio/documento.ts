import { CategoriaDocumento } from './categoria-documento';
import { Processo } from './processo';

export class Documento {
    id: string;
    nome: string;
    conteudo: File;
    tipo: string;
    dataInsercao: Date;
    categoria: CategoriaDocumento;
    processo: Processo;

    constructor(documento?: Partial<Documento>) {
        Object.assign(this, documento);
    }
}
