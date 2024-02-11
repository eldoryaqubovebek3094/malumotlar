const showBtn = document.querySelector("#show-btn");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close-btn");
const overlay = document.querySelector("#overlay");

//add classlist hidden
const addHidden = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//remove classlist hidden

const removeHidden = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

showBtn.addEventListener("click", removeHidden);

closeBtn.addEventListener("click", addHidden);

overlay.addEventListener("click", addHidden);

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    addHidden();
    console.log("you are clicked escape");
  }
});




const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const phoneNumberInput = document.getElementById("phoneNumber");
const amountInput = document.getElementById("amount");
const imageInput = document.getElementById("image");
const errorElement = document.getElementById("error");
const successElement = document.getElementById("success");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;
  const phoneNumber = phoneNumberInput.value;
  const amount = amountInput.value;
  const image = imageInput.files[0];

  // console.log(image)

  if (
    name.trim() === "" ||
    email.trim() === "" ||
    message.trim() === "" ||
    phoneNumber.trim() === "" ||
    amount.trim() === ""
  ) {
    displayErrorMessage("Iltimos, barcha maydonlarni toʻldiring");
    return;
  }

  if (message.length > 15) {
    displayErrorMessage("Izoh 15 belgidan oshmasligi kerak");
    removeHiddenn();
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);
  formData.append("phoneNumber", phoneNumber);
  formData.append("amount", amount);
  formData.append("image", image);

  sendFormData(formData);
});

function displayErrorMessage(message) {
  errorElement.innerText = message;
  errorElement.classList.add("show");
}

const removeHiddenn = () => {
  errorElement.classList.remove("hidden");
};

async function sendFormData(formData) {
  try {
    const response = await fetch("http://localhost:3000/contact", {
      method: "POST",
      body: formData,
      
    });
    console.log(response.status);
    if (response.status === 500) {
      
      displaySuccessMessage("Xabaringiz jo'natildi");
      removeHiddenn()
      // Kerakli qismlarni yangilash
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log(error);
    displayErrorMessage("Xatolik yuz berdi");
    // Xatoni boshqarish
  }
}

function displaySuccessMessage(message) {
  successElement.innerText = message;
  successElement.classList.add("show");
}
