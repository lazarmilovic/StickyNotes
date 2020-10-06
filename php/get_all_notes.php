<?php 
include 'model.php';

$obj= new Model();
$result = $obj->getAllNotes();

echo json_encode($result);


?>