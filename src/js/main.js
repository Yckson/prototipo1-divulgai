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





$(document).ready(function() {
    getParamsURL();



});