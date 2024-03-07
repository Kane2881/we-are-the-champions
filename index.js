import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-the-champions-24988-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListDB = ref(database, "endorsementList");

const inputFieldEl = document.getElementById("input-field");
const publishButtonEl = document.getElementById("publish-button");
const endorsementListEl = document.getElementById("endorsement-list");

publishButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  if (inputValue === "") {
    alert("Please fill out the input field before publishing");
  } else {
    push(endorsementListDB, inputValue);
  }

  clearInputFieldEl();
});

onValue(endorsementListDB, function (snapshot) {
  let endorsementArray = Object.entries(snapshot.val());

  clearEndorsementListEl();

  for (let i = 0; i < endorsementArray.length; i++) {
    let currentEndorsement = endorsementArray[i];
    let currentEndorsementID = endorsementArray[0];
    let currentEndorsementValue = endorsementArray[1];

    appendItemToEndorsementListEl(currentEndorsement);
  }
});

function clearEndorsementListEl() {
  endorsementListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToEndorsementListEl(endorsement) {
  let endorsementID = endorsement[0];
  let endorsementValue = endorsement[1];

  let newEl = document.createElement("li");

  newEl.textContent = endorsementValue;

  endorsementListEl.append(newEl);
}
