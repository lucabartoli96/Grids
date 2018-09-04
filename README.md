# Grids

### Introduction

Grids is a simple Javascript Application made to develop and test an algorithm, for the one-median-problem on EM-Grids.

A grid is a particular kind of graph, similar to a matrix. In EM-Grids we have three parameters:

- $n$ the number of rows
- $m$ the number of cols
- $k$ the index of the *border*-column

On the left of the *border*-column we will use the Euclidean distance, which is defined as follows:

\[
d_E(u, v) = c_vH_E(u, v) + c_h\sqrt{(x_1 - x_2)^2 +  (y_1 -y_2)^2}
\]
