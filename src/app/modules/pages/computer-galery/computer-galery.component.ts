import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Consulta {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string; // Cambiado a string
}
@Component({
  selector: 'app-computer-galery',
  templateUrl: './computer-galery.component.html',
  styleUrls: ['./computer-galery.component.css']
})
export class ComputerGaleryComponent implements OnInit {
  consultas: Consulta[] = [];
  filteredConsultas: Consulta[] = [];
  searchText: string = '';
  selectedConsulta: Consulta | null = null;
  darkMode: boolean = false;
  isLoading: boolean = false;
  editing: boolean = false; // Controla el estado de edición del formulario


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadConsultas();
  }

  loadConsultas(): void {
    this.isLoading = true;
    this.http.get<Consulta[]>('https://didactic-tribble-9rx9577wgvjc7xq6-8085.app.github.dev/computer-vision/list')
      .subscribe(
        data => {
          this.consultas = data;
          this.filteredConsultas = this.consultas;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching data:', error);
          this.isLoading = false;
        }
      );
  }

  filterConsultas(): void {
    if (this.searchText) {
      this.filteredConsultas = this.consultas.filter(consulta =>
        consulta.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredConsultas = this.consultas;
    }
  }

  editConsulta(consulta: Consulta): void {
    this.selectedConsulta = { ...consulta };
    this.editing = true; // Abrir el formulario de edición
  }

  updateConsulta(): void {
    if (this.selectedConsulta) {
      const updatedConsulta = { ...this.selectedConsulta };

      this.http.put(`https://didactic-tribble-9rx9577wgvjc7xq6-8085.app.github.dev/computer-vision/update/${updatedConsulta.id}`, {
        description: updatedConsulta.description
      }).subscribe(
        () => {
          const index = this.consultas.findIndex(c => c.id === updatedConsulta.id);
          if (index !== -1) {
            this.consultas[index].description = updatedConsulta.description;
            this.filteredConsultas = [...this.consultas];
          }
          this.selectedConsulta = null;
          Swal.fire({
            icon: 'success',
            title: 'Actualización Exitosa',
            text: 'La consulta se ha actualizado correctamente.'
          });
        },
        error => {
          console.error('Error updating consulta:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar la consulta. Por favor, inténtalo de nuevo.'
          });
        }
      );
    }
  }

  deleteConsulta(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir. ¿Seguro que deseas eliminar esta consulta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`https://didactic-tribble-9rx9577wgvjc7xq6-8085.app.github.dev/computer-vision/delete/${id}`)
          .subscribe(
            () => {
              this.consultas = this.consultas.filter(consulta => consulta.id !== id);
              this.filteredConsultas = this.consultas;
              this.cancelEdit();
              Swal.fire({
                icon: 'success',
                title: 'Eliminación Exitosa',
                text: 'La consulta se ha eliminado correctamente.'
              });
            },
            error => {
              console.error('Error deleting consulta:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al eliminar la consulta. Por favor, inténtalo de nuevo.'
              });
            }
          );
      }
    });
  }

  cancelEdit(): void {
    this.selectedConsulta = null;
    this.editing = false;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  viewDetails(consulta: Consulta): void {
    if (this.selectedConsulta === consulta) {
      this.selectedConsulta = null;
    } else {
      this.selectedConsulta = consulta;
    }
  }
}