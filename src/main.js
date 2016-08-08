const GridElement = require("./grid/gridelement.js").GridElement;
const Grid = require("./grid/grid.js").Grid;
const gDom = document.getElementById("c");;
const dom0 = document.getElementById("test-0");
const dom1 = document.getElementById("test-1");
const dom2 = document.getElementById("test-2");
const dom3 = document.getElementById("test-3");

const ge0 = new GridElement(dom0);
const ge1 = new GridElement(dom1);
const ge2 = new GridElement(dom2);
const ge3 = new GridElement(dom3);

const grid = new Grid(gDom);
grid.psc.setSize(100,100);
grid.psc.setLocation(0,0);

grid.add("0",ge0);
grid.add("1",ge1);
grid.add("2",ge2);
grid.add("3",ge3);

const tp = [
  ["0",0,0,1,1],
  ["1",9,0,1,1],
  ["2",0,9,1,1],
  ["3",9,9,1,1]
];
grid.transformManyByParamLists(tp);

console.log(grid.toString());
