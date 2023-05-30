//Evento de Encriptar texto
const clickEncrypt = () => {
    performOperation("encrypt");
};
encryptButton.onclick = clickEncrypt;

//Evento de desencriptar texto
const clickDecrypt = () => {
    performOperation("decrypt");
};
decryptButton.onclick = clickDecrypt;


//Evento limitar caracteres, segun el dispositivo
/* Limita caracteres del input segun el tamaño del dispositivo actual */
const charLimiter = ()=>{
    const deviceWidth = window.innerWidth; //Tamaño del dispositivo actual
    const breakpoints = [
        { width: 1275, maxChars: 880 },
        { width: 975, maxChars: 700 },
        { width: 800, maxChars: 585 },
        { width: 530, maxChars: 320 },
        { width: 0, maxChars: 180 }
    ];

    //Se define el maxChar, segun el tamaño del dispositivo
    const { maxChars } = breakpoints.find(breakpoint => deviceWidth >= breakpoint.width);
    const textLength = input.value.length;

    //Al ser una cojuncion, solo cambiara el valor si el lado izquierdo es "true"
    (textLength >= maxChars) && (input.value = input.value.slice(0, maxChars));
}
window.onresize = charLimiter;

//Evento activar / desactivar boton, segun el input

/* Activa / Desactiva boton segun si el input esta vacio o no */
const changeStateButtons = ()=>{
    const isVoid = cipher.inputIsVoid(input.value);
     //Activacion/Desactivacion, esta dada por el valor de "isVoid"
    encryptButton.disabled = decryptButton.disabled = isVoid;
}

const eventInputCipher = ()=>{
    changeStateButtons();
    charLimiter();
};
input.oninput = eventInputCipher;

//Evento copiar texto del display

/*Aplica un segundo de espera */
const delay = (ms)=> new Promise((resolve)=> setTimeout(resolve, ms));

/*Copia un texto en el portapapeles */
const copyText = async (text)=>{
    await navigator.clipboard.writeText(text);
}

/*Estilos aplicados luego de copiar */
const stylesAfterCopy = async (displayText)=>{
    const displayTitle = document.getElementById("display-title");

    display.value = "";
    displayTitle.textContent = "¡Copiado!";
    displayTitle.classList.add("fade-in","highlight-copy");
    displayTitle.classList.remove("fade-in", "fade-out"); 
    await delay(1000); 
    displayTitle.classList.remove("highlight-copy");
    displayTitle.classList.add("fade-out");
    await delay(400);
    displayTitle.textContent = "";
    displayTitle.classList.remove("fade-out");
    display.value = displayText;
}

/* Evento de "copiar" */
const eventCopy = ()=>{
    const displayText = display.value;
    try{
        copyText(displayText);
        stylesAfterCopy(displayText);
    } catch (error) {
      // Error al copiar al portapapeles
      console.error('Error al copiar al portapapeles:', error);
    }
}

copyButton.onclick = eventCopy;

