const cadastrarItem = (nome: string, descricao: string, quantidade: number, valor: number, img: string) => {
    try {
        const info = document.getElementById('info') as HTMLDivElement;

        const item = { nome, descricao, quantidade, valor, img };

        // Carrega do localStorage
        const listaItems: { nome: string, descricao: string, quantidade: number, valor: number, img: string }[] =
            JSON.parse(localStorage.getItem('items') || '[]');

        listaItems.push(item);

        // Salva novamente no localStorage
        localStorage.setItem('items', JSON.stringify(listaItems));

        // Mensagem de sucesso
        info.style.backgroundColor = 'green';
        info.style.color = 'white';
        info.innerHTML = 'Item cadastrado com sucesso!';

        console.log('Sucesso ao adicionar Item: ', item);
    } catch (error) {
        const info = document.getElementById('info') as HTMLDivElement;
        info.style.backgroundColor = 'red';
        info.style.color = 'white';
        info.innerHTML = 'Erro ao cadastrar item!';
        console.error('Erro ao adicionar Item:', error);
    }
};

const exibeItems = () => {
    const lista_itens = document.getElementById('lista-itens') as HTMLDivElement;
    const items = JSON.parse(localStorage.getItem('items') || '[]');

    if (items.length === 0) {
        lista_itens.innerHTML = '<p>Nenhum item cadastrado ainda.</p>';
        return;
    }

    let html = '';
    items.forEach((item: any) => {
        html += `
            <div class="item-card">
                <h3>${item.nome}</h3>
                <img src="${item.img}" alt="${item.nome}" width="100">
                <p>${item.descricao}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Valor: R$ ${item.valor.toFixed(2)}</p>
            </div>
        `;
    });

    lista_itens.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', exibeItems);


document.addEventListener('DOMContentLoaded', () => {
    const formItem = document.getElementById('formItem') as HTMLFormElement;
    if (formItem) {
        formItem.addEventListener('submit', (event) => {
            event.preventDefault();
        
            const getName = (document.getElementById('name') as HTMLInputElement).value;
            const getDescricao = (document.getElementById('description') as HTMLInputElement).value;
            const getValue = (document.getElementById('value') as HTMLInputElement).value;
            const getQtd = (document.getElementById('quantidade') as HTMLInputElement).value;
            const getImgInput = document.getElementById('img') as HTMLInputElement;
        
            const file = getImgInput.files?.[0];
        
            if (!file) {
                alert('Selecione uma imagem!');
                return;
            }
        
            const reader = new FileReader();
        
            reader.onload = function (e) {
                const base64Img = e.target?.result as string;
        
                cadastrarItem(
                    getName,
                    getDescricao,
                    Number(getQtd),
                    Number(getValue),
                    base64Img // Aqui vai a imagem em base64
                );
        
                exibeItems(); // Atualiza a exibição depois do cadastro
            };
        
            reader.readAsDataURL(file); // Converte o arquivo em base64
        });
    }
});
