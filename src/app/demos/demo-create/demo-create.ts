import { Component } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoService } from '../../services/demo';
import {BandService} from '../../services/band';
import { inject } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-demo-create',
  styleUrl: './demo-create.css',
  templateUrl: './demo-create.html',
})
export class DemoCreate {

  demoService = inject(DemoService);
  bandService = inject(BandService);
  router = inject(Router);

  bands = signal<{_id: string, name: string}[]>([]);
  
  createForm = new FormGroup({
    title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    description: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    bandId: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });


  creating = signal<boolean>(false);
  createMessage = signal<string | null>(null);
  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files?.[0] ?? null;
    }
  }

  ngOnInit() {
    this.bandService.getBands().subscribe({
      next: (data) => {
        this.bands.set(data.map(band => ({ _id: band._id, name: band.name })));
      },
      error: (error: Error) => {
        console.error('Error fetching bands:', error);
        this.createMessage.set('Error fetching bands.');
      }
    });
  }

  onSubmit() {
    if (this.creating()) {
      return; // Prevent multiple submissions
    }

    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    if (!this.selectedFile) {
      this.createMessage.set('Please select an MP3 file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.createForm.get('title')?.value || '');
    formData.append('description', this.createForm.get('description')?.value || '');
    formData.append('bandId', this.createForm.get('bandId')?.value || '');
    formData.append('audio', this.selectedFile);

    this.creating.set(true);
    this.createMessage.set("Creating...");

    this.demoService.createDemo(formData).subscribe({
      next: (createdDemo ) => {
        this.creating.set(false);
        this.createMessage.set('Demo created successfully.');
        console.log('Demo created successfully:', createdDemo);
        this.router.navigate(['/demos', createdDemo.demo._id]);
      },
      error: (error: Error) => {
        this.creating.set(false);
        this.createMessage.set('Error creating demo.');
        console.error('Error creating demo:', error);
      }
    });
  } 

}
