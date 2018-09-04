# Grids

### Introduction

Grids is a simple Javascript Application made to develop and test an algorithm, for the one-median-problem on EM-Grids. The idea is taken from real-world problem, in which a drone has to deliver some items inside a rectangular area. It has a storage site, and flying from there it distributes all the items. The problem is to find out which is the best place where to storage site.


### Some definitions

A grid is a particular kind of graph ![equation](https://latex.codecogs.com/gif.latex?G=(V,&space;E)), similar to a matrix, in which we have ![equation](https://latex.codecogs.com/gif.latex?n) row and ![equation](https://latex.codecogs.com/gif.latex?m) cols and every node is connected to the one above, the one on the left, the one below, the one on the right (if those nodes exist).

In Grids we can use several types of distance.
Let ![equation](https://latex.codecogs.com/gif.latex?u=(x_1,&space;y_1)) and ![equation](https://latex.codecogs.com/gif.latex?v=(x_2,&space;y_2)) be two nodes in ![equation](https://latex.codecogs.com/gif.latex?V), we define:

***Euclidean distance***:

![equation](https://latex.codecogs.com/gif.latex?d_E(u,&space;v)&space;=&space;\sqrt{(x_1&space;-&space;x_2)^2&space;&plus;&space;(y_1&space;-y_2)^2})

***Manhattan distance:***

![equation](https://latex.codecogs.com/gif.latex?d_M(u,&space;v)&space;=&space;|x_1&space;-&space;x_2|&space;&plus;&space;|y_1&space;-y_2|)

### EM-Grids

In EM-Grids we have three parameters:

- ![equation](https://latex.codecogs.com/gif.latex?n)the number of rows
- ![equation](https://latex.codecogs.com/gif.latex?m) the number of cols
- ![equation](https://latex.codecogs.com/gif.latex?k) the index of the *border*-column

On the left of the *border*-column we will use the Euclidean distance, and on the right the Manhattan distance. Two reach a node on the Manhattan side from one on the Euclidean side we use an hybrid distance.

### Problem

Let ![equation](https://latex.codecogs.com/gif.latex?d) be the distance as the defined in the previous section, the let ![equation](https://latex.codecogs.com/gif.latex?t) be the *trasmission cost*, defined as follows:

![equation](https://latex.codecogs.com/gif.latex?t(v)&space;=&space;\sum\limits_{u&space;\in&space;V}&space;d(u,&space;v))

The sum of distances from $v$ to all other nodes in the grid. Then the median is:

![equation](https://latex.codecogs.com/gif.latex?Med(G)&space;=&space;argmin_{u&space;\in&space;V}&space;\{&space;d(u)&space;\})

### Algorithm

The found algorithm is linear, ignoring the cost of a pre-processing that is the lower limit of the computational cost of the problem.
