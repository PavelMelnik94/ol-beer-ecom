type JSONSerializable = string | number | boolean | null | JSONSerializable[] | { [key: string]: JSONSerializable; };

export class SessionStorageApi<Key extends string = string, Value extends JSONSerializable = any> {
  private storageKey: string;

  constructor(key: Key) {
    this.storageKey = key;
  }

  set(value: Value): void {
    try {
      const serialized = JSON.stringify(value);
      sessionStorage.setItem(this.storageKey, serialized);
    }
    catch (e) {
      console.error(`Failed to set key "${this.storageKey}" in sessionStorage:`, e);
    }
  }

  get<T extends Value>(): T | null {
    try {
      const item = sessionStorage.getItem(this.storageKey);
      return item ? (JSON.parse(item) as T) : null;
    }
    catch (e) {
      console.error(`Failed to get key "${this.storageKey}" from sessionStorage:`, e);
      return null;
    }
  }

  remove(): void {
    try {
      sessionStorage.removeItem(this.storageKey);
    }
    catch (e) {
      console.error(`Failed to remove key "${this.storageKey}" from sessionStorage:`, e);
    }
  }

  has(): boolean {
    return sessionStorage.getItem(this.storageKey) !== null;
  }
}
