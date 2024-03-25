fetch("/page-list.json")
  .then(response => {
    return response.json()
  })
  .then(json => {
    performSearch(json)
  })

function performSearch(pageList) {

}
