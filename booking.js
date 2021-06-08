/*
Name: Karan Patel 
Student ID: 15900950
Paper Code: COMP721
Paper Name: Web Development
*/

//Decsiption

/*
This is booking class to control the user input to make sure the required input must be not empty and mandatory numeric input must have number input.
Also this class is to generate the local current time and date to display and also valid check to make sure user do not select data and time before the current date and time.
If the form is valid check is correct then pass to the server side to insert into database. 
*/


const CustomerDetailForm = ["name", "phone", "unit number", "street number", "street name", "sbnmae" , "dsbname" , "date", "time"];
var todayDate;
var currentDate;
var currentTime;
const BookingForm = document.getElementById('UpdateDisplay').innerHTML;
var xhr = createRequest();


refreshTime();
document.getElementById('currentDate').value = currentDate; 
document.getElementById('currentTime').value = currentTime;

//This function is add zero in hours between 0 - 9
//E.g  9:03 call this function to add zero then become 09:03.
function addZeroForTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

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

//This function is to pass the customer booking detail to the server side then they will insert into the database. 
function getData(dataSource, divID)
{
    if(xhr)
    {
        var place = document.getElementById(divID);

        var custDetail = getCustomerDetail();

        if(checkTheForm(custDetail))
        {
            var custJson = JSON.stringify(custDetail);
            xhr.open("POST", dataSource, !0);
            xhr.send(custJson);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var jsondata = xhr.responseText;
                    place.innerHTML = jsondata;
                }

            }
        }



    }
}

//This function is to clear or reset the form. when user click reset button or user click create new request form
function getNewForm(divID)
{
    form = document.getElementById(divID);
    form.innerHTML = BookingForm;

    refreshTime();

    document.getElementById('currentDate').value = currentDate;
    document.getElementById('currentTime').value = currentTime;
}

//This function to check and valid input date and time.
//User must select data and time from current date and time and toward to the future. 
function inputValidCheck(inputName, inputValue, value2)
{
    var outputId = document.getElementById(inputName);
    refreshTime();
 
    switch (inputName) {

        case "date":

            if(inputValue < currentDate)
            {
                outputId.innerHTML = "You couldn't choose past date. please choose today or future date."
                return false;
            }
            else
            {
                outputId.innerHTML ="";
            }     

            break;

        case "time":

            if (document.querySelector("input[name=date]").value == currentDate)
             {
                if (currentTime >= inputValue) 
                {
                    outputId.innerHTML = "you couldn't book cab before current time. Please select the time later than current time";
                    return false;
                }
                else {
                    outputId.innerHTML = "";
                }
            }
   
            break;

        default:
            return checkNumericAndStringInput(inputName, inputValue, outputId, value2);
    }

    return true;

    
}

//This function is to check some required input must be not empty. 
//Also some input must be have numeric and no string or character
function checkNumericAndStringInput(inputName ,inputValue, outputId, value2)
{
    if (inputName === 'cname' || inputName === 'phone' || inputName === 'snumber' || inputName === 'stname') {

        if (!inputValue || inputValue.length === 0 || !inputValue.trim()) {

            outputId.innerHTML = "Please input your " + value2 + " here";
            return false;
        }
        else {
            outputId.innerHTML = "";
        }
    }
    
    if(inputName === 'phone' || inputName === 'snumber' || inputName === 'unumber')
    {
        if(isNaN(inputValue))
        {
            outputId.innerHTML = "Please enter the number only";
            return false;
        }
        else
        {
            outputId.innerHTML = "";
        }

    }

    if(inputName === 'phone')
    {
        const strippedPhone = inputValue.replace(/\s+/g, '');

        if((strippedPhone.length >= 10) && (strippedPhone.length <= 12))
        {
            outputId.innerHTML = "";
        }
        else
        {
            outputId.innerHTML = "Please enter your phone number legnth between 10 to 12 only";
            return false;
        }    

    }

    return true;
}

//This function is collect all the input value into array then array covert to the Json object.
function getCustomerDetail()
{

    const name = document.querySelector("input[name=cname]").value;
    const phoneNo = document.querySelector("input[name=phone]").value;
    const unitNum = document.querySelector("input[name=unumber]").value;
    const streetNum = document.querySelector("input[name=snumber]").value;
    const streetName = document.querySelector("input[name=stname]").value;
    const suburb = document.querySelector("input[name=sbname]").value;
    const destSuburb = document.querySelector("input[name=dsbname]").value;
    const pickDate = document.querySelector("input[name=date]").value;
    const pickTime = document.querySelector("input[name=time]").value;


   return  {cname: name, 
                    phone: phoneNo, 
                    unumber: unitNum, 
                    snumber: streetNum,
                    stname: streetName,
                    sbname: suburb,
                    dsbname: destSuburb,
                    date: pickDate,
                    time: pickTime};

}

//before send the customer detail to the database 
//This function is to check and make the form is correct and make requrired input is not empty and some input is make sure they are numeric. 
function checkTheForm(custDetail)
{    
    var inValidCount = 0;
    let count = 0;

    for(var key in custDetail)
    {
        if(custDetail.hasOwnProperty(key))
        {
            if(!inputValidCheck(key, custDetail[key], CustomerDetailForm[count]))
            {
                inValidCount++;
            }

            count++;
        }
    }

    if(inValidCount > 0)
    {
        return false;
    } 
    
    return true;
}

//This function is update the date and time. when user click reset or create new request. 
function refreshTime()
{
    todayDate = new Date();
    currentDate = todayDate.toISOString().substring(0, 10);
    currentTime = addZeroForTime(todayDate.getHours()) + ':' + addZeroForTime(todayDate.getMinutes());
}