/***
  points-in-triangle - implementation of bresenham based triangle rasterization
  by Michael Strassburger <codepoet@cpan.org>
***/
const bresenham = require('bresenham');

const line = (from, to) => bresenham(from[0], from[1], to[0], to[1]);

module.exports = (triangle, callback) => []
  // Get all points on the triangles' sides ...
  .concat(
    line(triangle[1], triangle[2]),
    line(triangle[0], triangle[2]),
    line(triangle[0], triangle[1])
  )

  // ... and sort them by y, x
  .sort((a, b) => a.y === b.y ? a.x-b.x : a.y-b.y)

  // To finally iterate over the space between each point
  .forEach((point, i, points) => {
    let next = points[i+1];
    if (next && point.y === next.y) {
      for(let x=point.x; x<next.x; x++) {
        callback(x, point.y);
      }
    } else {
      callback(point.x, point.y);
    }
  });
