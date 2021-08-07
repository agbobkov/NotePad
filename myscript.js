const database = [{
    "id": 1,
    "name": "Bobkov",
    "tel": "123456444"
}, {
    "id": 2,
    "name": "Gromenko",
    "tel": "987654"
}, {
    "id": 3,
    "name": "Lihonin",
    "tel": "543210"
}];

database.forEach(function (element) {            // перебираем массив, получая каждый объект отдельно
   console.log(element)
    for (let value in element) {          // перебираем каждое свойство элемента
        let d1 = document.getElementById('one');       
        d1.insertAdjacentHTML('beforebegin', '<div class="grid-item" row="' + element.id + '">' + element[value] + '</div>')    // создаем элемент <div> с присваиванием атрибута равного id и видимой части равной значению свойства объекта

        if (value === "tel") {    // после ключа объекта "tel" добавляем кнопку
            let d2 = document.getElementById('one');
            d2.insertAdjacentHTML('beforebegin', '<div class="grid-item" row="' + element.id + '"><button onclick="deleteSelf(this)" row="' + element.id + '">Delete</button></div>')
        }
        // debugger;
    }

});

function deleteSelf(button) {
    let e1 = button.getAttribute("row"); // получаем значение строки в которой нажата кнопка
    //     button.remove();
    let e = document.querySelectorAll('div[row="' + e1 + '"]'); // получаем набор узлов с той же строкой, что и кнопка
    for (let elem of e) // перебираем все выбранные узлы, добавляя к ним класс "невидимый"
        elem.classList.add("d-none");
}