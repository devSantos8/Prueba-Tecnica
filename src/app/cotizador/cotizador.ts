import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // formulario

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cotizador.html',
  styleUrl: './cotizador.css'
})

export class Cotizador {
  // variables
  medidas: { largo: number | null; ancho: number | null; alto: number | null } = {
    largo: null,
    ancho: null,
    alto: null
  };

  // estados
  estado: 'exito' | 'error' | null = null;

  // resultados
  resultado = {
    costo: 0,
    volumen: 0,
    id: '',
    fecha: '',
    hora: ''
  };

  // limites
  readonly limiteVolumenCm3 = 2_000_000; // limite pedido
  readonly costoPorMetroCubico = 2000; // costo x metro cubico
  readonly volumenTramo = 20; // volumen del tramo

  // metodos
  calcular(): void {
    if (!this.medidas.largo || !this.medidas.ancho || !this.medidas.alto ||
      this.medidas.largo <= 0 || this.medidas.ancho <= 0 || this.medidas.alto <= 0) {
      alert('Por favor, ingresa todos los valores solicitados correctamente.');
      return;
    }

    const volumen = this.medidas.largo * this.medidas.ancho * this.medidas.alto;

    // condicionales
    if (volumen > this.limiteVolumenCm3) {
      this.estado = 'error';
    } else {
      const costoFinal = Math.ceil(volumen / this.volumenTramo) * this.costoPorMetroCubico;
      const fechaActual = new Date();

      // variables
      this.resultado = {
        costo: costoFinal,
        volumen: volumen,
        id: `PED-${Date.now()}`,
        fecha: fechaActual.toLocaleDateString('es-CL'),
        hora: fechaActual.toLocaleTimeString('es-CL')
      };
      this.estado = 'exito';
    }
  }

  reiniciar(): void {
    this.estado = null;
    this.medidas = {
      largo: null,
      ancho: null,
      alto: null
    };
  }

  // eliminar signos no correspondientes
  signosInvalidos(event: KeyboardEvent): void{
    const teclasBloqueadas = ['-','+','e'];

    if (teclasBloqueadas.includes(event.key)) {
      event.preventDefault();
    }
  }

  // limitar digitos en los campos alto, ancho y largo
  limitarDigitos(campo: 'largo' | 'ancho' | 'alto', event: Event): void {
    const maxDigitos = 4; // maximo de digitos permitidos
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    if (value.length > maxDigitos) {
      value = value.slice(0, maxDigitos);
      inputElement.value = value;
    }

    this.medidas[campo] = value ? Number(value) : null;

  }
}
