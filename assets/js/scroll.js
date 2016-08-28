var checkScroll = () => {	  
    var top = $('.navbar').offset().top;

    if(top!==0){
        $('.navbar').addClass("navbar-transluscide");
    }else{
        $('.navbar').removeClass("navbar-transluscide");
    }
}

$(document).scroll(checkScroll);