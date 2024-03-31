const BODY = document.body
const HOME_HREF = "index.html"

fetch("/data/page-list.json")
  .then(response => {
    return response.json()
  })
  .then(json => {
    genNavbar(json)

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })

function genNavbar(pageList) {
  const nav = document.createElement("nav")
  nav.classList.add("navbar", "navbar-expand-lg", "navbar-light", "bg-light", "mb-3")

  const fluidContainer = document.createElement("div")
  fluidContainer.className = "container-fluid"

  appendTitleButton(fluidContainer)

  const navBarCollapse = document.createElement("div")
  navBarCollapse.classList.add("collapse", "navbar-collapse")
  navBarCollapse.id = "navbarSupportedContent"
  
  const barUl = document.createElement("ul")
  barUl.classList.add("navbar-nav", "me-auto", "mb-2", "mb-lg-0")

  appendPageList(barUl, pageList)
  navBarCollapse.appendChild(barUl)

  appendLogin(navBarCollapse)
  appendSearch(navBarCollapse)

  fluidContainer.appendChild(navBarCollapse)
  nav.appendChild(fluidContainer)

  BODY.insertBefore(nav, BODY.firstChild)
}

function appendPageList(node, pageList) {
  for (pageKey in pageList) {
    let page = pageList[pageKey]
    let included = page.includedInNavbar

    if (included != null && !included) {
      continue
    }

    let li = document.createElement("li")
    li.className = "nav-item"

    let a = document.createElement("a")
    a.className = "nav-link"
    a.href = page.href
    a.textContent = page.title
    a.setAttribute("data-bs-toggle", "tooltip")
    a.setAttribute("data-bs-placement", "bottom")
    a.setAttribute("data-bs-html", "true")
    a.title = page.description

    li.appendChild(a)
    node.appendChild(li)
  }
}

function appendLogin(node) {
  let a = document.createElement("a")
  a.href = "/login.html"
  a.classList.add("d-flex", "btn", "btn-outline-secondary", "me-4")
  a.textContent = "Log In"

  node.appendChild(a)
}

function appendSearch(node) {
  let form = document.createElement("form")
  form.action = "/search.html"
  form.className = "d-flex"

  let input = document.createElement("input")
  input.classList.add("form-control", "me-2")
  input.type = "search"
  input.placeholder = "Search"
  input.ariaLabel = "Search"
  input.name = "query"
  input.id = "search-input"

  let button = document.createElement("button")
  button.classList.add("btn", "btn-outline-success")
  button.type = "submit"
  button.textContent = "Search"

  form.appendChild(input)
  form.appendChild(button)

  node.appendChild(form)
}

function appendTitleButton(fluidContainer) {
  const a = document.createElement("a")
  a.className = "navbar-brand"
  a.href = HOME_HREF
  a.textContent = "Koduleht"

  const img = document.createElement("img")
  img.src = "https://picsum.photos/32/32"
  img.width = 32
  img.height = 32
  img.style = "margin-right: 0.5rem"
  
  fluidContainer.appendChild(img)
  fluidContainer.appendChild(a)

  const htmlStr = `
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  `
  var wrapper = document.createElement("div")
  wrapper.innerHTML = htmlStr

  fluidContainer.appendChild(wrapper.firstChild)
}