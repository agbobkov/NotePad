const db = [{
    id: "f88201f2-f828-11eb-9a03-0242ac130003",
    name: "Bobkov",
    tel: "123456444",
    note: "Прилетело НЛО и опубликовало эту запись здесь"
}, {
    id: "086cc746-f829-11eb-9a03-0242ac130003",
    name: "Gromenko",
    tel: "987654",
    note: ""
}, {
    id: "41482cde-f8df-11eb-9a03-0242ac130003",
    name: "Lihonin",
    tel: "543210",
    note: "Здесь могла бы быть ваша реклама"
}, {
    id: "4984564cde-f8df-11eb-9a03-0242ac130003",
    name: "Sokolov",
    tel: "12345",
    note: ""
}];

let database = [];

let loadPage = async () => {
    return db
};

loadPage().then((value) => {
    database = value.map(a => ({
        ...a
    }));
    rendering();
})

rendering()

function rendering() {
    let numberString = 1; // set first number string

    database.forEach((obj) => { // iterate over the array, getting each element (object) separately
        let tableStart = document.getElementById('tableStart'); // element for paste row
        tableStart.insertAdjacentHTML('beforeend', '\
        <div class="grid-item"> ' + numberString + ' </div> \
        <div class="grid-item"> ' + obj.name + '</div> \
        <div class="grid-item"> ' + obj.tel + ' </div> \
        <div class="grid-item"> ' + obj.note + ' </div> \
        <div class="grid-item"> <button onclick="openEditForm(this)" idObject="' + obj.id + '">Edit</button> </div> \
        <div class="grid-item"> <button onclick="removeByAttrButton(this)" idObject="' + obj.id + '">Delete</button> </div> \
         ')
        numberString += 1;
    });
}

// delete object

function removeByAttrButton(button) {
    let idObject = button.getAttribute("idObject"); // get id button
    deleteObject(idObject).then((value) => {
        deleteTable()
        database = value.map(a => ({
            ...a
        }));
        rendering()
    });
};

let deleteObject = async (idObject) => {
    let indexArrayForDelete = database.findIndex((obj) => {
        return obj.id === idObject
    }); // iterate every object in array searsh index of element for delete
    db.splice(indexArrayForDelete, 1);
    return db
};

function deleteTable() {
    let rowsForDelete = document.querySelectorAll('div[class="grid-item"]'); // get all row which rendered
    for (let elem of rowsForDelete)
        elem.remove();
};

// open, clouse and reset form

function openForm(popupId) {
    document.getElementById(popupId).style.display = "block";
}

function closeForm(popupId) {
    document.getElementById(popupId).style.display = "none";
    resetForm("formAdd")
}

function activationButton(nameForm) {
    let buttonSubmit = document.forms[nameForm].querySelector('button[type="submit"]');
    buttonSubmit.removeAttribute("disabled");
    buttonSubmit.setAttribute("class", "btn");
}

function resetForm(nameForm) {
    let form = document.forms[nameForm];
    form.reset();
    form.querySelector('textarea').value = '';
    form.elements['phone'].style.border = "none";

    let buttonSubmit = form.querySelector('button[type="submit"]');
    buttonSubmit.setAttribute("disabled", "disabled");
    buttonSubmit.setAttribute("class", "disabled");
}

// Add object

function addNote() {
    let form = document.forms['formAdd']; // get form
    let name = form.elements['name'].value; // get name from form
    let phone = form.elements['phone'].value; // get phone from form
    let note = form.querySelector('textarea').value; // get comment from form

    let isPhoneNumberValid = validPhone('formAdd');
    if (isPhoneNumberValid) {
        closeForm('popupFormAdd');
        let newNote = {
            name: name,
            tel: phone,
            note: note
        };
        addObject(newNote).then((value) => {
            deleteTable()
            database = value.map(a => ({
                ...a
            }));
            rendering()
        });
    };
};

let addObject = async (newNote) => {
    let objectForAdd = Object.assign({
        id: String(Math.random())
    }, newNote);
    db.push(objectForAdd) // add new object in db
    return db
};

// valid Phone

function validPhone(nameForm) {
    let pattern = /^\d[\d\(\)\ -]{2,16}\d$/;
    let form = document.forms[nameForm];
    let inputPhoneValue = form.elements['phone'].value;

    let correctNumber = pattern.test(inputPhoneValue); // return true or false
    let newNumber = database.findIndex((obj) => {
        return obj.tel === inputPhoneValue
    }); // iterate every object in array searsh index of phone number, if it is


    if (correctNumber === false) { // check is number correct
        form.elements['phone'].style.border = "2px solid red";
        form.querySelector('div').innerHTML = 'Номер телефона введен не корректно!';
        //   document.getElementById('message-fault').innerHTML = 'Номер телефона введен не корректно!';
        return false;
    };

    if (newNumber > -1) { // check is number exist
        form.elements['phone'].style.border = "2px solid red";
        form.querySelector('div').innerHTML = 'Такой номер телефона уже существует!';
        return false;
    };
    return true;
};




// // popup Edit

// let numberElementForEdit = { // object for save index array for edit
//     number: ""
// };

// function openEditForm(button) {
//     document.getElementById("popupFormEdit").style.display = "block";
//     let idObject = button.getAttribute("idObject"); // get id button
//     let inputName = document.forms[1].elements.name
//     let inputPhone = document.forms[1].elements.phone
//     let inputNote = document.forms[1].querySelector('textarea'); // get comment from form
//     let i = database.findIndex((obj) => {
//         return obj.id === idObject
//     });
//     let findName = database[i].name;
//     let findPhone = database[i].tel;
//     let findNote = database[i].note;
//     inputName.setAttribute("value", findName);
//     inputPhone.setAttribute("value", findPhone);
//     inputNote.innerHTML = findNote;
//     numberElementForEdit.number = i;

// }


// function closeFormEdit() {
//     document.getElementById("popupFormEdit").style.display = "none";
//     resetForm(1)
// }

// function editNote() {
//     let form = document.forms[1]; // get form
//     let name = form.elements.name.value; // get name from form
//     let phone = form.elements.phone.value; // get phone from form
//     let note = document.forms[1].querySelector('textarea').value; // get comment from form
//     let elementForEdit = numberElementForEdit.number; // get index array for edit

//     if (database[elementForEdit].tel !== phone) {
//         if (validPhone(1)) {
//             database[elementForEdit].name = name;
//             database[elementForEdit].tel = phone;
//             database[elementForEdit].note = note;
//             closeFormEdit();
//             deleteTable();
//             rendering();
//         };
//     } else {
//         database[elementForEdit].name = name;
//         database[elementForEdit].note = note;
//         closeFormEdit();
//         deleteTable();
//         rendering();
//     }
// }