// Thom Mekelenkamp

// define a variable the gets the 3-letter tag of a country
var countries = Datamap.prototype.worldTopo.objects.world.geometries;

// get the data from the json
d3.json("data.json", function(error, data){
if (error) {return console.warn(error)};

    // store the data from the json in a usable variable
    var data = data.data

    // create additional data list to load from
    var dataList = {};

    // check colors for the map
    for (var i = 0; i < data.length; i++) {
        if (data[i].pop < 1000000) {
            color = 'data1';
        }
        else if (data[i].pop < 10000000) {
            color = 'data2'
        }
        else if (data[i].pop < 25000000) {
            color = 'data3';
        }
        else if (data[i].pop < 50000000) {
            color = 'data4';
        }
        else {
             color = 'data5';
        }
        code = findCountry(countries, data[i].country)
        dataList[code] = {country: data[i].country, population: data[i].pop ,
        users: data[i].users, penetration: data[i].penetration,
        sqkm: data[i].sqkm, fillKey: color};
    }

// settings for the map
var map = new Datamap({element: document.getElementById('map'),
    fills: {
        data1: 'd6e8f5',
        data2: 'aed1ea',
        data3: '85bae0',
        data4: '5da3d5',
        data5: '348ccb',
        defaultFill: 'rgba(115,115,115,0.9)'
    },
    data: dataList,
    done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            donut(findCountry(countries, geography.properties.name), dataList)
        });
    },
    geographyConfig:{
        highlightFillColor: 'b3b3cc',
        popupTemplate: function(geography, dataList) {
	          if (!dataList) { return ; }
		        return '<div class="hoverinfo"><strong>' + geography.properties.name +
		        '</strong><br/>Population: ' + dataList.population +
            ' <br/>Surface in Km2: ' + dataList.sqkm +
		        ' </div>'
	      },
      }
  });


function findCountry(array, value){
    // loop that finds the country code for every country on the map
    for (var i = 0, j = array.length; i < j; i++)
    {
         if ( array[i].properties.name === value)
    {
    return countries[i].id;
   }
  }
 }

function donut(code, dataList){
    (function(d3) {
    'use strict';

    // preparing the dataset
    var dataset = [
        { label: 'users', count: dataList[code].users },
        { label: 'population', count: dataList[code].population },
      ];
    // define the sizes of the donut
    var margin = {top: 50, right: 30, bottom: 30, left: 40}
    var width = 400;
    var height = 400;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    var legendRectSize = 18;
    var legendSpacing = 4;
    var color = d3.scale.category20c();

    // creating the tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return '<div class="hoverinfo"><strong>' + dataList[code].country + "</strong>" +
          "</br> Total population: " + dataList[code].population +
          "</br> Internet users: " + dataList[code].users +
          "</br> Penetration: " + dataList[code].penetration + "%" +
          "</br> Penetration = users/population*100 " + "</span>";
        });

    // select the chart and give dimensions
    var svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
          ',' + (height / 2) + ')');

    // set the dimensions of the arc
    var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

    // set the values to calculate arc
    var pie = d3.layout.pie()
        .value(function(d) { return d.count; })
        .sort(null);

    // create a path to draw the donut
    var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
          return color(d.data.label);
        });

    // call the tooltip to show
    svg.call(tip);

    // create the legen with appropriate dimensions
    var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * color.domain().length / 2;
        var horz = -2 * legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    // give a title to the donut
    svg.append("text")
        .attr("y", -75)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(dataList[code].country);

    // mouseover function for the tooltip
    svg.selectAll("path")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    // append the legend blocks with color
    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

     // apped the legend text
    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; });

        })(window.d3);
    }

//function that removes all the donuts
// function removeDonuts() {
//     svg.select('#chart').remove()
//     return false
// }

});
