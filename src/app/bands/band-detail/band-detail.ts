import { Component } from '@angular/core';
import { BandService } from '../../services/band';
import { Band } from '../../models/band';
import { signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-band-detail',
  styleUrl: './band-detail.css',
  templateUrl: './band-detail.html',
})
export class BandDetail {

  bandService = inject(BandService);
  band = signal<Band | null>(null);
  
  loading = signal<boolean>(true)
  saving = signal<boolean>(false);

  errorMessage = signal<string | null>(null);
  saveMessage = signal<string | null>(null);

  editForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });

  saveBand() {
    if (this.saving()) {
      return; // Prevent multiple submissions
    }

    if (this.editForm.invalid) { //checks if form input is valid 
      this.editForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.saveMessage.set("Saving...");
    
    const changes = this.editForm.getRawValue(); //gets data from form

    //passes the updated chnages to updateband which updates mongodb
    this.bandService.updateBand(this.band()?._id || '', changes).subscribe({
        next: (updatedBand) => {
          this.saving.set(false);
          this.saveMessage.set('Band updated successfully.');
          console.log('Band updated successfully:', updatedBand);
          this.band.set(updatedBand);
        },
        error: (error: Error) => {
          this.saving.set(false);
          console.error('Error updating band:', error);
          this.saveMessage.set('Error updating band.');
        }
      });
  } 
}
