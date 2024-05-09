function construirCartoes(eventos){
    let qtdEventos = eventos.length;
    let posEventoAtual = 0;
    let cards = '';


    while (posEventoAtual < qtdEventos){
        /*
        if (eventos[posEventoAtual].desabilitado == true || eventos[posEventoAtual].desabilitado == undefined){
            posEventoAtual++;
            continue;
        }
        */

        cards += `
            <a href="./../../views/evento/?id=${eventos[posEventoAtual].id}" class="cardListAreas" target="_blank">
                <div class="imgPlaceHolderListAreas" style="background-image: url('./../../temp_events/img/img/${eventos[posEventoAtual].img}');"></div>
                <div class="cardListAreasDesc">
                    <span class="date">${eventos[posEventoAtual].dataExtenso}</span>
                    <span class="cardListTitle">${eventos[posEventoAtual].nome}</span>
                    <span class="cardListLocation">${eventos[posEventoAtual].local}</span>
                </div>  
            </a>
        `;
        posEventoAtual++;
    }
    cards += `</div>`;
    return cards;
}

function usarFiltro(filtros){
    let filtro = [EVENTOS];
    if(filtros.texto != ''){
        filtro.push(buscar(filtros.texto, 'nome'));
    };

    const ultimaFiltragem = filtro.pop();
    const cards = construirCartoes(ultimaFiltragem);
    $('.events').html(cards);



}


$(document).ready(function(){
    const cards = construirCartoes(EVENTOS);
    $('.events').html(cards);

    $('.searchButton').on('click', function(){
        const search = $('.searchText').val().toLowerCase();


        const filtros ={
            texto: search,
        }

        usarFiltro(filtros);
    });
});