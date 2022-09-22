/**
 * @author Joel Lopez Villarreal, Adrian Morales
 */

const PRICE_CONVERTER_BTN = document.getElementById("converter-btn")

/**
 * Checks whether the button that changes
 * package prices needs to convert to enterprice
 * prices or not.
 * 
 * @returns boolean
 */
const convertToEnterprice = () => {
    return PRICE_CONVERTER_BTN.textContent === "Get Enterprice Price"
}

/**
 * Adds event that is triggered
 * when the price converter button
 * is clicked. Updates prices of
 * truck packages according to
 * the current selection.
 */
PRICE_CONVERTER_BTN.addEventListener("click", (event) => {
    const { target }       = event
    const PACKAGE_TITLE_EL = document.getElementById("package-title")
    const TRUCK_BOX_EL     = document.getElementsByClassName("truck-package")

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

    // Get constant array according to the current state of the button.
    const INNER_ELEMENTS_TO_CHANGE = (convertToEnterprice() ? truckPackageData.enterprice : truckPackageData.standard)
    // Iterate through each truck package box and change its values using innerElementsToChange. The array was ordered
    // in such a way that the index of TRUCK_BOX_EL would match the index of innerElementsToChange.
    for (let i = 0; i < TRUCK_BOX_EL.length; i++) {
        let elements = INNER_ELEMENTS_TO_CHANGE[i]
        TRUCK_BOX_EL[i].innerHTML = `<h2>${elements.truck}' Truck</h2><p>Base Fee: ${elements.baseFee}</p><p>${elements.mileFee}</p>`
    }
    // Change title of truck package.
    PACKAGE_TITLE_EL.innerHTML = (convertToEnterprice() ? "Enterprice Packages" : "Standard Packages")
    // Change button text.
    target.innerHTML     = (convertToEnterprice() ? "Get Normal Price" : "Get Enterprice Price")
})
