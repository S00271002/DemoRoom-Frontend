import { Component } from '@angular/core';
import { RouterLink, Router }from '@angular/router'
import { DemoService } from '../../services/demo';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { Demo } from '../../models/demo';
import { signal } from '@angular/core';
import { DemoVersions } from '../demo-versions/demo-versions';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [RouterLink, ReactiveFormsModule, DemoVersions],
  selector: 'app-demo-detail',
  styleUrl: './demo-detail.css',
  templateUrl: './demo-detail.html',
})
export class DemoDetail {

  demoService = inject(DemoService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  demo = signal<Demo | null>(null);

  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  saving = signal<boolean>(false);

  saveMessage = signal<string | null>(null);

  saveDemo() {
    if (this.saving()) {
      return; // Prevent multiple submissions
    }

    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);

    this.saveMessage.set("Saving...");
    
    const changes = this.editForm.getRawValue();

    //updates demo with new data
    this.demoService.updateDemo(this.demo()?._id || '', changes).subscribe({
        next: (updatedDemo) => {
          this.saving.set(false);
          this.saveMessage.set('Demo updated successfully.');
          console.log('Demo updated successfully:', updatedDemo);
          this.demo.set(updatedDemo);
        },
        error: (error: Error) => {
          this.saving.set(false);
          this.saveMessage.set('Error updating demo.');
          console.error('Error updating demo:', error);
          
        }
      });
  }

  deleteDemo() {
    if (this.saving()) {
      return; // Prevent multiple submissions
    }

    this.saving.set(true);
    this.saveMessage.set("Deleting...");

    const demoId = this.demo()?._id; //finds demo by Id
    if (!demoId) {
      console.error('No demo ID available for deletion.');
      this.saving.set(false);
      this.saveMessage.set('No demo ID available for deletion.');
      return;
    }

    this.demoService.deleteDemo(demoId).subscribe({
      next: () => {
        this.saving.set(false);
        this.saveMessage.set('Demo deleted successfully.');
        console.log('Demo deleted successfully');
        //moves back to demo screen after deletion
        this.demo.set(null);
        this.editForm.reset();
        this.router.navigate(['/']); 
      },
      error: (error: Error) => {
        this.saving.set(false);
        this.saveMessage.set('Error deleting demo.');
        console.error('Error deleting demo:', error);
      }
    });
  }

  editForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
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
          this.editForm.patchValue({ title: data.title, description: data.description });
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
