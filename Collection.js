class Collection {
    /**
     * Create a new Collection instance.
     */
    constructor(items = []) {
        this.fill(items);
    }


    /**
     * Get all of the items in the collection.
     */
    all() {
        return this.items.map(item => { return item });
    }


    /**
     * Determine if an item exists in the collection.
     */
    contains(item) {
        return this.items.indexOf(item) === -1 ? false : true;
    }


    /**
     * Count the number of items in the collection.
     */
    count() {
        return this.items.length;
    }


    /**
     * Clear the collection.
     */
    clear() {
        return this.fill([]);
    }


    /**
     * Fill the collection.
     */
    fill(items) {
        this.items = items;

        return this;
    }

    
    /**
     * Filter the items by the given condition.
     */
    filter(callback) {
        return new Collection(this.items.filter(item => callback(item)));
    }


    /**
     * Get the first item from the collection.
     */
    first() {
        return this.get(0);
    }


    /**
     * Remove items from the collection by keys.
     */
    forget(keys) {
        keys = typeof keys === 'object' ? keys : [keys];

        let items = this.items;
        
        keys.forEach(key => { items.splice(key, 1) });

        return this.fill(items);
    }


    /**
     * Get an item from the collection by key.
     */
    get(key, fallback = null) {
        return this.items[key] || fallback;
    }


    /**
     * Determine if the collection has the given item.
     */
    has(key) {
        return this.items.hasOwnProperty(key);
    }


    /**
     * Determine if the collection is empty or not.
     */
    isEmpty() {
        return this.count() <= 0;
    }


    /**
     * Determine if the collection is empty or not.
     */
    isNotEmpty() {
        return ! this.isEmpty();
    }


    /**
     * Get the last item from the collection.
     */
    last() {
        return this.get(this.count() - 1);
    }


    /**
     * Get and remove the last item from the collection.
     */
    pop() {
        return this.items.pop();
    }


    /**
     * Push an item onto the beginning of the collection.
     */
    prepend(item) {
        this.items.unshift(item);

        return this;
    }


    /**
     * Push an item onto the end of the collection.
     */
    push(item) {
        this.items.push(item);

        return this;
    }


    /**
     * Get and remove an item from the collection.
     */
    pull(key) {
        return this.items.splice(key, 1);
    }


    /**
     * Reverse items order.
     */
    reverse() {
        this.items.reverse();

        return this;
    }


    /**
     * Search the collection for a given value and return the corresponding key if successful.
     */
    search(item) {
        let key;
        
        return (key = this.items.indexOf(item)) === -1 ? false : key;
    }


    /**
     * Get and remove the first item from the collection.
     */
    shift() {
        return this.items.shift();
    }


    /**
     * Toggle an item in the collection.
     */
    toggle(item) {
        if (this.contains(item)) {
            this.forget(this.search(item));
        } else {
            this.push(item);
        }

        return this;
    }


    /**
     * Return a new collection with the items.
     */
    where(key, value) {
        return new Collection(this.items).filter(item => {
            return item.hasOwnProperty(key) && item[key] == value;
        });
    }
}


export default Collection;
