import { Component, inject, input, signal } from '@angular/core';
import { VersionService } from '../../services/version';
import type { Version } from '../../models/version';

@Component({
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

  uploading = signal(false);
  uploadError = signal<string | null>(null);

  uploadVersion(audioInput: HTMLInputElement, noteInput: HTMLTextAreaElement) {
    if (this.uploading()) return;

    const audio = audioInput.files?.[0];
    const changeNote = noteInput.value.trim();

    if (!audio || !audio.name.toLowerCase().endsWith('.mp3') || !changeNote) {
      this.uploadError.set('Choose an MP3 and enter a change note.');
      return;
    }

    this.uploading.set(true);
    this.uploadError.set(null);

    this.versionService.addVersion(this.demoId(), audio, changeNote).subscribe({
      next: (version) => {
        this.versions.update((versions) => [...versions, version]);
        audioInput.value = '';
        noteInput.value = '';
        this.uploading.set(false);
      },
      error: () => {
        this.uploadError.set('Could not upload version. Please try again.');
        this.uploading.set(false);
      },
    });
  }

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
