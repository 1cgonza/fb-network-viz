var facebookData = './data/facebook_juan0005.json';

// This will give us the size of the screen so we can render the visualization full-screen.
var width  = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

d3.json(facebookData, function (error, data) {
  if (error) {
    console.log('ERROR');
  } else {
    buildGraph(data);
  }
});

function buildGraph (data) {

  /***** BEHAVIOR ******/
  var force = d3.layout.force()
      .nodes(data.nodes)
      .links(data.links)
      .gravity(0.1)
      .distance(200)
      .charge(-100)
      .size([width, height])
      .start();

  var node = svg.selectAll('.group-node')
      .data(data.nodes)
      .enter()
      .append('g')
      .classed('group-node', true);

      // At this point d3 has created a new data set and if you want to see the variables available to you, uncomment the next line and check the console in your browser.
      // console.log(d3.selectAll('.group-node').data());

  /***** ATTACH NAMES *****/
  /*
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
   * If you are interested in knowing how the names apper only when you hover a node, take a look at the CSS and find the rules for .name and .node-group
  */

  node.append('text')
      .attr('class', 'name')
      .attr('font-size', '21')
      .attr('dx', '-1em')
      .attr('dy', '-1em')
      .attr('fill', '#358a97')
      .text(function(d) { return d.name; });

  /*--------------------------------------------------------------------
  We are going to draw SVG elements as our nodes.
  Below you will find a series of examples using basic SVG shapes.
  For reference of other SVG elements you can use, take a look at the "Graphic elements" section here: https://developer.mozilla.org/en-US/docs/Web/SVG/Element#Graphics_elements
  ----------------------------------------------------------------------*/

  /***** DRAW SVG CIRCLE *****/
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle

  node.append('circle') // (Required) This creates a <circle> SVG
      .attr('class', 'circle') // (Optional) this way we can apply styles on our CSS
      .attr('fill', '#d9eff1') // (Optional) the fill color, defaults to black.
      .attr('stroke', '#253c3e') // (Optional) the color of the line around the circles
      .attr('stroke-width', '1.5' ) // (Optional) Width of the stroke in pixels.
      .attr('r', function(d) { return d.weight / 5; }) // (Required) The radius of the circle in pixels.
      .call(force.drag); // (Optional) If you add this code, each node can be dragged with the mouse.

  /***** DRAW SVG LINE *****/
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line

  // node.append('line')
  //     .attr('class', 'line')
  //     .attr('x1', '0')
  //     .attr('y1', '0')
  //     .attr('x2', function(d) { return d.x; })
  //     .attr('y2', function(d) { return d.y; })
  //     .attr('stroke-width', function(d) { return d.weight / 30; })
  //     .attr('stroke', '#f9dd98')
  //     .call(force.drag);

  /***** DRAW SVG POLYGON *****/
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path

  // node.append('path')
  //     .attr('d', function(d) {
  //       return 'M ' + 0 + ' ' + 100 + ' L ' + d.x / 4 + ' ' + d.y / 4 + ' L ' + d.x / 8 + ' ' + d.weight / 10 + ' Z';
  //     })
  //     .attr('fill', 'rgba(255,205,85,0.7)')
  //     .attr('stroke', 'black')
  //     .attr('stroke-width', 3)
  //     .call(force.drag);

  /***** DRAW SVG RECTANGLES *****/
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect

  // node.append('rect')
  //     .attr('x', '0')
  //     .attr('y', '0')
  //     .attr('width', function(d) { return d.weight / 10; })
  //     .attr('height', function(d) { return d.weight / 5; })
  //     .attr('fill', 'yellow')
  //     .call(force.drag);

  /***** EXTERNAL IMAGES *****/
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image

  // node.append('image')
  //     .attr('class', 'image')
  //     .attr('xlink:href', 'http://juan.moebiusanimacion.com/wp-content/uploads/sites/2/2014/09/head.png')
  //     .attr('height', function(d) { return d.weight / 2; })
  //     .attr('width', '100')
  //     .call(force.drag);

  /***** TICK *****/
  force.on('tick', function() {
    node.attr('transform', function(d) {
      return 'translate(' + [d.x, d.y] + ')';
    });
  });
}