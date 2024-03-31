genFooter()

function genFooter() {
  let footer = document.getElementById("page-footer")

  if (footer == null) {
    return
  }

  footer.className = "bg-body-tertiary text-center text-lg-start"
  footer.innerHTML = `
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
      © ${new Date().getFullYear()} Copyright: Imaginary Corp.
    </div>
  `
}