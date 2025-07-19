type JSONSerializable = string | number | boolean | null | JSONSerializable[] | { [key: string]: JSONSerializable; };

export class LocalStorageApi<Key extends string = string, Value extends JSONSerializable = any> {
  private storageKey: string;

  constructor(key: Key) {
    this.storageKey = key;
  }

  set(value: Value): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.storageKey, serialized);
    }
    catch (error) {
      console.error(`Failed to set key "${this.storageKey}" in localStorage:`, error);
    }
  }

  get<T extends Value>(): T | undefined {
    try {
      const item = localStorage.getItem(this.storageKey);
      return item ? (JSON.parse(item) as T) : undefined;
    }
    catch (error) {
      console.error(`Failed to get key "${this.storageKey}" from localStorage:`, error);
      return undefined;
    }
  }

  remove(): void {
    try {
      localStorage.removeItem(this.storageKey);
    }
    catch (error) {
      console.error(`Failed to remove key "${this.storageKey}" from localStorage:`, error);
    }
  }

  has(): boolean {
    return localStorage.getItem(this.storageKey) !== null;
  }
}
