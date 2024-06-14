import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Consulta {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadConsultas();
  }

  loadConsultas(): void {
    this.http.get<Consulta[]>('https://potential-space-acorn-p46r95vpqr7h7wpq-8085.app.github.dev/computer-vision/list').subscribe(data => {
      this.consultas = data;
      this.filteredConsultas = this.consultas;
    });
  }

  filterConsultas() {
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
  }

  updateConsulta(): void {
    if (this.selectedConsulta) {
      this.http.put(`https://potential-space-acorn-p46r95vpqr7h7wpq-8085.app.github.dev/computer-vision/update/${this.selectedConsulta.id}`, this.selectedConsulta)
        .subscribe(() => {
          const index = this.consultas.findIndex(c => c.id === this.selectedConsulta!.id);
          if (index !== -1) {
            this.consultas[index] = { ...this.selectedConsulta! };
            this.filteredConsultas = [...this.consultas];
          }
          this.selectedConsulta = null;
        });
    }
  }

  deleteConsulta(id: number): void {
    this.http.delete(`https://potential-space-acorn-p46r95vpqr7h7wpq-8085.app.github.dev/computer-vision/delete/${id}`).subscribe(() => {
      this.consultas = this.consultas.filter(consulta => consulta.id !== id);
      this.filteredConsultas = this.consultas;
    });
  }

  cancelEdit(): void {
    this.selectedConsulta = null;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
