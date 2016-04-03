<?php

	if(isset($_POST)) {
	    if($_POST['email'] !== '') {
	        $reponse = true;
	    } 
	    else {
	        $reponse = 'Les champs sont vides';
	    }
	} 
	else {
	    $reponse = 'Tous les champs ne sont pas parvenus';
	}
	$arr = array('reponse' => $reponse); 
	echo json_encode($arr);
?>