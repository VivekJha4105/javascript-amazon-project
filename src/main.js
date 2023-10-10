const shop = document.querySelector(".shop");
let productCardHTML = "";

let bag = JSON.parse(localStorage.getItem("bag")) || [];

// console.log(shop);
console.log(products);

function generateProductHTML() {
  return (shop.innerHTML = products
    .map((product) => {
      let productInBag = bag.find((item) => item.id === product.id);

      return `
            <div class="product__card">
                <div class="product__img">
                  <img src="${product.img}" />
                </div>
                <div class="product__details">
                  <h3>${product.name}</h3>
                  <p>${product.desc}</p>
                  <div class="product__price-quantity">
                      <p class="product__price">$${product.price}</p>
                      <div class="product__buttons">
                        <button onclick="decrementProductQuantity(${
                          product.id
                        })" class="decrement" >-</button>
                        <p id="${product.id}" class="product__count"> 
                          ${productInBag ? productInBag.quantity : 0}   
                        </p>
                        <button onclick="incrementProductQuantity(${
                          product.id
                        })" class="increment">+</button>
                      </div>
                  </div>
                </div>
            </div>
            `;
    })
    .join(""));
}
// console.log(productCardHTML);
generateProductHTML();

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

function totalProductInCart() {
  const cartQuantity = document.querySelector(".cart__quantity");
  cartQuantity.innerHTML = bag
    .map((item) => item.quantity)
    .reduce((sum, item) => sum + item, 0);
}

totalProductInCart();
