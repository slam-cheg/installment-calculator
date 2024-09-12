document.addEventListener("DOMContentLoaded", () => {
	const blockCalculator = document.querySelector(".calculator");
	const formInstallment = blockCalculator.querySelector("#installment-form");
	const formCredit = blockCalculator.querySelector("#credit-form");
	const buttons = document.querySelectorAll(".button_tab_text");
	const tabsAndInfo = document.querySelector(".tabs_and_info");
	const tabsAndInfoCredit = document.querySelector(".tabs_and_info_credit");
	const selectType = document.querySelector("#type_motorcycle");
	const selectModel = document.querySelector("#model_motorcycle");
	const selectColor = document.querySelector("#color_motorcycle");
	const imageContainer = document.querySelector(".card_img_motorcycle");
	const optionsTemplate = document.querySelector("#option-template").content;
	const motoPrice = document.querySelector("#moto-price").querySelector("span");
	const installmentTotal = document.querySelector("#installment-total").querySelector("span");
	const installmentSumTitle = document.querySelector("#installment-sum-title");
	const monthlyPayment = document.querySelector("#monthly-payment").querySelector("span");
	const firstPayment = document.querySelector("#first-payment").querySelector("span");
	const installmentForm = document.querySelector("#installment-form");
	const installmentDuration = installmentForm.querySelector("#term");
	const installmentFirstPay = installmentForm.querySelector("#payment");
	const creditForm = document.querySelector("#credit-form");
	const creditDuration = creditForm.querySelector("#term");
	const creditFirstPay = creditForm.querySelector("#payment");
	const fakeForm = document.querySelector(".uc-fake-form");
	const fakeFormButton = fakeForm.querySelector(".t-submit");
	const fakeFormInputs = fakeForm.querySelectorAll(".t-input");
	const fakeFormSelect = fakeForm.querySelector(".t-select");
	const syntheticForms = document.querySelectorAll(".uc-synthetic-form");
	const kaskoInput = document.querySelector(".kasko_input_text");
	const kaskoPrice = document.querySelector("#kaskoPrice");
	let mskForm, spbForm, ekbForm, nnForm, ksdForm, rstForm, schForm, kmrForm, tmsForm, testForm;

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
			case "TEST":
				testForm = form;
				break;
		}
	});

	fakeFormButton.addEventListener("click", createSubmitData);
	installmentDuration.addEventListener("change", countInstallment);
	installmentFirstPay.addEventListener("change", countInstallment);
	creditDuration.addEventListener("change", countCredit);
	creditFirstPay.addEventListener("change", countCredit);
	kaskoInput.addEventListener("input", countKasko);

	selectType.addEventListener("change", () => {
		createModelOptions(selectType.value.toLowerCase());
		setMotoPrice();
		countInstallment();
		countCredit();
	});

	selectModel.addEventListener("change", () => {
		createModelColors(selectType.value.toLowerCase(), motoParams[selectType.value.toLowerCase()][selectModel.value.split(" ").join("").toLowerCase()]["colors"]);
		setMotoPrice();
		countInstallment();
		countCredit();
	});

	selectColor.addEventListener("change", () => {
		createModelImage(selectType.value.toLowerCase(), selectColor.value);
	});

	buttons.forEach((button) => {
		button.addEventListener("click", ()=>{
			changeTabs(button)
		});
	});
	
	function changeTabs(button) {
	    buttons.forEach((btn) => {
	        btn.classList.remove("active");
	    })
		button.classList.add("active");
		if (button.id === "credit-tab") {
		    formCredit.classList.add("form_active");
			formInstallment.classList.remove("form_active");
			countCredit();
		} else {
			formCredit.classList.remove("form_active");
			formInstallment.classList.add("form_active");
			countInstallment();
		}
	}

	function createSubmitData() {
	    debugger
		const submitData = {
			phone: "",
			name: "",
			city: "",
			motoType: "",
			motoModel: "",
			motoPrice: "",
			motoColor: "",
			creditOrInstallment: "",
			duration: "",
			firstPay: "",
			kasko: "",
			creditSum: "",
			monyhlyPayment: "",
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
		submitData.motoType = selectType.value;
		submitData.motoModel = selectModel.value;
		submitData.motoColor = selectColor.value;
		submitData.motoPrice = `${motoPrice.textContent} руб.`;
		submitData.creditOrInstallment = buttons[0].classList.contains("active") ? "Рассрочка" : "Кредит";
		submitData.duration = `${buttons[0].classList.contains("active") ? installmentDuration.value : creditDuration.value} мес.`;
		submitData.firstPay = `${firstPayment.textContent} руб.`;
		if(kaskoInput.value === "") {
			submitData.kasko = "0 руб.";
		} else {
			submitData.kasko = `${kaskoInput.value} руб`;
		}
		submitData.kreditSum =  `${installmentTotal.textContent} руб.`;
		submitData.monyhlyPayment = monthlyPayment.textContent;
		
		switch (submitData.city) {
		    case "ЕКАТЕРИНБУРГ": 
		        submitToRightForm(ekbForm, submitData);
		        break;
		    case "КАЗАНЬ": 
		        submitToRightForm(ekbForm, submitData);
		        break;
		    case "КЕМЕРОВО": 
		        submitToRightForm(kmrForm, submitData);
		        break;
		    case "КРАСНОДАР": 
		        submitToRightForm(ksdForm, submitData);
		        break;
		    case "КРАСНОЯРСК": 
		        submitToRightForm(ekbForm, submitData);
		        break;
		    case "МОСКВА": 
		        submitToRightForm(mskForm, submitData);
		        break;
		    case "НИЖНИЙ НОВГОРОД": 
		        submitToRightForm(nnForm, submitData);
		        break;
		    case "НОВОСИБИРСК": 
		        submitToRightForm(ekbForm, submitData);
		        break;
		    case "РОСТОВ-НА-ДОНУ": 
		        submitToRightForm(rstForm, submitData);
		        break;
		    case "САМАРА": 
		        submitToRightForm(ekbForm, submitData);
		        break;
		    case "САНКТ-ПЕТЕРБУРГ": 
		        submitToRightForm(spbForm, submitData);
		        break;
		    case "СОЧИ": 
		        submitToRightForm(schForm, submitData);
		        break;
		    case "ТОМСК": 
		        submitToRightForm(tmsForm, submitData);
		        break;
		    case "TEST": 
		        submitToRightForm(testForm, submitData);
		        break;
		}

		console.log(submitData);
	}
	
	function submitToRightForm(form, submitData) {
	    if(submitData.city !== "TEST") {
	        return;
	    }
	    const allInputs = form.querySelectorAll(".t-input");
	    const formButton = form.querySelector(".t-submit");
	    allInputs.forEach(input => {
	        if(input.name === "name") {
	            input.value = submitData.name;
	        }
	        if(input.name === "tel") {
	            input.value = submitData.phone;
	        }
	        if(input.name === "city") {
	            input.value = submitData.city;
	        }
	        if(input.name === "type") {
	            input.value = submitData.motoType;
	        }
	        if(input.name === "model") {
	            input.value = submitData.motoModel;
	        }
	        if(input.name === "color") {
	            input.value = submitData.motoColor;
	        }
	        if(input.name === "installment") {
	            input.value = submitData.creditOrInstallmente;
	        }
	        if(input.name === "months") {
	            input.value = submitData.duration;
	        }
	        if(input.name === "first-pay") {
	            input.value = submitData.firstPay;
	        }
	        if(input.name === "motoPrice") {
	            input.value = submitData.motoPrice;
	        }
	        if(input.name === "monthlyPayment") {
	            input.value = submitData.monthlyPayment;
	        }
	        if(input.name === "installmentSum") {
	            input.value = submitData.creditSum;
	        }
	    })
	    formButton.click();
	}
	

	function countKasko() {
		const driveExpirience = Number(kaskoInput.value);
		const motoPriceNum = Number(motoPrice.textContent.replace(/\D/g, ""));
		let kaskoSum, percent;

		if (driveExpirience <= 4) {
			percent = 0.079;
		}
		if (driveExpirience > 4 && driveExpirience <= 9) {
			percent = 0.065;
		}
		if (driveExpirience > 9) {
			percent = 0.05;
		}

		if (driveExpirience > 99) {
			kaskoInput.value = 99;
		}

		if (driveExpirience < 0) {
			kaskoInput.value = 0;
			kaskoPrice.textContent = "0 руб.";
			return;
		}

		if (driveExpirience === "" || driveExpirience === 0) {
			kaskoPrice.textContent = "0 руб.";
			return;
		}
		kaskoSum = (motoPriceNum * percent).toLocaleString("ru-RU");
		kaskoPrice.textContent = `${kaskoSum} руб.`;
	}

	function countInstallment() {
		const firstPay = Math.ceil((Number(motoPrice.textContent.replace(/\D/g, "")) * Number(installmentFirstPay.value)) / 100);
		const installment = Math.ceil(Number(motoPrice.textContent.replace(/\D/g, "")) - Number(firstPay));
		const monthly = Math.ceil(Number(installment) / Number(installmentDuration.value));
		if (formInstallment.classList.contains("form_active")) {
			installmentTotal.textContent = installment.toLocaleString("ru-RU");
			firstPayment.textContent = firstPay.toLocaleString("ru-RU");
			monthlyPayment.textContent = monthly.toLocaleString("ru-RU");
		    installmentSumTitle.textContent = "Сумма рассрочки";
		}
	}

	function countCredit() {
		const creditDurationValue = Number(creditDuration.value);
		const creditFirstPayValue = Math.ceil((Number(motoPrice.textContent.replace(/\D/g, "")) * Number(creditFirstPay.value)) / 100);
		const creditPreSum = Math.ceil(Number(motoPrice.textContent.replace(/\D/g, "")) - Number(creditFirstPayValue));
		const creditComission = Math.ceil(Number(creditPreSum) * 0.09);
		const creditSum = Math.ceil(Number(creditPreSum) + Number(creditComission));
		let percent;
		if (creditDurationValue < 36) {
			percent = 0.135;
		} else {
			percent = 0.099;
		}
		const k = ((percent / 12) * (1 + percent / 12) ** creditDurationValue) / ((1 + percent / 12) ** creditDurationValue - 1);
		const mintlyCreditPayment = Math.ceil(Number(creditSum) * k);

		if (formCredit.classList.contains("form_active")) {
			installmentTotal.textContent = creditSum.toLocaleString("ru-RU");
			firstPayment.textContent = creditFirstPayValue.toLocaleString("ru-RU");
			monthlyPayment.textContent = mintlyCreditPayment.toLocaleString("ru-RU");
		    installmentSumTitle.textContent = "Сумма кредита";
		}
	}

	function setMotoPrice() {
		const currentType = motoParams[selectType.value.toLowerCase()];
		const currentModel = currentType[selectModel.value.split(" ").join("").toLowerCase()];
		const currentPrice = currentModel.price.toLocaleString("ru-RU");
		motoPrice.textContent = currentPrice;
	}

	function createModelOptions(type) {
		selectModel.innerHTML = "";
		for (let key in motoParams[type]) {
			const model = motoParams[type][key]["name"];
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