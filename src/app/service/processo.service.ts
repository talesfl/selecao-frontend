import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Page } from '../dominio/page';
import { Pageable } from '../dominio/pageable';

import { Processo } from '../dominio/processo';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../dominio/constantes';

@Injectable()
export class ProcessoService {

    private readonly URL = `/api/processos`;

    constructor(private http: HttpClient) { }

    public salvar(processo: Processo): Observable<Processo> {
        return this.http.post<Processo>(this.URL, processo);
    }

    public atualizar(processo: Processo): Observable<Processo> {
        return this.http.put<Processo>(this.URL, processo);
    }

    public findByNomeStartingWith(nome?: string, pageable?: Pageable): Observable<Page<Processo>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                nome: nome ? nome : '',
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<Processo>>(this.URL, { params });
    }

    public findById(id: number): Observable<void> {
        return this.http.get<void>(`${this.URL}/${id}`);
    }
}
