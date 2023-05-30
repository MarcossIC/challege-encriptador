/* Maneja el dominio del problema (Encriptar y Desencriptar) */
class Cipher{
    textIsValid;
    textIsVoid;

    constructor(){
        //Funciones privadas
        const hasSpecialChars = (text)=> {
            return /[^\w\s.,?¿!¡]+/.test(text);
        };
        const hasUppercase = (text)=> {
            return /[A-Z]/.test(text);
        };

        //Funciones publicas
        this.textIsInvalid = text => hasSpecialChars(text) || hasUppercase(text);
        this.inputIsVoid = text => text.trim() === "";
    }

    //Se encarga de la encriptacion
    encrypt(decipherText){
        const rulesToEncrypt = {
                "a": "ai",
                "e": "enter",
                "i": "imes",
                "o": "ober",
                "u": "ufat"
        };
        //Remplaza las vocales segun las reglas de encriptar
        return decipherText.replace(/[aeiou]/g, match => rulesToEncrypt[match] );
    }

    //Se encarga de la desencriptacion
    decrypt(cipherText){
        const rulesToDecrypt = {
                "ai": "a",
                "enter": "e",
                "imes": "i",
                "ober": "o",
                "ufat": "u"
        };
        //Remplaza las palabras que fueron encriptadas por las originales
        return cipherText.replace(/(ai|enter|imes|ober|ufat)/g, match => rulesToDecrypt[match]);
    }
}