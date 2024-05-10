let QTD_CARDS_LISTAREAS = 4;
let QTD_CARDS_LISTAREAS_LINHAS = 3;
const headerList = ['Eventos', 'Educação', 'Concurso'];

function construirCartoes(area){
    let cardsPorArea = buscar(area, 'area');
    let cards = '';
    cards += `<div class="listAreas">`;
    for (let i = 0; i < QTD_CARDS_LISTAREAS; i++) {
        if (cardsPorArea[i] != undefined) {
            cards += `
            <a href="./src/views/evento/?id=${cardsPorArea[i].id}" class="cardListAreas">
                <div class="imgPlaceHolderListAreas" style="background-image: url('./src/temp_events/img/img/${cardsPorArea[i].iconImg}');"></div>
                <div class="cardListAreasDesc">
                    <span class="date">${cardsPorArea[i].dataExtenso}</span>
                    <span class="cardListTitle">${cardsPorArea[i].nome}</span>
                    <span class="cardListLocation">${cardsPorArea[i].local}</span>
                </div>  
            </a>
        `;
        }
        
    }
    cards += `</div>`;
    return cards;
}

function construirCardListAreas(headerList){
    let listAreas = '';

    for (let c = 0; c < headerList.length; c++) {
        listAreas += `
            <div class="listAreasHeader">
                <h3>${headerList[c]}</h3>
                <a href="./src/views/encontrar_evento/">Ver mais <i class="fa fa-caret-right" aria-hidden="true"></i></a>   
            </div>
        `;
        listAreas += construirCartoes(headerList[c]);
        
    }
    return listAreas;
}



function recalculateCardsListAreas(){
    const windowWidth = $(window).width();
    if (windowWidth < 1200){
        QTD_CARDS_LISTAREAS = 3;
        if (windowWidth < 950){
            QTD_CARDS_LISTAREAS = 2;
        }
        if (windowWidth < 630){
            QTD_CARDS_LISTAREAS = 1;
        }


        for (let i = 0; i < $('.cardListAreas').length; i++) {
                $('.cardListAreas').eq(i).hide();          
        }
        for (let i = 0; i < $('.cardListAreas').length; i++) {
            if (i <= QTD_CARDS_LISTAREAS - 1){
                for (let j = 0; j < QTD_CARDS_LISTAREAS_LINHAS; j++) {
                    $('.cardListAreas').eq(i+j*4).show();
                }
            }
        }
    }
    else{
        QTD_CARDS_LISTAREAS = 4;
        $('.cardListAreas').show();
    }
}

$(document).ready(function() {
    recalculateCardsListAreas();

    $('div.byArea').html(construirCardListAreas(headerList));
    

    



});


$(window).resize(function() {
    recalculateCardsListAreas();
});