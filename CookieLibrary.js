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