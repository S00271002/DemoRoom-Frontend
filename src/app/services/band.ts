import { Band } from '../models/band';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BandService {

    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:3000/api/bands'; //address of backend

    getBands() {
        return this.http.get<Band[]>(`${this.baseUrl}`);
      }
    
      updateBand(id: string, changes: Partial<Band>) {
        return this.http.patch<Band>(`${this.baseUrl}/${id}`, changes);
      }
    
      deleteBand(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`);
      }
    
     createBand(id: string, band: FormData) {
      return this.http.post<{ band: Band }>(this.baseUrl, band);
      }
}
