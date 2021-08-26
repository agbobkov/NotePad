const db = [{
    id: "f88201f2-f828-11eb-9a03-0242ac130003",
    name: "Bobkov",
    phone: [{
        id: 1,
        idUser: "f88201f2-f828-11eb-9a03-0242ac130003",
        phoneNumber: "111111",
        phoneType: "mobile",
    }, {
        id: 2,
        idUser: "f88201f2-f828-11eb-9a03-0242ac130003",
        phoneNumber: "111112",
        phoneType: "home",
    }, {
        id: 3,
        idUser: "f88201f2-f828-11eb-9a03-0242ac130003",
        phoneNumber: "111113",
        phoneType: "work",
    }],
    note: "Прилетело НЛО и опубликовало эту запись здесь"
}, {
    id: "086cc746-f829-11eb-9a03-0242ac130003",
    name: "Gromenko",
    phone: [{
        id: 4,
        idUser: "086cc746-f829-11eb-9a03-0242ac130003",
        phoneNumber: "222221",
        phoneType: "mobile",
    }, {
        id: 5,
        idUser: "086cc746-f829-11eb-9a03-0242ac130003",
        phoneNumber: "222222",
        phoneType: "home",
    }, {
        id: 6,
        idUser: "086cc746-f829-11eb-9a03-0242ac130003",
        phoneNumber: "222223",
        phoneType: "work",
    }],
    note: ""
}, {
    id: "41482cde-f8df-11eb-9a03-0242ac130003",
    name: "Lihonin",
    phone: [{
        id: 7,
        idUser: "41482cde-f8df-11eb-9a03-0242ac130003",
        phoneNumber: "",
        phoneType: "mobile",
    }, {
        id: 8,
        idUser: "41482cde-f8df-11eb-9a03-0242ac130003",
        phoneNumber: "333332",
        phoneType: "home",
    }, {
        id: 9,
        idUser: "41482cde-f8df-11eb-9a03-0242ac130003",
        phoneNumber: "333333",
        phoneType: "work",
    }],
    note: "Здесь могла бы быть ваша реклама"
}, {
    id: "4984564cde-f8df-11eb-9a03-0242ac130003",
    name: "Sokolov",
    phone: [{
        id: 10,
        idUser: "4984564cde-f8df-11eb-9a03-0242ac130003",
        phoneNumber: "444441",
        phoneType: "mobile",
    }, {
        id: 11,
        idUser: "4984564cde-f8df-11eb-9a03-0242ac130003",
        phoneNumber: "444442",
        phoneType: "home",
    }, {
        id: 12,
        idUser: "4984564cde-f8df-11eb-9a03-0242ac130003",
        phoneNumber: "444443",
        phoneType: "work",
    }],
    note: ""
}];

let database = [];

let loadPage = async () => {
    return db
};

loadPage().then((value) => {
    database = value.map((obj) => ({
        ...obj
    }));
    rendering();
});

function rendering() {
    let numberString = 1; // set first number string

    database.forEach((obj) => { // iterate over the array, getting each element (object) separately

        let tableStart = document.getElementById('tableStart'); // element for paste row
        tableStart.insertAdjacentHTML('beforeend', '\
        <div class="grid-item"> ' + numberString + ' </div> \
        <div class="grid-item"> ' + obj.name + '</div> \
        <div class="grid-item" idObject="' + obj.id + '"></div> \
        <div class="grid-item"> ' + obj.note + ' </div> \
        <div class="grid-item"> <button onclick="openEditForm(this)" idObject="' + obj.id + '">Edit</button> </div> \
        <div class="grid-item"> <button onclick="removeByAttrButton(this)" idObject="' + obj.id + '">Delete</button> </div> \
        ')
        numberString += 1;
    });
    insertPhone()
}

function insertPhone() {
    database.forEach((obj) => {
        let dataPhone = obj.phone
        dataPhone.forEach((obj) => {
            if (obj.phoneNumber !== "") {
                let phoneCell = document.querySelector(`div[idObject="${obj.idUser}"]`);
                phoneCell.insertAdjacentHTML('beforeend', '\
                    <div> ' + obj.phoneType + ': ' + obj.phoneNumber + ' </div>  \
                    ');
            };
        });
    });
};


// delete object

function removeByAttrButton(button) {
    let idObject = button.getAttribute("idObject"); // get id button
    deleteObject(idObject).then((value) => {
        if (value) {
            deleteTable()
            loadPage().then((value) => {
                database = value.map((obj) => ({
                    ...obj
                }));
                rendering();
            });
        };
    });
};

let deleteObject = async (idObject) => {
    let indexArrayForDelete = database.findIndex((obj) => {
        return obj.id === idObject
    }); // iterate every object in array searsh index of element for delete
    db.splice(indexArrayForDelete, 1);
    return true
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

function closeForm(popupId, nameForm) {
    document.getElementById(popupId).style.display = "none";
    resetForm(nameForm)
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

    let buttonSubmit = form.querySelector('button[type="submit"]');
    buttonSubmit.setAttribute("disabled", "disabled");
    buttonSubmit.setAttribute("class", "disabled");

    let phoneField = document.getElementById('phoneField').querySelectorAll('*');
    for (let elem of phoneField)
        elem.remove();

    clearInputInForm(nameForm);

}

function clearInputInForm(nameForm) {
    let form = document.forms[nameForm];
    let everyPhoneInput = form.querySelectorAll('input[type="phone"');
    for (key of everyPhoneInput) {
        key.style.border = "none";
    };

    let everyMessageFault = form.querySelectorAll('div[class="message-fault"]');
    for (key of everyMessageFault) {
        key.remove();
    };
};

// Add object

function addNote() {
    clearInputInForm('formAdd')

    let isPhoneNumberValid = validPhone('formAdd'); // get true or false
    if (isPhoneNumberValid) {
        getNewNoteFromForm('formAdd');
        let newNote = getNewNoteFromForm('formAdd');
        closeForm('popupFormAdd', 'formAdd');

        addObject(newNote).then((value) => {
            if (value) {
                deleteTable()
                loadPage().then((value) => {
                    database = value.map((obj) => ({
                        ...obj
                    }));
                    console.log(database)
                    rendering();
                });
            };
        });
    };
};

let addObject = async (newNote) => {

    let idUser = String(Math.random());

    let phoneArray = newNote.phone;
    phoneArray.forEach((obj) => {
        obj.id = String(Math.random()),
            obj.idUser = idUser;
    })

    let objectForAdd = Object.assign({
        id: idUser
    }, newNote);

    db.push(objectForAdd) // add new object in db
    return true
};

function getNewNoteFromForm(nameForm) {
    let form = document.forms[nameForm]; // get form
    let name = form.elements['name'].value; // get name from form
    let phoneField = form.querySelectorAll('div[class="flex-container"]');
    let note = form.querySelector('textarea').value; // get comment from form

    let phoneArray = [];

    for (key of phoneField) {
        let objPhoneNumber = {};
        let phoneInput = key.querySelector('input[type="phone"]')
        let typeInput = key.querySelector('select')

        objPhoneNumber.phoneNumber = phoneInput.value
        objPhoneNumber.phoneType = typeInput.value

        phoneArray.push(objPhoneNumber);
    };

    let newNote = {
        name: name,
        phone: phoneArray,
        note: note
    };
    return newNote;
}

// valid Phone

function validPhone(nameForm) {
    let form = document.forms[nameForm];
    let phone = form.querySelectorAll('input[type="phone"');
    let result = true;

    for (key of phone) {
        let inputPhoneValue = key.value; // get every phone from form
        if (isPhoneNumberCorrect(inputPhoneValue, key) === false) result = false; // check is phoneNumber correct
        if (isPhoneNumberExist(inputPhoneValue, key) === false) result = false; // check is phoneNumber correct
    };
    if (isPhoneAlreadyInput(nameForm) === false) result = false; // check is phoneNumber already input

    return result;
};

// check is phoneNumber correct
function isPhoneNumberCorrect(inputPhoneValue, key) {

    let pattern = /^\d[\d\(\)\ -]{2,16}\d$/;
    let isCorrectNumber = pattern.test(inputPhoneValue); // return true or false
    if (isCorrectNumber === false) { // check is number correct
        key.style.border = "2px solid red";
        key.insertAdjacentHTML('afterend', '<div class="message-fault">Номер телефона введен не корректно!</div>')
        return false;
    };
};

// check is phoneNumber exist
function isPhoneNumberExist(inputPhoneValue, key) {
    result = true;

    database.forEach((obj) => {
        let phoneArrayFromDatabase = obj.phone
        let isNewNumber = phoneArrayFromDatabase.findIndex((obj) => { // check is number exist
            return obj.phoneNumber === inputPhoneValue
        }); // iterate every object in array searsh index of phone number, if it is


        if (isNewNumber > -1) {
            key.style.border = "2px solid red";
            key.insertAdjacentHTML('afterend', '<div class="message-fault">Такой номер телефона уже существует!</div>')
            result = false;
        };
    });
    return result;
}

// check is phoneNumber already Input

function isPhoneAlreadyInput(nameForm) {
    let form = document.forms[nameForm];
    let phone = form.querySelectorAll('input[type="phone"');
    let phoneArray = [];
    result = true;
    for (key of phone) {
        let inputPhoneValue = key.value; // get every phone from form
        let isNumberAlreadyInput = phoneArray.findIndex((obj) => {
            return obj === inputPhoneValue
        }); // iterate every object in array searsh index of phone number, if it is

        if (isNumberAlreadyInput > -1) {
            key.style.border = "2px solid red";
            key.insertAdjacentHTML('afterend', '<div class="message-fault">Этот номер телефона уже введен!</div>')
            result = false;
        };
        phoneArray.push(inputPhoneValue);
    };
    return result;
};


// // popup Edit

// let tempObject = { // object for save index array for edit
//     id: "",
// };

// function openEditForm(button) {
//     document.getElementById("popupFormEdit").style.display = "block";
//     let idObject = button.getAttribute("idObject"); // get id button
//     let i = database.findIndex((obj) => {
//         return obj.id === idObject
//     });

//     let findName = database[i].name;
//     let findPhone = database[i].tel;
//     let findNote = database[i].note;

//     let form = document.forms['formEdit'] // get form
//     form.elements['name'].setAttribute("value", findName) // get input name
//     form.elements['phone'].setAttribute("value", findPhone) // get input phone
//     form.querySelector('textarea').value = findNote; // get comment from form

//     tempObject.id = idObject;
// };


// function editNote() {
//     let form = document.forms['formEdit']; // get form
//     let name = form.elements['name'].value; // get name from form
//     let phone = form.elements['phone'].value; // get phone from form
//     let note = form.querySelector('textarea').value; // get comment from form

//     let idObject = tempObject.id;
//     let elementForEdit = database.findIndex((obj) => { // get index array for edit
//         return obj.id === idObject
//     });



//     if (database[elementForEdit].tel !== phone) {
//         let isPhoneNumberValid = validPhone('formEdit')
//         if (isPhoneNumberValid) {
//             closeForm('popupFormEdit', 'formEdit');
//             let objectForEdit = {
//                 id: idObject,
//                 name: name,
//                 tel: phone,
//                 note: note
//             };
//             editObject(objectForEdit).then((value) => {
//                 if (value) {
//                     deleteTable()
//                     loadPage().then((value) => {
//                         database = value.map((obj) => ({
//                             ...obj
//                         }));
//                         rendering();
//                     });
//                 };
//             });
//         };
//     } else {
//         closeForm('popupFormEdit', 'formEdit');
//         let objectForEdit = {
//             id: idObject,
//             name: name,
//             tel: database[elementForEdit].tel,
//             note: note
//         };
//         editObject(objectForEdit).then((value) => {
//             if (value) {
//                 deleteTable()
//                 loadPage().then((value) => {
//                     database = value.map((obj) => ({
//                         ...obj
//                     }));
//                     rendering();
//                 });
//             };
//         });
//     };
// };

// let editObject = async (editObject) => {
//     let i = db.findIndex((obj) => {
//         return obj.id === editObject.id
//     });
//     db.splice(i, 1, editObject);
//     return true
// };


// add phone field

let numberAddField = 2; // set first number add phone

function addPhoneContainer() {
    let phoneContainerStart = document.getElementById('phoneField'); // element for paste 
    phoneContainerStart.insertAdjacentHTML('beforeend', '\
    <div class="flex-container" numberAddField="addField' + numberAddField + '">\
    <div> <input type="phone" placeholder="Телефон (обязательно)" \
    name="phone" required> </div> \
    <div> \
         <select name="typeNumber"> \
            <option value="mobile" selected>Mobile</option> \
            <option value="home">Home</option> \
            <option value="work">Work</option> \
         </select> \
    </div> \
    <div><button type="button" class="btn-del-phone" onclick="deletePhoneField(' + numberAddField + ')">X</button></div> \
          </div> \
    ')

    numberAddField += 1;
};


function deletePhoneField(numberAddField) {
    let phoneFieldForDelete = document.querySelector('div[numberAddField="addField' + numberAddField + '"]'); // get all row which rendered
    phoneFieldForDelete.remove();

};