let prod_array = [
  {
    id: 158,
    imgURL: "./images/camiseta.jpg",
    nome: "camiseta",
    estoque: 5,
    preco: 9.99,
  },
  {
    id: 230,
    imgURL: "./images/calca.jpg",
    nome: "calça",
    estoque: 5,
    preco: 19.99,
  },
  {
    id: 775,
    imgURL: "./images/sapato.jpg",
    nome: "sapato",
    estoque: 10,
    preco: 29.99,
  },
  {
    id: 8,
    imgURL: "./images/blusa.jpg",
    nome: "blusa",
    estoque: 20,
    preco: 39.99,
  },
  {
    id: 101,
    imgURL: "./images/sobretudo.jpg",
    nome: "Sobretudo",
    estoque: 5,
    preco: 49.99,
  },
  {
    id: 836,
    imgURL: "./images/fantasia.jpg",
    nome: "fantasia",
    estoque: 10,
    preco: 59.99,
  },
];

/*** Script abaixo roda ao carrega a pagina ****/
//Inicia carrega os produtos na vitrine
prod_array.map((prod, index) => {
  let prodPreco = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(prod.preco);

  let produto = `
	<div class='prod-box' id='position-prod-${index}'>
  <img src="${prod.imgURL}" alt="${prod.nome}" />
		<span class='nome' id='nome'>${prod.nome}(#${prod.id})</span>
		<span class='preco' id='preco'>valor: ${prodPreco}</span>
		<span class='estoque' id='estoque'>estoque: ${prod.estoque}</span>
		<button onclick="adicionarCarrinho(${index})" class='btn'><span>Adicionar ao Carrinho</span></button>
    </div>`;

  document.getElementById("produtos").insertAdjacentHTML("beforeend", produto);
});

let totalValue = document.querySelector(".totalValue");
totalValue.innerHTML = " 0 ";


/*** Funcoes abaixo roda se ocorrer evento de click ****/
function adicionarCarrinho(index) {
  let elementItem = document.getElementById(`position-carrinho-${index}`);

  if (elementItem) {
    
    //elemento ja existe
    let spanQuant = elementItem.querySelector(".quant");

    if(parseInt(spanQuant.innerHTML) >= prod_array[index].estoque){
      return; //nao deixa passar do estoque
    }

    let spanPreco = elementItem.querySelector(".precoLi");
    let precoDeUmaUnicaRoupa = prod_array[index].preco

    spanQuant.innerHTML = parseInt(spanQuant.innerHTML) + 1;
    spanPreco.innerHTML = precoDeUmaUnicaRoupa * parseInt(spanQuant.innerHTML);
  } else {
    //cria elemento
    let liElement = `
    <li class='itemCarrinho' id="position-carrinho-${index}">
      <img src=${prod_array[index].imgURL} alt=${prod_array[index].nome} />
      <span>Quantidade: <span class='quant'>1</span></span>
      <div class="controle-quantidade">
        <div class='aumentar' onclick="mudarQuantidade('${index}', 'somar')"></div>
        <div class='diminuir' onclick="mudarQuantidade('${index}', 'subtrair')"></div>
      </div>
      <span>Preço: R$ <span class="precoLi"> ${prod_array[index].preco}</span></span>
      <div class='remove' onclick="removerCarrinho(${index})">X</div>
      </li>`;

    document.querySelector(".carrinho").insertAdjacentHTML("beforeend", liElement);
  }

  calcularTotal(); //atualiza total
}

function removerCarrinho(index) {
  let elementoItem = document.getElementById(`position-carrinho-${index}`);
  if (elementoItem) {
    elementoItem.remove();
    calcularTotal(); //atualiza total
  }
}

function mudarQuantidade(index, operacao) {
  let elementoItem = document.getElementById("position-carrinho-" + index);

  if (elementoItem) {
    let elementoQuantidade = elementoItem.querySelector(".quant");
    let elementoPreco = elementoItem.querySelector(".precoLi");

    let quantidadeAtual = parseInt(elementoQuantidade.innerHTML);
    let precoDeUmaUnicaRoupa = prod_array[index].preco;

    if (operacao == "somar") 
    {
      if (quantidadeAtual >= prod_array[index].estoque){
        //Se tentar aumentar acima do estoque, entra aqui
        elementoQuantidade.innerHTML = prod_array[index].estoque;
        elementoQuantidade.style.color = "red";
        let elementoAumentar = elementoItem.querySelector('.aumentar');
        elementoAumentar.style.borderBottom = "10px solid red"

        setTimeout(function(){
          elementoQuantidade.style.color = "black";
          elementoAumentar.style.borderBottom = "10px solid green"
        },200);

        return; //retorna pois nao querermos aumentar acima do estoque
      }
      
      quantidadeAtual += 1;
    } 
    else if (operacao == "subtrair") 
    {
      if (quantidadeAtual <= 1){
        //Se tentar diminuir abaixo do estoque, entra aqui
        elementoQuantidade.innerHTML = 1;
        elementoQuantidade.style.color = "red";
        let elementoDiminuir = elementoItem.querySelector('.diminuir');
        elementoDiminuir.style.borderTop = "10px solid red"

        setTimeout(function(){
          elementoQuantidade.style.color = "black";
          elementoDiminuir.style.borderTop = "10px solid green"
        },200);

        return; //nao permitimos diminuir abaixo de 1, entao retornamos
      }

      quantidadeAtual -= 1;
    }

    elementoQuantidade.innerHTML = quantidadeAtual;
    elementoPreco.innerHTML = (precoDeUmaUnicaRoupa * quantidadeAtual).toFixed(2);
    calcularTotal(); //atualiza total
  }
}

function calcularTotal() {
  let total = 0.00;
  let elementosPrecos = document.getElementsByClassName("precoLi");

  for (let i = 0; i < elementosPrecos.length; i++) 
  {
    total += parseFloat(elementosPrecos[i].innerHTML);
  }
  totalValue.innerHTML = total.toFixed(2);
}

function showCarrinho() {
  let setinha = document.querySelector(".setinha");
  let carrinho = document.querySelector(".carrinho");

  if (carrinho.style.display != "none" && setinha.style.display != "none") 
  {
    setinha.style.display = "none";
    carrinho.style.display = "none";
  } 
  else 
  {
    setinha.style.display = "block";
    carrinho.style.display = "flex";
  }
};

// console.log("prod_id: ",id);
// let prodNode = document.getElementById(`prod-${id}`);

// let nome = prodNode.querySelector('#nome').innerHTML;
// console.log('nome: ', nome)
// let preco = prodNode.querySelector('#preco').innerHTML;
// console.log('preco: ', preco)

// "<div class='prod-box' id='prod-"+item.id+>"+
// 	"<img src=" + item.imgURL +" alt=" + item.nome +" />" +
// 	"<span class='nome'>"+item.nome+" (#" + item.id + ")</span>"+
// 	"<span class='preco'>valor: "+item.preco+"</span>" +
// 	"<span class='estoque'>estoque: "+item.estoque+"</span>" +
// 	`<button onclick="minhafuncao('${item.id}')" class='btn'>Adicionar ao Carrinho</button>` +
// "</div>";
