//=====================Mostra todos os cadastros na tela de profissionais=======================//
//======================Função de Filtro==============================//
findTransactions();

//const form = {
//    sections: () => document.getElementById('sections')
//}

function findTransactions() {
    //const sections = form.sections().value;  // Acertar o código =======
    firebase.firestore()
        //------------------Retorna consulta a coleção do banco de dados----------------//
        .collection('transactions') // nome da coleção no firestore
        //.where('profissao', '==', sections) //Apresenta os dados que pertencem ao usuario
        //.orderBy('date','desc') // nome da coleção no firestore
        .get()
        .then(snapshot => {
            const transactions = snapshot.docs.map(doc => doc.data());
            addTransactionsToScreen(transactions);
        })
}

//------------------------Inicio da lista Profissionais-------------------------//
function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions');

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);
        orderedList.appendChild(li);
        //-----------------------Nome-----------------------//
        const nome = document.createElement('p');
        nome.innerHTML = '<b>Nome:</b> ' + transaction.nome;
        li.appendChild(nome);
        //-----------------------Data-----------------------//
        const date = document.createElement('p');
        date.innerHTML = '<b>Data de nascimeto: </b>' + formatDate(transaction.date);
        li.appendChild(date);
        //-----------------------Profissão-----------------------//
        const profissao = document.createElement('p');
        profissao.innerHTML = '<b>Especialização: </b>' + transaction.profissao;
        li.appendChild(profissao);
        //-----------------Reistro Profissional-----------------//
        const registro = document.createElement('p');
        registro.innerHTML = '<b>Registro Profissional: </b>' + transaction.registro;
        li.appendChild(registro);
        //-----------------Estado - UF-----------------//
        const estado = document.createElement('p');
        estado.innerHTML = '<b>Estado: </b>' + transaction.estado;
        li.appendChild(estado);
        //-----------------Modalidade de Trabalho-----------------//
        const modtrab = document.createElement('p');
        modtrab.innerHTML = '<b>Modalidade de Trabalho: </b>' + transaction.modtrab;
        li.appendChild(modtrab);
        //-----------------------Valor-----------------------//
        const money = document.createElement('p');
        money.innerHTML = '<b>Valor: </b> R$ ' + transaction.money;
        li.appendChild(money);
        //-----------------------CNPJ-----------------------//
        const cnpj = document.createElement('p');
        cnpj.innerHTML = '<b>CNPJ: </b>' + transaction.cnpj;
        li.appendChild(cnpj);
        //-----------------------Telefone-----------------------//
        const telefone = document.createElement('p');
        telefone.innerHTML = '<b>Telefone de Contato: </b>' + transaction.telefone;
        li.appendChild(telefone);
        //-----------------------Descrição-----------------------//
        const descricaotext = document.createElement('p');
        descricaotext.innerHTML = '<b>Apresentação: </b>' + transaction.descricaotext;
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
//---------------Faz logout na sessao--------------//
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}