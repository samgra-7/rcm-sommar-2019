function addFrictionBox(obj, circle, button) {
    const frictionBox = `<div id='${obj.id}' class="obj-box"></div>`;
    const buttonList = $('<button/>', {
        id: obj.id,
        class: "remove-button",
        text: "Ta bort",
        click: function () { removeFriction(obj, circle, button) }
    });
    const buttonGoToFriction = $('<button/>', {
        class: "button",
        text: "Gå till vägmätning",
        click: function () { zoomToObj(obj) }
    });
    const $frictionList = $("#obj-list");
    $frictionList.append($(frictionBox).append(buttonGoToFriction, buttonList));
}

