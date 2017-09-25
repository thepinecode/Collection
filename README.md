# Collection

Collection is a light-weight implementation of Laravel's collection.

We created this library to work easily with datas from an API end.
That means we implemented the methods for objects-in-array structure.

### Methods
Please note, not all the methods are implemented yet!
Also, there are some minor changes compared to Laravel's collection.

#### ``all()``
The ``all`` method lists the items in the collection.

```js
collect([1,2,3,4]).all(); // [1,2,3,4]
```

#### ``avg()``
The ``avg`` method computes the average of the items, or the values of the given key.

```js
collect([1,2,3,4]).avg(); // 2.5

collect([{price: 1}, {price: 2}, {price: 3}]).avg('price'); // 2
```

#### ``chunk()``
The ``chunk`` method breaks the collection to groups of the given size.
> This method does not modifies the original collection!

```js
collect([1,2,3,4,5,6,7,8,9,10]).chunk(3);

// [[1,2,3], [4,5,6], [7,8,9], [10]]
```

#### ``clear()``
The ``clear`` method removes all the items from the collection.
> This method modifies the original collection!
> Also, this is not implemented in Laravel!

```js
collect([1,2,3,4,5,6]).clear() // []
```

#### ``clone()``
The ``clone`` method clones the collection instance.
> It's like moment.js' clone method.
> This is not implemented in Laravel!

```js
let original = collect([1,2,3,4,5,6]);

original.clone().all(); // [1,2,3,4,5,6]
```

#### ``contains()``
The ``contains`` method checks if the given item is present in the collection.

```js
collect([1,2,3,4,5]).contains(5); // true

collect([1,2,3,4,5]).contains(6); // false
```

#### ``count()``
The ``count`` method returns the number of items in the collection.

```js
collect([1,2,3,4]).count(); // 4
```

#### ``diff()``
The ``diff`` method compares the collection items to an array and returns the items of the collection which not present in the given array.
> This method does not modify the original collection.

```js
let diff = collect([1,2,3,4,5,6,7]).diff([1,2,6,7]);

diff.all(); // [3,4,5]
```

#### ``each()``
The ``each`` method iterates over the items passes each item to the given callback.
If you want to stop the iteration, just return ``false`` from the callback.

```js
collect([1,2,3,4,5,6,7,8]).each((item, key) => {
    if (item > 5) {
        return false;
    }
});
```

#### ``every()``
The ``every`` checks if every item in the collection pass the given truth test.

```js
collect([1,2,3,4,5,6,7,8]).every((item, key) => {
    return item > 3;
});

// false
```

#### ``except()``
The ``except`` method returns all the items without the given keys.
> This method works only with object '{}' items.
> This method does not modify the original collection.

```js
let except = collection([
    {name: 'Adam', role: 'Front-end dev', site: 'pineco.de'}, 
    {name: 'Gergo', role: 'Back-end dev', site: 'pineco.de'}
]).filter(['role', 'site']);

except.all() // [{name: 'Adam'}, {name: 'Gergo'}]
```

#### ``filter()``
The ``filter`` method filters trough the items in the collection and keeps only those which pass the given truth test.
> If no callback provides, all the falsy values will be removed.
> If you want to use inverse, use ``reject`` instead.
> This method does not modify the original collection.

```js
let filtered = collect([1,2,3,4,5,6,7,8]).filter((item, key) => item > 3);

filtered.all(); // [4,5,6,7,8]
```

#### ``first()``
The ``first`` method retrives the first item from the collection.

```js
collect([1,2,3,4,5,6,7,8]).first(); // 1
```

#### ``get()``

#### ``has()``

#### ``implode()``

#### ``isEmpty()``

#### ``isNotEmpty()``

#### ``keys()``

#### ``last()``

#### ``map()``

#### ``max()``

#### ``merge()``

#### ``min()``

#### ``nth()``

#### ``only()``

#### ``pluck()``

#### ``pop()``

#### ``prepend()``

#### ``pull()``

#### ``push()``

#### ``random()``

#### ``reduce()``

#### ``reject()``

#### ``reverse()``

#### ``search()``

#### ``shift()``

#### ``shuffle()``

#### ``slice()``

#### ``sort()``

#### ``sortDesc()``

#### ``sortBy()``

#### ``sortByDesc()``

#### ``splice()``

#### ``split()``

#### ``sum()``

#### ``take()``

#### ``tap()``

#### ``times()``

#### ``toggle()``

#### ``toJson()``

#### ``transform()``

#### ``unique()``

#### ``where()``

#### ``whereIn()``

#### ``whereNotIn()``
