$FILE = $(Get-Content .\games.txt)
$TABLE = [System.Collections.ArrayList]@()

$i = 0
ForEach ($line in $FILE) {
	$info = $line.Split("~")
	$TABLE += @{}
	$TABLE[$i].game = $info[0]
	$TABLE[$i].gameUrl = ""
	$TABLE[$i].acName += @(0)
	$TABLE[$i].acName[0] = $info[1]
	$TABLE[$i].acStatus = $info[2]
	$TABLE[$i].acStatusUrl = ""
	$i++
}
ConvertTo-Json $TABLE > .\games.json