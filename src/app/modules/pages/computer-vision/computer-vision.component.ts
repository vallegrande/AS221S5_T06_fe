import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-computer-vision',
  templateUrl: './computer-vision.component.html',
  styleUrls: ['./computer-vision.component.css']
})
export class ComputerVisionComponent {
  imageUrlInput: string = '';
  imageUrl: string = '';
  imageDescription: string = '';
  tags: string[] = [];
  adultScore: number = 0;
  racyScore: number = 0;
  goreScore: number = 0;
  adultContent: boolean = false;
  racyContent: boolean = false;
  goryContent: boolean = false;
  imageLoaded: boolean = false;
  loading: boolean = false;
  isBlurred: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  loadImage() {
    if (!this.imageUrlInput || !this.isValidUrl(this.imageUrlInput)) {
      this.errorMessage = "Ingrese una URL correcta";
      return;
    }

    this.loading = true;
    const requestBody = { imageUrl: this.imageUrlInput };
    this.http.post('https://silver-fiesta-gjw47xjp7v729jrx-8085.app.github.dev/computer-vision/analyze', requestBody)
      .subscribe((response: any) => {
        this.imageUrl = this.imageUrlInput;
        this.imageDescription = response.description;
        this.tags = response.tags;
        this.adultScore = response.adultScore;
        this.racyScore = response.racyScore;
        this.goreScore = response.goreScore;
        this.adultContent = response.adultContent;
        this.racyContent = response.racyContent;
        this.goryContent = response.goryContent;
        this.imageLoaded = true;
        this.loading = false;

       
        const threshold = 0.5; 
        this.isBlurred = this.adultScore > threshold || this.racyScore > threshold || this.goreScore > threshold;
      }, error => {
        console.error('Error loading image:', error);
        this.imageLoaded = false;
        this.loading = false;
      });
  }

  isValidUrl(url: string): boolean {
    
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  }
}
