import { Transform } from 'class-transformer';

/**
 * Decorator para normalizar CPF removendo caracteres não numéricos
 * Aceita CPF com ou sem máscara (xxx.xxx.xxx-xx ou xxxxxxxxxxx)
 */
export function NormalizeCPF() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      // Remove todos os caracteres não numéricos
      return value.replace(/[^\d]/g, '');
    }
    return value as string;
  });
}

/**
 * Decorator para formatar CPF com máscara xxx.xxx.xxx-xx
 */
export function FormatCPF() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      // Remove caracteres não numéricos primeiro
      const cpf = value.replace(/[^\d]/g, '');

      // Aplica a máscara se tiver 11 dígitos
      if (cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
    }
    return value as string;
  });
}
