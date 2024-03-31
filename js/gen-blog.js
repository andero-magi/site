const BLOG_CONTAINER_ID = "blogposts"
const POSTS_PER_ROW = 4

genBlog()

function genBlog() {
  let container = document.getElementById(BLOG_CONTAINER_ID)

  if (container == null) {
    console.error(`Failed to load blog posts, missing element with id '${BLOG_CONTAINER_ID}'`)
    return
  }

  fetch("/data/page-list.json")
    .then(result => {
      return result.json()
    })
    .then(json => {
      generateBlogFrom(json, container)
    })
}

/**
 * 
 * @param {Array} json 
 * @param {HTMLElement} container 
 */
function generateBlogFrom(json, container) {
  let articleArray = json.filter(value => value.blogContent != null)
  if (articleArray.length < 1) {
    return
  }

  let pushedToRow = 0
  let currentRow = createRow()

  for (let postIndex in articleArray) {
    let postData = articleArray[postIndex]
    let elem = createPostCard(postData)

    let rowElem = document.createElement("div")
    rowElem.className = "col-sm-3 d-flex align-items-stretch"

    rowElem.appendChild(elem)
    currentRow.appendChild(rowElem)
    pushedToRow++

    if (pushedToRow > POSTS_PER_ROW) {
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

function createPostCard(postData) {
  let rootDiv = document.createElement("a")
  rootDiv.className = "card mb-3 col"
  rootDiv.href = postData.href

  rootDiv.innerHTML = /*html*/`
    <img class="card-img-top" src="${postData.previewImage}" alt="${postData.imgAlt}">
    <div class="card-body">
      <h5 class="card-title">${postData.title}</h5>
      <p class="card-text">${postData.description}</p>
    </div>
  `

  return rootDiv
}