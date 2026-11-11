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

  posting = signal(false);
  postError = signal<string | null>(null);

  postComment(textarea: HTMLTextAreaElement) { //reads area inside text box
    const text = textarea.value.trim(); //extracts text

    if (!text || this.posting()) { //prevents repeated submissions
      return;
    }

    this.posting.set(true);
    this.postError.set(null);

    //adds the comment to a specific version of a specific demo
    this.commentService.addComment(this.demoId(), this.versionNumber(), text).subscribe({
      next: (comment) => {
        this.comments.update((comments) => [...comments, comment]);
        textarea.value = '';
        this.posting.set(false);
      },
      error: () => {
        this.postError.set('Could not post comment. Please try again.');
        this.posting.set(false);
      },
    });
  }

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
