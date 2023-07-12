//---------------Faz logout na sessao--------------//
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

//=========================Mostra apenas os dados do usuario na tela de home=======================//
//=========================Mostra apenas os dados do usuario na tela de home=======================//
//=========================Mostra apenas os dados do usuario na tela de home=======================//
//-------------------------AUTENTIFICAÇÃO NA TELA DE HOME COM USER LOGADO------------------------//
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        findDadosHome(user);
    }
})
//pega os dados cadastrados no bando de dados firebase
function findDadosHome(user) {
    showLoading();  //chamar a função CARREGANDO... na pagina
    firebase.firestore()//Chama o firestore db
        .collection('transactions')// nome da coleção no firestore
        .where('user', '==', user.uid) //Apresenta os dados que pertencem ao usuario
        //.orderBy('date','desc')
        .get()
        .then(snapshot => {
            const dadoshome = snapshot.docs.map(doc => doc.data());
            addDadosHomeToScreen(dadoshome);
            hideLoading();
        })
        .catch(error => {
            hideLoading();
            console.log(error);
            alert('Erro ao recuperar')
        })
}
//------------------------Inicio da lista Usuario-------------------------//
function addDadosHomeToScreen(dadoshome) {
    const orderedList = document.getElementById('dadoshome');

    dadoshome.forEach(dadoshome => {
        const li = document.createElement('li');
        li.classList.add(dadoshome.type);
        orderedList.appendChild(li);
        li.addEventListener('click',() => {
            window.location.href = "editperfil.html";
        })
        //-----------------------Nome-----------------------//
        const nome = document.createElement('p');
        nome.innerHTML = '<b>Nome:</b> ' + dadoshome.nome;
        li.appendChild(nome);
        //-----------------------Data-----------------------//
        const date = document.createElement('p');
        date.innerHTML = '<b>Data de nascimeto: </b>' + formatDate(dadoshome.date);
        li.appendChild(date);
        //-----------------------Profissão-----------------------//
        const profissao = document.createElement('p');
        profissao.innerHTML = '<b>Especialização: </b>' + dadoshome.profissao;
        li.appendChild(profissao);
        //-----------------Registro Profissional-----------------//
        const registro = document.createElement('p');
        registro.innerHTML = '<b>Registro Profissional: </b>' + dadoshome.registro;
        li.appendChild(registro);
        //-----------------Estado - UF-----------------//
        const estado = document.createElement('p');
        estado.innerHTML = '<b>Estado: </b>' + dadoshome.estado;
        li.appendChild(estado);
        //-----------------Modalidade de Trabalho-----------------//
        const modtrab = document.createElement('p');
        modtrab.innerHTML = '<b>Modalidade de Trabalho: </b>' + dadoshome.modtrab;
        li.appendChild(modtrab);
        //-----------------------Valor-----------------------//
        const money = document.createElement('p');
        money.innerHTML = '<b>Valor : </b>' + dadoshome.money;
        li.appendChild(money);
        //-----------------------CNPJ-----------------------//
        const cnpj = document.createElement('p');
        cnpj.innerHTML = '<b>CNPJ: </b>' + dadoshome.cnpj;
        li.appendChild(cnpj);
        //-----------------------CPF-----------------------//
        const cpf = document.createElement('p');
        cpf.innerHTML = '<b>CPF: </b>' + dadoshome.cpf;
        li.appendChild(cpf);
        //-----------------------RG-----------------------//
        const rg = document.createElement('p');
        rg.innerHTML = '<b>RG: </b>' + dadoshome.rg;
        li.appendChild(rg);
        //-----------------------Sexo-----------------------//
        const sexo = document.createElement('p');
        sexo.innerHTML = '<b>Sexo: </b>' + dadoshome.sexo;
        li.appendChild(sexo);
        //-----------------------Email de contato - Dados-----------------------//
        const email = document.createElement('p');
        email.innerHTML = '<b>E-mail: </b>' + dadoshome.email;
        li.appendChild(email);
        //-----------------------Telefone-----------------------//
        const telefone = document.createElement('p');
        telefone.innerHTML = '<b>Telefone de Contato: </b>' + dadoshome.telefone;
        li.appendChild(telefone);
        //-----------------------Descrição-----------------------//
        const descricaotext = document.createElement('p');
        descricaotext.innerHTML = '<b>Apresentação: </b>' + dadoshome.descricaotext;
        li.appendChild(descricaotext);

        orderedList.appendChild(li);
    });
}

//------------------Format Data------------------//
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br');
}
//------------------Format money------------------//
function formatMoney(money) {
    return `${money.currency} ${money.value}`;
}

