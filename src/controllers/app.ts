let usuarios: { name: string; email: string; password: string }[] = [];

const cadastro = (name: string, email: string, password: string, confirmarSenha: string) => {
    try {
        if (password !== confirmarSenha) {
            console.log('As senhas não coincidem!');
            return;
        }

        const usuario = {
            name: name,
            email: email,
            password: password,
        };

        let usuarios: { name: string; email: string; password: string }[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

        usuarios.push(usuario);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        console.log('Usuário cadastrado com sucesso:', usuarios);

    } catch (error) {
        console.log('Erro ao cadastrar usuário: ' + error);
    }
}


const login = (email: string, password: string) => {
    try {
        let usuarios: { name: string; email: string; password: string }[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

        const usuario = usuarios.find(user => user.email === email && user.password === password);

        if (usuario) {
            console.log('Login efetuado com sucesso!');
            window.location.href = "./home.html";  
        } else {
            console.log('Email ou senha incorretos!');
        }
    } catch (error) {
        console.log('Erro ao logar!' + error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('loginForm') as HTMLFormElement;

    if (formLogin) {
        formLogin.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = (document.getElementById('email') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;

            login(email, password);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro') as HTMLFormElement;

    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const nome = (document.getElementById('nome') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const senha = (document.getElementById('senha') as HTMLInputElement).value;
            const confirmarSenha = (document.getElementById('confirmarSenha') as HTMLInputElement).value;

            cadastro(nome, email, senha, confirmarSenha);
        });
    }
});
