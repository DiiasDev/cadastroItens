// Criação de um array vazio para armazenar objetos de usuários
let usuarios: { name: string; email: string; password: string }[] = [];

// Função para cadastrar novos usuários
const cadastro = (name: string, email: string, password: string, confirmarSenha: string) => {
    try {
        const info = document.getElementById('info') as HTMLDivElement

        // Verifica se a senha e a confirmação são iguais
        if (password !== confirmarSenha) {
            console.log('As senhas não coincidem!');
            return;
        }

        // Cria um objeto com os dados do novo usuário
        const usuario = {
            name: name,
            email: email,
            password: password,
        };

        //Busca usuários cadastrados no LocalStore, se não achar devolve um array vazio
        let usuarios: { name: string; email: string; password: string }[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

        // Adiciona o novo usuário ao array
        usuarios.push(usuario);

        // Salva o array atualizado de usuários no localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Exibe uma mensagem de sucesso no console
        console.log('Usuário cadastrado com sucesso:', usuarios);
        info.innerHTML = 'Usuário cadastrado com sucesso!'

    } catch (error) {
        // Exibe erro no console, caso algo dê errado no processo
        const info = document.getElementById('info') as HTMLDivElement
        console.log('Erro ao cadastrar usuário: ' + error);
        info.innerHTML = 'Erro ao cadastrar Usuário'
    }
}

// Função para realizar login
const login = (email: string, password: string) => {
    try {
        const info = document.getElementById('info') as HTMLDivElement;

        //Busca usuários no localStore
        let usuarios: { name: string; email: string; password: string }[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

        //Cria uma variavel para verificar se o email e senha foram os mesmos do digitado
        const usuario = usuarios.find(user => user.email === email && user.password === password);

        //caso seja, redireciona para a página de Home
        if (usuario) {
            info.innerHTML = ''; // Limpa mensagens anteriores
            console.log('Login efetuado com sucesso!');
            window.location.href = "./home.html";
        } else {
            info.innerHTML = 'Email ou senha incorretos!';
        }
    } catch (error) {
        const info = document.getElementById('info') as HTMLDivElement;
        info.innerHTML = 'Erro ao tentar logar.';
        console.log('Erro ao logar!' + error);
    }
}

// Evento que escuta quando a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('loginForm') as HTMLFormElement;

    // Verifica se o formulário de login existe na página
    if (formLogin) {
        // Adiciona o evento de submit ao formulário de login
        formLogin.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio tradicional do formulário (recarregamento da página)

            // Captura os valores de email e senha inseridos no formulário
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;

            // Chama a função de login passando os dados
            login(email, password);
        });
    }
});

// Evento que escuta quando a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro') as HTMLFormElement;

    // Verifica se o formulário de cadastro existe na página
    if (formCadastro) {
        // Adiciona o evento de submit ao formulário de cadastro
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio tradicional do formulário (recarregamento da página)

            // Captura os valores dos campos do formulário
            const nome = (document.getElementById('nome') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const senha = (document.getElementById('senha') as HTMLInputElement).value;
            const confirmarSenha = (document.getElementById('confirmarSenha') as HTMLInputElement).value;

            // Chama a função de cadastro passando os dados coletados
            cadastro(nome, email, senha, confirmarSenha);
        });
    }
});
