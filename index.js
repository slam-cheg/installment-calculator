document.addEventListener("DOMContentLoaded", () => {
	const buttons = document.querySelectorAll(".button_tab_text");
	const tabsAndInfo = document.querySelector(".tabs_and_info");
	const tabsAndInfoCredit = document.querySelector(".tabs_and_info_credit");
	const selectType = document.querySelector("#type_motorcycle");
	const selectModel = document.querySelector("#model_motorcycle");
	const selectColor = document.querySelector("#color_motorcycle");
	const imageContainer = document.querySelector(".card_img_motorcycle");
	const optionsTemplate = document.querySelector("#option-template").content;
	const motoPrice = document.querySelector("#moto-price");
	const installmentTotal = document.querySelector("#installment-total");
	const monthlyPayment = document.querySelector("#monthly-payment");
	const firstPayment = document.querySelector("#first-payment");
	const installmentDuration = document.querySelector("#term");
	const installmentFirstPay = document.querySelector("#payment");
	const fakeForm = document.querySelector(".uc-fake-form");
	const fakeFormButton = fakeForm.querySelector(".t-submit");
	const fakeFormInputs = fakeForm.querySelectorAll(".t-input");
	const fakeFormSelect = fakeForm.querySelector(".t-select");
	const syntheticForms = document.querySelectorAll(".uc-synthetic-form");
	let mskForm, spbForm, ekbForm, nnForm, ksdForm, rstForm, schForm, kmrForm, tmsForm;

	syntheticForms.forEach((form) => {
		switch (form.querySelector(".t-form__inputsbox").querySelector(".t-text").textContent) {
			case "MOSCOW":
				mskForm = form;
				break;
			case "SPB":
				spbForm = form;
				break;
			case "EKB":
				ekbForm = form;
				break;
			case "NN":
				nnForm = form;
				break;
			case "KRASNODAR":
				ksdForm = form;
				break;
			case "ROSTOV":
				rstForm = form;
				break;
			case "SOCHI":
				schForm = form;
				break;
			case "KEMEROVO":
				kmrForm = form;
				break;
			case "TOMSK":
				tmsForm = form;
				break;
		}
	});

	console.log(mskForm, spbForm, ekbForm, nnForm, ksdForm, rstForm, schForm, kmrForm, tmsForm);

	fakeFormButton.addEventListener("click", submitToRightForm);
	installmentDuration.addEventListener("change", countInstallment);
	installmentFirstPay.addEventListener("change", countInstallment);

	selectType.addEventListener("change", () => {
		createModelOptions(selectType.value.toLowerCase());
		motoPrice.textContent = motoParams[selectType.value.toLowerCase()][selectModel.value.split(" ").join("").toLowerCase()]["price"];
		countInstallment();
	});

	selectModel.addEventListener("change", () => {
		createModelColors(selectType.value.toLowerCase(), motoParams[selectType.value.toLowerCase()][selectModel.value.split(" ").join("").toLowerCase()]["colors"]);
		motoPrice.textContent = motoParams[selectType.value.toLowerCase()][selectModel.value.split(" ").join("").toLowerCase()]["price"];
		countInstallment();
	});

	selectColor.addEventListener("change", () => {
		createModelImage(selectType.value.toLowerCase(), selectColor.value);
	});

	buttons.forEach((button) => {
		button.addEventListener("click", (evt) => {
			buttons.forEach((btn) => btn.classList.remove("active"));
			evt.target.classList.add("active");

			if (this.textContent === "Кредит") {
				tabsAndInfo.style.display = "none";
				tabsAndInfoCredit.style.display = "flex";
			} else {
				tabsAndInfo.style.display = "flex";
				tabsAndInfoCredit.style.display = "none";
			}
		});
	});

	function submitToRightForm() {
		const submitData = {
			phone: "",
			name: "",
			city: "",
			motoType: "",
			motoModel: "",
			motoColor: "",
			creditInstallment: "",
			duration: "",
			firstPay: "",
			kasko: "",
		};

		fakeFormInputs.forEach((input) => {
			if (input.name === "name") {
				submitData.name = input.value;
			}
			if (input.name === "tildaspec-phone-part[]") {
				submitData.phone = input.value;
			}
		});
		submitData.city = fakeFormSelect.value;

		console.log(submitData);
	}

	function countInstallment() {
		const firstPay = Math.ceil((Number(motoPrice.textContent.split(" ")[0]) * Number(installmentFirstPay.value)) / 100);
		const installment = Math.ceil(Number(motoPrice.textContent.split(" ")[0]) - Number(firstPay));
		const monthly = Math.ceil(Number(installment) / Number(installmentDuration.value));
		installmentTotal.textContent = `${installment} руб.`;
		firstPayment.textContent = `${firstPay} руб.`;
		monthlyPayment.textContent = `${monthly} руб.`;
	}

	function createInitialOptions() {
		selectType.innerHTML = "";
		for (let key in motoParams) {
			const type = key;
			const newOption = optionsTemplate.cloneNode(true);
			const option = newOption.querySelector("option");
			option.textContent = type.toUpperCase();
			option.value = type;
			selectType.insertAdjacentElement("beforeend", option);
		}
		motoPrice.textContent = motoParams[selectType.value.toLowerCase()][selectModel.value.split(" ").join("").toLowerCase()]["price"];
	}

	function createModelOptions(type) {
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
		createModelImage(selectType.value.toLowerCase(), motoParams[type][selectModel.value.split(" ").join("").toLowerCase()]["colors"][0].colorName);
	}

	function createModelColors(type, colors) {
		selectColor.innerHTML = "";
		colors.forEach((color) => {
			const newOption = optionsTemplate.cloneNode(true);
			const option = newOption.querySelector("option");
			option.textContent = color.colorName.toUpperCase();
			option.value = color.colorName;
			selectColor.insertAdjacentElement("beforeend", option);
		});
		createModelImage(type, colors[0].colorName);
	}

	function createModelImage(type, name) {
		imageContainer.dataset.currentModel = selectModel.value.split(" ").join("").toLowerCase();
		const currentColors = motoParams[type][selectModel.value.split(" ").join("").toLowerCase()]["colors"];
		const neededImage = currentColors.find((color) => color.colorName === name)["imgSrc"];
		imageContainer.src = neededImage;
	}
});
