const CONTAINER_ID = "product-container"
const MODAL_TITLE = "purchase-modal-title"
const MODAL_BODY = "purchase-modal-body"
const MODAL_IMG = "purchase-modal-image"
const MODAL_ID = "purchase-modal"
const PER_ROW = 4

const container = document.getElementById(CONTAINER_ID)
let productTable = {}

if (container == null) {
  console.error("Failed to find product container element")
} else {
  fetch("/data/product-list.json")
    .then(response => {
      return response.json()
    })
    .then(productList => {
      genProducts(productList)
    })
}

function genProducts(data) {
  console.info("data = ", data)

  for (let catKey in data) {
    let category = data[catKey]

    if (category.products == null || category.products.length < 1) {
      continue
    }

    let titleElem = document.createElement("h3")
    titleElem.className = "text-center"
    titleElem.textContent = category.title

    let subtitleElem = document.createElement("p")
    subtitleElem.className = "text-center mb-5"
    subtitleElem.textContent = category.description

    let hr = document.createElement("hr")

    container.appendChild(hr)
    container.appendChild(titleElem)
    container.appendChild(subtitleElem)

    appendCategoryProducts(category.products)
  }
}

function appendCategoryProducts(productList) {
  let pushedToRow = 0
  let currentRow = createRow()

  for (let productIndex in productList) {
    let product = productList[productIndex]
    let elem = createProductCard(product)

    productTable[product.id] = product

    let rowElem = document.createElement("div")
    rowElem.className = "col-sm-3 d-flex align-items-stretch"

    rowElem.appendChild(elem)
    currentRow.appendChild(rowElem)
    pushedToRow++

    if (pushedToRow > PER_ROW) {
      container.appendChild(currentRow)
      currentRow = createRow()
      pushedToRow = 0
    }
  }

  if (pushedToRow > 0) {
    container.appendChild(currentRow)
  }
}

function createRow() {
  let r = document.createElement("div")
  r.className = "row"
  return r
}

function createProductCard(productData) {
  let rootDiv = document.createElement("div")
  rootDiv.className = "card mb-3 col"
  //rootDiv.style = "width: 18rem;"

  rootDiv.innerHTML = /*html*/`
    <img class="card-img-top" src="${productData.heroimage}" alt="${productData.imgAlt}">
    <div class="card-body">
      <h5 class="card-title">${productData.name}</h5>
      <p class="card-text">${productData.description}</p>
    </div>
    <div class="card-footer">
      <div class="mb-2">Price: ${productData.price.toFixed(2)}$</div>
      <button type="button" class="btn btn-primary" onclick="onProductClicked('${productData.id}')">Purchase</button>
    </div>
  `

  return rootDiv
}

function onProductClicked(productId) {
  let tableElement = productTable[productId]

  if (tableElement == null) {
    console.error(`Unknown product id: ${productId}`)
    return
  }

  let modalElem = document.getElementById(MODAL_ID)

  if (modalElem == null) {
    return
  }

  let title = document.getElementById(MODAL_TITLE)
  let body = document.getElementById(MODAL_BODY)
  let img = document.getElementById(MODAL_IMG)

  if (title != null) {
    title.textContent = tableElement.name
  }
  if (body != null) {
    body.textContent = tableElement.description
  }
  if (img != null) {
    img.src = tableElement.heroimage
    img.alt = tableElement.imgAlt
  }

  const modal = new bootstrap.Modal(document.getElementById(MODAL_ID), {})
  modal.show()
}