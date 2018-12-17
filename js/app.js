// window event listener
eventListeners();

function eventListeners() {
  const ui = new UI();

  //   preloader
  window.addEventListener("load", function() {
    ui.hidePreloader();
  });

  //   nav bar btn
  document.querySelector(".navBtn").addEventListener("click", function() {
    ui.showNav();
  });

  //   control the video
  document.querySelector(".video_switch").addEventListener("click", function() {
    ui.videoControls();
  });

  // submit the form
  document
    .querySelector(".support-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const email = document.querySelector(".input-email").value;
      let value = ui.checkEmpty(name, email);
      if (value) {
        let customer = new Customer(name, email);
        ui.addCustomer(customer);
        ui.showFeedback("welcome, friend", "success");
        ui.clearFields();
      } else {
        ui.showFeedback("plese, provide valid email and any nickname", "error");
      }
    });

  // display modal
  const links = document.querySelectorAll(".menu-item_icon");
  links.forEach(function(item) {
    item.addEventListener("click", function(event) {
      event.preventDefault();
      ui.showModal(event);
    });
  });

  // hide modal
  document
    .querySelector(".menu-modal_close")
    .addEventListener("click", function() {
      ui.closeModal();
    });
}

// OBJECT Friend/Customer

function Customer(name, email) {
  (this.name = name), (this.email = email);
}

//  OBJECT UI AND METHODS FOR function eventListeners

// function constructor for new object UI
function UI() {}

// method on UI object to hide preloader
UI.prototype.hidePreloader = function() {
  document.querySelector(".preloader").style.display = "none";
};

// method to show side navigation
UI.prototype.showNav = function() {
  document.querySelector("nav").classList.toggle("nav--show");
};

// method for play/pause video
UI.prototype.videoControls = function() {
  let btn = document.querySelector(".video_switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video_item").pause();
  } else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video_item").play();
  }
};

// method check for empty values
UI.prototype.checkEmpty = function(name, email) {
  let result;
  if (name === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

// feedback method
UI.prototype.showFeedback = function(text, type) {
  const feedback = document.querySelector(".support-form_feedback");
  if (type === "success") {
    feedback.classList.add("success");
    feedback.innerText = text;
    this.removeAlert("success");
  } else if (type === "error") {
    feedback.classList.add("error");
    feedback.innerText = text;
    this.removeAlert("error");
  }
};

// remove alert
UI.prototype.removeAlert = function(type) {
  setTimeout(function() {
    document.querySelector(".support-form_feedback").classList.remove(type);
  }, 3000);
};

// add customer/friend
UI.prototype.addCustomer = function(customer) {
  console.log(customer);
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `<div class="coffeeCup_icon"><i class="fa fa-coffee "></i></div>
              <h4 class="person-name">${customer.name}</h4>`;
  document.querySelector(".support-card_list").appendChild(div);
};

// clear input fields
UI.prototype.clearFields = function() {
  document.querySelector(".input-name").value = "";
  document.querySelector(".input-email").value = "";
};

// show modal
UI.prototype.showModal = function(event) {
  if (
    event.target.parentElement.parentElement.classList.contains(
      "menu-item_icon"
    )
  ) {
    let id = event.target.parentElement.parentElement.dataset.id;
    const modal = document.querySelector(".menu-modal");
    const modalItem = document.querySelector(".menu-modal_item");
    modal.classList.add("menu-modal-show");
    modalItem.style.backgroundImage = `url(images/menu-${id}.jpg)`;
  }
};

// hide modal
UI.prototype.closeModal = function() {
  document.querySelector(".menu-modal").classList.remove("menu-modal-show");
};
