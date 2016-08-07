const GridElement = require("./grid/gridelement.js").GridElement;
const Grid = require("./grid/grid.js").Grid;
const dom = document.getElementById("test-0");


const ge = new GridElement(dom);
const grid = new Grid("TEST");


grid.add("1",ge);

ge.transform(5,5,5,5);
ge.transformByList([0,0,2,2]);

console.log(grid.toString());
