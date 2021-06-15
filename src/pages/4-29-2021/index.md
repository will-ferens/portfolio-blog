---
slug: "/blog/search-alorithms"
date: "2021-04-29T21:53:27+00:00"
title: "Search Algorithms"
description: "Working through search solutions in JavaScript"
---

_This is a continuing series of explainers and implementations of algorithms and data structures in JavaScript. As someone who never got a formal Computer Science education, these posts allow me to explore and experiment with these topics while ensuring that I understand them through explanation. A study guide, a self guided CS course, a scratch pad - whatever you want to call it. If it's helpful for you, please let me know!_ 😌

## Linear Search

Finding a value in a range - a username, a number, a product in an online store - is one of the most common tasks we assign to computers. Searching is iterating over a data structure to retrieve a specified element. Let's first assume the data structure we are interested in searching is unsorted. Since it is impossible to know where our element is in an unsorted array, we'll need to iterate one value at a time:

```javascript
function linearSearch(array, value) {
  // Iterate over the entire array
  for (let i = 0; i < array.length; i++) {
    // If we find what we want, return the index
    if (array[i] == value) {
      return i
    }
  }

  return null
}

const exampleArray = [4, 5, 2, 34, 8, 12]

linearSearch(exampleArray, 34)

// 3
```

This operation works at O(n) - not bad. We do have a best case scenario of finding the element at the zeroth position, but the likelihood of that drops as the array gets larger - and so does the efficiency of the algorithm.

## Binary Search

Let's now assume that our array is sorted. If we know how it's sorted, we can eliminate values outside our desired range. If we start at the middle of the array, and the value is bigger than the one we are searching for, then we can cut off the high range right off the bat.

If we continue this process, querying the exact middle range each time, we will halve the potential values every guess. Let's write it out:

```javascript
const sortedExample = [1, 2, 3, 4, 5, 6]

function binarySearch(array, value) {
  // Low and High values keep track of the search
  let low = 0
  // Since this array is sorted from smallest to largest,
  // we can assume the largest value is last
  let high = array[array.length - 1]

  // We'll run this loop as long as there are more than one potential values
  while (low <= high) {
    // Defining the middle value
    let middle = Math.floor((low + high) / 2)

    // The potential value
    let potential = array[middle]

    if (value == potential) {
      // If value and potential are a match, return
      return potential
    } else if (value > potential) {
      // If the potential value is lower than the value,
      // redefine the low end range to search the higher half of the array
      low = middle + 1
    } else {
      // If the potential value is higher than the value,
      // redefine the high end range to search the lower half of the array
      high = middle - 1
    }
  }
}

binarySearch(sortedExample, 6)
```

Binary search improves on linear search to a best case of constant time - O(1) and a worst case of O(log n). We have a glaring drawback: binary search can only be performed on sorted data. What if our data is large enough to disqualify our linear search but also unsorted? Such as a list of addresses, phone numbers, or (unmanageably large) to dos?

Then we'll need a way to sort our data structures. Next, we'll explore sort algorithms and their strengths and weaknesses.
