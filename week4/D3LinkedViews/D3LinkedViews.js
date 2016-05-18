

// window.onload = function(){

var countries = Datamap.prototype.worldTopo.objects.world.geometries;

d3.json("data.json", function(error, data){

  var data = data.data

  var dataList = {};
  for (var i = 0; i < data.length; i++)
  {
    if (data[i].pop < 1000000)
    {
      color = 'data1';
    }
    else if (data[i].pop < 10000000) {
      color = 'data2'
    }
    else if (data[i].pop < 25000000){
      color = 'data3';
    }
    else if (data[i].pop < 50000000){
      color = 'data4';
    }
    else{
      color = 'data5';
    }
    code = findCountry(countries, data[i].country)
    dataList[code] = {country: data[i].country, population: data[i].pop ,
       users: data[i].users, penetration: data[i].penetration,
       sqkm: data[i].sqkm, fillKey: color};
  }


// console.log(dataList["NLD"].pop);

var map = new Datamap({element: document.getElementById('map'),
  fills: {
      data1: '827FB2',
      data2: '585594',
      data3: '363377',
      data4: '1D1959',
      data5: '0B083B',
      defaultFill: 'rgba(115,115,115,0.9)' // Any hex, color name or rgb/rgba value
    },
  data: dataList,
  done: function(datamap) {
    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
      pie(findCountry(countries, geography.properties.name), dataList);
      // var count = 0;
      // if (count = 0)
      // {
      //   count += 1;
      //   console.log(count);
      //   pie(findCountry(countries, geography.properties.name), dataList);
      // }
      // else if(count >= 1){
      //   console.log('else');
      //   console.log(document.getElementById('.chart'))
      //   update(findCountry(countries, geography.properties.name), dataList);

      // }

            });
        },
  geographyConfig:{
    // highlightFillColor:
    popupTemplate: function(geography, dataList) {
	        		if (!dataList) { return ; }
		            return '<div class="hoverinfo"><strong>' + geography.properties.name +
		            '</strong><br/>Population: ' + dataList.population +
                ' <br/>Surface: ' + dataList.sqkm +
		            ' </div>'
	          },

  }
    });


 function findCountry(array, value){
   for (var i = 0, j = array.length; i < j; i++)
   {
     if ( array[i].properties.name === value)
     {
       return countries[i].id;
     }
   }
 }


 function pie(code, dataList){

 (function(d3) {
   'use strict';


  //  console.log(code);
   var dataset = [
     { label: 'users', count: dataList[code].users },
     { label: 'population', count: dataList[code].population },
        ];

   var width = 360;
   var height = 360;
   var radius = Math.min(width, height) / 2;
   var donutWidth = 75;
   var legendRectSize = 18;                                  // NEW
   var legendSpacing = 4;                                    // NEW

   var color = d3.scale.category20b();

   var svg = d3.select('#chart')
     .append('svg')
     .attr('width', width)
     .attr('height', height)
     .append('g')
     .attr('transform', 'translate(' + (width / 2) +
       ',' + (height / 2) + ')');

   var arc = d3.svg.arc()
     .innerRadius(radius - donutWidth)
     .outerRadius(radius);

   var pie = d3.layout.pie()
     .value(function(d) { return d.count; })
     .sort(null);

   var path = svg.selectAll('path')
     .data(pie(dataset))
     .enter()
     .append('path')
     .attr('d', arc)
     .attr('fill', function(d, i) {
       return color(d.data.label);
     });

   var legend = svg.selectAll('.legend')                     // NEW
     .data(color.domain())                                   // NEW
     .enter()                                                // NEW
     .append('g')                                            // NEW
     .attr('class', 'legend')                                // NEW
     .attr('transform', function(d, i) {                     // NEW
       var height = legendRectSize + legendSpacing;          // NEW
       var offset =  height * color.domain().length / 2;     // NEW
       var horz = -2 * legendRectSize;                       // NEW
       var vert = i * height - offset;                       // NEW
       return 'translate(' + horz + ',' + vert + ')';        // NEW
     });
                                                // NEW
   legend.append('rect')                                                               // NEW
     .attr('width', legendRectSize)                          // NEW
     .attr('height', legendRectSize)                         // NEW
     .style('fill', color)                                   // NEW
     .style('stroke', color);                                // NEW

   legend.append('text')                                     // NEW
     .attr('x', legendRectSize + legendSpacing)              // NEW
     .attr('y', legendRectSize - legendSpacing)              // NEW
     .text(function(d) { return d; });                       // NEW

 })(window.d3);
}


 });
