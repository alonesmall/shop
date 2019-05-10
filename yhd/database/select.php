
<?php

// 连接mysql
$link = @mysql_connect("localhost:3306","root","");
if(!$link){
    echo '{"code":0,"msg":"'.mysql_error().'"}';
}
// 选择数据库
$db = @mysql_select_db("mypro");
if(!$db){
    echo '{"code":0,"msg":"'.mysql_error().'"}';
}
// 设置字符集
$utf = mysql_query("set names utf8");
if(!$utf){
    echo '{"code":0,"msg":"'.mysql_error().'"}';
}

echo select();

function select(){
    $data = mysql_query("SELECT * FROM user");
    $str = "";
    if($data){
        while($arr = mysql_fetch_assoc($data)){
            $str = $str . json_encode($arr) . ",";
        }
        return "[".substr($str,0,-1)."]";
    }else{
        return '{"code":0,"msg":"'.mysql_error().'"}';
    }
}

?>