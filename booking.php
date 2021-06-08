<?php
/*
Name: Karan Patel 
Student ID: 15900950
Paper Code: COMP721
Paper Name: Web Development
*/

//Decsiption

/*
This is booking server side when the client side pass the customer booking detail to server. Then serever will insert the customer booking detail into the database. 
Server will return to the client side and display to show the thank you message with new reference number. 
*/

$customer = file_get_contents('php://input');

$custDecode = json_decode($customer, true);

postIntoDatabase($custDecode);

// This function is insert the new customer booking detail into database. 
// This function will return the output the display to show the thank you message inlcude new reference number and pick-up date and time.
function postIntoDatabase($custDeatil)
{
    $conn = @mysqli_connect("server name", "username", "password", "database name") or die("<h3>Unable to connect to the database server.</h3>" . "<p>Error code " . mysqli_connect_errno() . ": " . mysqli_connect_error() . "</p>");
    
    $query = "INSERT INTO customer (name, phoneNo ,unitNum, streetNum, streetName, suburb, destSuburb, pickDate, pickTime, status) 
            VALUES ('$custDeatil[cname]','$custDeatil[phone]', '$custDeatil[unumber]', '$custDeatil[snumber]', '$custDeatil[stname]', '$custDeatil[sbname]', '$custDeatil[dsbname]', '$custDeatil[date]', '$custDeatil[time]', 'unassigned')";

    if (mysqli_query($conn, $query)) {

        $last_id = $conn->insert_id;

        echo "<p name=\"refernce\"> Thank you! Your booking reference number is {$last_id}. You will be picked up in front of your provided address at {$custDeatil['time']} on {$custDeatil['date']}.</p>";
        echo "<input class=\"formButton\" type=\"button\" value=\"Create New Booking request\" name=\"submit\" onClick=\"getNewForm('UpdateDisplay')\">";
        echo "<br> <a href=\"index.html\" class=\"returnPage\">Return to Home Page</a>";

    } else {

        echo "<h1> Your booking is Unsuccessful booked becuase system error. </h1>";
        echo "<p> Error: " . mysqli_error($conn) . "</p>";
        echo "<input class=\"formButton\" type=\"button\" value=\"Home Page\" name=\"submit\" onClick=\"getNewForm('UpdateDisplay')\">";

    }
}

?>