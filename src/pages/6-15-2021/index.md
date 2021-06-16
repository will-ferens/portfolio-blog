---
slug: "/blog/sort-alorithms-1"
date: "2021-06-15T21:53:27+00:00"
title: "Sort Algorithms pt. 1"
description: "Sifting through sorts in JavaScript"
---

_This is a continuing series of explainers and implementations of algorithms and data structures in JavaScript. As someone who never got a formal Computer Science education, these posts allow me to explore and experiment with these topics while ensuring that I understand them through explanation. A study guide, a self guided CS course, a scratch pad - whatever you want to call it. If it's helpful for you, please let me know!_ 😌

## Sorting

Sorting algorithms are one of the cornerstones of computer science. They've been heavily researched since the fifties. And yet there are still unanswered questions in the field. Arrays are easier to search, items are easier to find in stored memory, and files can be read more quickly when everything's neatly sorted. But there are a hundred ways to skin a cat - and even efficient sorting algorithms have trade offs that must be considered when searching for a solution.

## Bubble Sort

Starting with a simple solution, we have the bubble sort. All it does is iterate over the array and swaps elements if one is bigger than the other. To implement this, we'll first write a helper function `swap`:

```js
function swap(array, position1, position2) {
  // We save the smaller value in this placeholder
  let tempValue = array[position1]

  // Swap the smaller with the larger
  array[position1] = array[position2]
  array[position2] = tempValue
}
```

Then we'll define the actual sort function:

```js
function bubbleSort(array) {
  // Loop through twice to find each value and its next neighbor
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j <= i; j++) {
      // If the next value is smaller than the previous, swap
      if (array[i] < array[j]) {
        swap(array, i, j)
      }
    }
  }

  return array
}
```

This is a naive solution - bubble sort compares every pair of the array whereas other solutions take advantage of presorted pairs. Since it also uses a nested for loop, it is expensive at O(n^2). Bubble sort is basic, quick to implement, and dirty. But easy to understand!

## Selection Sort

Selection sort finds the smallest elements in the array and places them in the current index. When swapping the smallest element into its correct position, we'll return to the `swap` function implemented above.

```js
function selectionSort(array) {
  let min

  for (let i = 0; i < array.length; i++) {
    // Set min to current index
    min = i
    // Loop through the rest of the array to find anything smaller
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j
      }
    }
    // If the minimum isn't in the current position, swap it
    if (i != min) {
      swap(array, i, min)
    }
  }

  return array
}
```

Selection doesn't waste unnecessary computation comparing each pair and only checks that the current position is the smallest remaining. However, while selection is marginally better than bubble, the time complexity is still O(n^2) because of our nested for loop.

## Insertion Sort

Insertion is similar to selection; we are comparing the array sequentially and moving unsorted items to their correct position. However, insertion achieves this by creating a sorted sublist stored on the left side of the array:

```js
function insertionSort(array) {
  // Since we're comparing the first entry,
  // start iterating at the second
  for (let i = 1; i < array.length; i++) {
    // Key is the element we are
    // currently comparing
    let key = array[i]

    // J is the element to which
    // we are comparing with Key
    let j = i - 1

    // Move elements that are greater than Key
    // to one position ahead of their current position
    while (j >= 0 && key < array[j]) {
      array[j + 1] = array[j]
      j -= 1
    }

    array[j + 1] = key
  }

  return array
}
```

Although insertion is a little more complex than bubble and selection, that doesn't mean it's any more efficient: we're still at O(n^2) due to the nested while loop. What kind of solution can we find that doesn't require iterating twice? In the next post, I'll be taking a stab at quicksort, quickselect, and mergesort.
