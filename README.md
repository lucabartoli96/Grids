# Grids

### Introduction

Grids is a simple Javascript Application made to develop and test an algorithm, for the one-median-problem on EM-Grids. The idea is taken from real-world problem, in which a drone has to deliver some items inside a rectangular area. It has a storage site, and flying from there it distributes all the items. The problem is to find out which is the best place where to storage site.


### Some definitions

A grid is a particular kind of graph $G=(V, E)$, similar to a matrix, in which we have $n$ row and $m$ cols and every node is connected to the one above, the one on the left, the one below, the one on the right (if those nodes exist).

In Grids we can use several types of distance.
Let $u=(x_1, y_1)$ and $v=(x_2, y_2)$ be two nodes in $V$, we define:

***Euclidean distance***:

\[
d_E(u, v) = \sqrt{(x_1 - x_2)^2 +  (y_1 -y_2)^2}
\]


***Manhattan distance:***

\[
d_M(u, v) = |x_1 - x_2| + |y_1 -y_2|
\]

### EM-Grids

In EM-Grids we have three parameters:

- $n$ the number of rows
- $m$ the number of cols
- $k$ the index of the *border*-column

Let $u=(x_1, y_1)$ and $v=(x_2, y_2)$
On the left of the *border*-column we will use the Euclidean distance, and on the right the Manhattan distance. Two reach a node on the Manhattan side from one on the Euclidean side we use an hybrid distance.

### Problem

Let $d$ be the distance as the defined in the previous section, the let $t$ be the *trasmission cost*, defined as follows:

\[
t(v) = \sum\limits_{u \in V} d(u, v)
\]

The sum of distances from $v$ to all other nodes in the grid. Then the median is:
\[
Med(G) = argmin_{u \in V} \{ d(u) \}
\]

### Algorithm

The found algorithm is linear, ignoring the cost of a pre-processing that is the lower limit of the computational cost of the problem.
