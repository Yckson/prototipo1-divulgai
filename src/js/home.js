let QTD_CARDS_LISTAREAS = 4;
let QTD_CARDS_LISTAREAS_LINHAS = 3;

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
});


$(window).resize(function() {
    recalculateCardsListAreas();
});