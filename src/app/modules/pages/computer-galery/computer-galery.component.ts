import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ComputerVisionService } from '../../service/computer-vision.service';

interface Consulta {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string;
  adultScore: number;
  racyScore: number;
  goreScore: number;
  adultContent: boolean;
  racyContent: boolean;
  goryContent: boolean;
  imageLoaded: boolean;
}

@Component({
  selector: 'app-computer-galery',
  templateUrl: './computer-galery.component.html',
  styleUrls: ['./computer-galery.component.css']
})
export class ComputerGaleryComponent implements OnInit {
  consultas: Consulta[] = [];
  consultaSeleccionada: any;
  filteredConsultas: Consulta[] = [];
  searchText: string = '';
  selectedConsulta: Consulta | null = null;
  darkMode: boolean = false;
  isLoading: boolean = false;
  editing: boolean = false;
  showUnblurredImage: boolean = false;

  showAdultContent: boolean = true;
  showRacyContent: boolean = true;
  showGoryContent: boolean = true;

  Active: boolean = true;
  Actions: boolean = true;

  constructor(
    public service: ComputerVisionService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.ActiveStatus(); 
  }

  getActive(): void {
    this.service.getListA().subscribe(data => {
      this.consultas = data;
      this.applyFilters();
    });
  }

  getInactive(): void {
    this.service.getListI().subscribe(data => {
      this.consultas = data;
      this.applyFilters(); 
    });
  }

  getConsulta(): void {
    if (this.Active) {
      this.getActive();
    } else {
      this.getInactive();
    }
  }

  ActiveStatus(): void {
    this.getConsulta();
    this.Actions = this.Active;
  }

  applyFilters(): void {
    this.filteredConsultas = this.consultas.filter(consulta =>
      (this.showAdultContent || !consulta.adultContent) &&
      (this.showRacyContent || !consulta.racyContent) &&
      (this.showGoryContent || !consulta.goryContent) &&
      (this.searchText.trim() === '' || consulta.description.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  editConsulta(consulta: Consulta): void {
    this.selectedConsulta = { ...consulta };
    this.editing = true;
  }

  updateConsulta(): void {
    if (this.selectedConsulta) {
      const updatedConsulta = { ...this.selectedConsulta };
  
      const requestBody = { imageUrl: updatedConsulta.imageUrl };
  
      this.http.put(`https://silver-fiesta-gjw47xjp7v729jrx-8085.app.github.dev/computer-vision/update/${updatedConsulta.id}`, requestBody)
        .subscribe(
          (response: any) => {
            const index = this.consultas.findIndex(c => c.id === updatedConsulta.id);
            if (index !== -1) {
              this.consultas[index].imageUrl = response.imageUrl;
              this.applyFilters(); 
            }
            this.selectedConsulta = null;
            Swal.fire({
              icon: 'success',
              title: 'Actualización Exitosa',
              text: 'La imagen se ha actualizado correctamente.'
            });
          },
          error => {
            console.error('Error updating imagen:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al actualizar la imagen. Por favor, inténtalo de nuevo.'
            });
          }
        );
    }
  }
  

  deleteConsulta(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir. ¿Seguro que deseas eliminar esta imagen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar, por favor',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deactivate(id).subscribe(
            () => {
              this.consultas = this.consultas.filter(consulta => consulta.id !== id);
              this.applyFilters();
              this.cancelEdit();
              Swal.fire({
                icon: 'success',
                title: 'Eliminación Exitosa',
                text: 'La imagen se ha eliminado correctamente.'
              });
            },
            error => {
              console.error('Error deleting imagen:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al eliminar la imagen. Por favor, inténtalo de nuevo.'
              });
            }
          );
      }
    });
  }

  activateConsulta(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Seguro que deseas activar esta imagen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, activar, por favor',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.activate(id).subscribe(
            () => {
              this.consultas = this.consultas.filter(consulta => consulta.id !== id);
              this.applyFilters();
              this.cancelEdit();
              Swal.fire({
                icon: 'success',
                title: 'imagen activada con Exito',
                text: 'La imagen se ha activado correctamente.'
              });
            },
            error => {
              console.error('Error activar imagen:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al activar la imagen. Por favor, inténtalo de nuevo.'
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

  // para la vista de la imagen
  viewImage(consulta: Consulta): void {
    if (this.isBlurred(consulta)) {
      Swal.fire({
        title: 'Contenido Sensible',
        text: 'Esta imagen contiene contenido sensible. ¿Estás seguro de que deseas verla?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ver',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.showUnblurredImage = true;
          this.selectedConsulta = consulta;
        }
      });
    } else {
      this.showUnblurredImage = false;
      this.selectedConsulta = consulta;
    }
  }

  // para la vista de la imagen borrosa
  isBlurred(consulta: Consulta): boolean {
    return consulta.adultScore > 0.9 || consulta.racyScore > 0.9 || consulta.goreScore > 0.9;
  }
}
