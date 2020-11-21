import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'sanitize' })
export class SanitizerPipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) { }

    transform(url: string): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
