console.log("The Javascript is Working, or at least it should be.");

var color;

console.log(color);
changeColor();
console.log(color);
changeColor();
console.log(color);
changeColor();
console.log(color);
changeColor();
console.log(color);
console.log("And it's back to green again . . .")

function changeColor() {
    switch(color) {
        case "red":
            color = "blue";
            break;
        case "green":
            color = "red";
            break;
        default:
            color = "green";
        
    }
}