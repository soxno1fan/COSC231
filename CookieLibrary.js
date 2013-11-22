/*
 *  Mordechai Sadowsky
 *  COSC 231 - Fall 2013, Prof. Haynes
 *  Nov. 21, 2013
 *
 *  This is my homemade cookie library written for Project 4
 */

function setCookie(name, value) {
    document.cookie = escape(name)+'='+escape(value)+".";
    alert("document.cookie: "+document.cookie);
}

function getCookie(name) {
    var cookieFlag = name+"=";
    var nameIndex = document.cookie.indexOf(cookieFlag);
    var endCookie = document.cookie.indexOf(".", nameIndex);
    return document.cookie.substring(nameIndex,endCookie);
}

/*
<!DOCTYPE html>
<html>
    <head>
        <script>
            function getCookie(c_name) {
                 var c_value = document.cookie;
                 var c_start = c_value.indexOf(" " + c_name + "=");
                 if (c_start == -1) {
                     c_start = c_value.indexOf(c_name + "=");
                 }
                 if (c_start == -1) {
                     c_value = null;
                 }
                 else {
                     c_start = c_value.indexOf("=", c_start) + 1;
                     var c_end = c_value.indexOf(";", c_start);
                     if (c_end == -1) {
                         c_end = c_value.length;
                     }
                     c_value = unescape(c_value.substring(c_start,c_end));
                 }
                 return c_value;
             }
             
             function setCookie(c_name,value,exdays) {
                 var exdate=new Date();
                 exdate.setDate(exdate.getDate() + exdays);
                 var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
                 document.cookie=c_name + "=" + c_value;
             }
             
             function checkCookie() {
                 var username=getCookie("username");
                 if (username!=null && username!="") {
                     alert("Welcome again " + username);
                 }
                 else {
                     username=prompt("Please enter your name:","");
                     if (username!=null && username!="") {
                         setCookie("username",username,365);
                     }
                 }
             }
        </script>
    </head>
    <body onload="checkCookie()">
    </body>
</html>
*/