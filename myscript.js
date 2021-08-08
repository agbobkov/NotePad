const database = [{
    "id": "f88201f2-f828-11eb-9a03-0242ac130003",
    "name": "Bobkov",
    "tel": "123456444"
}, {
    "id": "086cc746-f829-11eb-9a03-0242ac130003",
    "name": "Gromenko",
    "tel": "987654"
}, {
    "id": "1",
    "name": "Lihonin",
    "tel": "543210"
}];

rendering()

// функция вывода на экран

function rendering() {
    let numberString = 1; // задаем начальный номер строки

    database.forEach(function (element) { // перебираем массив, получая каждый объект отдельно
        let d1 = document.getElementById('one'); // добавляем номер строки
        d1.insertAdjacentHTML('beforebegin', '<div class="grid-item" render="yes">' + numberString + '</div>')
        numberString += 1;

        for (let value in element) { // перебираем каждое свойство объекта
            if (value !== "id") { // если ключ объекта не равен id, отрисуем значения
                let d1 = document.getElementById('one');
                d1.insertAdjacentHTML('beforebegin', '<div class="grid-item" render="yes">' + element[value] + '</div>') // создаем элемент <div> с присваиванием атрибута равного id и видимой части равной значению свойства объекта

                if (value === "tel") { // после ключа объекта "tel" добавляем кнопку
                    let d2 = document.getElementById('one');
                    d2.insertAdjacentHTML('beforebegin', '<div class="grid-item" render="yes"><button onclick="deleteObject(this)" row="' + element.id + '">Delete</button></div>')
                }
            }
            // debugger;
        }
    });
}

// функция удаления объекта с базы данных

function deleteObject(button) {

    // удаляем элементы таблицы, которые были добавлены
    let e1 = button.getAttribute("row"); // получаем значение строки в которой нажата кнопка
    let e = document.querySelectorAll('div[render="yes"]'); // получаем набор узлов с той же строкой, что и кнопка
    for (let elem of e) // перебираем все выбранные элементы, удаляя их
        elem.remove();

    // ищем и удаляем элемент из массива с заданным id

    removeByKeyValue(database, "id", e1); // вызываем функцию с аргументами массив-атрибут-значение

    function removeByKeyValue(arr, key, value) { // определяем функцию удаления объекта из массива с определенным значением свойства

        let i = arr.length; // длина массива
        while (i--) { // пока i не станет равно 0 выполняем следующий код
            if (arr[i] // если объект
                &&
                arr[i].hasOwnProperty(key) // имеет ключ key 
                &&
                (arguments.length > 2 && arr[i][key] === value)) { // и (число аргументов переданных в функцию > 2 и значение свойства объекта равно аргументу value)

                arr.splice(i, 1); // удаляем один элемент из массива начиная с i-го
            }
        }
        return arr;
    };
    console.log(database);
    rendering()   // отрисовываем таблицу заново
};