import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Header } from './componenets/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
  protected httpClient: HttpClient = inject(HttpClient);

  ngOnInit() {
    const url = environment.apiUrl + '/product';
    this.httpClient.get(url, { responseType: 'json' }).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);

      },
      error: (error) => {
        console.error('Error fetching data from backend:', error);
        this.title.set('Error fetching data');
      }
    }
    );
  }
}
