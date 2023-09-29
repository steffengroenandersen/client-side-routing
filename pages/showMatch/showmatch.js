export function initShowMatch(match){
    document.querySelector("#show-match").innerHTML = `<pre>${JSON.stringify(match, null, 2)}</pre>`
}