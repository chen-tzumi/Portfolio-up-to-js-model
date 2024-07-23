document.addEventListener('DOMContentLoaded', () => {
    const itemNameInput = document.getElementById('itemName');
    const itemPriceInput = document.getElementById('itemPrice');
    const addItemButton = document.getElementById('addItemButton');
    const shoppingTableBody = document.querySelector('#shoppingTable tbody');
   
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
   
    const renderShoppingList = () => {
      shoppingTableBody.innerHTML = '';
      shoppingList.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.price.toFixed(2)}</td>
          <td>
            <button class="action-button add-button" data-index="${index}">Add</button>
            <button class="action-button edit-button" data-index="${index}">Edit</button>
            <button class="action-button delete-button" data-index="${index}">Delete</button>
          </td>
        `;
        shoppingTableBody.appendChild(row);
      });
    };
   
    const saveShoppingList = () => {
      localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    };
   
    addItemButton.addEventListener('click', () => {
      const itemName = itemNameInput.value.trim();
      const itemPrice = parseFloat(itemPriceInput.value.trim());
      if (itemName && !isNaN(itemPrice)) {
        shoppingList.push({ name: itemName, price: itemPrice });
        saveShoppingList();
        renderShoppingList();
        itemNameInput.value = '';
        itemPriceInput.value = '';
      } else {
        alert('Please enter valid item name and price.');
      }
    });
   
    shoppingTableBody.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      if (event.target.classList.contains('delete-button')) {
        shoppingList.splice(index, 1);
        saveShoppingList();
        renderShoppingList();
      } else if (event.target.classList.contains('add-button')) {
        const item = shoppingList[index];
        shoppingList.push({ ...item });
        saveShoppingList();
        renderShoppingList();
      } else if (event.target.classList.contains('edit-button')) {
        const item = shoppingList[index];
        const newName = prompt('Edit item name:', item.name);
        const newPrice = prompt('Edit item price:', item.price);
        if (newName && !isNaN(newPrice)) {
          shoppingList[index] = { name: newName, price: parseFloat(newPrice) };
          saveShoppingList();
          renderShoppingList();
        } else {
          alert('Please enter valid item name and price.');
        }
      }
    });
   
    renderShoppingList();
   });
   