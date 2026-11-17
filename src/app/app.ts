import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

const themeStorageKey = 'demoroom-theme';

@Component({
  imports: [RouterOutlet, MatToolbarModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly document = inject(DOCUMENT);
  protected readonly darkMode = signal(this.readDarkMode());

  constructor() {
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.darkMode() ? 'dark' : 'light';
    });
  }

  protected toggleDarkMode(): void {
    this.darkMode.update((enabled) => !enabled);
    try {
      this.document.defaultView?.localStorage.setItem(themeStorageKey, this.darkMode() ? 'dark' : 'light');
    } catch {
      // The theme still applies when storage is unavailable.
    }
  }

  private readDarkMode(): boolean {
    try {
      return this.document.defaultView?.localStorage.getItem(themeStorageKey) === 'dark';
    } catch {
      return false;
    }
  }
}
