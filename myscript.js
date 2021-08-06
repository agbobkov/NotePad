const database = [{
    "id": 1,
    "name": "Bobkov",
    "tel": "123456444"
}, {
    "id": 2,
    "name": "Gromenko",
    "tel": "987654"
}];

database.forEach(function (element) {
    console.log(element);
    for (let value in element) {
        let d1 = document.getElementById('one');
        d1.insertAdjacentHTML('beforebegin', '<div class="grid-item">' + element[value] + '</div>')
        console.log(element[value]);
    }

});