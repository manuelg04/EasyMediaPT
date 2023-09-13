import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postForm: FormGroup;
  username = 'John Doe'; // Aquí puedes poner el nombre del usuario actual
  currentDate = new Date();

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onShare() {
    console.log('Post shared:', this.postForm.value);
    // Aquí puedes añadir la lógica para compartir el post, como una llamada API
  }
}
