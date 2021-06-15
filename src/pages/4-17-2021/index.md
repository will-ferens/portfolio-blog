---
slug: "/cs/hash-tables"
date: "2021-04-10T21:53:27+00:00"
title: "Implementing a simple hash table"
---

_This is a continuing series of explainers and implementations of algorithms and data structures in JavaScript. As someone who never got a formal Computer Science education, these posts allow me to explore and experiment with these topics while ensuring that I understand them through explanation. A study guide, a self guided CS course, a scratch pad - whatever you want to call it. If it's helpful for you, please let me know!_ 😌

Hash tables are data structures implemented by storing elements in a fixed length array and associating them with a unique key. But let's back up for a second - we'll need to know what hashing is in order to understand how to implement a hash table. Hashing is simply linking an object or element to a representative integer value. This key allows us to search a large body of data quickly.

This is what hash tables are best at: accessing values in massive stores of data. Insertion, deletion, and search operations all operate at constant time, or 0(1), in hash tables. Database indexes and caches are typical use cases for the hash table. The browser's `localStorage` object is a perfect example of a hash table in JavaScript. It persists in the browser and can be accessed after a session.

In order to implement a hash table, we'll first need a hashing function. This function will take an element's key as an input and return a unique index to be associated with the element. A good hash function should be:

- Deterministic: _Equal keys produce equal hash values_
- Efficient: _The function should perform in constant, 0(1), time_
- Distribute Uniformly: _It should make the most of the array_

There are a few ways to create a hash function, but we'll go with one of the simplest. The 'Arithmetic Modular' approach applies the key to the table size, taking the remainder:

`hashedIndex = key % size`

This way, we will always have an index between 0 and the length of our table.

We'll declare our hash table as a class:

```js
class HashTable {
  constructor(size) {
    this.size = size
  }

  hash(key) {
    if (Number.isInteger(key)) {
      return key % this.size
    } else {
      throw "must be integer"
    }
  }
}
```

So far, our `HashTable` has a fixed size and a hash function. But we need a place to store objects we plan to put into the table. To that end, we'll create another method for the class:

```js
initArray(size) {
  let array = [];

  for (let i = 0; i < size; i++) {
    array.push(null);
  }

  return array;
}
```

We can use this function to create two arrays: one for keys and another for values. These will be stored in the constructor of our class, so they can be referenced in other methods.

```js
class HashTable {
  constructor(size) {
    this.size = size
    this.keys = this.initArray(size)
    this.values = this.initArray(size)
  }
}
```

## Collision

You may already be spotting an issue with our hash function. It's easy to see how this function can return the same index for two different keys. If the size of the table is 11, then both the key number 4 and 15 will return the same index:

```
4 % 11 = 4
15 % 11 = 4
```

This is known as collision. A perfect hash function would return unique indexes for any key value, but this is nearly impossible in most cases. Again, there are a few ways to handle collision, but we'll keep it simple and go with a basic solution.

## Linear Probing

Linear Probing works by finding the next available index by incrementing one index at a time. When we go to insert an element into the table, if the specified index is already occupied, then the insert function will increment until an empty space is found for that element. So let's write the insertion or `put` function with linear probing in mind:

```js
put(key, value) {
  if (this.limit <= this.size) {

    let hashedIndex = this.hash(key);

    //linear probing
    while (this.keys[hashedIndex] != null) {
      hashedIndex++;

      hashedIndex = hashedIndex % this.size;
    }

    this.keys[hashedIndex] = key;
    this.values[hashedIndex] = value;
    this.limit++;

  } else {

    throw 'hash table full';

  }
}
```

Here, we hash our key to create a new index. Then, we check if that index is indeed unique. If it's not, and there's a value where we want to insert our element, we begin iterating one by one until we land in an empty space. Finally, we store the key and value in their respective arrays and increment the limit. The property limit is used so we don't have to resize the array later on, using extra memory.

Since we only have to iterate in the event that our `hashedIndex` value has already been occupied, we can safely assume this will be performed in constant time. The same goes for retrieving our elements, using the `get` function:

```js
get(key) {
  let hashedIndex = this.hash(key);

  while (this.keys[hashedIndex] != key) {
    hashedIndex++;

    hashedIndex = hashedIndex % this.size;
  }

  return this.values[hashedIndex];
}
```

In order to retrieve the desired element, we'll need to find its corresponding `hashedIndex`. So again, we hash our key. If the key is not found on the first try, we begin iterating until we find it. Then, we can use this index to return our element.

Now that we have our three major components (hash, insert, and get functions), let's take a look at the code as a whole:

```js
class HashTable {
  constructor(size) {
    this.size = size
    this.keys = this.initArray(size)
    this.values = this.initArray(size)
    this.limit = 0
  }

  put(key, value) {
    if (this.limit <= this.size) {
      let hashedIndex = this.hash(key)

      //linear probing
      while (this.keys[hashedIndex] != null) {
        hashedIndex++

        hashedIndex = hashedIndex % this.size
      }

      this.keys[hashedIndex] = key
      this.values[hashedIndex] = value
      this.limit++
    } else {
      throw "hash table full"
    }
  }

  get(key) {
    let hashedIndex = this.hash(key)

    while (this.keys[hashedIndex] != key) {
      hashedIndex++

      hashedIndex = hashedIndex % this.size
    }

    return this.values[hashedIndex]
  }

  hash(key) {
    if (Number.isInteger(key)) {
      return key % this.size
    } else {
      throw "must be integer"
    }
  }

  initArray(size) {
    let array = []

    for (let i = 0; i < size; i++) {
      array.push(null)
    }

    return array
  }
}
```

We can `console.log()` the hash table to see our final result. This example uses our linear probing technique to show how the table avoids collision:

```js
let example = new HashTable(11);

example.put(7, 'Berlin');
example.put(7, 'Madrid');

HashTable {
  size: 11,
  keys: [
    null, null, null,
    null, null, null,
    null, 7, 7,
    null, null
  ],
  values: [
    null, null,
    null, null,
    null, null,
    null, 'Berlin',
    'Madrid', null,
    null
  ],
  limit: 2
```

To recap: hash tables are data structures that have efficient insert and retrieval capabilities, using a hashed key to reference objects stored within. This simple implementation uses linear probing to avoid collision - or overwriting existing elements when using the same key.

Linear probing can result in 'grouping' - where data is found in clumps throughout the table. This can negatively impact the efficiency of iterating over the data. Other methods of avoiding collision, such as quadratic probing and rehashing keys can help mitigate.

Until next time!
