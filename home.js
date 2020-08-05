

function loadList(List){
    fetch('http://localhost:3001/products')
    .then(res => res.json())
    .then(data => {
        for(let item of data){
            addItem(createItem(item.name), false, item.id);
        }
    })
    .catch(e => console.log(e.message));
}


async function delItem(event){

    if(event.target.className  !== 'delButton'){
        return;
    }

    let item = event.target.closest('li');
    const xhl = new XMLHttpRequest();

    xhl.onload = () => {

        deletedItems.unshift(item.outerHTML);
        
        if(deletedItems.length > 5){
            let delItem = deletedItems.pop();
            delItem.remove();
        }

        item.remove();
    }
    
    xhl.open('DELETE', `http://localhost:3001/products/${item.id}`);
    xhl.send();

}

 function createItem(newItem){
    let newLi  = document.createElement('li');
    newLi.className = 'Item';

    let listItem = document.createElement('label');
    listItem.className = 'itemName';
    listItem.innerText = newItem;

    let = delButton = document.createElement('button');
    delButton.className = 'delButton';
    delButton.innerText='delete'

    newLi.appendChild(listItem);
    newLi.appendChild(delButton);

    return newLi;
}

async function addItem(node, isNew, id){
    let List = document.querySelector('#shoppingList');
    let nodeName = node.querySelector('.itemName').value;
    let itemInput = document.querySelector('#newItemInput');

    if(isNew) {
        await axios.post('http://localhost:3001/product', {name: nodeName})
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
    itemInput.focus();
    
}


let item = document.querySelector('#newItemInput');

let addButton = document.querySelector('#newItemButton');
addButton.addEventListener('click', () => {
    addItem(createItem(item.value), true);
});

item.addEventListener('keyup', () => {
    if(event.keyCode === 13){
    addItem(createItem(item.value), true);
    }
});

let List = document.querySelector('#shoppingList');
List.addEventListener('click', delItem);


loadList(List);


let deletedItems =[];
let undoButton = document.querySelector('#undo');
undoButton.addEventListener('click', function(){
    if(deletedItems.length === 0){
        return ;
    }
    let retItem = deletedItems.shift();
    addItem(createItem(retItem), true);
});