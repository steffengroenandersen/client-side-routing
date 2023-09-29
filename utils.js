/**
 * Appends the provided template to the node with the id contentId
 * @param {*} template The HTML to render
 * @param {string} contentId 
 */
export function renderHtml(template, contentId) {
    const content = document.getElementById(contentId)
    if (!content) {
      throw Error("No Element found for provided content id")
    }
    content.innerHTML = ""
    content.append(template)
  }

/**
 * Loads an external file with an div with the class "template", adds it to the body of your page, and returns
 * the div
 * @param {string} page - Path to the file containing the template ('/templates/template.html')
 * @return {Promise<*>} On succesfull resolvement, the HtmlTemplate found in the file
 */
export async function loadHtml(page) {
    const resHtml = await fetch(page).then(r => {
      if (!r.ok) {
        throw new Error(`Failed to load the page: '${page}' `)
      }
      return r.text()
    });
    const parser = new DOMParser()
    const content = parser.parseFromString(resHtml, "text/html")
    const div = content.querySelector(".template")
    if (!div) {
      throw new Error(`No outer div with class 'template' found in file '${page}'`)
    }
    return div
  }



  /**
 * Only meant for when Navigo is set to use Hash based routing (Always this semester)
 * If users try to enter your site with only "/", it will change this to "/#/" as required
 * for Hash based routing
 * Call it before you start using the router (add the specific routes)
 */
export function adjustForMissingHash() {
    let path = window.location.hash
    if (path == "") { //Do this only for hash
      path = "#/"
      window.history.pushState({}, path, window.location.href + path);
    }
  }