import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from '../dominio/documento';

@Injectable()
export class DocumentoService {

    private readonly URL = `/api/documentos`;

    constructor(private http: HttpClient) { }

    // public salvar(
    // 	multipartFile: MultipartFile,
    // 	categoriaId: number,
    // 	processoId: number): Observable<Documento> {
    // 	return this.http.post<Documento>(this.URL, {});
    // }

    // @GetMapping("{id}")
    // public ResponseEntity<Resource> findById(@PathVariable String id) {
    // 	Documento documento = service.findById(id);
    // 	return ResponseEntity.ok()
    // 			.contentType(MediaType.parseMediaType(documento.getTipo()))
    // 			.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + documento.getNome() + "\"")
    // 			.body(new ByteArrayResource(documento.getConteudo()));
    // }

    public findByProcessoIdAndCategoriaId(processoId: number, categoriaId: number): Observable<Documento[]> {
        const urlTemplate = `${this.URL}/processo/${processoId}/categoria/${categoriaId}`;
        return this.http.get<Documento[]>(urlTemplate);
    }

}
