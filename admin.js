/*
Name: Karan Patel 
Student ID: 15900950
Paper Code: COMP721
Paper Name: Web Development
*/

//Decsiption

/*
This adamin class is to control the customer request. The control can update the status or fetch the customer request booking detail. 
The status can only update from unassigned to assign.admin user can fetch the request booking detail can use either search specifc reference 
number or display list of customer request detail and their pick-up time must within 2 hours from the current time. 
*/

var xhr = createRequest();

getData('admin.php','content','', 'seeall'); // When user opent the admin page then this function will automatic generate the display of the list of the booking detail within 2 hours from current time.

// This fucntion is set up the communication and passing the data between client side and server side. 
function createRequest() {
    var getXHR = false;

    if(window.XMLHttpRequest)
    {
        getXHR = new XMLHttpRequest();
    }
    else
    {
        getXHR = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return getXHR;
}

// This function is request to the server side to fetch or update the customer booking detail and return from the server to display list of the coustomer booking detail. 
function getData(dataSource, divID, refNum, queryType) 
{
    if(refNum == "")
    {
        queryType = "seeAll";
    }
    if (inputNumericValid(refNum)) {

        if (xhr) {
            var place = document.getElementById(divID);
            var url = dataSource + "?refNum=" + refNum + "&queryType=" + queryType;
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    place.innerHTML = xhr.responseText;
                }
            }
            xhr.send(null);
        }
    }
}


//This is function is check reference number input is numeric and not alphabet. 
function inputNumericValid(inputValue)
{
    const outputId = document.getElementById('errorMsg');

    if (isNaN(inputValue)) 
    {
        outputId.innerHTML = "Please enter the number only";
        return false;
    }
    else {
        outputId.innerHTML = "";
        return true;
    }
}