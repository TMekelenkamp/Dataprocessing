// Thom Mekelenkamp

// create var for file change
var file = "data1.json";
visual(file);

// functions for changing data
function bilt(){
  console.log("De Bilt");
  file = "data1.json";
  visual(file);
}
function twente(){
  console.log("Twente");
  file = "data2.json";
  visual(file);
}

// fuction that loads the data and creates the graph
function visual(file){
  d3.json(file, function(data1){

  // store de data in a var
  var data1 = data1.data1

  // setting the margins and sizes of the graph
  var margin = {top: 50, right: 100, bottom: 100, left: 100};
  var width = 1100,
      height = 500,
      padding = 0;

  // store all the temperatures in the list for changing the axis
  var temps = [];
  for (var i = 0; i < data1.length; i++)
  {
    temps.push(data1[i].gem);
    temps.push(data1[i].min);
    temps.push(data1[i].max);

  }

  // get the min and max temperatures
  var gemMin = Math.min.apply(Math,temps),
      gemMax = Math.max.apply(Math,temps);

  // store the date in the correct date format
  var formatTime = d3.time.format("%Y/%m/%d"),
      mindate = formatTime.parse("2015/5/1"),
      maxdate = formatTime.parse("2016/5/1");

  // define the scales on the x axis
  var xScale = d3.time.scale()
    .domain([mindate, maxdate])
    .range([padding, width]);

  // define the scales on the y axis
  var yScale = d3.scale.linear()
        .domain([gemMin, gemMax])
        .range([height, 0]);

  // position the x axis
  var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

  // position the y axis
  var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

  // give the data for the average temperature
  var line = d3.svg.line()
      .x(function(d) { return xScale(formatTime.parse(d.date)); })
      .y(function(d) { return yScale(d.gem); });

  // give the data for the minimum temperature
  var line2 = d3.svg.line()
      .x(function(d) { return xScale(formatTime.parse(d.date)); })
      .y(function(d) { return yScale(d.min); });

  // give the data for the maximum temperature
  var line3 = d3.svg.line()
      .x(function(d) { return xScale(formatTime.parse(d.date)); })
      .y(function(d) { return yScale(d.max); });

  // creat the var for the chart
  var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // append line1 to the graph
  chart.append("path")
      .datum(data1)
      .attr("class", "line")
      .attr("d", line);

  // append line2 to the graph
  chart.append("path")
      .datum(data1)
      .attr("class", "line2")
      .attr("d", line2);

  // append line3 to the graph
  chart.append("path")
      .datum(data1)
      .attr("class", "line3")
      .attr("d", line3);

  // append the x axis with the correct data
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // append the y axis with the correct data
  chart.append("g")
      .attr("class", "yScale axis")
      .call(yAxis)

  // create anchor text for the y axis
  chart.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ ((padding - 75)/2) +","+(height/2)+")rotate(-90)")
      .text("Temperatuur in 0,1 Celsius");

  // create anchor text for the x axis
  chart.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ (width/2) +","+(height-((padding - 125)/3))+")")
      .text("Datum");

  // create and append the horizontal crosshair
  var crossHair = chart.append("g").attr("class", "crosshair");
  crossHair.append("line").attr("id", "h_crosshair")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("display", "none");

  // create and append the vertical crosshair
  crossHair.append("line").attr("id", "v_crosshair")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("display", "none");

  // appen the text of the crosshair
  crossHair.append("text").attr("id", "crosshair_text") // text label for cross hair
      .style("font-size", "10px")
      .style("stroke", "black")
      .style("stroke-width", "0.5px");

  // detect the mouse movement
  chart.on("mousemove", function () {
      var xCoord = d3.mouse(this)[0],
          yCoord = d3.mouse(this)[1];
          addCrossHair(xCoord, yCoord);
          console.log("x: " + xCoord + " , " + "y: "+ yCoord);
  })

  // add the crosshair function for the crosshar
  function addCrossHair(xCoord, yCoord) {
      // update horizontal crosshair
      d3.select("#h_crosshair")
          .attr("x1", xScale(mindate))
          .attr("y1", yCoord)
          .attr("x2", xScale(maxdate))
          .attr("y2", yCoord)
          .style("display", "block");
      // update vertical crosshair
      d3.select("#v_crosshair")
          .attr("x1", xCoord)
          .attr("y1", yScale(gemMin))
          .attr("x2", xCoord)
          .attr("y2", yScale(gemMax))
          .style("display", "block");
      // update text label
      d3.select("#crosshair_text")
          .attr("transform", "translate(" + (xCoord + 5) + "," + (yCoord - 5) + ")")
          .text("(" + xScale.invert(xCoord) + " , " + yScale.invert(yCoord) + ")");
  }
})
};
