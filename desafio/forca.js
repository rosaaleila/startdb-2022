const validarEtapa = require("../validacao/validar-etapa");

let letrasChutadas = [];
let estadoJogo = "aguardando chute";
let vidasRestantes = 6;
let palavraUsuario = [];
let palavraEsperada = [];
let letraExiste = '';
let validarTentativaRegExp = /([a-z])/;

class Forca {

  constructor(palavraSecreta) {
    palavraEsperada = palavraSecreta.split("");
    palavraUsuario = palavraEsperada.map(() => { return "_" });
  }

  chutar(letraUsuario) {

    if (validarTentativaRegExp.test(letraUsuario) && letraUsuario.length <= 1) {

      if (letrasChutadas.includes(letraUsuario)) {
        console.log('Você já tentou essa letra! Tente novamente. \n')

      } else {
        letraExiste = false;
        letrasChutadas.push(letraUsuario);
        this.verificarLetra(letraUsuario);

        if (!letraExiste) {
          vidasRestantes--;
          console.log("A letra chutada não existe na palavra secreta. \n");
        }

        if (vidasRestantes > 0) {
          if (JSON.stringify(palavraUsuario) == JSON.stringify(palavraEsperada))
            estadoJogo = 'ganhou';
        } else {
          estadoJogo = "perdeu";
        }
      }

    } else {
      console.log("Escreva uma letra válida! Tente novamente. \n");
    }
  }

  verificarLetra(letraUsuario) {
    palavraEsperada.map((letraPalavra, index) => {

      if (letraPalavra == letraUsuario) {
        palavraUsuario[index] = letraUsuario;
        letraExiste = true;
      }

    });
  }

  buscarEstado() { return estadoJogo; }

  buscarDadosDoJogo() {
    return {
      letrasChutadas: letrasChutadas,
      vidas: vidasRestantes,
      palavra: palavraUsuario
    }
  }
}

module.exports = Forca;
