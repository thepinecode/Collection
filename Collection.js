class Collection
{
    /**
     * Create a new Collection instance.
     */
    constructor(items = [])
    {
        this.items = items;
    }

    /**
     * Get all of the items in the collection.
     */
    all()
    {
        return this.items;
    }

    /**
     * Get all of the items in the collection.
     */
    avg(key = null)
    {
        return this.sum(key) / this.count();
    }

    /**
     * Split the collection to groups by the given size.
     */
    chunk(size)
    {
        let sets = [], chunks, i = 0, items = this.items;
        chunks = this.count() / size;

        while(i < chunks){
            sets[i] = items.splice(0, size);
            i++;
        }

        return new this.constructor(sets);
    }

    /**
     * Clear the collection.
     */
    clear()
    {
        this.items = [];

        return this;
    }

    /**
     * Clone the collection.
     */
    clone()
    {
        return new this.constructor(this.items);
    }

    /**
     * Determines if the key / value pair exists.
     */
    contains(key, value = null)
    {
        if (value && this.items.hasOwnProperty(key)) {
            return JSON.stringify(this.items[key]) === JSON.stringify(value);
        }
        for (let i in this.items) {
            if (JSON.stringify(key) === JSON.stringify(this.items[i])) return true;
        }

        return false;
    }

    /**
     * Count the number of items in the collection.
     */
    count()
    {
        return this.items.length;
    }

    /**
     * Search the difference between the given items and the collection items.
     */
    diff(items)
    {
        return new this.constructor(this.items.filter((item, key) => items.indexOf(item) < 0));
    }

    /**
     * Iterate over the collection items.
     */
    each(callback)
    {
        for (let i in this.items) {
            if (callback(this.items[i], i) === false) {
                return false;
            }
        }
    }

    /**
     * Determine if every item pass a given truth test.
     */
    every(callback)
    {
        return this.items.every(callback);
    }

    /**
     * Remove the given keys from the items.
     */
    except(keys)
    {
        keys = Array.isArray(keys) ? keys : [keys];

        return this.map(item => {
            keys.forEach(key => {
                if (item.hasOwnProperty(key)) delete item[key];
            });

            return item;
        });
    }

    /**
     * Fill the collection.
     */
    fill(items)
    {
        this.items = items;

        return this;
    }

    /**
     * Filter trough the collection items.
     */
    filter(callback = null)
    {
        if (! callback) return new this.constructor(this.items.filter(item => item));

        return new this.constructor(this.items.filter((item, key) => callback(item, key)));
    }

    /**
     * Get the first item from the collection.
     */
    first()
    {
        return this.items[0] || null;
    }

    /**
     * Remove items from the collection by keys.
     */
    forget(key)
    {
        key = Array.isArray(key) ? key : [key];

        key.forEach(key => this.items.splice(key, 1));

        return this;
    }

    /**
     * Get an item from the collection by key.
     */
    get(key, value = null)
    {
        if (typeof value === 'function') value = value();

        return this._extract(key, this.items, value)
    }

    /**
     * Determine if the collection has item by the given key.
     */
    has(key)
    {
        return this.items.hasOwnProperty(key);
    }

    /**
     * Implode the collection by the given glue.
     */
    implode(key, glue = null)
    {
        if (! glue) return this.items.join(key);

        return this.items.map(item => this._extract(key, item)).join(glue);
    }

    /**
     * Determine if the collection is empty.
     */
    isEmpty()
    {
        return this.count() < 1;
    }

    /**
     * Determine if the collection is not empty.
     */
    isNotEmpty()
    {
        return ! this.isEmpty();
    }

    /**
     * Get the keys of the collection.
     */
    keys()
    {
        return Object.keys(this.items);
    }

    /**
     * Get the last element in the collection.
     */
    last()
    {
        return this.items[this.count() - 1];
    }

    /**
     * Map trought the items.
     */
    map(callback)
    {
        return new this.constructor(this.items.map((item, index) => callback(item, index)));
    }

    /**
     * Get the max value by the given key.
     */
    max(key = null)
    {
        if (! key) return Math.max(...this.items);

        return this.pluck(key).max();
    }

    /**
     * Merge the items to the collection.
     */
    merge(items)
    {
        return new this.constructor(this.items.concat(items));
    }

    /**
     * Get the min value by the given key.
     */
    min(key = null)
    {
        if (! key) return Math.min(...this.items);

        return this.pluck(key).min();
    }

    /**
     * Get the nt-h element in the collection.
     */
    nth(n)
    {
        return this.items[n--];
    }

    /**
     * Leave only the given keys in the collection items.
     */
    only(keys)
    {
        keys = Array.isArray(keys) ? keys : [keys];

        return this.map(item => {
            Object.keys(item).forEach(key => {
                if (! keys.includes(key)) delete item[key];
            });

            return item;
        });
    }

    /**
     * Pluck the values by the given keys.
     */
    pluck(key)
    {
        return new this.constructor(
            this.items.map(item => this._extract(key, item))
                .filter(item => item)
        );
    }

    /**
     * Get and remove the last item from the collection.
     */
    pop()
    {
        return this.items.pop();
    }

    /**
     * Push an item onto the beginning of the collection.
     */
    prepend(item)
    {
        this.items.unshift(item);

        return this;
    }

    /**
     * Get and remove an item from the collection.
     */
    pull(key)
    {
        return this.items.splice(key, 1);
    }

    /**
     * Push an item onto the end of the collection.
     */
    push(item)
    {
        this.items.push(item);

        return this;
    }

    /**
     * Get a random item from the collection.
     */
    random()
    {
        return this.items[Math.floor(Math.random() * this.count())];
    }

    /**
     * Reduce the values to a single value.
     */
    reduce(callback, initial = null)
    {
        return this.items.reduce((carry, item) => callback(carry, item), initial);
    }

    /**
     * Reject the items what does not pass the truth test.
     */
    reject(callback)
    {
        if (! callback) return new this.constructor(this.items.filter(item => item));

        return new this.constructor(this.items.filter((item, key) => ! callback(item, key)));
    }

    /**
     * Reverse items order.
     */
    reverse()
    {
        this.items.reverse();

        return this;
    }

    /**
     * Search the collection for a given value and return the corresponding key if successful.
     */
    search(item)
    {
        let key;

        return (key = this.items.indexOf(item)) < 0 ? false : key;
    }

    /**
     * Get and remove the first item from the collection.
     */
    shift()
    {
        return this.items.shift();
    }

    /**
     * Shuffle the collection in a random order.
     */
    shuffle()
    {
        let items = this.items;

        for (let i = items.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [items[i - 1], items[j]] = [items[j], items[i - 1]];
        }

        return new this.constructor(items);
    }

    /**
     * Slice the collection by the given index and size.
     */
    slice(index, size = null)
    {
        return new this.constructor(this.items.slice(index, size));
    }

    /**
     * Sort the collection.
     */
    sort(callback = null)
    {
        this.items.sort((a, b) => callback ? callback(a, b) : a - b);

        return this;
    }

    /**
     * Sort the collection in desc order.
     */
    sortDesc(callback = null)
    {
        return this.sort(callback).reverse();
    }

    /**
     * Sort the collection by the given key.
     */
    sortBy(key)
    {
        return this.sort((a, b) => (this._extract(key, a, 0) - this._extract(key, b, 0)));
    }

    /**
     * Sort the collection by the given key in desc order.
     */
    sortByDesc(key)
    {
        return this.sortBy(key).reverse();
    }

    /**
     * Splice the collection by the index and the count and add exrta items to it.
     */
    splice(index, count = 0, ...items)
    {
        return new this.constructor(this.items.splice(index, count, items));
    }

    /**
     * Split the collection to the given amount of groups.
     */
    split(groups)
    {
        let chunks = [], items = this.items;

        while(items.length) {
            let chunkSize = Math.ceil(items.length / groups--);
            let chunk = items.slice(0, chunkSize);

            chunks.push(chunk);
            items = items.slice(chunkSize);
        }

        return new this.constructor(chunks);
    }

    /**
     * Sum the values of the items or the callback.
     */
    sum(key = null)
    {
        if (typeof key === 'function') return this.reduce((carry, item) => key(carry, item));

        return this.reduce((carry, item) => (key ? this._extract(key, item, 0) : item) + carry);
    }

    /**
     * Take the given amout of items from the collection.
     */
    take(limit)
    {
        if (limit < 0) return new this.constructor(this.items.slice(limit));

        return new this.constructor(this.items.slice(0, limit));
    }

    /**
     * Tap the collection.
     */
    tap(callback)
    {
        callback(this.clone());

        return this;
    }

    /**
     * Static way to create collections.
     */
    static times(number, callback)
    {
        let items = [];

        for (let i = 1; i <= number; i++) {
            items.push(callback(i));
        }

        return new Collection(items);
    }

    /**
     * Toggle an item in the collection.
     */
    toggle(item)
    {
        if (this.contains(item)) {
            this.forget(this.search(item));
        } else {
            this.push(item);
        }

        return this;
    }

    /**
     * Convert the collection to JSON.
     */
    toJson()
    {
        return JSON.stringify(this.items);
    }

    /**
     * Transforms the collection by the given callback.
     */
    transform(callback)
    {
        this.items = this.items.map((item, key) => callback(item, key));

        return this;
    }

    /**
     * Filter only unique items in the collection.
     */
    unique(key = null)
    {
        let items = this.items.reduce((items, item) => {
            if (items.indexOf(item) < 0) {
                if (key) item[key] = 1;
                items.push(item);
            } else if(key) {
                items[items.indexOf(item)][key]++;
            }

            return items;
        }, []);

        return new this.constructor(items);
    }

    /**
     * Return a new collection with the items what pass the condition.
     */
    where(key, value)
    {
        return this.filter(item => this._extract(key, item) == value);
    }

    /**
     * Return a new collection with the items what pass the condition.
     */
    whereIn(key, values)
    {
        return this.filter(item => values.includes(this._extract(key, item)));
    }

    /**
     * Return a new collection with the items what do not pass the condition.
     */
    whereNotIn(key, values)
    {
        return this.filter(item => ! values.includes(this._extract(key, item)));
    }

    /**
     * The extract helper.
     */
    _extract(key, item, value = null)
    {
        return key.split('.').reduce((t, i) => t[i] || value, item)
    }
}

const collect = (items = []) => new Collection(items);

export { Collection as default, collect };
