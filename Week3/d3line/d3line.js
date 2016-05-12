// Thom Mekelenkamp

d3.json("data1.json", function(data1){

var data1 = data1.data1;
console.log(data1);
console.log(data1.date);
console.log(data1[0].gem);

var margin = {top: 50, right: 100, bottom: 100, left: 100};
var width = 1100,
    height = 500,
    padding = 0;

var temps = [];
for (var i = 0; i < data1.length; i++)
{
  temps.push(data1[i].gem);
  temps.push(data1[i].min);
  temps.push(data1[i].max);
  // temps[i] = temp;
  // temp = data1[i].min
}
console.log(temps)

var gemMin = Math.min.apply(Math,temps),
    gemMax = Math.max.apply(Math,temps);

console.log(gemMin);
console.log(gemMax);

var formatTime = d3.time.format("%Y/%m/%d"),
    mindate = formatTime.parse("2015/5/1"),
    maxdate = formatTime.parse("2016/5/1");

var xScale = d3.time.scale()
  .domain([mindate, maxdate])
  .range([padding, width]);

// set the bounds of the chart in height
var yScale = d3.scale.linear()
      .domain([gemMin, gemMax])
      .range([height, 0]);

// position the X axis
var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

// position the Y axis
var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

var line = d3.svg.line()
    .x(function(d) { return xScale(formatTime.parse(d.date)); })
    .y(function(d) { return yScale(d.gem); });

var line2 = d3.svg.line()
    .x(function(d) { return xScale(formatTime.parse(d.date)); })
    .y(function(d) { return yScale(d.min); });

var line3 = d3.svg.line()
    .x(function(d) { return xScale(formatTime.parse(d.date)); })
    .y(function(d) { return yScale(d.max); });


var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chart.append("path")
    .datum(data1)
    .attr("class", "line")
    .attr("d", line);

chart.append("path")
    .datum(data1)
    .attr("class", "line2")
    .attr("d", line2);

  chart.append("path")
      .datum(data1)
      .attr("class", "line3")
      .attr("d", line3);


// append the X axis with data from x.domain
chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

// append the Y axis with data from y.domain
chart.append("g")
      .attr("class", "yScale axis")
      .call(yAxis)

chart.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ ((padding - 75)/2) +","+(height/2)+")rotate(-90)")
        .text("Temperatuur in 0,1 Celsius");

chart.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ (width/2) +","+(height-((padding - 125)/3))+")")
      .text("Datum");

var crossHair = chart.append("g").attr("class", "crosshair");
crossHair.append("line").attr("id", "h_crosshair") // horizontal cross hair
    // .attr("x1", 0)
    // .attr("y1", 0)
    // .attr("x2", 0)
    // .attr("y2", 0)
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("display", "none");

crossHair.append("line").attr("id", "v_crosshair") // vertical cross hair
    // .attr("x1", 50)
    // .attr("y1", 20)
    // .attr("x2", 50)
    // .attr("y2", 20)
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("display", "none");
//
crossHair.append("text").attr("id", "crosshair_text") // text label for cross hair
    .style("font-size", "10px")
    .style("stroke", "black")
    .style("stroke-width", "0.5px");

chart.on("mousemove", function () {
    var xCoord = d3.mouse(this)[0],
        yCoord = d3.mouse(this)[1];
        addCrossHair(xCoord, yCoord);
        console.log("x: " + xCoord + " , " + "y: "+ yCoord);
})
function addCrossHair(xCoord, yCoord) {
    // Update horizontal cross hair
    d3.select("#h_crosshair")
        .attr("x1", xScale(mindate))
        .attr("y1", yCoord)
        .attr("x2", xScale(maxdate))
        .attr("y2", yCoord)
        .style("display", "block");
    // Update vertical cross hair
    d3.select("#v_crosshair")
        .attr("x1", xCoord)
        .attr("y1", yScale(gemMin))
        .attr("x2", xCoord)
        .attr("y2", yScale(gemMax))
        .style("display", "block");
    // Update text label
    d3.select("#crosshair_text")
        .attr("transform", "translate(" + (xCoord + 5) + "," + (yCoord - 5) + ")")
        .text("(" + xScale.invert(xCoord) + " , " + yScale.invert(yCoord) + ")");
        console.log(("(" + xScale.invert(xCoord) + " , " + yScale.invert(yCoord) + ")"))

  }
});
