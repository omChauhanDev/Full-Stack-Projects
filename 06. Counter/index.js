const content = document.querySelector("#counter");

function decrement (){
    //Access value from UI
    let value = parseInt(content.innerText);
    //Decrement the value
    value = value - 1;
    //Display the value in UI
    content.innerText = value;
}

function increment (){
    //Access value from UI
    let value = parseInt(content.innerText);
    //Increment the value
    value = value + 1;
    //Display the value in UI
    content.innerText = value;
}