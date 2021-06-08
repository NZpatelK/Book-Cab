<?php
/*
Name: Karan Patel 
Student ID: 15900950
Paper Code: COMP721
Paper Name: Web Development
*/

//Decsiption

/*
This admin server side and they are controling and communication with database to fetch or update from admin users query. 
If admin query to update the status from unassigned to assigned then it must have specifc refercece number to able update the status. 
If admin query to fetch the customer request booking detail can be either search specifc reference 
number or display list of customer request detail and their pick-up time must within 2 hours from the current time. 
*/ 

$refNum = $_GET['refNum'];
$queryType = $_GET['queryType'];

getData($refNum,$queryType);

// This is get or upadate booking detail from the database. 
// There are three different query to fetch the booking detail from data
function getData ($refNum, $queryType)
{
    $conn = @mysqli_connect("server name", "username", "password", "database name") or  die("<h3>Unable to connect to the database server.</h3>" . "<p>Error code " . mysqli_connect_errno() . ": " . mysqli_connect_error() . "</p>");

    switch ($queryType) 
    {
        case "search":
            //This query is to request to fetch the booking detail to match the admin user request of the specific refernce number. 
            $query = "SELECT * FROM `customer`  WHERE `reference` = '{$refNum}' ";
            createTable($conn, $query, 1);
            break;

        case "changeMode":
            $query = " UPDATE `customer` SET  status = 'assigned'  WHERE `reference` = '{$refNum}'";

            //This query is to update the status from unassigned to assigned
            //Admin user must query the reference number to upadate booking detail. 
            if ($conn->query($query) === TRUE) {
                echo "<h2>Update: Reference number {$refNum} is become assigned. </h2> <hr>";
                getData("$refNum", "seeAll");
              } else {
                echo "Error updating record: " . $conn->error;
              }
            break;
        
        default:
            //This query is to fetch the booking detail detail within 2 hours from current time. 
            $date = date('Y-m-d');
            $twoHours = date("H:i", strtotime("+2 hours"));
            $currentTime = date("H:i");

            $query = "SELECT * FROM `customer` WHERE `status` = 'unassigned' AND `pickDate` = '{$date}' AND `pickTime` BETWEEN '{$currentTime}' AND '{$twoHours}'";
            createTable($conn,$query, 2);
            break;
    }

}

//This function is generate to create the table and output of the list of the customer booking detail.
function createTable($conn, $query, $type)
{
    $result = mysqli_query($conn, $query);

    if (!$result) {
        echo "<p>Something is wrong with ", $query, "</p>";
    }
    else if (mysqli_num_rows($result) == 0)
    {

        if($type === 1)
        {
            echo "No records found";
        }
        else
        {
            echo "No records show within 2 hours from current time.";
        }
       
    }
    else {

        echo "<table border=\"1\">";

        echo "<tr>\n"
        . "<th scope=\"col\">Booking reference number</th>\n"
        . "<th scope=\"col\">Customer Name </th>\n"
        . "<th scope=\"col\">Phone</th>\n"
        . "<th scope=\"col\">Pick-up surburb</th>\n"
        . "<th scope=\"col\">Desination suburb</th>\n"
        . "<th scope=\"col\">Pick-up date</th>\n"
        . "<th scope=\"col\">Pick-up time</th>\n"
        . "<th scope=\"col\">Status</th>\n"
        . "<th scope=\"col\">Assign</th>\n"
        . "</tr>\n";

        while ($row = mysqli_fetch_assoc($result)) {

            echo "<tr>";
            echo "<td>" . $row["reference"] . "</td>";
            echo "<td>" . $row["name"] . "</td>";
            echo "<td>" . $row["phoneNo"] . "</td>";
            echo "<td>" . $row["suburb"] . "</td>";
            echo "<td>" . $row["destSuburb"] . "</td>";
            echo "<td>" . $row["pickDate"] . "</td>";
            echo "<td>" . $row["pickTime"] . "</td>";
            echo "<td>" . $row["status"] . "</td>";

            if ($row["status"] == 'unassigned') {
                echo "<td><input type='button' value='Assign' onclick=\"getData('admin.php','displayTable', " . $row["reference"] . ", 'changeMode')\"></td>";
            }
            else{
                echo "<td> Already assigned </td>";
            }
            echo "</tr>";
        }

        echo "</table>";
    }
}
?>