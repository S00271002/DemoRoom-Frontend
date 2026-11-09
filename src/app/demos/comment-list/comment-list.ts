import { Component, inject, input, signal } from '@angular/core';
import type { DemoComment } from '../../models/comment';
import { CommentService } from '../../services/comment';

@Component({
  selector: 'app-comment-list',
  styleUrl: './comment-list.css',
  templateUrl: './comment-list.html',
})
export class CommentList {
  private commentService = inject(CommentService);

  demoId = input.required<string>();
  versionNumber = input.required<number>();
  comments = signal<DemoComment[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.commentService.getComments(this.demoId(), this.versionNumber()).subscribe({
      next: (comments) => {
        this.comments.set(comments);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error fetching comments.');
        this.loading.set(false);
      },
    });
  }
}
