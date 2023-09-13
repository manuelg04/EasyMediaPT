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
  name: string;
  currentDate = new Date();

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.name = localStorage.getItem('name') || 'Guest';
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onShare() {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
      this.apiService.createPost(this.postForm.value).subscribe(
        (response: any) => {
          console.log('Post creado', response);

        },
        (error: any) => {
          console.log('Error al crear el post', error);
        }
      );
    }
  }
}
