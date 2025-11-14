const main = document.getElementById('main');
const galeria = document.getElementById('galeria');
const options = document.getElementsByClassName('main__options')[0];
const menuHamburguer = document.getElementById('menu-hamburguer');
const menuBar = document.getElementsByClassName('menu-navbar')[0];
const overlay = document.getElementsByClassName('overlay')[0];
const html = document.documentElement;
const filterButton = document.getElementById('filter-button');


let categorias = ['beauty', 'fragrances', 'furniture', 'groceries'];



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


// Função que carrega todos os produtos como tela inicial
async function telaInicial(dadosRequisicao){
    // Limpa a galeria
    galeria.innerHTML = '';
    // Chama os dados da API
    let dados = await dadosRequisicao
    // Para cada objeto cria um card
    dados.products.forEach(produto => {
        criarCard(produto);
    });

    
}


// Mostra os produtos por categoria filtrando-os
async function filtrarProdutos(categoria,dadosRequisicao){
    // Limpa a galeria
    galeria.innerHTML = '';
    // Pega os dados da API
    let dados = await dadosRequisicao
    // Filtra os produtos por categoria
    let listaProdutos = dados.products.filter(produto => produto.category === categoria)
    // Para cada objeto do Array de filtrados cria um card
    listaProdutos.forEach(produto => {
        criarCard(produto);
    });
    
}


async function fetchApi(url){
    const resp = await fetch(url);
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


// Cria os botões de filtro
// O objetivo dessa função é deixcar menos hard coded
function criarBotoes(categorias,classeBotoes){
    // Cria botões e adiciona suas funcionalidades por categoria do Array
    categorias.forEach(categoria => {
        let button = document.createElement('button');
        button.textContent = categoria;
        button.classList.add(classeBotoes);
        button.onclick = () => {filtrarProdutos(categoria,dadosGlobal)}
        options.appendChild(button);
        
    });
    // Cria o botão de limpar
     let button = document.createElement('button');
        button.textContent = 'Limpar Filtros';
        button.onclick = () => {telaInicial(dadosGlobal)}
        button.classList.add(classeBotoes);
        options.appendChild(button);


}



// Código de setup da página
// Chama a API
let dadosGlobal = fetchApi(`https://dummyjson.com/products`);
// Carrega todos os produtos
telaInicial(dadosGlobal);


// Cria os botões de filtro
criarBotoes(categorias,'main__button');


// Dá funcionalidade ao botão de mostrar filtros
filterButton.onclick = () => {
    const filters = document.querySelectorAll('.main__button');
    filters.forEach(botao => {
        botao.classList.toggle('show');
    })
    
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
