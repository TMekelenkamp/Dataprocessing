// Thom Mekelenkamp

var data1 = d3.json("data1.json", function(data){
    console.log(data.data1[0]);
});

var data2 = d3.json("data2.json", function(data){
    console.log(data.data2[0]);
});
