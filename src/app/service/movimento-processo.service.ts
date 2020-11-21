import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimentacaoProcesso } from '../dominio/movimentacao-processo';

@Injectable()
export class MovimentacaoProcessoService {

    private readonly URL = '/api/movimentacoes';

    constructor(private http: HttpClient) { }

    public salvar(movimentacaoProcesso: MovimentacaoProcesso): Observable<MovimentacaoProcesso> {
        return this.http.post<MovimentacaoProcesso>(this.URL, movimentacaoProcesso);
    }

    public findByProcessoId(processoId: number): Observable<MovimentacaoProcesso[]> {
        return this.http.get<MovimentacaoProcesso[]>(`${this.URL}/processo/${processoId}`);
    }
}
