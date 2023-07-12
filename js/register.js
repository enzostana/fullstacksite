firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "home.html";
    }
})

//=============================Valida email=========================//
function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable();
}
//=============================Valida senha=========================//
function onChangePassword() {
    const password = form.password().value;
    form.passwordMinLengthError().style.display = password.length >= 8 ? "none" : "block";
    form.passwordRequiredError().style.display = password ? "none" : "block";
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}
//=======================Valida confirmação de senha=========================//
function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}
//=======================Valida Data=========================//
function onChangeDate() {
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? "block" : "none";
}
//=======================Valida NOME=========================//
function onChangeNOME() {
    const nome = form.nome().value;
    form.nomeRequiredError().style.display = !nome ? "block" : "none";
}
//=======================Valida CPF=========================//
function onChangeCPF() {
    const cpf = form.cpf().value;
    form.cpfRequiredError().style.display = !cpf ? "block" : "none";
}
//=======================Valida RG=========================//
function onChangeRG() {
    const rg = form.rg().value;
    form.rgRequiredError().style.display = !rg ? "block" : "none";
}
//=======================Valida CNPJ=========================//
function onChangeCNPJ() {
    const cnpj = form.cnpj().value;
    form.cnpjRequiredError().style.display = !cnpj ? "block" : "none";
}
//=======================Valida senhas iguais=========================//
function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}
//=============================Validação de email=========================//
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
//=============================Registra usuário Teste=========================//
function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    const type = 'jpg';
    const nome = form.nome().value;
    const cpf = form.cpf().value;
    const rg = form.rg().value;
    const sexo = form.sexo().value;
    const date = form.date().value;
    const cnpj = form.cnpj().value;
    const endereco = form.endereco().value;
    const estado = form.estado().value;
    const telefone = form.telefone().value;
    const modtrab = form.modtrab().value;
    const money = form.money().value;
    const profissao = form.profissao().value;
    const registro = form.registro().value;
    const descricao = form.descricao().value;


    firebase.auth().createUserWithEmailAndPassword(
        email, password
    )

        .then(data => {
            const uid = data.user.uid;
            //const user = firebase.auth().currentUser.uid;
            const users = firebase.firestore()
                .collection('transactions');
            users.doc(uid).set({
                email: email, nome: nome, cpf: cpf, rg: rg,
                sexo: sexo, date: date, cnpj: cnpj, endereco: endereco, type: type, estado: estado,
                telefone: telefone, profissao: profissao, registro: registro, modtrab: modtrab,
                money: money, descricaotext: descricao, user: uid
            })
            window.location.href = "home.html"
            hideLoading();

        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        })
}
//=============================Registra usuário=========================//
/*function register() {
    showLoading();
    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    )
    const transaction = createTransaction();

    firebase.firestore()
        .collection('transactions')
        .add(transaction)
        .then(() => {
            window.location.href = "/public/home.html"
            hideLoading();
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        })
}

function createTransaction() {
    return {
        type: form.type().value,
        nome: form.nome().value,
        cpf: form.cpf().value,
        rg: form.rg().value,
        sexo: form.sexo().value,
        date: form.date().value,
        cnpj: form.cnpj().value,
        //endereco: form.endereco().value,
        estado: form.estado().value,
        telefone: form.telefone().value,
        email: form.email().value,
        //money: {
        //    currency: form.currency().value,
        //    value: parseFloat(form.value().value)
        //},
        profissao: form.profissao().value,
        resgistro: form.registro().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    };
}*/

//================Salva os dados de cadastro no firestore======================//
/*function saveTransaction() {
    const transaction = {
        type: form.type('jpg').value,
        nome: form.nome().value,
        cpf: form.cpf().value,
        rg: form.rg().value,
        sexo: form.sexo().value,
        date: form.date().value,
        cnpj: form.cnpj().value,
        //endereco: form.endereco().value,
        estado: form.estado().value,
        telefone: form.telefone().value,
        email: form.email().value,
        //money: {
        //    currency: form.currency().value,
        //    value: parseFloat(form.value().value)
        //},
        profissao: form.profissao().value,
        resgistro: form.registro().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
    console.log(transaction);
}*/
//========================Erro - Usuário Existente======================//
function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está cadastrado";
    }
    return error.message;
}
//===================Valida form e Habilita button Registrar===================//
function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}
function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }
    const password = form.password().value;
    if (!password || password.length < 8) {
        return false;
    }
    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }
    return true;
}
//=========================Constantes de validação===============================//
const form = {
    descricao: () => document.getElementById('descricao'),
    modtrab: () => document.getElementById('modtrab'),
    money: () => document.getElementById('money'),
    //type: () => document.getElementById('type'),
    sexo: () => document.getElementById('sexo'),
    endereco: () => document.getElementById('endereco'),
    estado: () => document.getElementById('estado'),
    telefone: () => document.getElementById('telefone'),
    email: () => document.getElementById('email'),
    profissao: () => document.getElementById('profissao'),
    registro: () => document.getElementById('registro'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button'),
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    nome: () => document.getElementById('nome'),
    nomeRequiredError: () => document.getElementById('nome-required-error'),
    cpf: () => document.getElementById('cpf'),
    cpfRequiredError: () => document.getElementById('cpf-required-error'),
    rg: () => document.getElementById('rg'),
    rgRequiredError: () => document.getElementById('rg-required-error'),
    cnpj: () => document.getElementById('cnpj'),
    cnpjRequiredError: () => document.getElementById('cnpj-required-error')
}
//----------------------------FORMATAÇÃO CPF-----------------------------------//
function mascara(i) {
    var v = i.value;
    if (isNaN(v[v.length - 1])) { // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length - 1);
        return;
    }
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
}
//--------------------------FORMATAÇÃO CNPJ------------------------------------//
// -------
// -------
// -------
// -------
//----------------FORMATAÇÃO TELEFONE PROFISSIONAL----------------------------//
const telefone = document.getElementById('telefone') // Seletor do campo de telefone

telefone.addEventListener('keypress', (e) => mascaraTelefone1(e.target.value)) // Dispara quando digitado no campo
telefone.addEventListener('change', (e) => mascaraTelefone1(e.target.value)) // Dispara quando autocompletado o campo
const mascaraTelefone1 = (valor) => {
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    telefone.value = valor // Insere o(s) valor(es) no campo
}
