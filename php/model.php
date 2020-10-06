<?php include 'connection.php';

class Model extends Connection{

    public function getAllNotes(){
        $sql="SELECT * FROM notes";
        $stmt= $this->connect()->prepare($sql);
        $stmt->execute();
        $result= $stmt->fetchAll();
        return $result;
    }
    public function getThisNote($id){
        $sql="SELECT * FROM notes WHERE note_id =?";
        $stmt= $this->connect()->prepare($sql);
        $stmt->execute([$id]);
        $result= $stmt->fetchAll();
        return $result;
    }

    public function insertNewNote($heading, $text){
        $sql="INSERT INTO notes (note_heading, note_text) VALUES(?,?)";
        $stmt= $this->connect()->prepare($sql);
        $stmt->execute([$heading, $text]);

    }

    public function updateThisNote($heading,$text,$id){
        $sql="UPDATE notes SET note_heading=?, note_text=? WHERE note_id=?";
        $stmt=$this->connect()->prepare($sql);
        $stmt->execute([$heading, $text, $id]);
    }
}

?>