// Import Navigo
import "https://unpkg.com/navigo"

// Import script to prevent XSS attacks
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"

// Import util functions for router
import { setActiveLink, renderHtml, loadHtml } from "./utils.js"


import { initSignup } from "./pages/signup/signup.js"
import { initLogin } from "./pages/login/login.js"

window.addEventListener("load", async () => {

    // Load in templates
    const templateSignup = await loadHtml("./pages/signup/signup.html")
    const templateLogin = await loadHtml("./pages/login/login.html")
    const templateNotFound = await loadHtml("./pages/notfound/notfound.html")

    // Create Navigo Router and set to window.router
    const router = new Navigo("/",{hash:true});

    window.router = router

    // Setup router
    router
    .hooks({
        before(done, match) {
            setActiveLink("menu", match.url)
            done()
        }
    })
    .on({
        "/signup": () => {
            renderHtml(templateSignup, "content")
            initSignup()
        },
        "/login": () => {
            renderHtml(templateLogin, "content")
            initLogin()
        }
    })
    .notFound(() => {
        renderHtml(templateNotFound, "content")
    })
    .resolve()
});

window.onerror = function(errorMsg, url, lineNumber, column, errorObj){
    alert('Error: ' + errorMsg + 
            'Script: ' + url + 
            'Line: ' + lineNumber + 
            'Column: ' + column + 
            'StackTrace: ' + errorObj)
}