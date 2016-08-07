const GridElement = require("./grid/gridelement.js").GridElement;

const dom = document.getElementById("test-0");


const ge = new GridElement(dom);
const gl = {
  rows:10,
  cols:10
};
ge.layout = gl;
ge.psc.pivotAtCenter = true;
ge.width = 10;
ge.height = 5;
ge.top = 0;
ge.left = 0;
