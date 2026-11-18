import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  imports: [RouterLink, RouterOutlet, MatToolbarModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly document = inject(DOCUMENT);
  protected readonly darkMode = signal(true);

  //starts website in darkmode 
  constructor() {
    effect(() => {
      this.document.documentElement.dataset['theme'] = this.darkMode() ? 'dark' : 'light';
    });
  }

  protected toggleDarkMode(): void {
    this.darkMode.update((enabled) => !enabled);
  }
}
