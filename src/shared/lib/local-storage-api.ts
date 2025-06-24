type JSONSerializable = string | number | boolean | null | JSONSerializable[] | { [key: string]: JSONSerializable }

export class LocalStorageApi<Key extends string = string, Value extends JSONSerializable = any> {
  constructor(private namespace?: string) {}

  private getFullKey(key: Key): string {
    return this.namespace ? `${this.namespace}:${key}` : key
  }

  set(key: Key, value: Value): void {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(this.getFullKey(key), serialized)
    }
    catch (e) {
      console.error(`Failed to set key "${key}" in localStorage:`, e)
    }
  }

  get<T extends Value>(key: Key): T | null {
    try {
      const item = localStorage.getItem(this.getFullKey(key))
      return item ? (JSON.parse(item) as T) : null
    }
    catch (e) {
      console.error(`Failed to get key "${key}" from localStorage:`, e)
      return null
    }
  }

  remove(key: Key): void {
    try {
      localStorage.removeItem(this.getFullKey(key))
    }
    catch (e) {
      console.error(`Failed to remove key "${key}" from localStorage:`, e)
    }
  }

  has(key: Key): boolean {
    return localStorage.getItem(this.getFullKey(key)) !== null
  }

  clearAll(): void {
    if (this.namespace) {
      const prefix = `${this.namespace}:`
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i)
        if (k?.startsWith(prefix)) {
          localStorage.removeItem(k)
        }
      }
    }
    else {
      localStorage.clear()
    }
  }
}
