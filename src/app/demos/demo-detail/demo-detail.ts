import { Component } from '@angular/core';
import { RouterLink }from '@angular/router'
import { DemoService } from '../../services/demo';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Demo } from '../../models/demo';
import { signal } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-demo-detail',
  styleUrl: './demo-detail.css',
  templateUrl: './demo-detail.html',
})
export class DemoDetail {

  demoService = inject(DemoService);
  route = inject(ActivatedRoute);

  demo = signal<Demo | null>(null);

  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  editForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    const demoId = this.route.snapshot.paramMap.get('id');
    if (demoId) {
      this.demoService.getDemo(demoId).subscribe({
        next: (data) => {
          console.log('Demo data:', data);
          this.demo.set(data);
          this.loading.set(false);
          this.editForm.patchValue({ title: data.title });
        },
        error: (error: Error) => {
          console.error('Error fetching demo:', error);
          this.errorMessage.set('Error fetching demo.');
          this.loading.set(false);
        }
      });
    } else {
      console.error('No demo ID provided in route.');
      this.errorMessage.set('No demo ID provided in route.');
      this.loading.set(false);
    }
  }

}
