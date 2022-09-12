const priceConverterBtn = document.getElementById("converter-btn")

priceConverterBtn.addEventListener("click", () => {
    const converterBtn     = document.getElementById("converter-btn")
    const packageTitleElem = document.getElementById("package-title")
    const truckBoxElem     = document.getElementsByClassName("truck-package")

    // The following constant variable
    // represents the text that will change
    // dynamically when the button is clicked.
    const truckPackageData = {
        enterprice : [
            {
                truck:"12", 
                baseFee:"$30 / truck",
                mileFee:"$0.50 / mile"
            },
            {
                truck:"18",
                baseFee:"$40 / truck",
                mileFee:"$0.70 / mile",
            },
            {
                truck:"24",
                baseFee:"$70 / truck",
                mileFee:"$0.80 / mile",
            }
        ],
        standard : [
            {
                truck:"12",
                baseFee:"$50",
                mileFee:"$0.60 / mile",
            },
            {
                truck:"18",
                baseFee:"$65",
                mileFee:"$0.80 / mile",
            },
            {
                truck:"24",
                baseFee:"$90",
                mileFee:"$0.90 / mile",
            }
        ]
    }

    const buttonTxt = converterBtn.innerHTML
    // Get constant array according to the current state of the button.
    const innerElementsToChange = (buttonTxt === "Get Enterprice Price" ? truckPackageData.enterprice : truckPackageData.standard)
    // Iterate through each truck package box and change its values using innerElementsToChange. The array was ordered
    // in such a way that the index of truckBoxElem would match the index of innerElementsToChange.
    for (let i = 0; i < truckBoxElem.length; i++) {
        let elements = innerElementsToChange[i]
        truckBoxElem[i].innerHTML = `<h2>${elements.truck}' Truck</h2><p>Base Fee: ${elements.baseFee}</p><p>${elements.mileFee}</p>`
    }
    // Change title of truck package.
    packageTitleElem.innerHTML = (buttonTxt === "Get Enterprice Price" ? "Enterprice Packages" : "Standard Packages")
    // Change button text.
    converterBtn.innerHTML     = (buttonTxt === "Get Enterprice Price" ? "Get Normal Price" : "Get Enterprice Price")
})