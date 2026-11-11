import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { DemoComment } from '../models/comment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/demos';

  getComments(demoId: string, versionNumber: number) {
    return this.http.get<DemoComment[]>(
      `${this.baseUrl}/${demoId}/versions/${versionNumber}/comments`,
    );
  }

  addComment(demoId: string, versionNumber: number, text: string) {
    return this.http.post<DemoComment>(
      `${this.baseUrl}/${demoId}/versions/${versionNumber}/comments`,
      { text },
    );
  }
}
