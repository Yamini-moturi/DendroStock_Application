import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    comment: null
  };
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, comment } = this.form;

    this.authService.comment(username, email, comment).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    });
  }
}