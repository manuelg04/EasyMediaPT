import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'db';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {
  filterForm: FormGroup;
  publications: any[] = [];
  totalResults: number = 0;
  resultsPerPage: number = 3;
  currentPage: number = 1;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.filterForm = this.fb.group({
      date: ['']
    });
  }

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications() {
    const date = this.filterForm.get('date')?.value;
    this.apiService.getMyPublications(date).subscribe(
      (response: any) => {
        this.publications = response.data;
        this.totalResults = response.total;
        // Implementa aquí la lógica de paginación
      },
      (error: any) => {
        console.log('Error al cargar las publicaciones', error);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPublications();
  }

}
