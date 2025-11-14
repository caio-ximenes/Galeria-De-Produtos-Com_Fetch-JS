// Todo código foi pensado para ser modular e encapsulado
// Tentei usar o máximo de técnicas profissionais, boa práticas e tudo aquilo que facilite o reuso e manutenção do código, se tiver algo a mais a acrescentar, por favor!


const main = document.getElementById('main');
const galeria = document.getElementById('galeria');
const menuHamburguer = document.getElementById('menu-hamburguer');
const menuBar = document.getElementsByClassName('menu-navbar')[0];
const overlay = document.getElementsByClassName('overlay')[0];
const html = document.documentElement;



// Função de chamada da API
async function fetchApi() {
    const resp = await fetch(`https://dummyjson.com/products`);
    // Verificação de erros igual ao slide
    // Verifica se a resposta é diferente da família 2XX
    if (!resp.ok) {
        throw new Error('Erro ao buscar os produtos');
    }
    else {
        const data = await resp.json();
        return data;
    }
    
}

// Função de criação do card
// Recebe o Objeto produto e usa suas props para montar o card ja estilizado
function criarCard(produto){


    // Cria a div do card
    let divCard = document.createElement('div');
    divCard.classList.add('card');
    
    // Cria o texto do id do produto
    let id = document.createElement('h1');
    id.textContent = `ID: ${produto.id}`;
    id.classList.add('card-id');
    divCard.appendChild(id);

    // Cria o container da imagem do produto
    let imagemProduto = document.createElement('img');
    imagemProduto.src =produto.images[0];
    imagemProduto.classList.add('card-img');
    divCard.appendChild(imagemProduto);

    // Cria o texto do nome do produto
    let nome = document.createElement('h2');
    nome.textContent = produto.title;
    nome.classList.add('card-nome');
    divCard.appendChild(nome);

    // Cria o texto da descricao do produto
    let descricao = document.createElement('p');
    descricao.textContent = produto.description;
    descricao.classList.add('card-descricao');
    divCard.appendChild(descricao);

    // Cria o texto da categoria do produto
    let category = document.createElement('p');
    category.textContent = `Categoria: ${produto.category}`;
    category.classList.add('card-categoria');
    divCard.appendChild(category);


    // Faz o append do card na galeria
    galeria.appendChild(divCard);
}


// Função de sortear produtos
async function sortearProduto(){
    // Limpa a galeria
    galeria.innerHTML = '';
    // Chama a API
    let dados = await fetchApi();
    // Define o limite do número aleatório
    const maxNumber = dados.products.length - 1;
    // Sorteia o Id do produto
    const numeroSorteado = Math.floor(Math.random() * maxNumber);
    // Separa o produto
    const produto = dados.products[numeroSorteado];
    // Chama a função para criar o card
    criarCard(produto);
}

// Faz o menu hamburguer funcionar e mostrar a barra lateral ao ser clicado
menuHamburguer.addEventListener('click', () => {
    menuBar.classList.toggle('show');
    overlay.classList.toggle('show');
    html.classList.toggle('no-scroll');
    


});

// Cria o modo de sair clicando no overlay
// Preferi deixar assim pois assim que vejo na maior parte dos apps
overlay.addEventListener('click', () => {
    menuBar.classList.remove('show');
    overlay.classList.remove('show');
    html.classList.remove('no-scroll');
    
});
