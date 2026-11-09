import { Version } from '../models/version';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class VersionService {

    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:3000/api/demos';


    getVersion(demoId: string, versionId: string) {
        return this.http.get<Version>(`${this.baseUrl}/${demoId}/versions/${versionId}`);
    }

    getVersions(demoId: string) {
        return this.http.get<Version[]>(`${this.baseUrl}/${demoId}/versions`);
    }

   


    



}
