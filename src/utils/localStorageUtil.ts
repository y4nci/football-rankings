export const setProperty = (storageKey: string, prop: string, value: any) => {
    const storage = localStorage.getItem(storageKey);

    console.log('we enterin', storageKey, prop, value, storage);

    if (storage) {
        const parsedStorage = JSON.parse(storage);

        if (!value) delete parsedStorage[prop];

        parsedStorage[prop] = value;
        localStorage.setItem(storageKey, JSON.stringify(parsedStorage));
    } else {
        localStorage.setItem(storageKey, JSON.stringify({ [prop]: value }));
    }
};

export const getProperty = (storageKey: string, prop: string) => {
    const storage = localStorage.getItem(storageKey);

    if (storage) {
        const parsedStorage = JSON.parse(storage);

        return parsedStorage[prop];
    }

    return null;
};

export const removeProperty = (storageKey: string, prop: string) => {
    setProperty(storageKey, prop, null);
};

export const removeItem = (storageKey: string) => {
    localStorage.removeItem(storageKey);
};

export const itemExists = (storageKey: string) => {
    return !!localStorage.getItem(storageKey);
};
