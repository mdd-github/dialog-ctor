
export const cloneDeep = (item) => {
    if (item === null || typeof item !== "object") {
        return item;
    } else if (item instanceof Date) {
        return new Date(item);
    } else if (Array.isArray(item)) {
        return item.map((item) => cloneDeep(item));
    } else if (item instanceof Set) {
        const set = new Set();
        item.forEach((item) => set.add(cloneDeep(item)));
        return set;
    } else if (item instanceof Map) {
        const map = new Map();
        item.forEach((value, key) => map.set(key, cloneDeep(value)));
        return map;
    } else if (item instanceof Object) {
        let obj = {};
        Object.getOwnPropertySymbols(item).forEach(
            (key) => (obj[key] = cloneDeep(item[key]))
        );
        Object.getOwnPropertyNames(item).forEach(
            (key) => (obj[key] = cloneDeep(item[key]))
        );
        return obj;
    } else {
        console.warn("deepClone: Unknown item type", item);
        return item;
    }
};