import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Orgao } from '../dominio/orgao';
import { Page } from '../dominio/page';
import { Pageable } from '../dominio/pageable';


@Injectable()
export class OrgaoService {

    private readonly URL = `/api/orgaos`;

    constructor(private http: HttpClient) { }

    public salvar(orgao: Orgao): Observable<Orgao> {
        return this.http.post<Orgao>(this.URL, orgao);
    }

    public atualizar(orgao: Orgao): Observable<Orgao> {
        return this.http.put<Orgao>(this.URL, orgao);
    }

    public findByNomeStartingWith(nome?: string, pageable?: Pageable): Observable<Page<Orgao>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                nome: nome ? nome : '',
                pageNumber: String(pageable ? pageable.pageNumber : 0),
                pageSize: String(pageable ? pageable.pageSize : 10),
            }
        });

        return this.http.get<Page<Orgao>>(this.URL, { params });
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/${id}`);
    }
}
