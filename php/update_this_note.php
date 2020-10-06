<?php include 'model.php';

$id= $_POST['id'];
$heading = $_POST['heading'];
$text= $_POST['text'];

$obj = new Model();

$obj->updateThisNote($heading, $text, $id);

$result= $obj->getThisNote($id);

echo json_encode($result);

?>