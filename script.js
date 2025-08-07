let pontos = 0;
let velocidade = 3000;
let clicados = 0;
let usuario = null;

function fazerLogin() {
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;

  if (nome && telefone && email) {
    usuario = { nome, telefone, email };
    document.getElementById('nomeUsuario').textContent = nome;
    document.getElementById('loginSection').classList.add('oculto');
    document.getElementById('jogoSection').classList.remove('oculto');
    iniciarJogo();
  } else {
    alert("Preencha todos os campos!");
  }
}

function logout() {
  location.reload();
}

function mostrarDashboard() {
  document.getElementById('jogoSection').classList.add('oculto');
  document.getElementById('dashboardSection').classList.remove('oculto');
  document.getElementById('totalPontos').textContent = pontos;
  document.getElementById('itensClicados').textContent = clicados;
}

function iniciarJogo() {
  setInterval(criarItem, velocidade);
}

function criarItem() {
  const jogo = document.getElementById('jogo');
  const item = document.createElement('img');
  const tipos = ['caneta.png', 'copo.png'];
  const tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)];
  item.src = `assets/${tipoAleatorio}`;
  item.classList.add('item');
  item.style.left = Math.random() * (jogo.clientWidth - 50) + 'px';
  item.style.top = '0px';

  item.onclick = () => {
    pontos += 100;
    clicados++;
    document.getElementById('pontuacao').textContent = `Pontuação: ${pontos}`;
    item.remove();
    if (pontos >= 3000) {
      alert("Parabéns! Você alcançou 3000 pontos!");
      logout();
    }
    if (pontos % 500 === 0 && velocidade > 1000) {
      velocidade -= 300;
    }
  };

  jogo.appendChild(item);

  let posicao = 0;
  const intervalo = setInterval(() => {
    posicao += 5;
    item.style.top = posicao + 'px';
    if (posicao > 500) {
      clearInterval(intervalo);
      item.remove();
    }
  }, 50);
}
