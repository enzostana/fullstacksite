//Corresponde ao index.js == Tela de login
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "home.html";
    }
})
//--------Função de Validação de email e senha para login-------//
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}
//--------------Login Firebase-----------------------------//
function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        window.location.href = "home.html";
        hideLoading();
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
        console.log('error',error)
    });
}
//---------Registrar-----------------------//
function register() {
    window.location.href="cadastro.html";
}
//--------------Recuperar Senha--------------//
function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
//-------------Valida email---------------------------------//
function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}
//------------Valida Senha------------------------------------//
function isPasswordValid() {
    return form.password().value ? true : false;
}
//---------Regra valida email---------------------------------//
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
//-----------------------------------------------------------//
//-----------------------------------------------------------//
//----------------Mensagem de error no login, email invalido-----------------//
function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário não encontrado";
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida";
    }
    return error.message;
}
function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}
//----------------Mensagem de error no login, senha invalida-----------------//
function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}
//-------Habilita ou desabila os botões no login por campo preenchido-------//
function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}
//-------------------------------------------------------------------//
const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button")
} 