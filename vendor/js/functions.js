/* Bof - functions */
var Service = function(hash){
	//console.log(state, hash) // Get $hash for data storage
	

    //var q  = $.getJSON('http://ateliers.nomades.ch/~fazio/Projet-WebDesigner/MyJS_OPA/src/data/json/data.json', function(data) {
    var q  = $.getJSON('http://localhost:8888/src/data/json/data.json', function(data) { // with MAMP
    //var q  = $.getJSON('http://schutz-law.ch/src/data/json/data.json', function(data) { // For the client
    	return data
    })
    return q
}

var saveCurrentHTML = function(data){

	   var allSection = $('section')
	   var n
	   var arraySection = '';
	   for (n = 0; n < allSection.length; n++) {
	   		var menu = $('#'+allSection[n].id+' h1')[0].innerText
	   		//dataSection  = allSection[n].children[0].children[0].children[0].children[0]
	   		dataSection  = $('#'+allSection[n].id+' .dataSection')[0]
	   		var re = /"/gi;
	   		var place = "'";
	   		text = dataSection.innerHTML
	   		text = text.replace(re, place);
	   		text = text.replace(/^\s+|\s+$/gm,'');
	   		text = text.replace(/[\n]/gi, "");
	   		text = text.trim();
	   		//console.log(text)
	   		arraySection += '"'+allSection[n].id+'":{"content": "'+text+'","menu": "'+menu+'", "title": ""},'
	   }
	   arraySection += '"accueil":{"content": "","menu": "Accueil", "title": ""},'
	   arraySection = arraySection.substring(0,arraySection.length-1) // retirer derière virgule
	   //console.log(arraySection)
	   var defaultDocLang = ($('html')[0].getAttribute('lang'))
	   var test = '{ "'+defaultDocLang+'" : '+
	   	'{'+arraySection+'}'+
	   '}';
	   $.extend( data.pages, JSON.parse(test) );
	   //console.log(data)

       return data
}

var getSlug = function(){
	var query = window.location.hash
	array_query = query.split('/')
	return array_query
}

var LangBtn = function(e){
		LayoutSwitchEffectToPage() 
		btn_ID = e.target.hash		
		array_hash = btn_ID.split('/')
		$('#'+array_hash[2]).removeClass('opp')
		//console.log(array_hash[2]);
};

var BacktohomeBtn = function(allSection){
		LayoutSwitchEffectToHome()
		ChangeHeaderStyle()
		//allSection.hide()
};

var ChangeHeaderStyle = function(){
		var open = $('.navbar.navbar-default').hasClass('open')
	    if (open === true){
			$('.navbar.navbar-default').removeClass('open');
			$('.navbar.navbar-default').addClass('close');

			$(".navbar.navbar-default").delay(300).queue(function() {
			  $('.navbar.navbar-default').removeClass('close');
			  $( this ).dequeue();
			});	
	    }
	    //console.log('a')
}

var NewControlleur = function(slug){
	var hash = NewRouter(slug);
	//console.log(hash)
	SectionDisplayer(hash)
	RouterResult = hash
	return RouterResult
};

var SectionDisplayer = function(hash){
	var allSection = $('section')
	allSection.addClass('opp_f')

	switch(hash[2]){
		case 'accueil':
			$('#title_home_section').hide()	
			break
		default: 			
			if (!$('#'+hash[2])[0]){
					//console.log('404')
					hash[2] = '404'
			}
			var current_section = $('#'+hash[2]) // get name of current section
			//console.log(current_section)
			LayoutSwitchEffectToPage() 
			//console.log(current_section)
			if(current_section[0]){	
				var menu_id = hash[2]	
				var rt_page = hash[2]	
				var lang = hash[1]		
			}
			if(!current_section[0]){	
				var menu_id = 'accueil'		
				var rt_page = '404'		
				var lang = $('html')[0].getAttribute('lang')
				current_section = $('#404')
			}
			//current_section.show();
			// Show correct section
			current_section.toggleClass('opp_f') // Show correct section

			// Bof active correct item of navbar
			$('ul>li.active').removeClass('active')
			var menu_item = $('a[data-name="'+menu_id+'"]')
			if(menu_item[0]){	
				$(menu_item[0].parentElement).addClass('active') // Active correct menu item
			}
			// Eof
	};
	// Bof - btn langues
	$('ul.dropdown-menu>li>a').on('click', function(e){
		LangBtn(e)
	});
	// Bof - btn Accueil
	$('.backtohome').on('click', function(){
		BacktohomeBtn(allSection)
	});
	// Bof - lien mentions
	$('a.mentions').on('click', function(e){
		e.preventDefault();
		//BacktohomeBtn(allSection)
	});
};
/*
var SectionDisplayer = function(hash){
	var allSection = $('section')
	allSection.addClass('opp_f')
	switch(hash[2]){
		case 'accueil':
			$('#title_home_section').hide()	
			break
		default: 			
			if (!$('#'+hash[2])[0]){
					//console.log('404')
					hash[2] = '404'
			}
			var current_section = $('#'+hash[2]) // get name of current section
			//console.log(current_section)
			LayoutSwitchEffectToPage() 
			//console.log(current_section)
			if(current_section[0]){	
				var menu_id = hash[2]	
				var rt_page = hash[2]	
				var lang = hash[1]		
			}
			if(!current_section[0]){	
				var menu_id = 'accueil'		
				var rt_page = '404'		
				var lang = $('html')[0].getAttribute('lang')
				current_section = $('#404')
			}
			current_section.removeClass('opp_f') // Show correct section

			// Bof active correct item of navbar
			$('ul>li.active').removeClass('active')
			var menu_item = $('a[data-name="'+menu_id+'"]')
			if(menu_item[0]){	
				$(menu_item[0].parentElement).addClass('active') // Active correct menu item
			}
			// Eof
	};
	// Bof - btn langues
	$('ul.dropdown-menu>li>a').on('click', function(e){
		LangBtn(e)
	});
	// Bof - btn Accueil
	$('.backtohome').on('click', function(){
		BacktohomeBtn(allSection)
	});
	// Bof - lien mentions
	$('a.mentions').on('click', function(e){
		e.preventDefault();
		//BacktohomeBtn(allSection)
	});
};
*/
var NewRouter = function(slug){
	var sl = slug.length // nbr El in array
	var r_sl;
	var hash;
	switch(true){
		case sl == 0:
			r_sl = false
			hash = ["#", $('html')[0].getAttribute('lang'), "404"]
			break
		case sl == 1:
			r_sl = true
			if(!slug[0]){
				hash = ["#", $('html')[0].getAttribute('lang'), "accueil"] // right case
			}
			if(slug[0]){
				hash = ["#", $('html')[0].getAttribute('lang'), "404"]
			}
			break
		case sl == 2:
			r_sl = true
			if(slug[1] == 'accueil'){
				hash = ["#", $('html')[0].getAttribute('lang'), "accueil"] // right case
			}
			if(slug[1] != 'accueil'){
				hash = ["#", $('html')[0].getAttribute('lang'), "404"]
			}
			break
		case sl == 3:
			r_sl = true
			hash = ["#", slug[1], slug[2]] // right case
			break
		case sl >= 4:
			r_sl = false
			hash = ["#", $('html')[0].getAttribute('lang'), "404"]
			break
	}
	//console.log(hash)
	return hash
};

var LoadLangueText = function(d,l,p){
		if (p != 'accueil'){
			//console.log(d[l][p])
			var current_section = $('#'+p)
			//var current_data  = current_section[0].children[0].children[0].children[0]
			var current_data  = $('#'+p+' .dataSection')[0]
			//console.log(current_data)
			var new_data  = d[l][p]
			current_data.innerHTML = new_data.content // Change content with new_data
			// Bof - Change menu link & text with correct langue
			menu_link = $('ul.nav>li>a')
			var n
			for (n = 0; n < menu_link.length; n++) {
					array_menu_hash = menu_link[n].hash.split('/')
					if(!d[l][array_menu_hash[2]]){
						menu_link[n].innerText = d[l].accueil.menu
					}
					if(d[l][array_menu_hash[2]]){
						menu_link[n].hash = array_menu_hash[0]+'/'+l+'/'+array_menu_hash[2]
						menu_link[n].innerText = d[l][array_menu_hash[2]].menu;
					}
					//console.log(d[l])
			};	
			// Eof - Change menu link & text with correct langue 
			/*
			if(hash_ready[1] != l){
				//console.log(hash_ready[1])
				//console.log(l)
			}
			*/
		}
		//console.log(current_data)
		//console.log(d[l][p].menu)
};

/*------ Eof Function -----*/
