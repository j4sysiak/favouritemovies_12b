<?php

$dataRow = showUsers('admin');

echo "\t\t<section class='admin'>\n";
echo "\t\t\t<div class='admin_users'>\n";

if ($testUsers != "no_data") {
    echo "\t\t\t\t<h2>Manage users</h2>\n";
}
                
echo "\t\t\t\t<table class='admin_table'>\n";
echo "\t\t\t\t\t<tr>\n";
echo "\t\t\t\t\t\t<th class='data_col'>Firstname</th>\n";
echo "\t\t\t\t\t\t<th class='data_col'>Lastname</th>\n";
echo "\t\t\t\t\t\t<th class='admin_col'>Insert/Delete</th>\n";
echo "\t\t\t\t\t</tr>\n";
echo $dataRow;
echo "\t\t\t\t\t<tr class='newdatarow'>\n";
echo "\t\t\t\t\t\t<td><input class='newdata' type='text' name='firstname' value=''></td>\n";
echo "\t\t\t\t\t\t<td><input class='newdata' type='text' name='lastname' value=''></td>\n";
echo "\t\t\t\t\t\t<td class='insertcell'><div class='insert hidden'></div></td>\n";
echo "\t\t\t\t\t</tr>\n";
echo "\t\t\t\t</table>\n";
echo "\t\t\t</div>\n";
echo "\t\t</section>\n\n";