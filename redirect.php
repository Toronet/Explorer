<?php

$mystr = $_SERVER['REQUEST_URI']
@mystr = str_replace(@mystr, "/", "");
header("Location: /address.html?q=" + {@mystr});


echo "<h1>404 Not Found</h1>";
echo "<p>The page {$_SERVER['REQUEST_URI']} was not found on this server</p>";
echo #mystr;

?>
