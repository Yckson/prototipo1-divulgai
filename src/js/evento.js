function loadPage(){
    const pageContent = buscar(GET.id, 'id')[0];
    $('div.imageBrand').css('background-image', 'url(./../../temp_events/img/img/' + pageContent.img + ')');
    loadContentDesc(pageContent.descricao);
    loadDesc(pageContent);

    const btnFav = $('button#addFav');
    if (isFav(pageContent.id)) {
        btnFav.addClass('btnFavorited');
        btnFav.html('<i class="fa fa-star" aria-hidden="true"></i> Adicionado aos favoritos');
        console.log(pegarFavoritos());
    }

    $('title').text('Divulga Aí - ' + pageContent.nome);




}

function isFav(id) {
    return pegarFavoritos().includes(id);
}

function loadContentDesc(descricao){
    $('div.eventContent').html(descricao);
}

function loadDesc(content){
    $('div.eventInfoDesc > h1').text(content.nome);
    $('span#prazo').html(`<i class="fa fa-calendar" aria-hidden="true"></i> ` + content.dataExtenso);
    $('span#local').html(`<i class="fa fa-map-marker" aria-hidden="true"></i> ` + content.local);
}

$(document).ready(function() {
    loadPage();

    $('button#addFav').click(function(){
        const id = GET.id;
        const btnFav = $(this);
        if (isFav(id)) {
            removerFavorito(id);
            btnFav.html('<i class="fa fa-star-o" aria-hidden="true"></i> Adicionar aos favoritos');
            btnFav.removeClass('btnFavorited');
        } else {
            adicionarFavorito(id);
            btnFav.html('<i class="fa fa-star" aria-hidden="true"></i> Adicionado aos favoritos');
            btnFav.addClass('btnFavorited');

        }
    });
    
    $('button#addFav').hover(function(){
        const id = GET.id;
        const btnFav = $(this);
        if (isFav(id) && !(window.innerWidth < 768)) {
            btnFav.html('<i class="fa fa-star" aria-hidden="true"></i> Remover dos favoritos');
            btnFav.addClass('btnFavErase');
        } else {
            btnFav.html('<i class="fa fa-star" aria-hidden="true"></i> Adicionar aos favoritos');
        }
    });

    $('button#addFav').mouseleave(function(){
        const id = GET.id;
        const btnFav = $(this);
        btnFav.removeClass('btnFavErase');
        if (isFav(id)) {
            btnFav.html('<i class="fa fa-star" aria-hidden="true"></i> Adicionado aos favoritos');
            
        } else {
            btnFav.html('<i class="fa fa-star-o" aria-hidden="true"></i> Adicionar aos favoritos');
        }
    });
});