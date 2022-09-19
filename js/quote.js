const PRICE_CONVERTER_BTN      = document.getElementById("change-price-btn")
const CONTACT_US_BTN           = document.getElementById("contact-us-btn")
const TRUCK_PACKAGE_CHECKBOXES = document.getElementsByClassName("checkbox-input")
const NUM_INPUT                = document.getElementsByClassName("number-input")
const HOUR_QUANTITY_EL         = document.getElementById("hours-input")
const WORKER_QUANTITY_EL       = document.getElementById("workers-input")
const PRICE_LABEL              = document.getElementById("price-label")
const TRUCK_PRICES_ELEMENTS    = document.getElementsByClassName("truck-package-prices")
const MANPOWER_FORM            = document.getElementById("manpower-form")

for (let i = 0; i < TRUCK_PACKAGE_CHECKBOXES.length; i++) {
    TRUCK_PACKAGE_CHECKBOXES[i].addEventListener("change", (event) => {
        let {target} = event
        const NUM_INPUT = target.nextElementSibling

        if (target.checked) {
            NUM_INPUT.disabled = false
        } else {
            NUM_INPUT.disabled = true
            NUM_INPUT.value = ""
            updateCurrPrice(PRICE_CONVERTER_BTN.textContent)
        }
    })
}

sessionStorage.setItem("12-truck-base-fee", 50)
sessionStorage.setItem("18-truck-base-fee", 65)
sessionStorage.setItem("24-truck-base-fee", 90)

for (let i = 0; i < NUM_INPUT.length; i++) {
    NUM_INPUT[i].addEventListener("change", () => {
        updateCurrPrice(PRICE_CONVERTER_BTN.textContent)
    })
}

HOUR_QUANTITY_EL.addEventListener("change", () => {
    updateCurrPrice(PRICE_CONVERTER_BTN.textContent)
})

WORKER_QUANTITY_EL.addEventListener("change", () => {
    updateCurrPrice(PRICE_CONVERTER_BTN.textContent)
})

const updateCurrPrice = (btnText) => {
    let currPrice = 0

    if (btnText === "Get Enterprice Price") {
        let hourQuantity = 0
        let workerQuantity = 0
        if (HOUR_QUANTITY_EL.value !== "") {
            hourQuantity = parseInt(HOUR_QUANTITY_EL.value)
        }
        if (WORKER_QUANTITY_EL.value !== "") {
            workerQuantity = parseInt(WORKER_QUANTITY_EL.value)
        }
        currPrice +=  hourQuantity * workerQuantity * 70
    }
    for (let i = 0; i < NUM_INPUT.length; i++) {
        let currPackage = NUM_INPUT[i]
        if (currPackage.value !== "") {
            let packageValue = parseInt(currPackage.value)
            switch (currPackage.dataset.trucktype) {
                case "12":
                    currPrice += packageValue * sessionStorage.getItem("12-truck-base-fee")
                    break
                case "18":
                    currPrice += packageValue * sessionStorage.getItem("18-truck-base-fee")
                    break
                case "24":
                    currPrice += packageValue * sessionStorage.getItem("24-truck-base-fee")
                    break
            }
        }
    }
    PRICE_LABEL.value = `$${currPrice}.00`
}

const updateMinNumInput = (btnText) => {
    for (let i = 0; i < NUM_INPUT.length; i++) {
        let currEl = NUM_INPUT[i]
        currEl.min = (btnText === "Get Enterprice Price" ? "3" : "0")  // Set minimum quantity of trucks per package to 3 if the current price type is enterprice, else 0.
    }
}

const updateTruckPackageText = (btnText) => {
    const TRUCK_PACKAGE_DATA = {
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

    let truckPackageData = (btnText === "Get Enterprice Price" ? TRUCK_PACKAGE_DATA.enterprice : TRUCK_PACKAGE_DATA.standard)
    for (let i = 0; i < TRUCK_PRICES_ELEMENTS.length; i++) {
        let truckTitle = TRUCK_PRICES_ELEMENTS[i].childNodes[1]
        let baseFee    = TRUCK_PRICES_ELEMENTS[i].childNodes[3]
        let mileageFee = TRUCK_PRICES_ELEMENTS[i].childNodes[5]
        let currPackageData = truckPackageData[i]
        
        truckTitle.textContent = `${currPackageData.truck}' Truck`
        baseFee.textContent    = `Base Fee: ${currPackageData.baseFee}`
        mileageFee.textContent = `${currPackageData.mileFee}`
    }
    if (btnText === "Get Enterprice Price") {
        sessionStorage.setItem("12-truck-base-fee", 30)
        sessionStorage.setItem("18-truck-base-fee", 40)
        sessionStorage.setItem("24-truck-base-fee", 70)
    } else {
        sessionStorage.setItem("12-truck-base-fee", 50)
        sessionStorage.setItem("18-truck-base-fee", 65)
        sessionStorage.setItem("24-truck-base-fee", 90)
    }
}

const toggleContactUsBtn = (btnText) => {
    if (btnText === "Get Enterprice Price") {
        MANPOWER_FORM.style.display = "none"
        CONTACT_US_BTN.style.display = "flex"
    } else {
        MANPOWER_FORM.style.display = "flex"
        CONTACT_US_BTN.style.display = "none"
    }
}

CONTACT_US_BTN.addEventListener("click", () => {
    window.location.href = "contact.html";
})

PRICE_CONVERTER_BTN.addEventListener("click", (event) => {
    let {target} = event;

    updateTruckPackageText(target.textContent)
    updateMinNumInput(target.textContent)
    toggleContactUsBtn(target.textContent)
    target.textContent = (target.textContent === "Get Enterprice Price" ? "Get Standard Price" : "Get Enterprice Price")
})