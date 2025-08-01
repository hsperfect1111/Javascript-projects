// this input box is displaying by default so we have to hide this input box and it will be displayed whenever we click on the create note button
// and every time we will click on the create notes button it will run a javascript and that Javascript will display the input box
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll("input-box");

// when we close the browser and open the browser it should check the local storage and if there is any data in the local storage then it should display that particular data as a node 
function showNotes() {
    // notesContainer ek HTML element hai jisme notes dikh rahe hain.
    // .innerHTML us element ke andar ka HTML content get ya set karta hai.
    // localStorage.getItem("notes") → Browser se saved notes laata hai.
    // notesContainer.innerHTML = ... → Un notes ko screen par dikhata hai.
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

// Agar website refresh karo to notes chala jaata hai, kyunki browser me save nahi hain. Isliye localStorage use karte hain, taaki notes browser me save ho aur dubara open karne par wapas dikhai dein.
function updateStorage() {  // Ye function browser ke localStorage me notesContainer ke andar ka pura HTML (notes) save karta hai, taaki data browser me store rahe aur page reload hone par bhi notes wapas mil jayein.
    localStorage.setItem("notes", notesContainer.innerHTML);
}
 
// imp 
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";   //  Is line se p element ka class set ho jaata hai "input-box", jisse CSS styling apply ho sake (like positioning etc.).
    inputBox.setAttribute("contenteditable", "true");   //  Is line se p tag editable ho jaata hai. User usme directly type kar sakta hai (like a note or message).
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);  // Ye thoda tricky hai: Pehle inputBox ko notesConatiner ke andar add karta hai. Fir usi inputBox ke andar img ko add kar deta hai.
});

// imp adding delete functionality
// Click hone par check karta hai ki delete image pe click hua ya nahi
notesContainer.addEventListener("click", function(e){
    // Agar IMG (delete icon) pe click hua
    if(e.target.tagName === "IMG"){        // HTML tags like <img> are usually written in lowercase in the HTML code, but when you access them in JavaScript via e.target.tagName, the tag name is always returned in uppercase (e.g., "IMG").
        // Note (p tag) ko remove karo
        e.target.parentElement.remove();
        // Updated notes localStorage me save karo
        updateStorage(); // yaha pr ye kya karega 
    }
    // imp
    else if(e.target.tagName === "P"){
        // Ye line sabhi elements ko select karti hai jinka class "input-box" hai. In elements ko notes mein store kar liya jata hai.
        notes = document.querySelectorAll(".input-box");
        // Ab jo bhi .input-box class ke elements hain, un par ek loop chalaya ja raha hai.
        notes.forEach(nt => {
            // Har input box ke liye ek keyup event listener set kiya gaya hai. Matlab jab user koi key press karke release karega, tab ye function call hoga.
            nt.onkeyup = function(){
                // Jab user key release karega, to updateStorage() function call hoga, jo notes ko localStorage mein save karega.
                updateStorage();
            }
        })
    }
});

// Enter key dabane par naya paragraph na bane, balki sirf ek line break (<br>) aaye, isliye ye code likha hai.
document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

