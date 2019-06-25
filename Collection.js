class Collection
{
    /**
     * Initialize a new collection instance.
     *
     * @param  {mixed}  items
     * @return {void}
     */
    constructor(items = [])
    {
        this.items = Array.isArray(items) ? items : [items];
    }

    /**
     * Get all of the items in the collection.
     *
     * @return {array}
     */
    all()
    {
        return this.items;
    }

    /**
     * Alias for the "avg" method.
     *
     * @param  {string}  key
     * @return {number}
     */
    average(key)
    {
        return this.avg(key);
    }

    /**
     * Get the average value of a given key.
     *
     * @param  {string}  key
     * @return {number}
     */
    avg(key)
    {
        return this.sum(key) / this.count();
    }

    /**
     * Chunk the underlying collection array.
     *
     * @param  {number}  size
     * @return {Collection}
     */
    chunk(size)
    {
        let sets = [], chunks, i = 0, items = this.items;
        chunks = this.count() / size;

        while(i < chunks){
            sets[i] = new this.constructor(items.splice(0, size));
            i++;
        }

        return new this.constructor(sets);
    }

    /**
     * Collapse the collection of items into a single array.
     *
     * @return {Collection}
     */
    collapse()
    {
        return new this.constructor(this.items.flat(Infinity));
    }

    /**
     * Create a collection by using this collection for keys and another for its values.
     *
     * @param  {mixed}  values
     * @return {object}
     */
    combine(values)
    {
        values = Array.isArray(values) ? values : [values];

        return this.items.reduce((value, item, index) => {
            value[item] = values[index];

            return value;
        }, {});
    }

    /**
     * Clear the collection.
     *
     * @return {void}
     */
    clear()
    {
        this.items = [];

        return this;
    }

    /**
     * Clone the collection.
     *
     * @return {Collection}
     */
    clone()
    {
        return new this.constructor(this.items);
    }

    /**
     * Push all of the given items onto the collection.
     *
     * @param  {array}  items
     * @return {Collection}
     */
    concat(items)
    {
        return (new this.constructor(this.items.concat(items)));
    }

    /**
     * Determine if an item exists in the collection.
     *
     * @param  {number}  index
     * @param  {mixed}  value
     * @return {bool}
     */
    contains(index, value)
    {
        if (value && this.items.hasOwnProperty(index)) {
            return JSON.stringify(this.items[index]) === JSON.stringify(value);
        }

        for (let i in this.items) {
            if (JSON.stringify(index) === JSON.stringify(this.items[i])) return true;
        }

        return false;
    }

    /**
     * Count the number of items in the collection.
     *
     * @return {number}
     */
    count()
    {
        return this.items.length;
    }

    /**
     * Count the number of items in the collection using a given truth test.
     *
     * @param  {function|string}  callback
     * @return {object}
     */
    countBy(callback)
    {
        if (! callback) callback = value => value;

        let groups = this.groupBy(callback);

        for (let i in groups) {
            groups[i] = groups[i].count();
        }

        return groups;
    }

    /**
     * Cross join with the given lists, returning all possible permutations.
     *
     * @param  {mixed}  arguments
     * @return {Collection}
     */
    crossJoin()
    {
        let lists = [this.items].concat([...arguments]);

        lists = lists.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));

        return new this.constructor(lists);
    }

    /**
     * Dump the collection and end the script.
     *
     * @return {this}
     */
    dd()
    {
        console.table(this.items);

        return this;
    }

    /**
     * Get the items in the collection that are not present in the given items.
     *
     * @param  {array}  items
     * @return {Collection}
     */
    diff(items)
    {
        return new this.constructor(this.items.filter((item, index) => items.indexOf(item) < 0));
    }

    /**
     * Dump the collection.
     *
     * @return {this}
     */
    dump()
    {
        return this.dd();
    }

    /**
     * Execute a callback over each item.
     *
     * @param  {function}  callback
     * @return {void}
     */
    each(callback)
    {
        for (let i in this.items) {
            if (callback(this.items[i], i) === false) return false;
        }
    }

    /**
     * Determine if all items in the collection pass the given test.
     *
     * @param  {function}  callback
     * @return {bool}
     */
    every(callback)
    {
        return this.items.every(callback);
    }

    /**
     * Get all items except for those with the specified keys.
     *
     * @param  {string|array}  keys
     * @return {Collection}
     */
    except(keys)
    {
        keys = Array.isArray(keys) ? keys : [keys];

        return this.map(item => {
            keys.forEach(key => {
                if (item.hasOwnProperty(key)) delete item[key]
            });

            return item;
        });
    }

    /**
     * Fill the collection with the goven items.
     *
     * @param  {array}  items
     * @return {this}
     */
    fill(items)
    {
        this.items = items;

        return this;
    }

    /**
     * Run a filter over each of the items.
     *
     * @param  {function}  callback
     * @return {Collection}
     */
    filter(callback)
    {
        if (! callback) return new this.constructor(this.items.filter(item => item));

        return new this.constructor(this.items.filter((item, index) => callback(item, index)));
    }

    /**
     * Get the first item from the collection passing the given truth test.
     *
     * @param  {function}  callback
     * @return {mixed}
     */
    first(callback)
    {
        if (! callback) return this.items[0] || null;

        return this.filter(callback).first();
    }

    /**
     * Remove an item from the collection by key.
     *
     * @param  {string|array}  index
     * @return {this}
     */
    forget(index)
    {
        index = Array.isArray(index) ? index : [index];

        index.forEach(index => this.items.splice(index, 1));

        return this;
    }

    /**
     * Get an item from the collection by key.
     *
     * @param  {number}  index
     * @param  {mixed}  value
     * @return {mixed}
     */
    get(index, value)
    {
        if (typeof value === 'function') value = value();

        return this._extract(index, this.items, value)
    }

    /**
     * Group an associative array by a field or using a callback.
     *
     * @param  {function|string}  grouper
     * @return {Collection}
     */
    groupBy(callback)
    {
        return this.items.reduce((value, item) => {
            if (typeof callback === 'function') {
                let grouper = callback(item);
                (value[grouper] = value[grouper] || new this.constructor).push(item);
            } else {
                (value[item[callback]] = value[item[callback]] || new this.constructor).push(item);
            }

            return value;
        }, {});
    }

    /**
     * Determine if an item exists in the collection by key.
     *
     * @param  {number}  key
     * @return {bool}
     */
    has(index)
    {
        return this.items.hasOwnProperty(index);
    }

    /**
     * Concatenate values of a given key as a string.
     *
     * @param  {string}  key
     * @param  {string}  glue
     * @return {string}
     */
    implode(key, glue = null)
    {
        if (! glue) return this.items.join(key);

        return this.items.map(item => this._extract(key, item)).join(glue);
    }

    /**
     * Determine if the collection is empty or not.
     *
     * @return {bool}
     */
    isEmpty()
    {
        return this.count() < 1;
    }

    /**
     * Determine if the collection is not empty.
     *
     * @return {bool}
     */
    isNotEmpty()
    {
        return ! this.isEmpty();
    }

    /**
     * Get the keys of the collection items.
     *
     * @return {Colection}
     */
    keys()
    {
        return new this.constructor(Object.keys(this.items));
    }

    /**
     * Get the last item from the collection.
     *
     * @param  {function}  callback
     * @return {mixed}
     */
    last(callback)
    {
        if (! callback) return this.items[this.count() - 1] || null;

        return this.filter(callback).last();
    }

    /**
     * Run a map over each of the items.
     *
     * @param  {function}  callback
     * @return {Collection}
     */
    map(callback)
    {
        return new this.constructor(this.items.map((item, index) => callback(item, index)));
    }

    /**
     * Get the max value of a given key.
     *
     * @param  {string|null}  key
     * @return {mixed}
     */
    max(key)
    {
        if (! key) return Math.max(...this.items);

        return this.pluck(key).max();
    }

    /**
     * Get the median of a given key.
     *
     * @param  {string|array}  key
     * @return {mixed}
     */
    median(key)
    {
        key ? this.sortBy(key) : this.sort();

        let middle = Math.floor(this.count() / 2),
            item = this.items[middle];

        if (this.count() % 2) {
            return key ? this._extract(key, item) : item;
        }

        return (key
            ? (this._extract(key, this.items[middle - 1]) + this._extract(key, item))
            : (this.items[middle - 1] + item)
        ) / 2.0;
    }

    /**
     * Merge the collection with the given items.
     *
     * @param  {array}  items
     * @return {Collection}
     */
    merge(items)
    {
        return this.concat(items).unique();
    }

    /**
     * Get the min value of a given key.
     */
    min(key)
    {
        if (! key) return Math.min(...this.items);

        return this.pluck(key).min();
    }

    /**
     * Get the mode of a given key.
     *
     * @param  {string}  key
     * @return {mixed}
     */
    mode(key)
    {
        let map = this.items.map(
            a => this.items.filter(
                b => key ? (this._extract(key, a) === this._extract(key, b)) : (a === b)
            ).length
        );

        return key
            ? this._extract(key, this.items[map.indexOf(Math.max.apply(null, map))])
            : this.items[map.indexOf(Math.max.apply(null, map))];
    }

    /**
     * Create a new collection consisting of every n-th element.
     *
     * @param  {number}  n
     * @param  {number}  offset
     * @return {Collection}
     */
    nth(n, offset = 0)
    {
        return this.filter((item, key) => (key + offset) % n === 0);
    }

    /**
     * Get the items with the specified keys.
     *
     * @param  {string|array}  keys
     * @return {Collection}
     */
    only(keys)
    {
        keys = Array.isArray(keys) ? keys : [keys];

        return this.map(item => {
            Object.keys(item).forEach(key => { if (! keys.includes(key)) delete item[key] });

            return item;
        });
    }

    /**
     * Get the values of a given key.
     *
     * @param  {string}  key
     * @return {Collection}
     */
    pluck(key)
    {
        return this.map(item => this._extract(key, item)).filter();
    }

    /**
     * Get and remove the last item from the collection.
     *
     * @return {mixed}
     */
    pop()
    {
        return this.items.pop();
    }

    /**
     * Push an item onto the beginning of the collection.
     *
     * @param  {mixed}  item
     * @return {this}
     */
    prepend(item)
    {
        this.items.unshift(item);

        return this;
    }

    /**
     * Get and remove an item from the collection.
     *
     * @param  {number}  index
     * @return {mixed}
     */
    pull(index)
    {
        return this.items.splice(index, 1);
    }

    /**
     * Push an item onto the end of the collection.
     *
     * @param  {mixed}  item
     * @return {this}
     */
    push(item)
    {
        this.items.push(item);

        return this;
    }

    /**
     * Get one or a specified number of items randomly from the collection.
     *
     * @return {mixed}
     */
    random()
    {
        return this.items[Math.floor(Math.random() * this.count())];
    }

    /**
     * Reduce the collection to a single value.
     *
     * @param  {function}  callback
     * @param  {mixed}  initial
     * @return {mixed}
     */
    reduce(callback, initial = null)
    {
        return this.items.reduce((carry, item) => callback(carry, item), initial);
    }

    /**
     * Create a collection of all elements that do not pass a given truth test.
     *
     * @param  {function}  callback
     * @return {Collection}
     */
    reject(callback)
    {
        if (! callback) return new this.constructor(this.items.filter(item => item));

        return new this.constructor(this.items.filter((item, index) => ! callback(item, index)));
    }

    /**
     * Reverse items order.
     *
     * @return {Collection}
     */
    reverse()
    {
        let items = this.items;

        return new this.constructor(items.reverse());
    }

    /**
     * Search the collection for a given value and return the corresponding key if successful.
     *
     * @param  {function|number}  item
     * @return {mixed}
     */
    search(item)
    {
        for (let i in this.items) {
            if (typeof item === 'function') {
                if (item(this.items[i], i)) return i;
            } else if (JSON.stringify(this.items[i]) === JSON.stringify(item)) {
                return i;
            }
        }

        return false;
    }

    /**
     * Get and remove the first item from the collection.
     *
     * @return {mixed}
     */
    shift()
    {
        return this.items.shift();
    }

    /**
     * Shuffle the items in the collection.
     *
     * @return {Collection}
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
     * Slice the underlying collection array.
     *
     * @param  {number}  index
     * @param  {number}  size
     * @return {Collection}
     */
    slice(index, size)
    {
        if (size) size = size + index;

        return new this.constructor(this.items.slice(index, size));
    }

    /**
     * Sort through each item with a callback.
     *
     * @param  {function}  callback
     * @return {Collection}
     */
    sort(callback)
    {
        let items = this.items;

        items.sort((a, b) => callback ? callback(a, b) : a - b);

        return new this.constructor(items);
    }

    /**
     * Sort through each item with a callback in descending order.
     *
     * @param  {function}  callback
     * @return {Collection}
     */
    sortDesc(callback)
    {
        return this.sort(callback).reverse();
    }

    /**
     * Sort the collection using the given callback.
     *
     * @param  {string}  key
     * @return {Collection}
     */
    sortBy(key)
    {
        return this.sort((a, b) => (this._extract(key, a, 0) - this._extract(key, b, 0)));
    }

    /**
     * Sort the collection using the given callback in descending order.
     *
     * @param  {string}  key
     * @return {Collection}
     */
    sortByDesc(key)
    {
        return this.sortBy(key).reverse();
    }

    /**
     * Splice a portion of the underlying collection array.
     *
     * @param  {number}  index
     * @param  {number}  count
     * @param  {array}  items
     * @return {Collection}
     */
    splice(index, count, items = [])
    {
        return new this.constructor(this.items.splice(index, count || this.count() - index, ...items));
    }

    /**
     * Split a collection into a certain number of groups.
     *
     * @param  {number}  groups
     * @return {Collection}
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
     * Get the sum of the given values.
     *
     * @param  {function|string|null}  key
     * @return {number}
     */
    sum(key)
    {
        if (typeof key === 'function') return this.reduce((carry, item) => key(item) + carry);

        return this.reduce((carry, item) => (key ? this._extract(key, item, 0) : item) + carry);
    }

    /**
     * Take the first or last number of items.
     *
     * @param  {number}  limit
     * @return {Collection}
     */
    take(limit)
    {
        if (limit < 0) return new this.constructor(this.items.slice(limit));

        return new this.constructor(this.items.slice(0, limit));
    }

    /**
     * Pass the collection to the given callback and then return it.
     *
     * @param  {function}  callback
     * @return {this}
     */
    tap(callback)
    {
        callback(this.clone());

        return this;
    }

    /**
     * Create a new collection by invoking the callback a given amount of times.
     *
     * @param  {number}  number
     * @param  {function}  callback
     * @return {this}
     */
    times(number, callback)
    {
        let items = [];

        for (let i = 1; i <= number; i++) {
            items.push(callback(i));
        }

        return this.fill(items);
    }

    /**
     * Toggle an item in the collection.
     *
     * @param  {mixed}  item
     * @return {this}
     */
    toggle(item)
    {
        this.contains(item) ? this.forget(this.search(item)) : this.push(item);

        return this;
    }

    /**
     * Get the collection of items as JSON.
     *
     * @return {string}
     */
    toJson()
    {
        return JSON.stringify(this.items);
    }

    /**
     * Transform each item in the collection using a callback.
     *
     * @param  {function}  callback
     * @return {this}
     */
    transform(callback)
    {
        this.items = this.items.map((item, index) => callback(item, index));

        return this;
    }

    /**
     * Return only unique items from the collection array.
     *
     * @param  {string}  key
     * @return {Collection}
     */
    unique(key)
    {
        let counts = [];

        let items = this.items.reduce((items, item) => {
            if (! items.contains(item)) {
                items.push(item);
                if (key) counts.push({[key]: 1});
            } else if(key) {
                counts[items.search(item)][key]++;
            }

            return items;
        }, new this.constructor);

        if (key) items.transform((item, index) => Object.assign({}, item, counts[index]));

        return items;
    }

    /**
     * Filter items by the given key value pair.
     *
     * @param  {string}  key
     * @param  {mixed}  value
     * @return {Collection}
     */
    where(key, value)
    {
        return this.filter(item => this._extract(key, item) == value);
    }

    /**
     * Filter items by the given key value pair.
     *
     * @param  {string}  key
     * @param  {array}  values
     * @return {Collection}
     */
    whereIn(key, values)
    {
        return this.filter(item => values.includes(this._extract(key, item)));
    }

    /**
     * Filter items by the given key value pair.
     *
     * @param  {string}  key
     * @param  {array}  values
     * @return {Collection}
     */
    whereNotIn(key, values)
    {
        return this.filter(item => ! values.includes(this._extract(key, item)));
    }

    /**
     * Extract the value from the object by its key.
     *
     * @param  {string}  key
     * @param  {object}  item
     * @param  {mixed}  value
     * @return {mixed}
     */
    _extract(key, item, value = null)
    {
        return key.toString().split('.').reduce((t, i) => t[i] || value, item);
    }
}

// Exports
const collect = (items = []) => new Collection(items);
// export { Collection as default, collect };
