"use strict";
const gerarNovoId = () => {
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    if (items.length === 0)
        return 1;
    const ids = items.map((item) => item.id);
    return Math.max(...ids) + 1;
};
const cadastrarItem = (id, nome, descricao, quantidade, valor, img) => {
    try {
        const info = document.getElementById('info');
        const item = { id, nome, descricao, quantidade, valor, img };
        // Carrega do localStorage
        const listaItems = JSON.parse(localStorage.getItem('items') || '[]');
        listaItems.push(item);
        // Salva novamente no localStorage
        localStorage.setItem('items', JSON.stringify(listaItems));
        // Mensagem de sucesso
        info.style.backgroundColor = 'green';
        info.style.color = 'white';
        info.innerHTML = 'Item cadastrado com sucesso!';
        console.log('Sucesso ao adicionar Item: ', item);
    }
    catch (error) {
        const info = document.getElementById('info');
        info.style.backgroundColor = 'red';
        info.style.color = 'white';
        info.innerHTML = 'Erro ao cadastrar item!';
        console.error('Erro ao adicionar Item:', error);
    }
};
const exibeItems = () => {
    const lista_itens = document.getElementById('lista-itens');
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    if (items.length === 0) {
        lista_itens.innerHTML = '<p>Nenhum item cadastrado ainda.</p>';
        return;
    }
    let html = '';
    items.forEach((item) => {
        html += `
            <div class="item-card">
                <h3>${item.nome}</h3>
                <img src="${item.img}" alt="${item.nome}" width="100" height="100">
                <p>${item.descricao.substring(0, 30)}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Valor: R$ ${item.valor.toFixed(2)}</p>
                <button class='delete-btn' data-id='${item.id}'>Excluir</button>
            </div>
        `;
    });
    lista_itens.innerHTML = html;
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.currentTarget;
            const id = Number(button.dataset.id);
            console.log("Removendo ID:", id); // Agora deve mostrar o número corretamente
            removeItems(id);
        });
    });
};
document.addEventListener('DOMContentLoaded', exibeItems);
const removeItems = (idParaRemover) => {
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    // Encontra o índice do item com o ID correspondente
    const index = items.findIndex((item) => item.id === idParaRemover);
    if (index !== -1) {
        items.splice(index, 1); // Remove o item do array
    }
    localStorage.setItem('items', JSON.stringify(items));
    exibeItems(); // Atualiza a interface
};
document.addEventListener('DOMContentLoaded', () => {
    const formItem = document.getElementById('formItem');
    if (formItem) {
        formItem.addEventListener('submit', (event) => {
            var _a;
            event.preventDefault();
            const getName = document.getElementById('name').value;
            const getDescricao = document.getElementById('description').value;
            const getValue = document.getElementById('value').value;
            const getQtd = document.getElementById('quantidade').value;
            const getImgInput = document.getElementById('img');
            const getId = gerarNovoId();
            const file = (_a = getImgInput.files) === null || _a === void 0 ? void 0 : _a[0];
            if (!file) {
                alert('Selecione uma imagem!');
                return;
            }
            const reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                const base64Img = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                cadastrarItem(getId, getName, getDescricao, Number(getQtd), Number(getValue), base64Img // Aqui vai a imagem em base64
                );
                exibeItems(); // Atualiza a exibição depois do cadastro
            };
            reader.readAsDataURL(file); // Converte o arquivo em base64
        });
    }
});
