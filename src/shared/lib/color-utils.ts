
interface RgbColor {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}


export class ColorUtils {

  static hexToRgb(hex: string): RgbColor {
    if (!this.isValidHex(hex)) {
      console.warn(`Некорректный hex цвет: ${hex}. Используется fallback.`);
    }

    const normalizedHex = hex.replace('#', '');


    const fullHex = normalizedHex.length === 3
      ? normalizedHex.split('').map(char => char + char).join('')
      : normalizedHex;

    // Извлечение RGB компонентов
    const r = Number.parseInt(fullHex.slice(0, 2), 16);
    const g = Number.parseInt(fullHex.slice(2, 4), 16);
    const b = Number.parseInt(fullHex.slice(4, 6), 16);

    return { r, g, b };
  }


  static hexToRgba(hex: string, alpha = 1): string {
    const { r, g, b } = this.hexToRgb(hex);
    const clampedAlpha = Math.max(0, Math.min(1, alpha));
    return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
  }


  static isValidHex(hex: string): boolean {
    const hexRegex = /^#?(?:[A-F0-9]{6}|[A-F0-9]{3})$/i;
    return hexRegex.test(hex);
  }


  static namedColorToHex(colorName: string): string | null {
    const namedColors: Record<string, string> = {
      red: '#ff0000',
      green: '#008000',
      blue: '#0000ff',
      orange: '#ffa500',
      purple: '#800080',
      yellow: '#ffff00',
      pink: '#ffc0cb',
      gray: '#808080',
      black: '#000000',
      white: '#ffffff',
    };

    return namedColors[colorName.toLowerCase()] || null;
  }


  static parseColor(color: string): RgbColor {
    if (this.isValidHex(color)) {
      return this.hexToRgb(color);
    }

    const hexColor = this.namedColorToHex(color);
    if (hexColor) {
      return this.hexToRgb(hexColor);
    }

    return { r: 255, g: 107, b: 53 };
  }
}
