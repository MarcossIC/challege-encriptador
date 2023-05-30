//Definicion de variables
const input = document.getElementById("cipher-text");
const decryptButton = document.getElementById("decrypt-button");
const encryptButton = document.getElementById("encrypt-button");
const copyButton = document.getElementById("copy-button");
const display = document.getElementById("display");
let firstCipher = true;
const cipher = new Cipher();

/* Aplica configuraciones nuevas a elementos */
const applySettings = ({element, removeClass=null, addClass=null, leaveEmpty=false})=>{
    element.classList.add(addClass);
    element.classList.remove(removeClass);
    if(leaveEmpty){element.textContent = ""}
}

/* Cambia el estado de los elementos despues del cifrado */
const changeStatesElementsAfterCipher = () =>{
    if(firstCipher){
        const settings = [
            { element: document.getElementById("display-message"), leaveEmpty: true },
            { element: document.getElementById("display-title"), leaveEmpty: true },
            { element: display, removeClass: "hidden", addClass: "show-textarea" },
            { element: copyButton, removeClass: "hidden", addClass: "button" },
            { element: document.getElementById("buttons"), addClass: "buttons" }
          ];
        settings.forEach(applySettings);
        firstCipher = false;
    }
    input.value = "";
    changeStateButtons();
};

/* Aplica un resalte en el mensaje de advertencia en caso de texto invalido */
const highlightInvalidText = async () =>{
    const warningMessage = document.getElementById("legend");
    //Añade la clase que resalta el error al waning message
    warningMessage.classList.add("highlight-error");
    await delay(500);
    warningMessage.classList.remove("highlight-error");
};

/* Prepara el display para la operacion pasada (encriptar / desencriptar) */
const performOperation = (operation) => {
    if (cipher.textIsInvalid(input.value)) {
        highlightInvalidText();
        return;
    }        
    display.value = (operation === "encrypt") 
    ? cipher.encrypt(input.value) 
    : cipher.decrypt(input.value);
    changeStatesElementsAfterCipher();
};
  

  

  

