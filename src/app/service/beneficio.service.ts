import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Beneficio } from '../dominio/beneficio';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../dominio/constantes';
import { Page } from '../dominio/page';
import { Pageable } from '../dominio/pageable';


@Injectable()
export class BeneficioService {

    private readonly URL = `/api/beneficios`;

    constructor(private http: HttpClient) { }

    public salvar(beneficio: Beneficio): Observable<Beneficio> {
        return this.http.post<Beneficio>(this.URL, beneficio);
    }

    public atualizar(beneficio: Beneficio): Observable<Beneficio> {
        return this.http.put<Beneficio>(this.URL, beneficio);
    }

    public findByNomeStartingWith(nome?: string, pageable?: Pageable): Observable<Page<Beneficio>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                nome: nome ? nome : '',
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<Beneficio>>(this.URL, { params });
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/${id}`);
    }
}
