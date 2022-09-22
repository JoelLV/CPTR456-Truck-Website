const BUTTON_ELEMENTS = document.getElementsByClassName("get-quote-btn")

for (let i = 0; i < BUTTON_ELEMENTS.length; i++) {
    let btn = BUTTON_ELEMENTS[i]
    btn.addEventListener("click", () => {
        window.location.href = "quote.html"
    })
}