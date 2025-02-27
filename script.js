let cart = [];

function addItem(checkbox) {
    let itemName = checkbox.nextSibling.textContent.trim().split(" (")[0];
    let itemPrice = parseFloat(checkbox.value);
    
    if (checkbox.checked) {
        cart.push({ name: itemName, price: itemPrice });
    } else {
        cart = cart.filter(item => item.name !== itemName);
    }
    displayCart();
}

function removeItem(index) {
    let itemName = cart[index].name;
    document.querySelectorAll("input[type=checkbox]").forEach(checkbox =>{
        if(checkbox.nextSibling.textContent.trim().split("(")[0]== itemName){
            checkbox.checked = false;
        }

    })
    cart.splice(index, 1);
    displayCart();
}

function displayCart() {

    let cartTable = document.getElementById("cart");
    let totalPrice = 0;
    // Clear existing rows
    cartTable.innerHTML = `
        <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
    `;

    cart.forEach((item, index) => {
        totalPrice += item.price;
        cartTable.innerHTML += `
            <tr>
                <td>${item.name.split(" - ")[0]}</td>

                <td>₱${item.price.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button></td>
            </tr>`;
    });
    document.getElementById("totalPrice").innerText = `₱${totalPrice.toFixed(2)}`;
}
