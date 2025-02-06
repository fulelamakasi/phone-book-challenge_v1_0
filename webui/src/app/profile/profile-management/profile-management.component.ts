import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.scss'
})
export class ProfileManagementComponent implements OnInit {
  public updateMyProfileForm!: FormGroup;
  public updatePasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.updateMyProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.updatePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  updateProfile(): void {
    // throw new Error('Not implemented');
      if (this.updateMyProfileForm?.valid) {
        this.apiService.updateProfile(this.updateMyProfileForm.value.name, this.updateMyProfileForm.value.email).pipe(
          tap((success) => {
            if (success) {
              console.log('SUCCESS');
            } else {
              console.error('FAILURE', success);
            }
          }),
          catchError((error) => {
            console.error('An error occurred:', error);
            return of(null);
          })
        ).subscribe();
      }
  }

  updatePassword(): void {
    // throw new Error('Not implemented');
    if (this.updatePasswordForm?.valid) {
      this.apiService.updatePassword(this.updatePasswordForm.value.currentPassword, this.updatePasswordForm.value.newPassword, this.updatePasswordForm.value.password).pipe(
        tap((success) => {
          if (success) {
            console.log('SUCCESS');
          } else {
            console.error('FAILURE', success);
          }
        }),
        catchError((error) => {
          console.error('An error occurred:', error);
          return of(null);
        })
      ).subscribe();
    }
  }
}
