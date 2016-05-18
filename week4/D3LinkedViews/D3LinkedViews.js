

// window.onload = function(){

var countries = Datamap.prototype.worldTopo.objects.world.geometries;

d3.json("data.json", function(error, data){

  var data = data.data
  
  // var color = d3.scale.linear()
  //     .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);

  var dataList = {};
  for (var i = 0; i < 258; i++)
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


console.log(dataList);

var map = new Datamap({element: document.getElementById('map'),
  fills: {
      data1: '827FB2',
      data2: '585594',
      data3: '363377',
      data4: '1D1959',
      data5: '0B083B',
      defaultFill: 'rgba(115,115,115,0.9)' // Any hex, color name or rgb/rgba value
    },
  data: dataList
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


 });
