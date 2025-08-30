import AsyncStorage from '@react-native-async-storage/async-storage';

export async function store<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('store error', err);
  }
}

export async function load<T = any>(key: string, fallback: T | null = null): Promise<T | null> {
  try {
    const s = await AsyncStorage.getItem(key);
    return s ? (JSON.parse(s) as T) : fallback;
  } catch (err) {
    console.warn('load error', err);
    return fallback;
  }
}
