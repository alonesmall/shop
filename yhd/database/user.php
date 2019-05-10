

<?php

  
    $name = @$_REQUEST["name"];

    $pwd = @$_REQUEST["pass"];

    $tel = @$_REQUEST["tel"];



    
    $link = @mysql_connect("localhost:3306","root","");
    if(!$link){
        echo '{"code":0,"errorMsg":"'.mysql_error().'"}';
    }

    $db = @mysql_select_db("mypro");
    if(!$db){
        echo '{"code":0,"errorMsg":"'.mysql_error().'"}';
    }

    $utf = @mysql_query("set names utf8");
    if(!$utf){
        echo '{"code":0,"errorMsg":"'.mysql_error().'"}';
    }

    

        $q = @mysql_query('INSERT user (name,pass_word,tel) VALUES("'.$name.'","'.$pwd.'","'.$tel.'")');
        if($q){
            echo select();
        }else{
            echo '{"code":0,"msg":"'.mysql_error().'"}';
        }
    


    function select(){
        $data = mysql_query("SELECT * FROM user");
        $str = "";
        while($arr = mysql_fetch_assoc($data)){
            $str = $str . json_encode($arr) . ",";
        }
        return "[".substr($str,0,-1)."]";
    }
    
?>