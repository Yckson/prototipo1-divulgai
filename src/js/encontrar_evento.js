let CALENDARIO;
let usarFiltroData = false;
let usarFiltroCategoria = false;
let usarFiltroFormato = false;
let usarFiltroFavoritos = false;




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
                    <span class="cardListLocation">${eventos[posEventoAtual].local}
                        ${
                            pegarFavoritos().filter((favorito)=>{
                                return favorito == eventos[posEventoAtual].id;
                            }).length > 0 ? '<i class="fa fa-star favChecked"></i>' : ''
                        }
                    </span>
                </div>  
            </a>
        `;
        posEventoAtual++;
    }
    cards += `</div>`;
    return cards;
}


function montarDataTexto(data){
    const dia = data.getDate();
    let mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    if (mes < 10){
        mes = `0${mes}`;
    }

    return `${ano}-${mes}-${dia}`;

}

function filtrarPorData(data, eventos = EVENTOS){
    const dataTexto = montarDataTexto(data);
    const eventosFiltrados = buscar(dataTexto, 'data', eventos);

    return eventosFiltrados;
}

function usarFiltro(filtros){
    let filtro = [EVENTOS];
    if(filtros.texto != ''){
        filtro.push(buscar(filtros.texto, 'nome'));
    }

    if(filtros.data != undefined && usarFiltroData){
        filtro.push(filtrarPorData(filtros.data, filtro[filtro.length - 1]));
    }

    if(usarFiltroCategoria){
        filtro.push(buscar(usarFiltroCategoria, 'area', filtro[filtro.length - 1]));
    }

    if(usarFiltroFormato){
        if (usarFiltroFormato == 'online'){
            filtro.push(buscar('online', 'local', filtro[filtro.length - 1]));
        }
        else if (usarFiltroFormato == 'encerrados'){
            console.log('Ainda a fazer!!!');
        }
        else{
            let eventos = filtro[filtro.length - 1];
            let eventosFiltrados = eventos.filter(evento => evento.local.toLowerCase().includes('online') == false);
            filtro.push(eventosFiltrados);
        }
    }

    if(usarFiltroFavoritos){
        const favoritos = pegarFavoritos();
        const eventos = filtro[filtro.length - 1];
        const eventosFiltrados = eventos.filter(evento => favoritos.includes(evento.id));
        filtro.push(eventosFiltrados);
    }

    const ultimaFiltragem = filtro.pop();
    const cards = construirCartoes(ultimaFiltragem);
    $('.events').html(cards);



}


$(document).ready(function(){
    usarFiltroFormato = GET.formato ? GET.formato : false;
    usarFiltroCategoria = GET.categoria ? GET.categoria : false;

    const cards = usarFiltro({texto: '', data: undefined});
    $('.events').html(cards);

    $('.searchButton').on('click', function(){
        const search = $('.searchText').val().toLowerCase();


        const filtros = {
            texto: search,
            data: CALENDARIO.selectedDates[0],
        }

        usarFiltro(filtros);
    });
});


$(document).ready(function(){
    CALENDARIO = $('#btnData').flatpickr({
        locale: 'pt',
    })

    $('#btnData').on('click', function(){
        usarFiltroData = true;
        $('#btnData').toggleClass('subFilterChecked');
        $('#clearFilters > span').text('Limpar Filtros');
        $(window).outerWidth() < 435 &&  $('#clearFilters > span').css('font-size', '0.9em');
    });

    $('#btnCategory').on('click', function(){
        $('#categoryDropdown').toggleClass('hide');
    });

    $('#btnFormat').on('click', function(){
        $('#formatDropdown').toggleClass('hide');
    });

    $('.searchText').on('input', function(){
        $('#clearFilters > span').text('Limpar Filtros');
        $(window).width() < 435 &&  $('#clearFilters > span').css('font-size', '0.9em');
    });


    $(document).on('click', function(event){
        if (!$(event.target).closest('#btnCategory').length){
            $('#categoryDropdown').addClass('hide');
        }

        if (!$(event.target).closest('#btnFormat').length){
            $('#formatDropdown').addClass('hide');
        }

    });

    $('.category').on('click', function(){
        const categoria = this.innerText.toLowerCase();
        usarFiltroCategoria = categoria;
        $('#btnCategory').toggleClass('subFilterChecked');
        $('#clearFilters > span').text('Limpar Filtros');
        $(window).outerWidth() < 435 &&  $('#clearFilters > span').css('font-size', '0.9em');

    });

    $('.format').on('click', function(){
        const formato = this.innerText.toLowerCase();
        usarFiltroFormato = formato;
        $('#btnFormat').toggleClass('subFilterChecked');
        $('#clearFilters > span').text('Limpar Filtros');
        $(window).outerWidth() < 435 &&  $('#clearFilters > span').css('font-size', '0.9em');
    });

    $('#btnFav').on('click', function(){
        usarFiltroFavoritos = true;
        $('#clearFilters > span').text('Limpar Filtros');
        $('#btnFav').toggleClass('subFilterFav');
        $(window).outerWidth() < 435 &&  $('#clearFilters > span').css('font-size', '0.9em');
    });



    $('#clearFilters').on('click', function(){
        usarFiltroData = false;
        usarFiltroCategoria = false;
        usarFiltroFormato = false;
        usarFiltroFavoritos = false;
        console.log('limpando filtros');

        $('.searchText').val('');

        const cards = construirCartoes(EVENTOS);
        $('.events').html(cards);

        $('#btnCategory').removeClass('subFilterChecked');
        $('#btnFormat').removeClass('subFilterChecked');
        $('#btnData').removeClass('subFilterChecked');
        $('#btnFav').removeClass('subFilterFav');
        $('#clearFilters > span').text('Filtros');
        

        
    });



});