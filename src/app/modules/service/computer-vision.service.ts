import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerVisionService {

  private url = 'http://localhost:8085/computer-vision'

  constructor(private http: HttpClient) { }

  analyxeImage(request: any): Observable<any> {
    return this.http.post(`${this.url}/analyze`, request);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/list`);
  }

  update(id: number, updateResponse: any): Observable<any> {
    return this.http.put(`${this.url}/update/${id}`, updateResponse);
  }  

}
