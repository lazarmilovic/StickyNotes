<?php include 'model.php';

$heading= $_POST['heading'];
$text= $_POST['text'];

$obj= new Model();

$obj->insertNewNote($heading, $text);

$result =$obj->getAllNotes();

echo json_encode($result);

