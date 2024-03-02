let textoInicial = document.getElementById("textoInicial");
let textoFinal = document.getElementById("textoFinal");
let mensagemDenied = document.getElementById("mensagemDenied");
let copiarBotao = document.getElementById("copiar");

let pairs = {
  a: "aix",
  e: "esfder",
  i: "slut",
  o: "uelb",
  u: "dswwr",
  p: "cdksncsn",
  g: "ckldhou",
  r: "kidmais",
  w: "meaprova",
  c: "gopower",
  d: "rangers",
  s: "biscouto",
  f: "bowlacha",
};

copiarBotao.style.display = "none";
textoFinal.style.display = "none";

function validar(str) {
  let letraUnicode = str.charCodeAt(0);

  if (letraUnicode >= 97 && letraUnicode <= 122) {
    return true;
  } else {
    return false;
  }
}

function validacao(msgCriptografada, posicao, key, i) {
  let letra = msgCriptografada[posicao];

  if (letra == key[i]) {
    if (i == key.length - 1) {
      return true;
    } else if (i < key.length - 1 && posicao + 1 < msgCriptografada.length) {
      return validacao(msgCriptografada, (posicao += 1), key, (i += 1));
    }
  }
  return false;
}

function criptografar() {
  let msgDescriptografada = textoInicial.value;
  let msgCriptografada = "";
  let strLength = msgDescriptografada.length;
  textoFinal.innerHTML = "";

  if (strLength == 0) {
    mensagemDenied.style.display = "inherit";
    copiarBotao.style.display = "none";
    textoFinal.style.display = "none";
    return;
  }

  for (let i = 0; i < strLength; i++) {
    let letra = msgDescriptografada[i];

    if (letra != " " && !validar(letra)) {
      mensagemDenied.style.display = "inherit";
      alert(
        "Texto inválido!\nUse apenas letras minúsculas e sem acento.\nNão utilize caracteres especiais."
      );
      copiarBotao.style.display = "none";
      textoFinal.style.display = "none";
      return;
    }

    if (letra in pairs) {
      msgCriptografada += pairs[letra];
    } else {
      msgCriptografada += letra;
    }
  }

  textoFinal.style.display = "initial";
  textoFinal.innerHTML = msgCriptografada;
  mensagemDenied.style.display = "none";
  copiarBotao.style.display = "initial";
}

function descriptografar() {
  let msgCriptografada = textoInicial.value;
  let msgDescriptografada = "";
  let strLength = msgCriptografada.length;
  textoFinal.innerHTML = "";

  if (strLength == 0) {
    mensagemDenied.style.display = "inherit";
    copiarBotao.style.display = "none";
    textoFinal.style.display = "none";
    return;
  }

  for (let i = 0; i < strLength; i++) {
    let letra = msgCriptografada[i];
    let keyNotFound = true;

    if (letra != " " && !validar(letra)) {
      mensagemDenied.style.display = "inherit";
      alert(
        "Texto inválido!\nUse apenas letras minúsculas e sem acento.\nNão utilize caracteres especiais."
      );
      copiarBotao.style.display = "none";
      textoFinal.style.display = "none";
      return;
    }

    for (let key in pairs) {
      if (letra == pairs[key][0]) {
        if (pairs[key].length > 1) {
          if (validacao(msgCriptografada, i + 1, pairs[key], 1)) {
            msgDescriptografada += key;
            i += pairs[key].length - 1;
            keyNotFound = false;

            break;
          }
        } else {
          msgDescriptografada += key;
          i += pairs[key].length - 1;
          keyNotFound = false;
          break;
        }
      }
    }

    if (keyNotFound) {
      msgDescriptografada += letra;
    }
  }

  textoFinal.style.display = "initial";
  textoFinal.innerHTML = msgDescriptografada;
  mensagemDenied.style.display = "none";
  copiarBotao.style.display = "initial";
}

function copiar() {
  let texto = textoFinal.innerHTML;
  navigator.clipboard.writeText(texto);
}
