import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from '../dominio/documento';

@Injectable()
export class DocumentoService {

    private readonly URL = `/api/documentos`;

    constructor(private http: HttpClient) { }

    public salvar(
        multipartFile: File,
        categoriaId: number,
        processoId: number): Observable<Documento> {

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        const formData = new FormData();
        formData.append('multipartFile', multipartFile, multipartFile.name);
        formData.append('categoriaId', String(categoriaId));
        formData.append('processoId', String(processoId));

        return this.http.post<Documento>(this.URL, formData, { headers });
    }

    public findByProcessoIdAndCategoriaId(processoId: number, categoriaId: number): Observable<Documento[]> {
        const urlTemplate = `${this.URL}/processo/${processoId}/categoria/${categoriaId}`;
        return this.http.get<Documento[]>(urlTemplate);
    }


    public findById(id: string): Observable<any> {
        return this.http.get<any>(`${this.URL}/${id}`);
    }

}
