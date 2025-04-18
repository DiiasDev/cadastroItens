"use strict";
let usuarios = [];
const cadastro = (name, email, password, confirmarSenha) => {
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
        let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log('Usuário cadastrado com sucesso:', usuarios);
    }
    catch (error) {
        console.log('Erro ao cadastrar usuário: ' + error);
    }
};
const login = (email, password) => {
    try {
        let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuario = usuarios.find(user => user.email === email && user.password === password);
        if (usuario) {
            console.log('Login efetuado com sucesso!');
            window.location.href = "./home.html";
        }
        else {
            console.log('Email ou senha incorretos!');
        }
    }
    catch (error) {
        console.log('Erro ao logar!' + error);
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('loginForm');
    if (formLogin) {
        formLogin.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar o reload da página
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;
            cadastro(nome, email, senha, confirmarSenha); // Chama a função de cadastro
        });
    }
});
