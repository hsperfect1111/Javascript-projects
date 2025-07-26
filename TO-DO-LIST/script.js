const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value === ''){
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // we have to add one cross icon at the end of this list that can be used to delete this particular task 
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

    }
    // we have to clear the input field after adding the text 
    inputBox.value = "";
    // whenever we add newTask , any changes we call saveData()
    saveData();
}

// if we will click on this particular task it will be checked aur unchecked 
// if we click on this cross icon it will delete particular task
listContainer.addEventListener("click", function(e){    // e ka matlab hai event object — yeh batata hai kis element pe click hua.
    // e.target → Wo element jis pe user ne click kiya (usually <li> in this case)
    // .classList → Us element ki class list ko access karta hai (jaise .checked, .active, etc.)
    // .toggle("checked") →
    // Agar checked class nahi lagi hai → lag jaayegi
    // Agar lagi hui hai → hat jaayegi
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN"){
        // Ye wo element hai jisme user ne click kiya
        // Example: agar user ne <span>❌</span> pe click kiya, to e.target = <span>
        // 🔸 parentElement
        // Ye us clicked element (e.target) ka parent element return karta hai
        // Example: agar span <li> ke andar hai, to e.target.parentElement = <li>
        // 🔸 .remove()
        // Ye parent element ko DOM se hata deta hai (HTML se delete kar deta hai)
        e.target.parentElement.remove();
        saveData();
    }
}, false);  // Kab false use karna chahiye? : Jab tum chahte ho ki click event pehle inner element pe chale, fir outer pe

// I add Task1 , Task2, Task3 it is displaying and once refresh the website or close the browser and open the browser again it will be disappeared
// so we have to store these tasks in our browser so that whenever we will open the web-browser our task list or to-do list will be displayed as it is 
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    // we can display using the 
    // localStorage.getItem("data");
}


// we have to display this data whenever we will open the website again
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();



// NOtes 
// 🎯 Example:
// html
// Copy
// Edit
// <div id="parent">
//   <button id="child">Click me</button>
// </div>
// js
// Copy
// Edit
// document.getElementById("parent").addEventListener("click", () => {
//   console.log("Parent clicked");
// }, false);

// document.getElementById("child").addEventListener("click", () => {
//   console.log("Child clicked");
// }, false);
// Output:
// nginx
// Copy
// Edit
// Child clicked
// Parent clicked
// 👉 Kyunki bubbling ho raha hai (false diya hai):

// Pehle child ka listener chala

// Fir parent ka

