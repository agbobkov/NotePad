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

    database.forEach((obj) => { // iterate over the array, getting each element (object) separately
        let tableStart = document.getElementById('tableStart'); // element for paste row
        tableStart.insertAdjacentHTML('beforeend', '\
        <div class="grid-item"> ' + numberString + ' </div> \
        <div class="grid-item"> ' + obj.name + '</div> \
        <div class="grid-item"> ' + obj.tel + ' </div> \
        <div class="grid-item"> <button onclick="openEditForm(this)" idObject="' + obj.id + '">Edit</button> </div> \
        <div class="grid-item"> <button onclick="removeByAttrButton(this)" idObject="' + obj.id + '">Delete</button> </div> \
         ')
        numberString += 1;
    });
}

// delete object from array

function removeByAttrButton(button) {
    let idObject = button.getAttribute("idObject"); // get id button
    let indexArrayForDelete = database.findIndex((obj) => {
        return obj.id === idObject
    }); // iterate every object in array searsh index of element for delete
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

// popup Add

function openFormAdd() {
    document.getElementById("popupFormAdd").style.display = "block";
}

function closeFormAdd() {
    document.getElementById("popupFormAdd").style.display = "none";
    resetForm(0)
}

function resetForm(numberForm) {
    document.forms[numberForm].reset();
    document.getElementsByClassName('message-fault')[numberForm].innerHTML = '';
    document.forms[numberForm].elements.phone.style.border = "none";
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

    let isPhoneNumberValid = validPhone(0);
    if (isPhoneNumberValid) {
        closeFormAdd();
        deleteTable();
        database.push(newNote) // add new object in database
        rendering();
    };
};

function validPhone(numberForm) {
    let pattern = /^\d[\d\(\)\ -]{2,16}\d$/;
    let form = document.forms[numberForm].elements;
    let inputPhoneValue = form.phone.value;

    let correctNumber = pattern.test(inputPhoneValue); // return true or false
    let newNumber = database.findIndex((obj) => {
        return obj.tel === inputPhoneValue
    }); // iterate every object in array searsh index of phone number, if it is


    if (correctNumber === false) { // check is number correct
        form.phone.style.border = "2px solid red";
        document.getElementsByClassName('message-fault')[numberForm].innerHTML = 'Номер телефона введен не корректно!';
        //   document.getElementById('message-fault').innerHTML = 'Номер телефона введен не корректно!';
        return false;
    };

    if (newNumber > -1) { // check is number exist
        form.phone.style.border = "2px solid red";
        document.getElementsByClassName('message-fault')[numberForm].innerHTML = 'Такой номер телефона уже существует!';
        return false;
    };
    return true;
}

// popup Edit

let numberElementForEdit = { // object for save index array for edit
    number: ""
};

function openEditForm(button) {
    document.getElementById("popupFormEdit").style.display = "block";
    let idObject = button.getAttribute("idObject"); // get id button
    let inputName = document.forms[1].elements.name
    let inputPhone = document.forms[1].elements.phone
    let i = database.findIndex((obj) => {
        return obj.id === idObject
    });
    let findName = database[i].name;
    let findPhone = database[i].tel;
    inputName.setAttribute("value", findName);
    inputPhone.setAttribute("value", findPhone);
    numberElementForEdit.number = i;

    let buttonSubmit = document.forms[1].querySelector("button[type=submit]");
    buttonSubmit.setAttribute("disabled", "disabled");
    buttonSubmit.setAttribute("class", "disabled");
}

function activationButton() {
    //  let input = document.getElementById("inputButton");
    let buttonSubmit = document.forms[1].querySelector("button[type=submit]");
    buttonSubmit.removeAttribute("disabled");
    buttonSubmit.setAttribute("class", "btn");
}

function closeFormEdit() {
    document.getElementById("popupFormEdit").style.display = "none";
    resetForm(1)
}

function editNote() {
    let form = document.forms[1]; // get form
    let name = form.elements.name.value; // get name from form
    let phone = form.elements.phone.value; // get phone from form
    let elementForEdit = numberElementForEdit.number; // get index array for edit

    if (database[elementForEdit].tel !== phone) {
        if (validPhone(1)) {
            database[elementForEdit].name = name;
            database[elementForEdit].tel = phone;
            closeFormEdit();
            deleteTable();
            rendering();
        };
    } else {
        database[elementForEdit].name = name;
        closeFormEdit();
        deleteTable();
        rendering();
    }
}