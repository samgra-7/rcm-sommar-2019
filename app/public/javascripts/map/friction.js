var chosenFriction = [];


function addFriction(obj, circle, button) {
    button.innerText = "Ta bort";
    button.className = "remove-button";
    circle.setStyle({color: '#F00'});
    addFrictionBox(obj, circle, button);
    chosenFriction.push(obj);

}

function removeFriction(obj, circle, button) {
    const i = chosenFriction.findIndex(x => x.id == obj.id);

    if(i != undefined) {
        button.innerText = "Lägg till";
        button.className = "add-button"; 
        circle.setStyle({color: '#0a7bf5'});       
        $('div[class=obj-box][id="' + obj.id + '"]').remove()
        chosenFriction.splice(i, 1);

    }
    // Toggle field
    if(chosenFriction.length === 0) {
        updateStationField();
        hideStationButton();
    } 
}

function handleChosenFriction(obj, circle, button){
    // Toggle field
    
    if(!(chosenFriction.find(x => x.id === obj.id))) {
        if(chosenFriction.length === 0) {
            showStationBar();
        }
        addFriction(obj, circle, button);

    } else {
        removeFriction(obj, circle, button);

    }
}