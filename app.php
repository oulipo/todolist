<?php

include("lib/connexion.php");

$item = $_POST["item"] ?? "";
$id =  $_POST["id"] ?? 0;
$action =  $_POST["action"] ?? "";
$etat = $_POST["etat"] ?? 0;

if(!empty($item) && $action === "add") {
    $stmt = $pdo->prepare("INSERT INTO todolist (item, etat) VALUES (?, ?)");
    $stmt->execute([$item, false]);
}

if($id !== 0 && $action === "suppr") {
    $stmt = $pdo->prepare("DELETE FROM todolist WHERE id = ?");
    $stmt->execute([$id]);
}

if($id && $action === "check") {
    $etat = ($etat === "1") ? 0 : 1;
    $stmt = $pdo->prepare("UPDATE todolist SET etat = ? WHERE id = ?");
    $stmt->execute([$etat, $id]);
}

$stmt = $pdo->prepare("SELECT * FROM todolist");
$stmt->execute();
$todolist = $stmt->fetchAll();

// supprimer un item
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($todolist);