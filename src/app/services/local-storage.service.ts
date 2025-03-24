export class StorageService<T> {
  private storageKeyPrefix: string;

  constructor(storageKeyPrefix: string) {
    this.storageKeyPrefix = storageKeyPrefix;
  }

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  public saveData<K extends keyof T>(key: K, data: T[K]): void {
    const storageKey = this.getStorageKey(key.toString()); // I think we don't need to use toString() key is already a string
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getData<K extends keyof T>(key: K): any | null { // it is not a good practice ti return any we should use :T[K] | null
    const storageKey = this.getStorageKey(key.toString());
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  }
}

export type LocalStorageState = {
  favoriteMovies: string[];
};

export const localStorageService = new StorageService<LocalStorageState>('movie-app');
