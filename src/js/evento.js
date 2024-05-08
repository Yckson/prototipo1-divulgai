function loadPage(){
    const pageContent = buscar(GET.id, 'id')[0];
    loadContentDesc(pageContent.descricao);
    loadDesc(pageContent);


}

function loadContentDesc(descricao){
    $('div.eventContent').html(descricao);
}

function loadDesc(content){
    $('div.eventInfoDesc > h1').text(content.nome);
    $('span#prazo').html(`<i class="fa fa-calendar" aria-hidden="true"></i>` + content.data);
    $('span#local').html(`<i class="fa fa-map-marker" aria-hidden="true"></i>` + content.local);
}

$(document).ready(function() {
    loadPage();
});