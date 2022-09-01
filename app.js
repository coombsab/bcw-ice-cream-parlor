const iceCream = [{
  name: 'Cookie Dough',
  image: 'https://celebratingsweets.com/wp-content/uploads/2014/04/Cookie-Dough-Ice-Cream-1-5.jpg',
  price: 1,
  quantity: 0,
  id: generateId()
}, {
  name: 'Vanilla',
  image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ultimate-vanilla-ice-cream-1628511695.jpg',
  price: 1,
  quantity: 0,
  id: generateId()
}, {
  name: 'Strawberry',
  image: 'https://www.realfoodwithjessica.com/wp-content/uploads/2017/07/paleostrawberryicecream2.jpg',
  price: 2,
  quantity: 0,
  id: generateId()
}]

const vessels = [{
  name: 'Waffle Cone',
  image: 'https://m.media-amazon.com/images/I/71VNjBMakfL._SL1500_.jpg',
  price: 2,
  quantity: 0,
  id: generateId()
}, {
  name: 'Waffle Bowl',
  image: 'http://images.wbmason.com/350/L_JOY66050.jpg',
  price: 4,
  quantity: 0,
  id: generateId()
}]

const toppings = [{
  name: 'Sprinkles',
  image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Sprinkles2.jpg',
  price: 1,
  quantity: 0,
  id: generateId()
}, {
  name: 'Chocolate Chips',
  image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chocolate-chips.jpg?quality=82&strip=1&resize=640%2C360',
  price: 2,
  quantity: 0,
  id: generateId()
}]

const products = new Map()
products.set("toppings", toppings)
products.set("vessels", vessels)
products.set("iceCream", iceCream)

let totalCost = 0


function purchase() {
  let total = document.getElementById("total")

  products.forEach(product => {
    product.forEach(item => {
      item.quantity = 0
    })
  })
  totalCost = 0

  // @ts-ignore
  total.innerText = totalCost
  drawCartItems()
}

function addToCart(id) {
  let product = getProductById(id)

  if (product !== undefined) {
    product.quantity++
    totalCost += product.price
  }
  drawCartItems()
}

function limitVesselToOne(id) {
  let product
  let vesselAlreadyExists = false
  products.get("vessels").forEach(vessel => {
    if (vessel.quantity > 0) {
      vesselAlreadyExists = true
    }
  })
  if (!vesselAlreadyExists) {
    product = products.get("vessels").find(vessel => vessel.id === id)
  }
  return product
}

function removeFromCart(id) {
  let product = getProductById(id)

  if (product !== undefined) {
    product.quantity--
    totalCost = - product.price
  }
}

function getProductById(id) {
  let product

  if (product === undefined) {
    product = products.get("toppings").find(topping => topping.id === id)
  }

  if (product === undefined) {
    product = limitVesselToOne(id)
  }
  if (product === undefined) {
    product = products.get("iceCream").find(iceCream => iceCream.id === id)
  }

  return product
}

function drawTotal() {
  // @ts-ignore
  document.getElementById("total").innerText = totalCost.toFixed(2)
}

function drawCartItems() {
  let template = ""
  let cartItemsElement = document.getElementById("cart-items")
  let alternateStyleCounter = 0;

  products.forEach(product => {
    product.forEach(item => {
      if (item.quantity > 0) {
        if (alternateStyleCounter % 2 === 0) {
          template += `
          <div class="col-6 cart-item-alternate justify-content-start ps-4">
            <p class="mb-0">${item.name}</p>
          </div>
          <div class="col-2 cart-item-alternate justify-content-center">
            <p class="mb-0">${item.quantity}</p>
          </div>
          <div class="col-2 cart-item-alternate justify-content-center">
            <p class="mb-0">$${item.price}</p>
          </div>
          <div class="col-2 cart-item-alternate justify-content-center">
            <p class="mb-0">$${item.price * item.quantity}</p>
          </div>
          `
          alternateStyleCounter++
        } else {
          template += `
          <div class="col-6 cart-item justify-content-start ps-4">
            <p class="mb-0">${item.name}</p>
          </div>
          <div class="col-2 cart-item justify-content-center">
            <p class="mb-0">${item.quantity}</p>
          </div>
          <div class="col-2 cart-item justify-content-center">
            <p class="mb-0">$${item.price}</p>
          </div>
          <div class="col-2 cart-item justify-content-center">
            <p class="mb-0">$${item.price * item.quantity}</p>
          </div>
          `
          alternateStyleCounter++
        }
      }
    })
  })
  // @ts-ignore
  cartItemsElement.innerHTML = template
  drawTotal()
}

function drawToppings() {
  let template = ""
  let toppingsElement = document.getElementById("toppings")

  products.get("toppings").forEach(topping => {
    template += `
      <div class="col-md-4 my-2">
        <div class="product" id=topping-${topping.id}>
          <img onclick="addToCart('${topping.id}')" class="img-fluid" src="${topping.image}" alt="${topping.name}">
          <p class="mb-0">${topping.name} $<span id="price-${topping.id}">${topping.price}</span></p>
        </div>
      </div>
    `
  })

  // @ts-ignore
  toppingsElement.innerHTML = template
}

function drawVessels() {
  let template = ""
  let toppingsElement = document.getElementById("vessels")

  products.get("vessels").forEach(vessel => {
    template += `
      <div class="col-md-4 my-2">
        <div class="product" id=topping-${vessel.id}>
          <img onclick="addToCart('${vessel.id}')" class="img-fluid" src="${vessel.image}" alt="${vessel.name}">
          <p class="mb-0">${vessel.name} $<span id="price-${vessel.id}">${vessel.price}</span></p>
        </div>
      </div>
    `
  })

  // @ts-ignore
  toppingsElement.innerHTML = template
}

function drawIceCream() {
  let template = ""
  let toppingsElement = document.getElementById("ice-cream")

  products.get("iceCream").forEach(iceCream => {
    template += `
      <div class="col-md-4 my-2">
        <div class="product" id=topping-${iceCream.id}>
          <img onclick="addToCart('${iceCream.id}')" class="img-fluid" src="${iceCream.image}" alt="${iceCream.name}">
          <p class="mb-0">${iceCream.name} $<span id="price-${iceCream.id}">${iceCream.price}</span></p>
        </div>
      </div>
    `
  })

  // @ts-ignore
  toppingsElement.innerHTML = template
}

function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

drawToppings()
drawVessels()
drawIceCream()