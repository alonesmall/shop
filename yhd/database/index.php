<?php
    // echo "hello";

    // echo "1".mysql_connect()."";

    
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

    
    $q = @mysql_query('SELECT * FROM shoplist');
    if($q){
        $str = "";
        while($arr = mysql_fetch_assoc($q)){
            $str = $str.json_encode($arr).",";
        }
        echo "[".substr($str,0,-1)."]";
    }else{
        echo '{"code":0,"errorMsg":"'.mysql_error().'"}';
    }

    
?>