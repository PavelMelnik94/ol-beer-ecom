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
    catch (error) {
      console.error(`Failed to set key "${this.storageKey}" in sessionStorage:`, error);
    }
  }

  get<T extends Value>(): T | undefined {
    try {
      const item = sessionStorage.getItem(this.storageKey);
      return item ? (JSON.parse(item) as T) : undefined;
    }
    catch (error) {
      console.error(`Failed to get key "${this.storageKey}" from sessionStorage:`, error);
      return undefined;
    }
  }

  remove(): void {
    try {
      sessionStorage.removeItem(this.storageKey);
    }
    catch (error) {
      console.error(`Failed to remove key "${this.storageKey}" from sessionStorage:`, error);
    }
  }

  has(): boolean {
    return sessionStorage.getItem(this.storageKey) !== null;
  }
}
