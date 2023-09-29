// Import Navigo
import "https://unpkg.com/navigo"

// Import script to prevent XSS attacks
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"

// Import util functions for router
import { setActiveLink, renderHtml, loadHtml } from "./utils.js"


import { initSignup } from "./pages/signup/signup.js"
import { initLogin } from "./pages/login/login.js"
import { initShowMatch } from "./pages/showMatch/showmatch.js"

window.addEventListener("load", async () => {

    // Load in templates
    const templateHome = await loadHtml("./pages/home/home.html")
    const templateSignup = await loadHtml("./pages/signup/signup.html")
    const templateLogin = await loadHtml("./pages/login/login.html")
    const templateAbout = await loadHtml("./pages/about/about.html")
    const templateShowmatch = await loadHtml("./pages/showMatch/showmatch.html")
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
        "/": () => {
            renderHtml(templateHome, "content")
        },
        "/signup": () => {
            renderHtml(templateSignup, "content")
            initSignup()
        },
        "/login": () => {
            renderHtml(templateLogin, "content")
            initLogin()
        },
        "/about": () => {
            renderHtml(templateAbout, "content")
        },
        "/showmatch": (match) => {
            renderHtml(templateShowmatch, "content")
            initShowMatch(match)
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