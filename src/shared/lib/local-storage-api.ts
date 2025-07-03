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
    catch (e) {
      console.error(`Failed to set key "${this.storageKey}" in localStorage:`, e);
    }
  }

  get<T extends Value>(): T | null {
    try {
      const item = localStorage.getItem(this.storageKey);
      return item ? (JSON.parse(item) as T) : null;
    }
    catch (e) {
      console.error(`Failed to get key "${this.storageKey}" from localStorage:`, e);
      return null;
    }
  }

  remove(): void {
    try {
      localStorage.removeItem(this.storageKey);
    }
    catch (e) {
      console.error(`Failed to remove key "${this.storageKey}" from localStorage:`, e);
    }
  }

  has(): boolean {
    return localStorage.getItem(this.storageKey) !== null;
  }
}
