import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeContent',
  standalone: true
})
export class SafeContentPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(content: string, type: 'html' | 'resourceUrl' | 'url' | 'style' | 'script') {
    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(content)
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(content)
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(content)
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(content)
      case 'script': return this.sanitizer.bypassSecurityTrustScript(content)
      default: return content;
    }
  }
}
