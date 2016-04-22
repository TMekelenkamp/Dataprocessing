// Thom Mekelenkamp
/* use this to test out your function */
window.onload = function() {
 	changeColor("it", "#ff3000");
 	changeColor("pl", "#ff0360");
 	changeColor("se", "#ff4400");
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
        
    // log for checking 
    console.log(id);
    console.log(color);
    // fill the element by ID with the color from onload func
    document.getElementById(id).setAttribute("fill", color);

}