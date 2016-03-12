
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

	/* put your custom VAR here  */
	initialize();	// Google Map
};

/* put your custom function here */
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