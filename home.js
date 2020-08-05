

function loadList(List){
    fetch('http://localhost:3001/products')
    .then(res => res.json())
    .then(data => {
        for(let item of data){
            addItem(createItem(item), false, item.id);
        }
    })
    .catch(e => console.log(e.message));
}


function delItem(event){
    if(event.target.className  !== 'delButton'){
        return;
    }

    let item = event.target.closest('li');
    const xhl = new XMLHttpRequest();

    xhl.onload = () => {
        let itemDetails = {
            name: item.querySelector('.itemName').innerText,
            price : item.querySelector('.itemPrice').innerText
        }
        deletedItems.unshift(itemDetails);
        if(deletedItems.length > 5){
            let delItem = deletedItems.pop();
            delItem.remove();
        }
        item.remove();
    }
    xhl.open('DELETE', `http://localhost:3001/product/${item.id}`);
    xhl.send();

}

 function createItem(newItem){
    let newLi  = document.createElement('li');
    newLi.className = 'Item';

    let listItem = document.createElement('label');
    listItem.className = 'itemName';
    listItem.innerText = newItem.name;

    let listPrice = document.createElement('label');
    listPrice.className = 'itemPrice';
    listPrice.innerText = newItem.price;

    let = delButton = document.createElement('button');
    delButton.className = 'delButton';
    delButton.innerText='delete';
    delButton.addEventListener('click', delItem);

    newLi.appendChild(listItem);
    newLi.appendChild(listPrice);
    newLi.appendChild(delButton);

    return newLi;
}

function addItem(node, isNew, id){
    let List = document.querySelector('#shoppingList');
    let nodeName = node.querySelector('.itemName').innerText;
    let nodePrice = node.querySelector('.itemPrice').innerText;
    let itemInput = document.querySelector('#newItemInput');
    let itemPrice = document.querySelector('#newPriceInput');

    if(isNew) {
        axios.post('http://localhost:3001/product', {name: nodeName, price: nodePrice})
        .then(res => {
            node.id = res.data.id;
        })
        .catch(e => console.log(e.message));
        }
        else{
            node.id = id;
        }
    List.appendChild(node);
    itemInput.value ='';
    itemPrice.value ='';
    itemInput.focus();
    
}


let item = document.querySelector('#newItemInput');
let price = document.querySelector('#newPriceInput');


let addButton = document.querySelector('#newItemButton');
addButton.addEventListener('click', () => {
    addItem(createItem({name: item.value, price: price.value}), true);
});

item.addEventListener('keyup', () => {
    if(event.keyCode === 13){
    addItem(createItem({name: item.value, price: price.value}), true);
    }
});


const List = document.querySelector('#shoppingList');

loadList(List);


let deletedItems =[];
let undoButton = document.querySelector('#undo');
undoButton.addEventListener('click', function(){
    if(deletedItems.length === 0){
        return ;
    }
    
    addItem(createItem(deletedItems.shift()), true);
});