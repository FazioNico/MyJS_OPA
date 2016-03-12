$(window).on('hashchange', function() {
 	var slug = getSlug()
	NewControlleur(slug)
	hash_ready = RouterResult
    d = window.json.pages
    l = hash_ready[1]
    p = hash_ready[2]
    LoadLangueText(d,l,p)
    UserCustomFunction()
	//console.log(d[l][p])
});

$(document).ready(function () { 
	// Bof Start App
	var slug = getSlug()		
	NewControlleur(slug) // init Controlleur
	hash_ready = RouterResult // $RouterResult is creat from the Router() function in Controleur
	//console.log(RouterResult)
	var a = Service(hash_ready) // Send state & hash to Service Data and load all content data to $data
	a.done(function(data) {
	   /* Bof - Save & add current html to $data Object */
	   data = saveCurrentHTML(data)
	   window.json = data;
	   /* Save current html to $data */
   	   d = window.json.pages
   	   l = hash_ready[1]
   	   p = hash_ready[2]
	   LoadLangueText(d,l,p) // function LoadLangueText on content section element
	});
	//console.log(l)
	// Eof - Start App
});


