const GET = {}




function buscar(texto, onde, listaEventos = EVENTOS){
    const eventosBuscados = listaEventos.filter((evento)=>{
        return evento[onde].toLowerCase().includes(texto.toLowerCase());
    });

    return eventosBuscados;
}

function getParamsURL(){
    const query = window.location.search.substring(1);
    const queryParams = query.split('&');
    queryParams.map(
        (param)=>{
            GET[param.split('=')[0]] = param.split('=')[1];
        }
    );
}

function pegarFavoritos(){
    if(localStorage.getItem('favoritos')){
        return JSON.parse(localStorage.getItem('favoritos'));
    }
    else{
        return [];
    }
}

function salvarFavoritos(favoritos){
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function adicionarFavorito(id){
    const favoritos = pegarFavoritos();
    favoritos.push(id);
    salvarFavoritos(favoritos);
}

function removerFavorito(id){
    const favoritos = pegarFavoritos();
    const index = favoritos.indexOf(id);
    favoritos.splice(index, 1);
    salvarFavoritos(favoritos);
}





$(document).ready(function() {
    getParamsURL();

    $('nav img').click(function(){
        window.location.href = '/prototipo1-divulgaai/';
    });



});