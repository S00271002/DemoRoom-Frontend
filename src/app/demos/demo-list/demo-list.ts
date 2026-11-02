import { Component, inject } from '@angular/core';
import { DemoService } from '../../services/demo';


@Component({
  imports: [],
  selector: 'app-demo-list',
  styleUrl: './demo-list.css',
  templateUrl: './demo-list.html',
})
export class DemoList {

  demos$ = inject(DemoService).getDemos();

  ngOnInit() {
    this.demos$.subscribe({
      next: (data) => {
        console.log('Demos fetched successfully:', data);
      },
      error: (error) => {
        console.error('Error fetching demos:', error);
      }
    });
    
  }

}

