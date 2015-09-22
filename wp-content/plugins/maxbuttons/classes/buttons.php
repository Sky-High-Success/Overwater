<?php 

// Buttons class - handles paging issues and sanity check for individual buttons 
class maxButtons 
{
	protected static $loadedButtons = array(); // loaded button in current scope  
	/* 
	
	array [ index ] [ button_id ] [data - document_id, done (bool )
	*/
	protected static $documentArray = array();  // given out document ID's  
	
	static function init()
	{
	
	
	}


	static function buttonLoad($args)
	{
		$button_id = $args["button_id"]; 
		self::$loadedButtons[] = $button_id; 
		$document_id = self::getDocumentID(array("button_id" => $button_id)); 
		self::$documentArray[] = array($button_id => array('document_id' => $document_id , 'done' => false));	

	}
	
	static function getDocumentID($args)
	{
		$button_id = $args["button_id"]; 
		foreach(self::$documentArray as $index => $ids) 
		{
			foreach($ids as $doc_button_id => $doc_vars)
			{
				if ($doc_button_id == $button_id) 
				{	
					if (! $doc_vars["done"]) 	
						return $doc_vars["document_id"]; 
				}
			
			}
			
		}
			
		// if not found in documentarray make a new one 
		$loaded = self::$loadedButtons; 
		end($loaded); 
		$i = 0; 
 
		foreach($loaded as $btn_id) 
		{
			if ($btn_id == $button_id)
				$i++; 
		}
		$i--; // minus the current added button..
		
		//$index = key($loaded); // find last index
		if ($i == 0) 
			$document_id = $button_id; 
		else
			$document_id = $button_id . "_" . $i; 
		return $document_id; 
		
 
	
	}

	static function buttonDone($args)
	{
		$button_id = $args["button_id"]; 
		$document_id = $args["document_id"]; 
 
		foreach(self::$documentArray as $index => $data)
		{
			foreach($data as $doc_button_id => $doc_data)
			{
				if ($doc_button_id == $button_id && $doc_data["document_id"] == $document_id)
				{
					self::$documentArray[$index][$button_id]["done"] = true;
				}
				
			}
		
		}
		
	}



}
