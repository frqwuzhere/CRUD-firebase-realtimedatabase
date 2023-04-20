import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const appSettings = {
  databaseUrl: "https://playground-61ce2-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app, `https://playground-61ce2-default-rtdb.asia-southeast1.firebasedatabase.app`);
const listInDB = ref(database, "item");

const input = document.querySelector(".form-input");
const button = document.querySelector(".enter-btn");
const listItem = document.querySelector(".item-list");

// FETCHING DATA FROM DATABASE
onValue(listInDB, function (snapshot) {
  let isSnapshot = snapshot.exists();

  if (isSnapshot) {
    let itemArray = Object.entries(snapshot.val()); // get database value to array
    clearList();
    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArray[i];
      addItem(currentItem);
    }
  } else {
    listItem.innerHTML = "No items in here ....yet";
  }
});

// ADD DATA TO DATABASE
button.addEventListener("click", () => {
  let inputValue = input.value;
  push(listInDB, inputValue);
  clearInputField();
});

function clearList() {
  listItem.innerHTML = "";
}

function clearInputField() {
  input.value = "";
}

function addItem(item) {
  // listItem.innerHTML += `<li>${item}</li>`;
  let itemID = item[0];
  let itemValue = item[1];

  let newElement = document.createElement("li");
  newElement.textContent = itemValue;

  newElement.addEventListener("dblclick", function () {
    let exactLocationItemsInDB = ref(database, `item/${itemID}`);
    // console.log(exactLocationItemsInDB);
    remove(exactLocationItemsInDB);
  });

  listItem.append(newElement);
}
