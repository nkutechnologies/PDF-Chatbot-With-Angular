import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  getRoot() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://110.39.26.246:9090/';

  constructor(private http: HttpClient) {}

  uploadPdf(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}upload_pdf`, formData);
  }

  sendMessage(query: string): Observable<any> {
    return this.http.post(`${this.apiUrl}chatbot`, { query });
  }

}
