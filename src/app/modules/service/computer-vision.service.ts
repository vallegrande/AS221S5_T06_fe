import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerVisionService {

  private url = 'https://silver-fiesta-gjw47xjp7v729jrx-8085.app.github.dev/computer-vision'

  constructor(private http: HttpClient) { }

  analyzeImage(request: any): Observable<any> {
    return this.http.post(`${this.url}/analyze`, request);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/list`);
  }

  getListA(): Observable<any> {
    return this.http.get(`${this.url}/list/A`);
  }

  getListI(): Observable<any> {
    return this.http.get(`${this.url}/list/I`);
  }

  update(id: number, updateResponse: any): Observable<any> {
    return this.http.put(`${this.url}/update/${id}`, updateResponse);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }

  activate(id: number): Observable<any> {
    return this.http.put(`${this.url}/active/${id}`, {});
  }

  deactivate(id: number): Observable<any> {
    return this.http.put(`${this.url}/inactive/${id}`, {});
  }  

}
