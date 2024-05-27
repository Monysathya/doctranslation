import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { TranslateDto } from '../models/translate';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  translate(dto: TranslateDto) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders();
    headers.append('Authorization', `doctranslation ${token}`);
    headers.append('Content-Type', 'multipart/form-data');

    // body data
    const params = new FormData();
    params.append('file', dto.file);
    params.append('engine', dto.engine);
    params.append('is_translate_image', dto.is_translate_image.toString());
    params.append('source_language', dto.source_language);
    params.append('target_language', dto.target_language);

    return this.http.post(`${environment.apiUrl}/api/translate/`, params, { headers });
  }

  download(id: string, name: string) {
    this.http
      .get(`${environment.apiUrl}/api/translate/download/${id}`, { observe: 'response', responseType: 'blob' })
      .toPromise()
      .then((response) => this.saveToFileSystem(response, name));
  }

  private saveToFileSystem(response: any, name: string) {
    let filename = name;
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    if (contentDispositionHeader) {
      const parts: string[] = contentDispositionHeader.split(';');
      filename = parts[1].split('=')[1].replace(/^"+|"+$/gm, '');
    }

    const blob = response.body;
    saveAs(blob, filename);
  }
}
