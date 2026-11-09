import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VersionService } from '../../services/version';
import type { Version } from '../../models/version';
import { CommentList } from '../comment-list/comment-list';

@Component({
  imports: [RouterLink, CommentList],
  selector: 'app-demo-versions',
  styleUrl: './demo-versions.css',
  templateUrl: './demo-versions.html',
})
export class DemoVersions {
  private versionService = inject(VersionService);

  versions = signal<Version[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  demoId = input.required<string>();

  ngOnInit() {
    this.versionService.getVersions(this.demoId()).subscribe({
      next: (data) => {
        this.versions.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error fetching versions.');
        this.loading.set(false);
      },
    });
  }
}
