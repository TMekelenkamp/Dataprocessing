// Thom Mekelenkamp
/* use this to test out your function */
window.onload = function() {
 	changeColor();
};

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
        
    // get data from html object
    var obj = document.getElementById("data").innerHTML;

    // create var for the parsed data
    var dinges;
    dinges = JSON.parse(obj);

    // compares data for correct color usage
    for (var i = 0; i < 35; i++)
    {
        console.log(dinges.points[i].short + " - " + dinges.points[i].country + " - " + dinges.points[i].pop);
        // define colors
        color = "#fee5d9";
        color1 = "#fcae91";
        color2 = "#fb6a4a";
        color3 = "#de2d26";
        color4 = "#a50f15";

        if (dinges.points[i].pop < 10000000)
        {
            document.getElementById(dinges.points[i].short).setAttribute("fill", color);
        }
        else if (dinges.points[i].pop > 10000000 && dinges.points[i].pop < 25000000)
        {
            document.getElementById(dinges.points[i].short).setAttribute("fill", color1);
        }
        else if (dinges.points[i].pop > 25000000 && dinges.points[i].pop < 50000000)
        {
            document.getElementById(dinges.points[i].short).setAttribute("fill", color2);
        }
        else if (dinges.points[i].pop > 50000000 && dinges.points[i].pop < 75000000)
        {
            document.getElementById(dinges.points[i].short).setAttribute("fill", color3);
        }
        else if (dinges.points[i].pop > 75000000)
        {
            document.getElementById(dinges.points[i].short).setAttribute("fill", color4);
        }
    }
}
    
  

