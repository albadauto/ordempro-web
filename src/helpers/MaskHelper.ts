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

    value = value.replace(/\D/g, '');
    value = value.substring(0, 11);

    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');

    if (value.length <= 14) {
      // telefone fixo (8 dígitos)
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      // celular (9 dígitos)
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }

    return value;
  }
}
