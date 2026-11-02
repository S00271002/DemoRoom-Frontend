import { Demo } from '../models/demo';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService { 

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/demos';

  getDemos() {
    return this.http.get<Demo[]>(`${this.baseUrl}`);
  }

  getDemo(id: string) {
    return this.http.get<Demo>(`${this.baseUrl}/${id}`);
  }
}
