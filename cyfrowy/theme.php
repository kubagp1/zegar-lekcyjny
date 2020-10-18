<?php
$action = $_POST['action'];
$value = $_POST['value'];

if ($action == "load") {
    $value = strtoupper($value);
    echo file_get_contents('themes/'.$value);
} else if ($action == "save" && strlen($value)<5000) {
    $chars = '23456789ABCDEFGHJKLMNPQRSTWXYZ';
    $fn = substr(str_shuffle($chars), 0, 5);
    fopen("themes/".$fn, "w");
    file_put_contents("themes/".$fn, $value);
    echo $fn;
}