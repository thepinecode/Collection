# Collection

Collection is a light-weight implementation of Laravel's collection.

We created this library to work easily with datas from an API end.
That means we implemented the methods for objects-in-array structure.

### Methods
Please note, not all the methods are implemented yet!
Also, there are some minor changes compared to Laravel's collection.

#### ``all()``
The ``all`` method returns the underlying array represented by the collection:

```js
collect([1,2,3,4]).all(); // [1,2,3,4]
```

#### ``avg()``
The ``avg`` method returns the average value of a given key:

```js
collect([1,2,3,4]).avg(); // 2.5

collect([{price: 1}, {price: 2}, {price: 3}]).avg('price'); // 2
```

#### ``chunk()``
The ``chunk`` method breaks the collection into multiple, smaller collections of a given size:
> This method does not modifies the original collection!

```js
collect([1,2,3,4,5,6,7,8,9,10]).chunk(3);

// [[1,2,3], [4,5,6], [7,8,9], [10]]
```

#### ``clear()``
The ``clear`` method removes all the items from the collection:
> This method modifies the original collection!
>
> This method is not implemented in Laravel's collection!

```js
collect([1,2,3,4,5,6]).clear() // []
```

#### ``clone()``
The ``clone`` method clones the collection instance:
> It's like moment.js' clone method.
>
> This method is not implemented in Laravel's collection!

```js
let original = collect([1,2,3,4,5,6]);

original.clone().all(); // [1,2,3,4,5,6]
```

#### ``contains()``
The ``contains`` method determines whether the collection contains a given item:

```js
collect([1,2,3,4,5]).contains(5); // true

collect([1,2,3,4,5]).contains(6); // false
```

#### ``count()``
The ``count`` method returns the total number of items in the collection:

```js
collect([1,2,3,4]).count(); // 4
```

#### ``diff()``
The diff method compares the collection against another collection or an array based on its values.
This method will return the values in the original collection that are not present in the given collection:
> This method does not modify the original collection.

```js
let diff = collect([1,2,3,4,5,6,7]).diff([1,2,6,7]);

diff.all(); // [3,4,5]
```

#### ``each()``
The ``each`` method iterates over the items in the collection and passes each item to a callback.
If you would like to stop iterating through the items, you may return ``false`` from your callback:

```js
collect([1,2,3,4,5,6,7,8]).each((item, key) => {
    if (item > 5) {
        return false;
    }
});
```

#### ``every()``
The ``every`` method may be used to verify that all elements of a collection pass a given truth test:

```js
collect([1,2,3,4,5,6,7,8]).every((item, key) => {
    return item > 3;
});

// false
```

#### ``except()``
The ``except`` method returns all items in the collection except for those with the specified keys:
> This method works only with object '{}' items.
>
> This method does not modify the original collection.
>
> For the inverse of ``except``, see the ``only`` method.

```js
let except = collect([
    {name: 'Adam', role: 'Front-end dev', site: 'pineco.de'},
    {name: 'Gergo', role: 'Back-end dev', site: 'pineco.de'}
]).except(['role', 'site']);

except.all() // [{name: 'Adam'}, {name: 'Gergo'}]
```

#### ``filter()``
The ``filter`` method filters the collection using the given callback, keeping only those items that pass a given truth test:
> If no callback is supplied, all entries of the collection that are equivalent to false will be removed.
>
> This method does not modify the original collection.
>
> If you want to use inverse, use ``reject`` instead.

```js
let filtered = collect([1,2,3,4,5,6,7,8]).filter((item, key) => item > 3);

filtered.all(); // [4,5,6,7,8]
```

#### ``first()``
The ``first`` method returns the first element in the collection that passes a given truth test.
You may also call the first method with no arguments to get the first element in the collection:
>  If the collection is empty, ``null`` is returned.

```js
collect([1,2,3,4]).first((item, key) => item > 2); // 3

collect([1,2,3,4]).first(); // 1
```

#### ``forget()``
The forget method removes an item from the collection by its key:
> Multiple keys are accepted.
>
> This method modifies the original collection!

```js
let items = collect([1,2,3,4,5,6,7,8]);

items.forget(7);
items.forget([0,1,2]);

items.all(); // [4,5,6,7]
```

#### ``get()``
The ``get`` method returns the item at a given key. If the key does not exist, null is returned:
> It accepts "nested" keys as well, via dot notation.
>
> If the value is not present for the given key, it returns ``null``.
>
> You may optionally pass a default value as the second argument.
> You may even pass a callback as the default value.
> The result of the callback will be returned if the specified key does not exist.

```js
let members = collect([
    {name: 'Adam', role: 'Front-end dev', site: 'pineco.de'},
    {name: 'Gergo', role: 'Back-end dev', site: 'pineco.de'}
]);

members.get('0');  // {name: 'Adam', role: 'Front-end dev', site: 'pineco.de'}

members.get('0.name'); // Adam

members.get('1.location', 'Budapest'); // Budapest
```

#### ``has()``
The ``has`` method determines if a given key exists in the collection:

```js
collect([1,2,3]).has(0); // true

collect([1,2,3]).has(3); // false
```

#### ``implode()``
The ``implode`` method joins the items in a collection. Its arguments depend on the type of items in the collection.
If the collection contains objects, you should pass the key of the attributes you wish to join, and the "glue" string you wish to place between the values:

```js
collect([1,2,3]).implode('-'); // 1-2-3

collect([{name: 'Gergo'}, {name: 'Adam'}]).implode('name', '*'); // Gergo*Adam
```

#### ``isEmpty()``
The ``isEmpty`` method returns ``true`` if the collection is empty; otherwise, ``false`` is returned:

```js
collect([]).isEmpty(); // true
```

#### ``isNotEmpty()``
The ``isNotEmpty`` method returns ``true`` if the collection is not empty; otherwise, ``false`` is returned:

```js
collect([]).isNotEmpty(); // false
```

#### ``keys()``
The keys method returns all of the collection's keys:

```js
let keys = collect({name: 'Gergo', name: 'Adam'}).keys();

keys.all(); // [0,1]
```

#### ``last()``
The ``last`` method returns the last element in the collection that passes a given truth test.
You may also call the last method with no arguments to get the last element in the collection:
> If the collection is empty, null is returned.

```js
collect([1,2,3,4]).last((item, key) => item < 3); // 2

collect([1,2,3,4]).last() // 4
```

#### ``map()``
The ``map`` method iterates through the collection and passes each value to the given callback.
The callback is free to modify the item and return it, thus forming a new collection of modified items:
> This method does not modify the original collection!
>
>  If you want to transform the original collection, use the ``transform`` method.

```js
let mapped = collect([1,2,3,4,5]).map((item, key) => item * 2);

mapped.all(); // [2,4,6,8,10]
```

#### ``max()``
The ``max`` method returns the maximum value of a given key:

```js
collect([1,6,2,4,7,8,3]).max(); // 8

collect([{price: 200}, {price: 250}, {price: 300}]).max('price'); // 300
```

#### ``merge()``
The ``merge`` method merges the given array or collection with the original collection:
> This method works differently than Laravel's.
> It's like basic array concatnation with unique values.
>
> Every duplicates will be removed in the new collection.

```js
let merged = collect([1,2,3,4,5]).merge([1,2,6,7,8]);

merged.all(); // [1,2,3,4,5,6,7,8]
```

#### ``min()``
The ``min`` method returns the minimum value of a given key:

```js
collect([1,6,2,4,7,8,3]).max(); // 1

collect([{price: 200}, {price: 250}, {price: 300}]).max('price'); // 200
```

#### ``nth()``
The ``nth`` method creates a new collection consisting of every n-th element.
You may optionally pass an offset as the second argument:

```js
collect([1,2,3,4,5,6,7,8]).nth(2); // [1,3,5,7]

collect([1,2,3,4,5,6,7,8]).nth(2, 1); // [2,4,6,8]
```

#### ``only()``
The ``only`` method returns the items in the collection with the specified keys:
> This method works only with object '{}' items.
>
> This method does not modify the original collection.
>
> For the inverse of ``only``, see the ``except`` method.

```js
let except = collect([
    {name: 'Adam', role: 'Front-end dev', site: 'pineco.de'},
    {name: 'Gergo', role: 'Back-end dev', site: 'pineco.de'}
]).only(['role', 'site']);

except.all() // [{role: 'Front-end dev', site: 'pineco.de'}, {role: 'Back-end dev', site: 'pineco.de'}]
```

#### ``pluck()``
The ``pluck`` method retrieves all of the values for a given key:
> You can pass nested keys as well.

```js
collect([
    {name: 'Product 1', meta: {weight: 300, sku: 'p_1'}},
    {name: 'Product 2', meta: {weight: 310, sku: 'p_2'}},
    {name: 'Product 3', meta: {weight: 320, sku: 'p_3'}},
    {name: 'Product 4', meta: {weight: 330, sku: 'p_4'}}
]).pluck('meta.weight'); // [300, 310, 320, 330]
```

#### ``pop()``
The ``pop`` method removes and returns the last item from the collection:
> This method modifies the original collection!

```js
let items = collect([1,2,3,4,5,6]);

items.pop(); // 6

items.all(); // [1,2,3,4,5]
```

#### ``prepend()``
The ``prepend`` method adds an item to the beginning of the collection:
> This method modifies the original collection!

```js
let items = collect([1,2,3,4,5,6]).prepend(0);

items.all(); // [0,1,2,3,4,5,6]
```

#### ``pull()``
The ``pull`` method removes and returns an item from the collection by its key:
> This method modifies the original collection!

```js
let items = collect([1,2,3,4,5,6]);

items.pull(4); // 5

items.all(); // [1,2,3,4,6]
```

#### ``push()``
The ``push`` method appends an item to the end of the collection:
> This method modifies the original collection!

```js
let items = collect([1,2,3,4,5,6]).push(7);

items.all(); // [1,2,3,4,5,6,7]
```

#### ``random()``
The ``random`` method returns a random item from the collection:

```js
let items = collect([1,2,3,4,5]);

items.random(); // 4 (retrieved randomly)
```

#### ``reduce()``
The reduce method reduces the collection to a single value, passing the result of each iteration into the subsequent iteration.
The value for ``carry`` on the first iteration is ``null``; however, you may specify its initial value by passing a second argument to ``reduce``:

```js
collect([1,2,3,4,5,6]).reduce((carry, item) => carry + item); // 21

collect([1,2,3,4,5,6]).reduce((carry, item) => carry + item, 10); // 31
```

#### ``reject()``
The ``reject`` method filters the collection using the given callback.
The callback should return ``true`` if the item should be removed from the resulting collection:
> This method modifies the original collection!
>
> For the inverse of the ``reject`` method, see the ``filter`` method.

```js
let rejected = collect([1,2,3,4,5,6,7,8]).reject((item, key) => item > 3);

rejected.all(); // [1,2,3.1]
```

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
