/**
 * ShopEase Storage Service Abstraction
 * Abstract storage wrapper decoupling screens from underlying storage engines (AsyncStorage/MMKV/Memory).
 */

const memoryStore = new Map();

export const storageService = {
  /**
   * Retrieve item from storage
   * @param {string} key 
   * @returns {Promise<any>}
   */
  async get(key) {
    try {
      if (!key) return null;
      const data = memoryStore.get(key);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error(`storageService.get error for key "${key}":`, error);
      return null;
    }
  },

  /**
   * Save item to storage
   * @param {string} key 
   * @param {any} value 
   * @returns {Promise<boolean>}
   */
  async set(key, value) {
    try {
      if (!key) return false;
      const serialized = JSON.stringify(value);
      memoryStore.set(key, serialized);
      return true;
    } catch (error) {
      console.error(`storageService.set error for key "${key}":`, error);
      return false;
    }
  },

  /**
   * Remove item from storage
   * @param {string} key 
   * @returns {Promise<boolean>}
   */
  async remove(key) {
    try {
      if (!key) return false;
      memoryStore.delete(key);
      return true;
    } catch (error) {
      console.error(`storageService.remove error for key "${key}":`, error);
      return false;
    }
  },

  /**
   * Clear all items from storage
   * @returns {Promise<boolean>}
   */
  async clear() {
    try {
      memoryStore.clear();
      return true;
    } catch (error) {
      console.error('storageService.clear error:', error);
      return false;
    }
  },
};
