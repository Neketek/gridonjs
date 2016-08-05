const PixelStyleController = require("./utils/styleControllers.js").PixelStyleController;
const PercentStyleController = require("./utils/styleControllers.js").PercentStyleController;
const dom = document.getElementById("test-0");
const psc = new PercentStyleController(dom);

psc.verticalPivotAtCenter=true;
psc.setSize(100,50);
psc.setLocation(0,50);
