import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoriaDocumento } from '../dominio/categoria-documento';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../dominio/constantes';
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
                pageNumber: String(pageable ? pageable.pageNumber : DEFAULT_PAGE_NUMBER),
                pageSize: String(pageable ? pageable.pageSize : DEFAULT_PAGE_SIZE),
            }
        });

        return this.http.get<Page<CategoriaDocumento>>(this.URL, { params });
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.URL}/${id}`);
    }
}
