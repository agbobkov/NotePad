const database = [{
    "id": "f88201f2-f828-11eb-9a03-0242ac130003",
    "name": "Bobkov",
    "tel": "123456444"
}, {
    "id": "086cc746-f829-11eb-9a03-0242ac130003",
    "name": "Gromenko",
    "tel": "987654"
}, {
    "id": "41482cde-f8df-11eb-9a03-0242ac130003",
    "name": "Lihonin",
    "tel": "543210"
}];

rendering()

// вывод на экран

function rendering() {
    let numberString = 1; // задаем начальный номер строки

    database.forEach(function (obj) { // перебираем массив, получая каждый элемент массива (то есть объект) отдельно
        let tableStart = document.getElementById('tableStart'); // элемент куда вставляем строки
        tableStart.insertAdjacentHTML('beforeend', '\
        <tr> \
         <td> ' + numberString + ' </td> \
         <td> ' + obj.name + '</td> \
         <td > ' + obj.tel + ' </td> \
         <td> <button onclick="deleteObject(this)" id="' + obj.id + '">Delete</button> </td> \
         </tr>')
        numberString += 1;
    });
}

// удаляем строки таблицы, которые были добавлены

function deleteObject(button) {
    let rowsForDelete = document.getElementById('tableStart').querySelectorAll('*'); // получаем набор всех добавленных элементов (строк)
    for (let elem of rowsForDelete) // перебираем все выбранные элементы, удаляя их
        elem.remove();   // удаляем все отрисованные строки
    removeByIdButton(button);  // вызываем функцию удаления объекта
};

// удаляем объект из массива

function removeByIdButton(button) {
    let idButton = button.id; // получаем id кнопки равное id объекта

    let indexArrayForDelete = database.findIndex(function (obj) { // перебираем каждый объект в массиве
        return obj.id === idButton // если ключ .id перебираемого объекта равен значению id кнопки возвращаем значение элемента массива
    });

    database.splice(indexArrayForDelete, 1); // удаляем объект из массива
    console.log(database);
    rendering() // отрисовываем таблицу заново
};