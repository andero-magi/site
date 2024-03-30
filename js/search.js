const CONTAINER_ID = "search-result-container"

fetch("/page-list.json")
  .then(response => {
    return response.json()
  })
  .then(json => {
    performSearch(json)
  })

function performSearch(pageList) {
  let queryParam = new URLSearchParams(window.location.search).get("query")
  let query = queryParam == null ? "" : queryParam

  let inputBox = document.getElementById("search-input")
  inputBox.value = query

  let container = document.getElementById(CONTAINER_ID)
  if (container == null) {
    return
  }

  for (let index in pageList) {
    let pageData = pageList[index]
    let tags = pageData.tags

    if (!queryMatches(query, tags)) {
      continue
    }

    appendSearchResult(container, pageData)
  }
}

function queryMatches(query, tagsArray) {
  if (tagsArray == null || tagsArray.length < 1) {
    return false
  }

  query = query.toLowerCase()

  for (let index in tagsArray) {
    let tag = tagsArray[index].toLowerCase()

    if (tag.indexOf(query) != -1) {
      return true
    }
  }

  return false
}

function appendSearchResult(container, pageData) {
  let resultElement = document.createElement("a")
  resultElement.className = "card mb-3"
  resultElement.href = pageData.href

  resultElement.innerHTML = `
    <div class="card-header">${pageData.title}</div>
    <div class="card-body">
      <p class="card-text">${pageData.description}</p>
    </div>
  `

  container.appendChild(resultElement)
}
