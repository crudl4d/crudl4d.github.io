import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'cutting-problem';
  bandLength: number = 0;
  elements: { [length: number]: number } = {};
  newElementLength: number = 0;
  newElementCount: number = 0;
  responseText: string | null = null;

  constructor(private http: HttpClient) {}

  addElement() {
    if (this.newElementLength > 0 && this.newElementCount > 0) {
      this.elements[this.newElementLength] = this.newElementCount;
      this.newElementLength = 0;
      this.newElementCount = 0;
    }
  }

  removeElement(length: number) {
    delete this.elements[length];
  }

  postCuttingProblem() {
    this.http.post(
      'http://localhost:8080/cutting-problem',
      {
        bandLength: this.bandLength,
        elements: this.elements
      },
      {
        responseType: 'text',
        headers: { 'Content-Type': 'application/json' }
      }
    ).subscribe({
      next: (response) => {
        this.responseText = response;
      },
      error: (error) => {
        this.responseText = 'POST request failed!';
      }
    });
  }

  getElementKeys(): number[] {
    return Object.keys(this.elements).map(Number);
  }
}
