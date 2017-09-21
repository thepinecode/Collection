# Collection

Collection is a light-weight implementation of Laravel's collection.

We created this library to work easily with datas from an API end.
That means we implemented the methods for objects-in-array structure.

### Methods
Please note, not all the methods are implemented yet!
Also there are some minor changes compared to Laravel's collection.

#### ``all()``
The ``all`` method lists the items in the collection.

```js
collect([1,2,3,4]).all()
// [1,2,3,4]
```

#### ``avg()``
The ``avg`` method computes the average of the items, or the values of the given key.

```js
collect([1,2,3,4]).avg()
// 2.5

collect([{price: 1}, {price: 2}, {price: 3}]).avg('price')
// 2
```

#### ``chunk()``

#### ``clear()``

#### ``clone()``

#### ``contains()``

#### ``count()``

#### ``diff()``

#### ``each()``

#### ``every()``

#### ``except()``

#### ``filter()``

#### ``first()``

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
