import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaskHelper {
  maskCNPJ(value: string): string {
    if (!value) return '';

    value = value.replace(/\D/g, ''); // remove tudo que não é número
    value = value.substring(0, 14); // limita tamanho

    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');

    return value;
  }

  maskPhone(value: string): string {
    if (!value) return '';

    let numbers = value.replace(/\D/g, '');

    numbers = numbers.substring(0, 11);

    if (numbers.length > 2) {
      numbers = numbers.replace(/^(\d{2})(\d+)/, '($1) $2');
    }

    if (numbers.replace(/\D/g, '').length === 11) {
      numbers = numbers.replace(/(\d{5})(\d{4})$/, '$1-$2');
    }
    else if (numbers.replace(/\D/g, '').length === 10) {
      numbers = numbers.replace(/(\d{4})(\d{4})$/, '$1-$2');
    }

    return numbers;
  }
}
