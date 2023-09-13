import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'db'; // Asegúrate de que esta ruta sea la correcta

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postForm: FormGroup;
  username: string;
  currentDate = new Date();

  showModalSuccess = false;
  showModalError = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.username = localStorage.getItem('username') || 'Guest';
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onShare() {
    if (this.postForm.valid) {

      this.apiService.createPost(this.postForm.value).subscribe(
        (response: any) => {

          this.showModalSuccess = true;
        },
        (error: any) => {

          this.showModalError = true;
        }
      );
    }
  }


  closeModalSuccess() {
    this.showModalSuccess = false;
  }

  closeModalError() {
    this.showModalError = false;
  }


}
