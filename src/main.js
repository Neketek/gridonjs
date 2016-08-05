const GridElement = require("./grid/gridelement.js").GridElement;

const dom = document.getElementById("test-0");


const ge = new GridElement(dom);
const gl = {
  rows:10,
  cols:10
};
ge.layout = gl;
ge.psc.pivotAtCenter = true;
ge.width = 5;
ge.height = 5;
ge.top = 5;
ge.left = 5;
