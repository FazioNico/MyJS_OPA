
var LayoutSwitchEffectToHome =  function(){
	$(".navbar-collapse").collapse('hide');
	$('header').addClass('full_height')
	$('nav').addClass('no_margin, align_middle_cell')
	$('ul.navbar-nav').addClass('hideElem')
	$('main').addClass('full_height')
	$('.navbar, .navbar-header').addClass('middle_height_bottom')
	$('.btn-group').removeClass('hideElem')
	$('footer').addClass('hideElem')
}
var LayoutSwitchEffectToPage =  function(){
	if ($( window ).width() <= 768){
		$('main').removeClass('full_height')
	}
	$('header').removeClass('align_middle_table')
	$('header,nav').removeClass('full_height')
	$('nav').removeClass('no_margin, align_middle_cell')
	$('ul.navbar-nav').removeClass('hideElem')
	$('main').removeClass('middle_height_top')
	$('.navbar, .navbar-header').removeClass('middle_height_bottom')
	$('.btn-group').addClass('hideElem')
	$('footer').removeClass('hideElem');
}

var UserCustomFunction =  function(){

/*
	$('.navbar-toggle').click(function(){
		var open = $('.navbar.navbar-default').hasClass('open')
	    if (open === false){
			$(".navbar.navbar-default").addClass('open')
			$('.navbar.navbar-default').removeClass('close')
	    }
	    if (open === true){
			$('.navbar.navbar-default').removeClass('open');
			$('.navbar.navbar-default').addClass('close')

			$(".navbar.navbar-default").delay(300).queue(function() {
			  $('.navbar.navbar-default').removeClass('close')
			  $( this ).dequeue()
			})
	    }
	});
	if ($( window ).width() <= 768){
		$('.navbar-collapse a').click(function(){
			$('.navbar.navbar-default').removeClass('open')
			$('.navbar.navbar-default').addClass('close')
			$(".navbar-collapse").collapse('hide')

			$(".navbar.navbar-default").delay(300).queue(function() {
			  $('.navbar.navbar-default').removeClass('close')
			  $( this ).dequeue()
			})		
		})		
	};
*/

	/* put your custom VAR where VAR Need to be restart (init()) in each hash change...  */
	initialize();	// Google Map
};

/* put your custom function here */

// Responsive utility for navbar header 
if ($( window ).width() <= 768){
	$('.navbar-toggle').on('click', function(){
		$('nav').toggleClass('open')
	});

	$('.navbar-collapse a').click(function(){
		$(".navbar-collapse").collapse('hide')
		$('nav').toggleClass('open')
	})	
};

// Modial Mentions
$('#mentions').on('show.bs.modal', function (event) {
  var modal = $(this)
  var button = $(event.relatedTarget) // Button that triggered the modal
  // request to get data of mention.html
  $.get("src/data/mentions.html", function(data) {
      //console.log(data)
	  var mentionHTML = data // Extract info from mention.html
	  // add data to modial
	  modal.find('.modal-body').html(mentionHTML)
  })  
});

// Form input effect 
$(document).on('click', '.material_effect :input', function(){
	var e = $(this);
	console.log(e);
	
	var e__label = e.context.labels[0];
	var e__value = e.context.value;
	var e__length = e__value.length;
	if(e__length <= 0){
	 $(e__label).toggleClass('focus');
	}
	
});
$(document).on('keyup', '.material_effect :input', function(){
	var e = $(this);
	var e__label = e.context.labels[0];
	var e__value = e.context.value;
	var e__length = e__value.length;
	if(e__length <= 1){
	 $(e__label).addClass('focus');
	}
	//console.log(e__length);
});

// Sending form 
$(document).on('submit', '#question_form', function(e) {
    e.preventDefault(); 
	var $this = $(this);
	// close all alert modal
    $('.alert-success').fadeOut(100);
    $('.alert-danger').fadeOut(100);
    $('.alert-warning').fadeOut(100);
    // Je récupère les valeurs
    var subject = $('#subject').val();
    var email = $('#email').val();

    // Je vérifie une première fois
    if ($.trim(email).length == 0 || $("#subject").val() === "") {
        var text = 'Tous les champs doivent êtres remplis pour envoyer le formulaire';
        $('.alert-danger .alert-content')[0].innerHTML = '';
        $('.alert-danger .alert-content').append(text) ;
        $('.alert-danger').fadeIn(150);
        return false;
    } 
    if (validateEmail__REJEX(email)) {
        // Envoi de la requête HTTP en mode asynchrone
        $.ajax({
            url: $this.attr('action'),
            type: $this.attr('method'),
            data: $this.serialize(),
            dataType: 'json', // JSON
            success: function(json) {
                if(json.reponse === true) {
                    //console.log('eMail envoyé');
			        var text = "Merci pour votre demande. <br>Votre email a bien été envoyé!";
			        $('.alert-success .alert-content')[0].innerHTML = '';
			        $('.alert-success .alert-content').append(text) ;
			        $('.alert-success').fadeIn(150);
			        $('.material_effect label').removeClass('focus');
			        $this[0].reset();
                    
				/* 
					// To get key & value of the callback
					$.each(json, function(i, item) {
						console.log(i + ' => ' + item);
					}); 
				*/                   
                } else {
                    //console.log('Erreur : '+ json.reponse);
			        var text = 'Erreur serveur: '+ json.reponse;
			        $('.alert-danger .alert-content')[0].innerHTML = '';
			        $('.alert-danger .alert-content').append(text) ;
			        $('.alert-danger').fadeIn(150);
                }
            }
        });
    }
    else {
		//alert('email incorrect');
        var text = "Votre adresse email n'est pas correctement écrit";
        $('.alert-danger .alert-content')[0].innerHTML = '';
        $('.alert-danger .alert-content').append(text) ;
        $('.alert-danger').fadeIn(150);
		return false;
	}
});
function validateEmail__REJEX(sEmail) {
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	if (filter.test(sEmail)) {
		var WWW = sEmail.substr(0, 4)
		if (WWW == 'www.'){
			return false
		}
		else {
			return true;
		}
	}
	else {
		return false;
	}
}
$(document).on('click', '.btn-close-alert', function() {
	var alert__el = $(this)[0].parentElement
    $(alert__el).fadeOut(200);
})


// GoogleMap function
function initialize() {
	var geo_lat = 46.202691
	var geo_long = 6.149205
    var mapOptions = {
        scrollwheel: false,
	    navigationControl: false,
	    mapTypeControl: false,
	    scaleControl: false,
      	center: { lat: geo_lat, lng: geo_long},
      	zoom: 15, 
      	mapTypeId: google.maps.MapTypeId.STREET,
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var image = {
	    url: 'imgs/logo_plan_zedd.png', 
	    size: new google.maps.Size(40, 61),
	    // The origin for this image is 0,0.
	    origin: new google.maps.Point(0,0),
	    // The anchor for this image is the base of the flagpole at 0,32.
	    anchor: new google.maps.Point(20, 61)
	};
	var myLatlng = new google.maps.LatLng(geo_lat, geo_long);
	var marker = new google.maps.Marker({
    	position: myLatlng,
    	//icon: image,
    	map: map,
    	title: 'Daniel F.Schütz'
  });
}