<?php include 'model.php';

$id= $_POST['id'];

$obj= new Model();
$result = $obj->getThisNote($id);

if($result!=''){
echo json_encode($result);
} else {
    echo 'error';
}

?>