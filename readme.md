

![alt](https://github.com/Neketek/gridonjs/blob/master/logo.png?raw=true)

# Readme
#### (Or the challenge for my poor English)

#### Description:
GridOnJs is simple plugin without dependencies which gives a possibility of laconic layout managment in html files.


#### Installation and usage:

* Include the gridonjs.min.js file to your html page
* In html use classes: gojs-c and gojs-e for defining grid container and
grid element.
* For access to plugin use
```javascript
 var gojs = window.GridOnJs;
```
* Use autodiscover function to create Grid and GridElement objects
```javascript
  var gojs = window.GridOnJs;
  gojs.autodiscover();
```
* To access grid object use
```javascript
  var gojs = window.GridOnJs;
  gojs.autodiscover();
  var grid = gojs.get("some grid id");
```
* To set layout for the elements of the grid use
```javascript
  var gojs = window.GridOnJs;
  gojs.autodiscover();
  var grid = gojs.get("some grid id");
  var transformObject = {
    layout:[
      ["some grid element id",left,top,width,height]
    ]
  }
  grid.transform(transformObject);
```
* ???
* PROFIT!
* If you didn't understand something (I hope it's so) you should read explanation below.
If you think that you understood everything you need to calm down and read specification
and warnings to avoid forks and issues in this repository.

#### Specification:
Transform object

* This is just JavaScript object with properties. The measurement system use
grid cell(element 1x1) to make all calculations. You can use float numbers for paddings,size and location,
but try to not use them for grid dimensions:
  1. rows - set grid rows number.
  2. cols - set grid columns number.
  3. gpTop,gpLeft,gpBottom,gpRight - grid paddings(top,left,bottom,right).
  This option will add virtual columns and rows in grid, but grid size will stay
  the same.
  4. layout - this is list of element transforms.
  Order for single transform [left,top,width,height,pLeft,pTop,pRight,pBottom].
  paddings in element transform are unnecessary to set. They have certain behavior:
  if padding of left side is set, but padding for right is not, right padding will
  be equal to left padding. The same for the top and bottom padding.
  5. Example:
  ```javascript
    var elementId = "example";
    var gridPadding = 0.5;
    var elementPadding = 0.5;
    var gridSize = 10;
    var top = 0;
    var left = 0;
    var w = 10;
    var h = 10;

    var transformObject = {
      rows:gridSize,
      cols:gridSize,
      gpTop:gridPadding,
      gpLeft:gridPadding,
      gpBottom:gridPadding,
      gpRight:gridPadding,
      layout:[
        [elementId,left,top,w,h,elementPadding,elementPadding]
      ]
    };
  ```
* GridOnJs object/static class has following methods
  1. autodiscover - will find all grids and grid elements using DOM.
  2. recalculatePixels - will resize all of grid elements relative to it's parent.
  This method can be called on certain grid object to prevent other grids from resizing.
  3. get(gridId) - will return grid object or undefined if grid is not in `Grid.gridsMap`

* Grid object
  1. Grid object has every property of transform object except layout.
  2. Grid object has map interface to operate its elements, also it has [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map) iterator.
  3. Grid object has transform method which was designed to be main control method of whole object.
  4. You can gain access to certain GridElement object using Map interface.




#### Warnings:
1. In html all grids(containers|`class="gojs-c"`) should have unique id. In other case they will one or more of the
grids with identical ids will be unaccessible via `GridOnJs.get(id)` method.
2. In html grid element can be also a grid container but in this case its id need to be unique.
3. In html grid elements ids need to be unique inside the parent(container), but they can have the id of the parent
except the situations when this element is container too.
4. Grid(container|`class = "gojs-c"`) - has not interface of grid element. But if you want to operate with it
like with grid element, just add root container which will include this that container as its element. But don't
forget to add `class = 'gojs-c gojs-e'`.

##### Example:

Quite simple working example which will do SOMETHING with two divs.

###### css:
```css
/*
Browser can set margin by itself.
This prevents it.
*/
body{
  margin:0;
  width:400px;
  height:400px;
}
/*
Setting the color for grid elements.
*/
.block{
  background-color: black;
}
```

###### html:
```html
<html>
  <body id = "root" class = "gojs-c">
    <div id = "box-1" class = "gojs-e block"></div>
    <div id = "box-2" class = "gojs-e block"></div>
  </body>
</html>
```

###### JavaScript:
```javascript
  window.GridOnJs.autodiscover();
  var grid = window.GridOnJs.get("grid");
  var transformObject = {
    rows:10,
    cols:10,
    layout:[
      ["box-1",0,0,1,1],
      ["box-2",4,4,4,4]
    ]
  }
  grid.transform(transformObject);
```
