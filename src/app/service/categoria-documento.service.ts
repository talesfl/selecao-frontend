import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoriaDocumento } from '../dominio/categoria-documento';
import { Page } from '../dominio/page';
import { Pageable } from '../dominio/pageable';


@Injectable()
export class CategoriaDocumentoService {

    private readonly URL = `/api/categorias`;

    constructor(private http: HttpClient) { }

    public salvar(categoriaDocumento: CategoriaDocumento): Observable<CategoriaDocumento> {
        return this.http.post<CategoriaDocumento>(this.URL, categoriaDocumento);
    }

    public atualizar(categoriaDocumento: CategoriaDocumento): Observable<CategoriaDocumento> {
        return this.http.put<CategoriaDocumento>(this.URL, categoriaDocumento);
    }

    public findByNomeStartingWith(nome?: string, pageable?: Pageable): Observable<Page<CategoriaDocumento>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                nome: nome ? nome : '',
                pageNumber: String(pageable ? pageable.pageNumber : 0),
                pageSize: String(pageable ? pageable.pageSize : 10),
            }
        });

        return this.http.get<Page<CategoriaDocumento>>(this.URL, { params });
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/${id}`);
    }
}
