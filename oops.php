<?php
require_once('config.php');
$db = new PDO("mysql:host={$config['database']['host']};dbname={$config['database']['db_name']}", $config['database']['user'], $config['database']['password']);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

switch($_POST['she'])
{
	case "wonders":
		$dbh = $db->prepare("SELECT `when` FROM falls WHERE `really`=1 ORDER BY `when` DESC");
		$dbh->execute();
		echo json_encode($dbh->fetch(PDO::FETCH_ASSOC));
		break;
	case "fell":
		$when_she_fell = date("Y-m-d H:i:s");
		$dbh = $db->prepare("INSERT INTO falls (`when`, `where`) VALUES (?, ?)");
		echo json_encode(array(
			'fell' => $dbh->execute(array($when_she_fell, $_POST['location'])),
			'at' => $when_she_fell
		));
		break;
	case "didnt":
		$dbh = $db->prepare("UPDATE falls SET `really`=0 WHERE `when`=?");
		echo json_encode(array('fine'=>$dbh->execute(array($_POST['at']))));
		break;
	default:
		echo json_encode(array('error'=>'wat u do?'));
		break;
}
?>