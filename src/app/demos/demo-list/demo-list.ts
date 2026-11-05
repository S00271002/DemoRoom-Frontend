import { Component, inject } from '@angular/core';
import { DemoService } from '../../services/demo';
import { Demo } from '../../models/demo';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  imports: [RouterLink],
  selector: 'app-demo-list',
  styleUrl: './demo-list.css',
  templateUrl: './demo-list.html',
})
export class DemoList {

  demos$ = inject(DemoService).getDemos();

  demos = signal<Demo[]>([]);

  loading = signal<boolean>(true);

  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.demos$.subscribe({
      next: (data: Demo[]) => {
        this.demos.set(data);
        this.loading.set(false);
      },
      error: (error: Error) => {
        console.error('Error fetching demos:', error);
        this.errorMessage.set('Error fetching demos.');
        this.loading.set(false);
      }
    });
    
  }

}

