import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'db';

@Component({
  selector: 'app-all-publications',
  templateUrl: './all-publications.component.html',
  styleUrls: ['./all-publications.component.css']
})


  export class AllPublicationsComponent implements OnInit {
    filterForm: FormGroup;
    publications: any[] = [];
    totalResults: number = 0;
    resultsPerPage: number = 3;
    currentPage: number = 1;
    totalPages: number = 0;

    constructor(private fb: FormBuilder, private apiService: ApiService) {
      this.filterForm = this.fb.group({
        date: [''],
        keyword: ['']
      });
    }

    ngOnInit(): void {
      // Escuchar cambios en el campo de fecha
      this.filterForm.get('date')?.valueChanges.subscribe(date => {
        this.loadPublications();
      });

      // Escuchar cambios en el campo de palabra clave
      this.filterForm.get('keyword')?.valueChanges.subscribe(keyword => {
        this.loadPublications();
      });

      // Carga inicial de publicaciones
      this.loadPublications();
    }

    loadPublications() {
      const date = this.filterForm.get('date')?.value;
      const keyword = this.filterForm.get('keyword')?.value;

      this.apiService.getAllPublications(date, keyword).subscribe(
        (response: any) => {
          console.log("🚀 ~ response:", response);

          if (Array.isArray(response)) {
            this.publications = response;
            // resto del código para manejar la respuesta...
          } else {
            console.log("La API no devolvió un array.");
          }

          // Actualizar la información de paginación
          this.totalResults = this.publications.length;
          this.totalPages = Math.ceil(this.totalResults / this.resultsPerPage);

          if (!date && !keyword) {
            this.publications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          }
        },
        (error: any) => {
          console.log('Error al cargar las publicaciones', error);
        }
      );
    }



    // ... (otros métodos como paginación, etc.)
  }


