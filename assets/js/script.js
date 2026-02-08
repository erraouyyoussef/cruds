const nameInput = document.getElementById('nameInput');
const priceInput = document.getElementById('priceInput');
const quantityInput = document.getElementById('quantityInput');
const dateInput = document.getElementById('dateInput');
const AddProduct_btn = document.getElementById('AddProduct_btn');
const DeleteAll = document.getElementById('deletAll');
const SearchInput = document.getElementById('searchInput');
let form1 = document.getElementById('form1');


let mood = 'AddProduct';
let temp;

// let data;
// if (localStorage.getItem('data')) {
//     data = JSON.parse(localStorage.getItem('data'));
// } else {
//     data = [];
// };

let data = JSON.parse(localStorage.getItem('data')) || [];


form1.addEventListener('submit', function (e) {
    e.preventDefault();
    Add_to_table();
})



function Add_to_table() {
    let name = nameInput.value.trim().toLowerCase();
    let price = priceInput.value;
    let quantity = quantityInput.value;
    let date = dateInput.value;

    if (name == '' || price == '' || quantity == '' || date == '') {
        alert('All Fields Are Rerquired');
    } else {
        let product = { name, price, quantity, date };


        if (mood == 'Update') {
            data[temp] = product;
            AddProduct_btn.innerHTML = 'Add Product'
            mood = 'AddProduct';

        } else {
            data.push(product);
        }

        localStorage.setItem('data', JSON.stringify(data));

    }

    ShowData()
    form1.reset()

}


function ShowData() {

    let table = '';
    for (let i = 0; i < data.length; i++) {

        table += `
    <tr>
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].quantity}</td>
        <td>${data[i].date}</td>
        <td>${data[i].price * data[i].quantity}</td>
        <td>
            <button
                class="btn btn-danger btn-sm w-100" onclick="Delete_item(${i})">Delete</button>
        </td>
        <td>
            <button
                class="btn btn-primary btn-sm w-100" onclick="Edit_item(${i})">Edit</button>
        </td>
    </tr>`
    }
    document.querySelector('table tbody').innerHTML = table;

    if (data.length > 1) {
        DeleteAll.innerHTML = `
        <button class="btn btn-danger btn-sm w-100" onclick="Delete_All()" >Delete All (${data.length})</button> 
         `;
    } else {
        DeleteAll.innerHTML = '';
    };

}


function Delete_item(id) {
    let confirmation = confirm('Are You Sure ?')
    if (confirmation == true) {
        data.splice(id, 1);
        localStorage.setItem('data', JSON.stringify(data))
        ShowData()
    } else {
        ShowData()
    }
}


function Edit_item(id) {
    document.getElementById('nameInput').value = data[id].name;
    document.getElementById('priceInput').value = data[id].price;
    document.getElementById('quantityInput').value = data[id].quantity;
    document.getElementById('dateInput').value = data[id].date;

    AddProduct_btn.innerHTML = 'Update';
    mood = 'Update';
    temp = id;

}


function Delete_All() {
    let confirmation = confirm('This Action Will Delete All Data Are Sure?')
    if (confirmation == true) {
        data.length = 0;
        localStorage.setItem('data', JSON.stringify(data));
        ShowData()
    }
}

form2.addEventListener('submit', function (e) {
    e.preventDefault();
    Search();
})



function Search() {
    let value = SearchInput.value.trim().toLowerCase()
    let table = '';
    for (let i = 0; i < data.length; i++) {

        if (data[i].name.includes(value)) {
            table += `
    <tr>
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].quantity}</td>
        <td>${data[i].date}</td>
        <td>
            <button
                class="btn btn-danger btn-sm w-100" onclick="Delete_item(${i})">Delete</button>
        </td>
        <td>
            <button
                class="btn btn-primary btn-sm w-100" onclick="Edit_item(${i})">Edit</button>
        </td>
    </tr>`
        }
        document.querySelector('table tbody').innerHTML = table;

    }
}




function dateTime() {
    const displayTime = document.getElementById('Time');
    const displayDate = document.getElementById('Date');
    const date = new Date();

    hours = date.getHours()
    minutes = date.getMinutes()
    secondes = date.getSeconds()
    displayTime.textContent = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(secondes).padStart(2, '0')}`;

    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear()
    displayDate.textContent = `${String(day).padStart(2,'0')} / ${String(month).padStart(2,'0')} / ${year}`


}
setInterval(dateTime, 1000);

ShowData()


