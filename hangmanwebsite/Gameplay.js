const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let options = {
  Tiere: [
    "Katze",
    "Hund",
    "Schildkroete",
    "Hase",
    "Pferd",
    "Papagei",
    "Schlange",
    "Ratte",
    "Krokodil",
    "Maulwurf",
    "Nagetier",
    "Fuchs",
    "Luchs",
    "Fisch",
    "Goldfisch",
    "Haifisch",
    "Seepferd",
    "Seestern",
    "Krebs",
    "Spinne",
    "Muschel",
    "Regenwurm",
    "Vogel",
    "Taube",
    "Loewe",
    "Tiger",
    "Panther",
    "Igel",
    "Elefant",
    "Gorilla",
    "Schmetterling",
    "Giraffe",
    "Affe",
    "Pfau",
    "Storch",
    "Flamingo",
    "Nilpferd",
    "Strauss",
    "Seeloewe",
    "Nashorn",
    "Baer",
    "Esel",
    "Eisbaer",
    "Pinguin",
    "Panda",
    "Eichhoernchen",
  ],
  Länder: [
    "Schweiz", 
    "Deutschland", 
    "Italien", 
    "Oesterreich", 
    "Liechtenstein", 
    "Belgien",
    "Luxemburg",
    "Frankreich",
    "Portugal",
    "Thailand",
    "Singapur",
    "Malaysia",
    "Pakistan",
    "Indien",
    "Nigeria",
    "Argentinien",
    "Spanien",
    "Vatikanstadt",
    "Brasilien",
    "Aegypten",
    "Tunesien",
    "Schweden",
    "Litauen",
    "England",
    "Indonesien",
    "China",
    "Japan",
    "Suedkorea",
    "Russland",
    "Irland",
    "Norwegen",
    "Serbien",
    "Griechenland",
    "Ukraine",
    "Kanada",
    "Madagaskar",
    "Kolumbien",
    "Ecuador",
    "Bolivien",
    "Weissrussland",

  ],
  IMS: [
    "Ubuntu",
    "Flexbox",
    "Docker",
    "Linux",
    "Python",
    "Gitlab",
    "Github",
    "Frickelbude",
    "Frickelgarten",
    "Ineichen",
    "Javascript",
    "Informatik",
    "Modulo",
    "Laborpc",
    "Kubernetes",
    "Powershell",
    "Pipeline",
    "SpaceTraders",
    "Blazor",
    "Sephir",
    "Schulnetz",
    "Filius",
    "Powershell",
    "Datensicherheit",
    "Hashcode",
    "Asciicode",
    "Verschlüsslung",
    "Datenbank",
    "Praktikum",
    "Adligenswil",
    "Sursee",
    "UeberbetrieblicherKurs",
    "ObjektorientiertesProgrammieren",
    "unittest",
    "meow",
    "monitoring",
    "adobexd",
    "webseite",
    "mockup",
    "chatgpt",
    "responsive",
    "grid",
    "winforms",
    "wpf",
    "images",
    "scribble",
    "container",
    "volume",
    "Dockerfile",
    "HTML",
    "CSS",
    "array",
    "Papdesign",
    "EntityRelationshipModell",
    "Powershell",
  ],
};

let winCount = 0;
let count = 0;

let chosenWord = "";

const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Wählen Sie aus !</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");

  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue.toLowerCase()) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];

  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  let displayItem = chosenWord.replace(/./g, '<span class="dashes"> _ </span>');

  userInputSection.innerHTML = displayItem;
};

const initializer = () => {
  winCount = 0;
  count = 0;

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
   
    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {

          if (char === button.innerText) {

            dashes[index].innerText = char;

            winCount += 1;

            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Sie haben gewonnen!!</h2><p>Das Wort war <span>${chosenWord}</span></p>`;

              blocker();
            }
          }
        });
      } else {
 
        count += 1;

        drawMan(count);

        if (count == 10) {
          resultText.innerHTML = `<h2 class='lose-msg'>Sie haben verloren!!</h2><p>Das Wort war <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
     
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  
  let { initialDrawing } = canvasCreator();
};

const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };
  const bottomLine = () =>{
    drawLine(10, 130, 130, 130);
  };
  const leftLine = () =>{
    drawLine(10, 10, 10, 131);
  };
  const topLine = () =>{
    drawLine(10, 10, 70, 10);
  };
  const smallLine = () =>{
    drawLine(70, 10, 70, 20);
  };

  return { head, body, leftArm, rightArm, leftLeg, rightLeg ,bottomLine, leftLine, topLine,smallLine};
};

const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg, bottomLine, leftLine, topLine, smallLine } = canvasCreator();
  switch (count) {
    case 1:
      bottomLine();
      break;

    case 2:
      leftLine();
      break;
     
    case 3:
      topLine();
      break;

    case 4:
      smallLine();
      break;

    case 5:
      head();
      break;

    case 6:
      body();
      break;

    case 7:
      leftArm();
      break;

    case 8:
      rightArm();
      break;

    case 9:
      leftLeg();
      break;

    case 10:
      rightLeg();
      break;

    default:
      break;
  }
};

window.onload = initializer;

newGameButton.addEventListener("click", () => {
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  initializer();
});
