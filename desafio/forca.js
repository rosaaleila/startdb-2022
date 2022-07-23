const validarEtapa = require("../validacao/validar-etapa");

let letrasChutadas = [];
let estadoJogo = "aguardando chute";
let vidasRestantes = 6;
let palavraUsuario = [];
let palavraEsperada = [];
let letraExiste = '';

class Forca {
  
  constructor(palavraSecreta) {
    palavraEsperada = palavraSecreta.split("");
    palavraUsuario = palavraEsperada.map((letra) => { return "_" });
  }
  
  chutar(letraUsuario) {
    
    if (letraUsuario.length <= 1 && letraUsuario != '') {

      if (letrasChutadas.includes(letraUsuario)) {
        console.log('Você já tentou essa letra! Tente novamente. \n')
      
      } else {
        letrasChutadas.push(letraUsuario)
        letraExiste = false;
        
        if (vidasRestantes >= 0) {
          this.verificarLetra(letraUsuario)
          
          if (!letraExiste) {
            vidasRestantes--;
            console.log("A letra chutada não existe na palavra secreta. \n")
          } else {
            console.log("A letra existe na palavra secreta! \n");

            if (JSON.stringify(palavraUsuario) == JSON.stringify(palavraEsperada))
              estadoJogo = 'ganhou';
            }

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
