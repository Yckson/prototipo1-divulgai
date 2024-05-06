function buscar(texto, onde){
    const eventosBuscados = EVENTOS.filter((evento)=>{
        return evento[onde].toLowerCase().includes(texto.toLowerCase());
    });

    return eventosBuscados;
}



$(document).ready(function() {




});