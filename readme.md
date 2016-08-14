

![alt](https://github.com/Neketek/gridonjs/blob/master/logo.png?raw=true)

# Readme
#### (Or the challenge for my poor English)

#### Description:
GridOnJs is simple plugin without dependencies which gives a possibility of laconic layout managment in html files.


#### Installation and usage:

* Include the gridonjs.min.js file to your html page
* In html use classes: gojs-c and gojs-e for defining grid container and
grid element.
* For access to plugin use functions
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

##### Example:

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
