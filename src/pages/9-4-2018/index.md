---
slug: "/tech-conways-game"
date: "2018-09-04T21:53:27+00:00"
title: "Conway’s game of life"
---


Recently, I wanted a challenge. Something that was outside the full stack, the build-an-application, the API’s and databases, the libraries and UI’s and so forth. Something that was just straight up code. So I turned to Eloquent JavaScript, a book that has served as my introduction to the language and trusted companion ever since I started to pick up Web Development.

I found the prompt for Conway’s Game of Life,a simulation mimicking evolution over the course of generations, after a chapter on HTML forms. After some Googling, I knew I had to give it a shot.

The Game’s initial goal was to define an unpredictable cell automaton - a grid of cells given a set of rules to react to over consequential generations. In Conway’s Game of Life, the rules are:

1. Any live cell with fewer than two live neighbors dies, as if by under population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

Pretty simple, right? Let’s jump right into dissecting this problem. We’ll need:

1. A way to represent our board, or ‘world’
2. A way of giving each cell a value, either alive or dead
3. To count each of the cell’s neighbor, without including the cell whose neighbors we are counting 
4. Generate the next generation based on the aforementioned count of neighbors
5. And finally, we’ll want to see this evolution happening in real time, so we’ll need a way to visually represent each generation

The first thing we’ll need is a grid onto which we can project our board. We can represent the board by creating a two dimensional array, or matrix. Matrices are building blocks of a ton of digital representations; digital photos, chess boards, and spreadsheets are all examples. Now there are a ton of ways to implement this in JavaScript, some more elegant than others, but for our simple purposes, I went with a good old fashioned nested for loop:

```javascript
function getRandomGrid() {
    const grid = new Array(10)
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(10)
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.floor(Math.random() * 2)
        }
    }
    return grid
}
```

This function will yield an array of ten, empty arrays. Now we have to generate a value for each of the nested arrays, representing either a one or a zero. To do this, we’ll use bracket notation to access the index of the first array, then the second. Once we’re there, we’ll use the Math object to generate either a 1 or 0 (alive or dead). 

```javascript
function getRandomGrid() {
    const grid = new Array(10)
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(10)
        for (let j = 0; j < grid.length; j++) {
            grid[i][j] = Math.floor(Math.random() * 2)
        }
    }
    return grid
}
```

So after we’ve added this line, the output will look something like this

```javascript
[
    [ 0, 0, 0, 1, 1, 1, 0, 1, 1, 1 ],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 1 ],
    [ 0, 1, 1, 0, 1, 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 1, 1, 0, 1, 0, 0, 1 ],
    [ 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 ],
    [ 0, 1, 0, 0, 1, 0, 0, 1, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 1, 0, 1, 0, 1 ],
    [ 1, 1, 0, 0, 1, 1, 0, 0, 1, 1 ],
    [ 1, 1, 1, 0, 1, 0, 1, 1, 1, 0 ]
]
```

Great!... now what? The next part of our app is a dozy: to count neighbors of each cell, we have to find the value of each array surrounding the cell in question then add them up - without counting the cell itself. In order to do this, we’ll first have to access the values of the cells themselves with another nested for loop. But we only want to count the cells adjacent to one another, left to right, top to bottom, right? So our for loops are going to count up from -1 to 2. That way, it will count the cells one left of the one in question, the next in the row or column, and then finally the one to the right.

```javascript
function countNeighbors(){
	for(let i = -1; i < 2; i++) {
		for(let j = -1; j < 2; j++) {
		}
	}
}
```

This is a good start, but we’ll need some way of knowing if we’re counting a row or a column on the grid we’re running this function on. So we’ll allow countNeighbors to accept an argument of ‘grid’ - the board we’re using to count neighbors.

```javascript
function countNeighbors(grid){
	const numberOfRows = grid.length
	const numberOfCols = grid[0].length
	for(let i = -1; i < 2; i++) {
		for(let j = -1; j < 2; j++) {
		}
	}
}
```

Now we need to add inputs for the actual position of the cell we’re counting neighbors of. Since we have already declared ‘i’ and ‘j’ in the nested for loop, we’ll use ‘x’ and ‘y’ so we don’t get confused. All that’s left to do is actually count some neighbors! We’ll call sum as a variable at the top, then in our second for loop, we’ll add ‘x’, ‘i’, and ‘numberOfRows’ for our count along the neighboring rows, then ‘y’, ‘j’, and ‘numberOfCols’ for the columns. Since we don’t want to add the total number of rows and columns to our neighbor count, but only the remainder of values, we’ll use modulo of each to determine our final neighboring sum.

```javascript
function countNeighbors(grid, x, y) {
	let sum = 0 
	const numberOfRows = grid.length
	const numberOfCols = grid[0].length
	for(let i = -1; i < 2; i++) {
		for(let j = -1; j < 2; j++) {
			const row = (x + i + numberOfRows) % numberOfRows
			const col = (y + j + numberOfCols) % numberOfCols
			sum += grid[row][col]
		}
	}

	return sum
}
```
	
Okay so far we have our two dimensional array that represents our board and a way to count our neighbors. Now we need a function to create the next generation of cells based on our neighbor count. We’ll call this function getNextGeneration and it will take our previous grid as its sole argument. Since we already know the new grid will be the same size as the original, we can start it off with a (you guessed it!) nested for loop! These two loops will set up another grid based on the length of the original grid.

```javascript
function getNextGeneration(grid) {
	const nextGrid = new Array(grid.length)
    for (let i = 0; i < grid.length; i++) {
        nextGrid[i] = new Array(10)
        for (let j = 0; j < grid[i].length; j++) {
		
        }
}
```

The first thing we’ll have to access is the value of our cells. If you’ll recall, we did this in the past with bracket notation inside both our for loops. We’ll store the value in a variable. Next, we’ll call our countNeighbors function and store its return value in a variable - let’s call it neighbors. Here’s the magic: we’ll tell the countNeighbors function where it’s counting by passing down the values in ‘i’ and ‘j’ in our getNextGeneration function - they’ll be referenced in countNeighbors as ‘x’ and ‘y’. Woah. That’s quite a bit of nested complexity! The last thing we’ll need to do for getNextGeneration is to set our game conditions.

```javascript
function getNextGeneration(grid) {
	const nextGrid = new Array(grid.length)
	for (let i = 0; i < grid.length; i++) {
       	nextGrid[i] = new Array(10)
       	for (let j = 0; j < grid[i].length; j++) {
			const value = grid[i][j]
			const neighbors = countNeighbors(grid, i, j)

			if (value === 0 && neighbors === 3) {
				nextGrid[i][j] = 1
			} else if (
				(value === 1) &&
				(neighbors < 2 || neighbors > 3)
			){
				nextGrid[i][j] = 0
			} else {
				nextGrid[i][j] = value
			}
       	}
   	}
	return nextGrid
}
```

Now there’s one little detail throwing off our count. Can you guess what that might be? Since we’re drilling down into a nested for loop in the getNextGeneration function, and calling countNeighbors inside of it, our sum is going to be run twice. What we can do to fix that is calling a subtraction of our sum outside its own nested for loop before we return it.

```javascript

function countNeighbors(grid, x, y) {
	let sum = 0 
	const numberOfRows = grid.length
	const numberOfCols = grid[0].length
	for(let i = -1; i < 2; i++) {
		for(let j = -1; j < 2; j++) {
			const row = (x + i + numberOfRows) % numberOfRows
			const col = (y + j + numberOfCols) % numberOfCols
			sum += grid[row][col]
		}
	}
	sum -= grid[row][col]
	return sum
}
```

That’s the meat and potatoes of our program! To recap: we have a two dimensional array representing our grid with randomly generated values; we count the neighbors of each cell by column and row; then we generate our next generation according to that count using our getNextGeneration function. I’ve filled it out on an HTML canvas element and let our simulation run freely at this [address](http://conways-game.surge.sh/). The source code is [here](https://github.com/will-ferens/conways-game).
	
There’s plenty more we can do - at the moment the program is rather limited. We could take user input to pause the simulation, add or delete cells, speed things up a bit, make the grid bigger, and maybe even come up with some pretty patterns ourselves! 

Until next time!