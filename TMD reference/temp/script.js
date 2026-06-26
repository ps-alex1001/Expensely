(function() {
    var message = document.getElementById("myMessage").value;
    document.getElementById("msgToShow").innerText = message;
})()

function displaymessage(){
    document.getElementById("sum").value = num1 + num2;
    var message = document.getElementById("myMessage").value;
    document.getElementById("msgToShow").innerText = message;
    
    // document.getElementById("msgToShow").textContent
}

function getAll(){
    var num1 = parseInt(document.getElementById("num1").value);
    var num2 = parseInt(document.getElementById("num2").value);
    var sum = num1 + num2;
    var diff = num1 - num2;
    var prod = num1 * num2;
    var quo = num1 / num2;
    var msg = "";
    var avg = (num1 + num2) / 2;
    document.getElementById("sum").value = sum;
    document.getElementById("diff").value = diff;
    document.getElementById("prod").value = prod;
    document.getElementById("quo").value = quo;
    document.getElementById("avg").innerText = avg;
    if (sum > 500) {
        msg = "Greater Than 500!"

    } else if (sum < 500) {
        msg = "Lesses Than 500!"
    } else {
        msg = "Equals to 500!"
    }

document.getElementById("comment").innerText = msg;
}
// Array mo
function viewArray(){
    var arrMovies = ["Harry Potter",
         "MCU",
         "Fast and the Furious",
        "Superman"];
    var val = document.getElementById('movie').value;
    document.getElementById("selectedMovie").innerText = arrMovies[val];
}


