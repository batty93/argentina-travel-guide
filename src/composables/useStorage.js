// src/composables/useStorage.js

import { ref, watch, onMounted } from 'vue';

/**
 * Syncs a reactive ref with Local Storage.
 * * @param {string} key - The key under which to store the data in Local Storage.
 * @param {*} defaultValue - The default value to use if no data is found in storage.
 * @returns {Ref} - A reactive ref that is synced with local storage.
 */
export function useStorage(key, defaultValue) {
    const storedValue = ref(defaultValue);

    // 1. Load Data on Component Mount (or app start)
    onMounted(() => {
        // Attempt to retrieve the value from Local Storage
        const value = localStorage.getItem(key);

        if (value !== null) {
            try {
                // Parse the stored JSON string back into a JavaScript object/value
                storedValue.value = JSON.parse(value);
            } catch (e) {
                console.error(`Error parsing stored data for key "${key}":`, e);
            }
        }
    });

    // 2. Persist Data When Reactive Value Changes
    watch(storedValue, (newValue) => {
        // Stringify the new value and save it to Local Storage
        localStorage.setItem(key, JSON.stringify(newValue));
    }, { deep: true }); // Use deep: true for reactive objects/arrays

    return storedValue;
}