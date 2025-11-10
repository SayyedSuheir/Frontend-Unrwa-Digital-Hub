function Proceed(){
    
    document.getElementById('invoicetable').style.display = "none";

    document.getElementById('btn-tabs').style.display ="flex";
  
}

// helper to switch tabs
function goToTab(tabId) {
  const radio = document.getElementById(tabId);
  if (radio) radio.checked = true;
}

// move from Personal Info → Address
document.getElementById("next-one").addEventListener("click", () => {
  const fn = document.getElementById("fn").value.trim();
  const email = document.getElementById("txtemail").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!fn || !email || !phone) {
    alert("Please fill all fields before continuing.");
    return;
  }

  goToTab("two");
});

// move from Address → Payment
document.getElementById("next-two").addEventListener("click", () => {
  const city = document.getElementById("cityinput").value.trim();
  const street = document.getElementById("streetnameinput").value.trim();
  const building = document.getElementById("buildingnumberinput").value.trim();
  const floor = document.getElementById("floornumberinput").value.trim();

  if (!city || !street || !building || !floor) {
    alert("Please fill address details before continuing.");
    return;
  }

  goToTab("three");
});

// Get elements
const paymentSelect = document.querySelector(".payway");
const cardFields = document.querySelectorAll("#card_number, #card_type, #exp_date, #cvv, .expcvv, label[for='card_number'], label[for='card_type'], .expcvv_text");

// Listen for changes on payment method
paymentSelect.addEventListener("change", () => {
  if (paymentSelect.value === "cash") {
    // Hide card-related fields
    cardFields.forEach(el => el.style.display = "none");
    // Optional: make inputs not required
    document.getElementById("card_number").required = false;
    document.getElementById("card_type").required = false;
    document.getElementById("exp_date").required = false;
    document.getElementById("cvv").required = false;
    let total = document.getElementById('total');
    total.innerHTML=`
        <p> Total : ${120*3}$ </p>
    
    `;
    total.style.color="#B95E82";
    total.style.fontWeight = "700";
    const formContainer = document.querySelector("#three-panel .mainscreen > div"); // adjust selector to your layout
    formContainer.appendChild(total);
  } else {
    // Show card-related fields for online payment
    cardFields.forEach(el => el.style.display = "");
    document.getElementById("card_number").required = true;
    document.getElementById("card_type").required = true;
    document.getElementById("exp_date").required = true;
    document.getElementById("cvv").required = true;

    


  }

});



