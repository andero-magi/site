const POST_CONTAINER_ID = "post-container"

loadPost()

function loadPost() {
  let params = new URLSearchParams(window.location.search)
  let articleId = params.get("id")

  let container = document.getElementById(POST_CONTAINER_ID)

  if (articleId == null || articleId.length < 1 ) {
    if (container == null) {
      console.error("Post container not found on page")
    }

    redirectTo404()
    return
  }

  let resourcePath = `posts/${articleId}.json`
  fetch(resourcePath)
    .catch(reason => {
      redirectTo404()
    })
    .then(result => {
      if (!result.ok) {
        redirectTo404()
        return
      }

      return result.json()
    })
    .then(articleData => {
      loadArticleFromData(articleData, container)
    })
}

function loadArticleFromData(articleData, container) {
  let paragraphListString = ""
  let imgStr = ""

  let content = articleData.content
  let imgValue = articleData.previewImage

  if (content != null && content.length > 0) {
    paragraphListString = "<p>" + content.join("</p><p>") + "</p>"
  }
  if (imgValue != null && imgValue.length > 0) {
    imgStr = `<img class="mb-5 img-fluid rounded mx-auto d-block" src="${imgValue}">`
  }

  document.title = articleData.title

  container.innerHTML = `
    <h1 class>${articleData.title}</h1>
    <div class="text-muted">Author: ${articleData.author}</div>
    <div class="text-muted mb-4">Publishing date: ${articleData.publishDate}</div>

    ${imgStr}
    ${paragraphListString}
  `
}

function redirectTo404() {
  window.location.href = "/404.html"
}