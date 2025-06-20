import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cotizador } from "./cotizador/cotizador";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Cotizador],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'prueba-angular';
}
