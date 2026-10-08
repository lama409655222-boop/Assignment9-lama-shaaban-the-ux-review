let fullName = document.getElementById("fullName");
let phone = document.getElementById("phone");
let address = document.getElementById("address");
let email = document.getElementById("email");
let nodes = document.getElementById("nodes");
let group = document.getElementById("group");
let Favorite = document.getElementById("Favorite");
let Emergency = document.getElementById("Emergency");
let addtion = document.getElementById("addtion");
let save = document.getElementById("save");
let modes = document.getElementById("addModal");
let closeModal = document.getElementById("closeModal");
let contactContainer = document.getElementById("contactContainer");
let totalContacts = document.getElementById("totalContacts");
let totalFavoriteContacts = document.getElementById("counterfavorite");
let counterEmergency = document.getElementById("counterEmergency");
let contactFavorite  = document.getElementById("contact-Favorite ");
let contactEmergency  = document.getElementById("contact-Emergency ");


let Search = document.getElementById("Search");
 let bgcolor=["bg-info","bg-Purple","bg-primary","bg-warning"]
let contactData = JSON.parse(localStorage.getItem("contactData")) || [];
let ind = null;
function clearForm() {
    fullName.value = "";
    phone.value = "";
    address.value = "";
    nodes.value = "";
    group.value = "";
    email.value = "";
    Favorite.checked = false;
    Emergency.checked = false;
    
    [fullName, phone, address, email].forEach(el => {
        if (el) el.classList.remove("is-valid", "is-invalid");
    });
    save.classList.add("d-none");
    addtion.classList.remove("d-none");
    ind = null;
}
function claose() {
    let modealdiv = bootstrap.Modal.getOrCreateInstance(modes);
    modealdiv.hide();
    clearForm();
}
function validateForm(element) {
    const regexMap = {
        fullName: /^[a-zA-Z\s]{2,50}$/,
        phone: /^(?:\+20|0)?1[0125]\d{8}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    };

    if (!regexMap[element.id]) return true;

    const isValid = regexMap[element.id].test(element.value);

    if (!isValid) {
        Swal.fire({
            icon: "error",
            title: "Invalid " + element.id,
            text: element.nextElementSibling ? element.nextElementSibling.innerText : "Invalid Input",
            timer: 2000, 
            timerProgressBar: false, 
            showConfirmButton: false 
        });
    }

    if (element.nextElementSibling) {
        element.nextElementSibling.classList.toggle("d-none", isValid);
    }
    
    element.classList.toggle("is-valid", isValid);
    element.classList.toggle("is-invalid", !isValid);
    
    return isValid;
}
fullName.addEventListener("change", function () { validateForm(fullName); });
phone.addEventListener("change", function () { validateForm(phone); });
email.addEventListener("change", function () { validateForm(email); });

addtion.addEventListener("click", function () {
    if (validateForm(fullName) && validateForm(phone) && validateForm(email)) {
        var numbercol = {
            name: fullName.value,
            phone: phone.value,
            address: address.value,
            nodes: nodes.value,
            group: group.value,
            Favorite: Favorite.checked,
            Emergency: Emergency.checked,
            email: email.value
        };
        
        contactData.push(numbercol);
        localStorage.setItem("contactData", JSON.stringify(contactData));
        
        /*Swal.fire({
            title: "Added!",
            text: "Contact added successfully",
            icon: "success",
            timer: 1200, 
            showConfirmButton: false 
        });*/

        claose();
        displayContacts();
    }/* else {
        Swal.fire({
            icon: "error",
            title: "Invalid Form",
            text: "Please correct the errors in the form before submitting.",
            timer: 1500, 
            showConfirmButton: false 
        });
    }*/
});
function displayContacts(list = contactData) {

    var box = "";
    var boxFavorite=""
    var boxEmergency=""
    var FavoriteContacts=0;
    var EmergencyContacts=0
    if (totalContacts) {
        totalContacts.innerText = list.length;
    }

    if (list.length === 0) {
        contactContainer.innerHTML = `<div class="text-muted d-flex justify-content-center align-items-center flex-column gap-2 my-5">
            <i class="fa-regular fa-address-book loge fs-2 p-5 bg-light d-flex justify-content-center align-items-center text-muted"></i>
            <h2>No contacts found</h2>
            <p>Click "Add Contact" to get started</p>
        </div>`;
        contactFavorite.innerHTML=`<div class=" py-4 text-center"><h5 class="fs-5 text-muted">No Favorite yet</h5></div>`
contactEmergency.innerHTML=`<div class=" py-4 text-center"><h5 class="fs-5 text-muted">No Favorite yet</h5></div>`
    } else {
       
        for (var i = 0; i < list.length; i++) {
            box += `<div class="col-md-6 col-12 mb-4">
    <div class="card border-0 shadow-sm rounded-4">
        <div class="card-body p-4 d-flex flex-column gap-3">
            <div class="d-flex align-items-center gap-3">
            <div class="position-relative"> 
            <div class="position-absolute icon star rounded-circle ${list[i].Favorite ? 'd-black' : 'd-none'} ">
            <i class=" fas fa-star fs-6 text-white "></i>
            </div>
                
                <span class="rounded-4 object-fit-cover d-flex justify-content-center fw-bold align-items-center text-white  ${bgcolor[Math.floor(Math.random()*(bgcolor.length))]} " alt="Avatar" style="width: 70px; height: 70px;">${list[i].name.slice(0,2).toUpperCase()}</span>
                  <div class="position-absolute icon  heart rounded-circle bg-danger ${list[i].Emergency ? 'd-black' : 'd-none'} ">
            <i class=" fas fa-heart fs-6 text-white "></i>
            </div>
                </div>
                <div>
                    <h5 class="fw-bold mb-2 text-dark fs-4">${list[i].name}</h5>
                    <div class="d-flex align-items-center gap-2 text-muted fw-medium">
                        <span class="badge bg-primary bg-opacity-10 text-primary p-2 rounded-3">
                            <i class="fas fa-phone"></i>
                        </span>
                        <span>${list[i].phone}</span>
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center gap-2 text-secondary">
                <span class="badge bg-primary bg-opacity-10 text-primary p-2 rounded-3">
                    <i class="fas fa-envelope"></i>
                </span>
                <span class="fw-medium">${list[i].email}</span>
            </div>
            <div class="d-flex align-items-center gap-2 text-secondary">
                <span class="badge bg-success bg-opacity-10 text-success p-2 rounded-3">
                    <i class="fa-solid fa-location-dot"></i>
                </span>
                <span class="fw-medium">${list[i].address}</span>
            </div>
            <div>
                <span class="badge bg-success bg-opacity-25 text-success px-2 py-2 rounded-3 fw-medium small">
                    ${list[i].group}
                </span>
            </div>
        </div>
        <div class="card-footer bg-light border-0 px-4 py-3 d-flex align-items-center justify-content-between">
            <div class="d-flex gap-2">
                <a href="tel:${list[i].phone}" class="bg-success bg-opacity-25 text-success border-0 rounded-3 p-2 d-flex justify-content-center text-decoration-none align-items-center">
                    <i class="fas fa-phone"></i>
                </a>
                <a href="mailto:${list[i].email}" class="bg-primary bg-opacity-25 text-primary border-0 rounded-3 p-2 fs-5 d-flex justify-content-center text-decoration-none align-items-center">
                    <i class="fas fa-envelope"></i>
                </a>
            </div>

            <div class="d-flex align-items-center gap-3 text-muted fs-5">
                <button  onclick="toggleFavorite(${i})"class="btn p-0 border-0 fs-5 ${list[i].Favorite ? 'text-warning' : 'text-secondary'}">
                    <i class="${list[i].Favorite ? 'fas' : 'far'} fa-star"></i>
                </button>
                <button onclick="toggleEmergency(${i})" class="btn border-0 fs-5 ${list[i].Emergency ? 'text-danger' : 'text-secondary'}">
                    <i class="${list[i].Emergency ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <button onclick="eventupdata(${i})" data-bs-toggle="modal" data-bs-target="#addModal" class="btn p-0 border-0 fs-5 text-secondary">
                    <i class="fas fa-pen"></i>
                </button>
                <button onclick="deletphone(${i})" class="btn p-0 border-0 fs-5 text-secondary">
                    <i class="fas fa-trash-can"></i>
                </button>
            </div>
        </div>
    </div>
</div>`;
if(list[i].Favorite){
FavoriteContacts++
boxFavorite+=`<div class="p-2 d-flex justify-content-between border  border-1 rounded-3 align-items-center" >
  <div  class="d-flex justify-content-between align-items-center  gap-3 ">
    <span class="p-3 fs-5 text-center fw-bold text-white bg-primary rounded-3">${list[i].name.slice(0,2).toUpperCase()}</span>
    <div>
      <h3 class="fs-4">${list[i].name}</h3>
      <p class=text-muted  fs-6>${list[i].phone}</p>
    </div>
  </div>
  <a href="tel:${list[i].phone}" class="btn px-3 py-3 fs-6 text-white  bg-primary "><i class="fas fa-phone"></i></a>
</div>`

}
if(list[i].Emergency){
EmergencyContacts++
boxEmergency+=`<div class="p-2 d-flex justify-content-between border  border-1 rounded-3 align-items-center" >
  <div  class="d-flex justify-content-between align-items-center  gap-3 ">
    <span class="p-3 fs-5 text-center fw-bold text-white bg-primary rounded-3">${list[i].name.slice(0,2).toUpperCase()}</span>
    <div>
      <h3 class="fs-4">${list[i].name}</h3>
      <p class=text-muted  fs-6>${list[i].phone}</p>
    </div>
  </div>
  <a href="tel:${list[i].phone}" class="btn px-3 py-3 fs-6 text-white  bg-primary "><i class="fas fa-phone"></i></a>
</div>`
}
        }
        contactContainer.innerHTML = box; 
        totalFavoriteContacts.innerHTML = FavoriteContacts;
        counterEmergency.innerHTML = EmergencyContacts;

        contactFavorite.innerHTML=boxFavorite;

        contactEmergency.innerHTML=boxEmergency;
    }
}
function toggleEmergency(index) {
    contactData[index].Emergency = !contactData[index].Emergency;
    localStorage.setItem("contactData", JSON.stringify(contactData));
    displayContacts();
}
function toggleFavorite(index) {
    contactData[index].Favorite = !contactData[index].Favorite;
    localStorage.setItem("contactData", JSON.stringify(contactData));
    displayContacts();
}
function deletphone(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactData[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "rgb(92, 90, 90)",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      contactData.splice(index, 1);
      localStorage.setItem("contactData", JSON.stringify(contactData));
      Swal.fire({
        title: "Deleted!",
        text: "Your contact has been deleted.",
        icon: "success",
        timer: 1000, 
        timerProgressBar: false, 
        showConfirmButton: false 
      });
      displayContacts(contactData);
    }
  });
}

function eventupdata(index) {
    ind = index;
    fullName.value = contactData[index].name;
    phone.value = contactData[index].phone;
    address.value = contactData[index].address;
    nodes.value = contactData[index].nodes;
    group.value = contactData[index].group;
    email.value = contactData[index].email;
    Favorite.checked = contactData[index].Favorite;
    Emergency.checked = contactData[index].Emergency;
    

    save.classList.remove("d-none");
    addtion.classList.add("d-none");
}
function evenedits(index) {
  if (validateForm(fullName) && validateForm(phone) && validateForm(email)) {
    var updatedContact = {

      name: fullName.value,
      phone: phone.value,
      address: address.value,
      nodes: nodes.value,
      group: group.value,
      Favorite: Favorite.checked,
      Emergency: Emergency.checked,
      email: email.value
    };

    contactData[index] = updatedContact;
    localStorage.setItem("contactData", JSON.stringify(contactData));
    
    claose();
    displayContacts();

    Swal.fire({
      title: "Updated!",
      icon: "success",
      text: "Data updated successfully",
      timer: 1200, 
      timerProgressBar: false, 
      showConfirmButton: false 
    });
  }
}
save.addEventListener("click", function () {
  if (ind !== null && ind !== undefined) {
    evenedits(ind);
  }
});
Search.addEventListener("input", function () {
     let filter=[]
   let input = Search.value.toLowerCase().trim();
   for(var i=0;i<contactData.length;i++){
       if(   contactData[i].name.toLowerCase().includes(input) ||
           contactData[i].email.toLowerCase().includes(input) ||
           contactData[i].phone.includes(input))
       {
           filter.push(contactData[i]);
       }
   }
   displayContacts(filter);
});
displayContacts();