var d = new Date();
var dia = d.getDate();
var mes = d.getMonth() + 1;
var ano = d.getFullYear();
document.getElementById('mostrar-calendario').innerText = dia + "/" + mes + "/" + ano;

var segundos = 0; 
var minutos = 0; 
var horas = 0;
var timer;

function arrumarZero(num) {
    if (num < 10) {
        return "0" + num;
    }
    return num;
}

function rodarelogio() {
    segundos++;
    if (segundos == 60) {
        segundos = 0;
        minutos++;
        if (minutos == 60) {
            minutos = 0;
            horas++;
        }
    }
    document.getElementById('tempo').innerText = arrumarZero(horas) + ":" + arrumarZero(minutos) + ":" + arrumarZero(segundos);
}

function iniciar() {
    timer = setInterval(rodarelogio, 1000);
}

function parar() {
    clearInterval(timer);
}

function limpar() {
    clearInterval(timer);
    segundos = 0; minutos = 0; horas = 0;
    document.getElementById('tempo').innerText = "00:00:00";
}

function showSearchLinks() {
    var txt = document.getElementById('campo-busca').value;
    if (txt != "") {
        document.getElementById('div-links').style.display = 'block';
    }
}

function salvarNotas() {
    var valor = document.getElementById('texto-notas').value;
    localStorage.setItem('minhas_notas', valor);
}

var salvas = localStorage.getItem('minhas_notas');
if (salvas != null) {
    document.getElementById('texto-notas').value = salvas;
}

var jogando = false;
var pontos_jogo = 0;
var pulo_ativo = false;

function alternarJogo() {
    var t = document.getElementById('tela-do-jogo');
    if (t.style.display == 'block') {
        t.style.display = 'none';
        jogando = false;
    } else {
        t.style.display = 'block';
        jogando = true;
        pontos_jogo = 0;
        document.getElementById('pontos').innerText = "Score: " + pontos_jogo;
        criarObstaculo();
    }
}

function fazerPulo() {
    if (pulo_ativo == true) return;
    pulo_ativo = true;
    var b = document.getElementById('boneco');
    b.style.bottom = "35px";
    
    setTimeout(function() {
        b.style.bottom = "0px";
        pulo_ativo = false;
    }, 450);
}

window.addEventListener('keydown', function(event) {
    if (event.repeat) return;
    if (event.code == "Space") {
        event.preventDefault();
        fazerPulo();
    }
});

function criarObstaculo() {
    if (jogando == false) return;

    var g = document.getElementById('tela-do-jogo');
    var o = document.createElement('div');
    o.className = 'obstacle';
    o.style.right = "0px";
    g.appendChild(o);

    var px = 0;
    var larguraJanela = g.clientWidth;
    var pontoColisaoInicio = larguraJanela - 34;
    var pontoColisaoFim = larguraJanela - 8;

    var loop = setInterval(function() {
        if (jogando == false) {
            clearInterval(loop);
            o.remove();
            return;
        }

        px += 5;
        o.style.right = px + "px";

        if (px > pontoColisaoInicio && px < pontoColisaoFim && pulo_ativo == false) {
            jogando = false;
            clearInterval(loop);
            alert("Game Over! Score: " + pontos_jogo);
            o.remove();
        }

        if (px > larguraJanela) {
            clearInterval(loop);
            o.remove();
            pontos_jogo++;
            document.getElementById('pontos').innerText = "Score: " + pontos_jogo;
            setTimeout(criarObstaculo, 1400); 
        }
    }, 35);
}

var blocos = document.querySelectorAll('.bloco');
blocos.forEach(function(b) {
    b.addEventListener('mousedown', function() {
        console.log("click");
    });
});