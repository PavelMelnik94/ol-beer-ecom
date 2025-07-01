/**
 * Результат парсинга RGB цвета
 */
interface RgbColor {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

/**
 * Утилиты для работы с цветами
 */
export class ColorUtils {
  /**
   * Преобразует HEX цвет в RGB объект
   * @param hex - цвет в формате #ffffff или ffffff
   * @returns объект с r, g, b компонентами
   */
  static hexToRgb(hex: string): RgbColor {
    if (!this.isValidHex(hex)) {
      console.warn(`Некорректный hex цвет: ${hex}. Используется fallback.`);
      return { r: 255, g: 107, b: 53 }; // Fallback цвет
    }

    // Нормализация hex (убираем # если есть)
    const normalizedHex = hex.replace('#', '');

    // Поддержка короткого формата (#fff -> #ffffff)
    const fullHex = normalizedHex.length === 3
      ? normalizedHex.split('').map(char => char + char).join('')
      : normalizedHex;

    // Извлечение RGB компонентов
    const r = Number.parseInt(fullHex.slice(0, 2), 16);
    const g = Number.parseInt(fullHex.slice(2, 4), 16);
    const b = Number.parseInt(fullHex.slice(4, 6), 16);

    return { r, g, b };
  }

  /**
   * Преобразует HEX цвет в RGBA строку
   * @param hex - цвет в формате #ffffff
   * @param alpha - прозрачность от 0 до 1
   * @returns RGBA строка
   */
  static hexToRgba(hex: string, alpha: number = 1): string {
    const { r, g, b } = this.hexToRgb(hex);
    const clampedAlpha = Math.max(0, Math.min(1, alpha));
    return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
  }

  /**
   * Проверяет валидность HEX цвета
   * @param hex - строка для проверки
   * @returns true если валидный HEX
   */
  static isValidHex(hex: string): boolean {
    const hexRegex = /^#?(?:[A-F0-9]{6}|[A-F0-9]{3})$/i;
    return hexRegex.test(hex);
  }

  /**
   * Преобразует именованный цвет в HEX
   * @param colorName - название цвета
   * @returns HEX строка или null
   */
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

  /**
   * Автоматическое определение формата цвета и преобразование в RGB
   * @param color - цвет в любом поддерживаемом формате
   * @returns RGB объект
   */
  static parseColor(color: string): RgbColor {
    // Если HEX
    if (this.isValidHex(color)) {
      return this.hexToRgb(color);
    }

    // Если именованный цвет
    const hexColor = this.namedColorToHex(color);
    if (hexColor) {
      return this.hexToRgb(hexColor);
    }

    // Fallback
    console.warn(`Неподдерживаемый формат цвета: ${color}`);
    return { r: 255, g: 107, b: 53 };
  }
}
