let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let bag = JSON.parse(localStorage.getItem("bag")) || [];

function totalProductInCart() {
  const cartQuantity = document.querySelector(".cart__quantity");
  cartQuantity.innerHTML = bag
    .map((item) => item.quantity)
    .reduce((sum, item) => sum + item, 0);
}

totalProductInCart();

let generateCartItems = () => {
  if (bag.length !== 0) {
    return (shoppingCart.innerHTML = bag
      .map((x) => {
        let matchingItem = products.find((item) => item.id === x.id) || [];
        let { name, img, price, id } = matchingItem;
        return `
                <div class="cart-item ">
                  <img src=${img} alt="product_image" />
                  <div class="cart-details">
                    <div class="title-price-x">
                      <h4>${name}</h4>
                      <button onclick="removeProductFromCart(${id})" class="remove-button">X</button>
                    </div>
                    <div class="product__buttons">
                        <button onclick="decrementProductQuantity(${id})" class="decrement" >-</button>
                        <p id="${id}" class="product__count"> 
                          ${x.quantity}   
                        </p>
                        <button onclick="incrementProductQuantity(${id})" class="increment">+</button>
                    </div>
                    <h3>$${x.quantity * price}</h3>
                  </div>
                </div>`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="./index.html">
                <button class="home-btn">Back To Home</button>
            </a>
        `;
  }
};

generateCartItems();
totalAmount();

function incrementProductQuantity(element) {
  let productInBag = bag.find((item) => item.id === element.id);
  if (productInBag == undefined) {
    bag.push({
      id: element.id,
      quantity: 1,
    });
  } else {
    productInBag.quantity++;
  }

  productQunatity(element.id);
  generateCartItems();
  totalAmount();
  localStorage.setItem("bag", JSON.stringify(bag));
  console.log(bag);
}

function decrementProductQuantity(element) {
  let productInBag = bag.find((item) => item.id === element.id);

  if (productInBag === undefined) return;
  else if (productInBag.quantity === 0) {
    return;
  } else {
    productInBag.quantity--;
  }

  productQunatity(element.id);
  bag = bag.filter((item) => item.quantity !== 0);
  generateCartItems();
  totalAmount();
  localStorage.setItem("bag", JSON.stringify(bag));
  console.log(bag);
}

function productQunatity(id) {
  const productCount = document.getElementById(id);
  // console.log(productCount.textContent);
  let totalCountOfProduct = bag.find((item) => item.id === id);
  // console.log(totalCountOfProduct);
  productCount.innerHTML = totalCountOfProduct
    ? totalCountOfProduct.quantity
    : 0;

  totalProductInCart();
}

function removeProductFromCart(element) {
  bag = bag.filter((item) => item.id !== element.id);
  localStorage.setItem("bag", JSON.stringify(bag));
  generateCartItems();
  totalAmount();
}

function totalAmount() {
  if (bag.length !== 0) {
    let totalCartValue = bag
      .map((item) => {
        let search = products.find((product) => product.id === item.id);
        return item.quantity * search.price;
      })
      .reduce((sum, item) => (sum += item));

    label.innerHTML = `<h2 class="total-cart-value">Total Value: $${totalCartValue}</h2>`;
  } else {
    return;
  }
}
