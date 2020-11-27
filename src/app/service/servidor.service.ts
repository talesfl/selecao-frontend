import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Servidor } from '../dominio/servidor';
import { Page } from '../dominio/page';
import { Pageable } from '../dominio/pageable';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../dominio/constantes';


@Injectable()
export class ServidorService {

    private readonly URL = `/api/servidores`;

    constructor(private http: HttpClient) { }

    public findById(id: number): Observable<Servidor> {
        return this.http.get<Servidor>(`${this.URL}/${id}`);
    }

    public findByNomeStartingWith(nome?: string, pageable?: Pageable): Observable<Page<Servidor>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                nome: nome ? nome : '',
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<Servidor>>(this.URL, { params });
    }

}
