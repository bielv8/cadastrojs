// JavaScript
const tabelaContainer = document.getElementById('tabela-container');
const tabela = document.getElementById('tabela');
const tabelaCorpo = document.getElementById('tabela-corpo');
const downloadCsv = document.getElementById('download-csv');
const adminButton = document.getElementById('admin-button');
const adminForm = document.getElementById('admin-form');
const senhaInput = document.getElementById('senha');
const adminSubmit = document.getElementById('admin-submit');

// Dados dos usuários cadastrados
let dadosUsuarios = [];

// Função para exibir a tabela
function exibirTabela() {
  tabela.style.display = 'table';
  tabelaContainer.style.display = 'block';
  downloadCsv.style.display = 'block';
}

// Função para preencher a tabela
function preencherTabela() {
  tabelaCorpo.innerHTML = '';
  dadosUsuarios.forEach(function(usuario) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.dataNascimento}</td>
      <td>${usuario.email}</td>
      <td>${usuario.genero}</td>
    `;
    tabelaCorpo.appendChild(tr);
  });
}

// Função para baixar CSV
downloadCsv.addEventListener('click', baixarCsv);

function baixarCsv() {
  let csv = 'Nome,Data de Nascimento,E-mail,Gênero\n';
  dadosUsuarios.forEach(function(usuario) {
    csv += `${usuario.nome},${usuario.dataNascimento},${usuario.email},${usuario.genero}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'usuarios.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
}

// Event listener para o botão de administrador
adminButton.addEventListener('click', function() {
  adminForm.style.display = 'block';
});

// Event listener para o formulário de senha de administrador
adminSubmit.addEventListener('click', function(event) {
  event.preventDefault();
  const senha = senhaInput.value;
  if (senha === '1234') { // Substituir pela senha correta
    adminForm.style.display = 'none';
    preencherTabela();
    exibirTabela();
  } else {
    alert('Senha incorreta!');
  }
});

// Event listener para o envio do formulário de cadastro
document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const dataNascimento = document.getElementById('data_nascimento').value;
  const email = document.getElementById('email').value;
  const genero = document.getElementById('genero').value;

  const novoUsuario = {
    nome: nome,
    dataNascimento: dataNascimento,
    email: email,genero: genero
};

dadosUsuarios.push(novoUsuario);

document.getElementById('formulario').reset();

alert('Cadastro realizado com sucesso!');
});

