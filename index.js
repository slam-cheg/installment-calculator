const buttons = document.querySelectorAll(".button_tab_text");
const tabsAndInfo = document.querySelector(".tabs_and_info");
const tabsAndInfoCredit = document.querySelector(".tabs_and_info_credit");

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        buttons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        if (this.textContent === "Кредит") {
            tabsAndInfo.style.display = "none";
            tabsAndInfoCredit.style.display = "flex";
        } else {
            tabsAndInfo.style.display = "flex";
            tabsAndInfoCredit.style.display = "none";
        }
    });
});

const selectType = document.querySelector("#type_motorcycle");
const selectModel = document.querySelector("#model_motorcycle");
const selectColor = document.querySelector("#color_motorcycle");
const imageContainer = document.querySelector(".card_img_motorcycle");
const optionsTemplate = document.querySelector("#option-template").content;

function createInitialOptions() {
    debugger;
    selectType.innerHTML = "";
    for (let key in motoParams) {
        const type = key;
        const newOption = optionsTemplate.cloneNode(true);
        const option = newOption.querySelector("option");
        option.textContent = type.toUpperCase();
        option.value = type;
        selectType.insertAdjacentElement("beforeend", option);
    }
    selectType.addEventListener("change", () => {
        createModelOptions(selectType.value);
    });
}

function createModelOptions(type) {
    debugger;
    selectModel.innerHTML = "";
    for (let key in motoParams[type]) {
        const model = motoParams[type][key]["name"];
        const colors = motoParams[type][key]["colors"];
        const newOption = optionsTemplate.cloneNode(true);
        const option = newOption.querySelector("option");
        option.textContent = model.toUpperCase();
        option.value = model;
        selectModel.insertAdjacentElement("beforeend", option);
    }
    selectModel.addEventListener("change", () => {
        createModelColors(type, motoParams[type][selectModel.value.split(" ").join("").toLowerCase()]["colors"]);
    });
}

function createModelColors(type, colors) {
    debugger;
    selectColor.innerHTML = "";
    colors.forEach((color) => {
        const newOption = optionsTemplate.cloneNode(true);
        const option = newOption.querySelector("option");
        option.textContent = color.colorName.toUpperCase();
        option.value = color.colorName;
        selectColor.insertAdjacentElement("beforeend", option);
    });
    selectColor.addEventListener("change", () => {
        changeModelImage(type, selectColor.value);
    });
}

function changeModelImage(type, name) {
    imageContainer.src = motoParams[type][selectModel.value.split(" ").join("").toLowerCase()]["colors"].filter((color) => color.colorName === name)[0]["imgSrc"];
}

createInitialOptions();