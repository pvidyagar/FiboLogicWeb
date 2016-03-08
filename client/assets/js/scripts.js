
$(document).ready(function(){

	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

});

    $(".dropdown-menu li a").click(function(){
        var selfText = $(this).text();
        $(this).parents('.btn-group').find('.dropdown-toggle').html(selfText+' <span class="caret"></span>');
    });

    var dd= new Date();
    var d = dd.getDate();
    var mm = dd.getMonth() + 1;
    var yyyy = dd.getFullYear();
    if (mm < 10) mm = "0" + mm;
    if (d < 10) d = "0" + d;
    var todayDate= d + '-' + mm + '-' + yyyy;
    document.getElementById('today').innerHTML = todayDate;

    var tmrowDate= (d+1) + '-' + mm + '-' + yyyy;
    document.getElementById('tommarow').innerHTML = tmrowDate;

    var datDate= (d+2) + '-' + mm + '-' + yyyy;
    document.getElementById('dat').innerHTML = datDate;
