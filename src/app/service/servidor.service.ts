import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Servidor } from '../dominio/servidor';
import { Page } from '../dominio/page';
import { Pageable } from '../dominio/pageable';


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
                pageNumber: String(pageable ? pageable.pageNumber : 0),
                pageSize: String(pageable ? pageable.pageSize : 10),
            }
        });

        return this.http.get<Page<Servidor>>(this.URL, { params });
    }

}
