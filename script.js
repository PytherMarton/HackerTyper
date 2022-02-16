let sourceCode = "";
let sourceContainer, sourceElement, accessMessageElement;

let startIndex = 0;
let endIndex = 0;
let cursorChar = "|";

let locked = false;

const CHARS_PER_STROKE = 5;
const load_source_code = () => {
  let client = new XMLHttpRequest();
  client.open("GET", "./code.txt");
  client.onreadystatechange = function () {
    sourceCode = client.responseText;
  };
  client.send();
};

const getElements = () => {
  sourceContainer = document.getElementById("container");
  sourceElement = document.getElementById("source");
  accessMessageElement = document.getElementById("access-msg");
};

const update_screen = () => {
  if (!locked) {
    endIndex += CHARS_PER_STROKE;
    sourceElement.textContent = sourceCode.substring(startIndex, endIndex);
    window.scrollTo(0, sourceContainer.scrollHeight);
    sourceElement.textContent += cursorChar;
    if (endIndex !== 0 && endIndex % 300 === 0) {
      sourceContainer.classList.add("blurred");
      locked = true;
      accessMessageElement.classList.add("denied");
      accessMessageElement.textContent = "Access Denied (ESC)";
    }
    if (endIndex !== 0 && endIndex % 750 === 0) {
      sourceContainer.classList.add("blurred");
      locked = true;
      accessMessageElement.classList.add("success");
      accessMessageElement.textContent = "Access Granted";
    }
  }
};

function update_cursor() {
  sourceElement.textContent += cursorChar;
}

const remove_message = () => {
  locked = false;
  accessMessageElement.removeAttribute("class");
  sourceContainer.removeAttribute("class");
};

const init = () => {
  load_source_code();
  getElements();
  window.setTimeout(update_cursor, 500);
};

init();

window.onkeydown = (e) => {
  if (e.key === "Escape") {
    remove_message();
  } else {
    update_screen();
  }
};
