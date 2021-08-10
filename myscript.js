const database = [{
    id: "f88201f2-f828-11eb-9a03-0242ac130003",
    name: "Bobkov",
    tel: "123456444"
}, {
    id: "086cc746-f829-11eb-9a03-0242ac130003",
    name: "Gromenko",
    tel: "987654"
}, {
    id: "41482cde-f8df-11eb-9a03-0242ac130003",
    name: "Lihonin",
    tel: "543210"
}];

rendering()

function rendering() {
    let numberString = 1; // set first number string

    database.forEach(function (obj) { // iterate over the array, getting each element (object) separately
        let tableStart = document.getElementById('tableStart'); // element for paste row
        tableStart.insertAdjacentHTML('beforeend', '\
        <div class="grid-item"> ' + numberString + ' </div> \
        <div class="grid-item"> ' + obj.name + '</div> \
        <div class="grid-item"> ' + obj.tel + ' </div> \
        <div class="grid-item"> <button onclick="removeByIdButton(this)" id="' + obj.id + '">Delete</button> </div> \
         ')
        numberString += 1;
    });
}

// delete object from array

function removeByIdButton(button) {
    let idButton = button.id; // get id button

    let indexArrayForDelete = database.findIndex(function (obj) { // iterate every object in array
        return obj.id === idButton // searsh index of element for delete
    });

    database.splice(indexArrayForDelete, 1); // delete find element from array

    deleteTable();
    rendering()
};

// deleteTable

function deleteTable() {
    let rowsForDelete = document.querySelectorAll('div[class="grid-item"]'); // get all row which rendered
    for (let elem of rowsForDelete)
        elem.remove();
};

// popup

function openForm() {
    document.getElementById("formAdd").style.display = "block";
}

function closeForm() {
    document.getElementById("formAdd").style.display = "none";
}

function addNote() {
    let form = document.forms[0]; // get form
    let name = form.elements.name.value; // get name from form
    let phone = form.elements.phone.value; // get phone from form
    let newNote = {
        id: String(Math.random()),
        name: name,
        tel: phone
    };
    database.push(newNote) // add new object in database

    closeForm();
    deleteTable()
    rendering();
}