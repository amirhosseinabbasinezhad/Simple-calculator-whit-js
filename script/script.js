
const display=document.querySelector(".display");
const numkey=document.querySelectorAll('[num]');
const operatorkey=document.querySelectorAll('[operator]');
const equalOperator=document.querySelector(".equal");
const ce=document.querySelector('[ce]');
const ac=document.querySelector('[ac]');
let str,last,saveString,final,fString,arrayData=[];
//event listener and function for screenInput number----------------------------------------------------------------------
for (var i = 0 ; i < numkey.length; i++) {
    numkey[i].addEventListener('click' , screenInputNumber) ; 
 }
 function screenInputNumber(e){
    val(e.target.innerText);
 }
 //event listener and function for screenInput Operator-------------------------------------------------------------------
 for (var i = 0 ; i < operatorkey.length; i++) {
    operatorkey[i].addEventListener('click' , screenInputOperator) ; 
 }
 function screenInputOperator(e){
    val(e.target.innerText);
}
 //event listener and function for keyboardInput---------------------------------------------------------------------------
document.addEventListener('keydown' , keyboardInput)
function keyboardInput(e){
    const inputKey=e.key;
    const codeoperator =[106,107,109,111,8,13,110,187];
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || codeoperator.includes(e.keyCode)) {
        if (e.keyCode >= 48 && e.keyCode <= 57){
            keyCode48_57(e.keyCode);
        }
        else{
        switch (e.keyCode){
            case 8:
                clearE();
                break;
            case 13:
                e.preventDefault();
                result();
                break;
            case 187:
                result();
                break;                 
            default:
            val(inputKey);
            }
        }
    }
}
function keyCode48_57(key){
    let p=[48,49,50,51,52,53,54,55,56,57];
    val(p.indexOf(key));
}
//clear all character---------------------------------------------------------------------------------------------------
ac.addEventListener('click',clearA);
function clearA(){
    display.innerText='|0|';
}
//clear one character when tap backspace or CE in screen-----------------------------------------------------------------
ce.addEventListener('click', clearE);
function clearE(){
    str=display.textContent;
    if (str==='|0|') { }
    else if (str.length==1) {
        display.innerText='|0|'
    }
    else if(str.charAt(0)==="e"){
        clearA();
    }
    else{
    let str2 =str.slice(0, -1);
    display.innerText=str2;
    }
}
//show result when tap enter or (=) in screen----------------------------------------------------------------------------
//event listener for equal button and go to result function
equalOperator.addEventListener('click' ,result)
function result (e){
    const oper="+ , - , * , /"
    str=display.textContent;
    final = str.replaceAll('×','*');
    final=final.replaceAll('÷','/');
    if (oper.includes(final.charAt(final.length-1))) {
        
    }
    else if (str==='|0|') {

    }
    else if (final.charAt(0)==='=') {
        
    }
    else{
        final=eval(final);
        saveString=str+'='+final;
        saveString=saveString.replaceAll('*','×');
        saveString=saveString.replaceAll('/','÷');
        if (saveString.length<=18) {
            
            
            display.innerText='='+final;
            //let strtoarr=localStorage.getItem('calc');
            addToList(saveString);
        }
        else{
            display.innerText="error";
        }
    }
    
}
//check last character --------------------------------------------------------------------------------------------------
function checkLastCharacter(last){
    let result;
    const numbers= '1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 0 , .'
    const operators = '- , + , × , ÷,*,/'
    if (last=='|' || last=='r') { result = 'start'; }
    else if(numbers.includes(last)){ result = 'numbers'; }
    else if (operators.includes(last)) { result= 'operators'; } 
    else if (last== '=' ) { result = 'result'; }
    return result; }
//validate info----------------------------------------------------------------------------------------------------------
function val(value){
    if (value==='*'||value==='/') {
         value=value.replaceAll('*','×');
         value=value.replaceAll('/','÷');
     }
    str=display.textContent;
    // whith next line we can recognize last item too check for limitations tow or more operation next to each other
    last= str.charAt(str.length -1)
    //this else if work whit place(s of checkLastCharacter function
    if (checkLastCharacter(last)==='start') {
        if (checkLastCharacter(value)==='operators') {}
        else if (value===".") {}
        else{
            place(value)
        }
    }
    else if (checkLastCharacter(last)==='numbers') {
        if (last=='.' && checkLastCharacter(value)==='operators') { }
        else if (str.charAt(0)==='=') {
            if(checkLastCharacter(value)==='operators'){
               str= str.slice(1,str.length);
               place(str+value)
            }
            else{
                place( value)
            }
        }
        else{
            place( display.textContent+value)
        }
    }
    else if (checkLastCharacter(last)==='operators') {
        if (checkLastCharacter(value)==='operators') { 
            let str2 =str.slice(0, -1);
            place( str2+value)
        }
        else{
            place( display.textContent+value)
            }
        }
    }
//place in screen-------------------------------------------------------------------------------------------------------
function place(str){
    if (str.length>21) {
        str='error'
    }
    else if(str==="error"){
        str='error'
    }
    display.innerText=str;    
}
function s_h_SavedDatae(){
    if (document.getElementById('s-hbtn').textContent==='Show History') {
        showSavedDatae()    
    }
    else if (document.getElementById('s-hbtn').textContent==='Hide History') {
        hideSavedDatae()
    }
}
function showSavedDatae(){
    document.getElementById('dropdown').style.display='block'
    document.getElementById('s-hbtn').innerText='Hide History'
 }
 function hideSavedDatae(){
    document.getElementById('dropdown').style.display='none'
    document.getElementById('s-hbtn').innerText='Show History'
 }
 function addToList(saveString){
    const ftrash=document.createElement('i');
    ftrash.classList="fas fa-trash"
    const removeBtn=document.createElement('a');
    removeBtn.classList="rButton"
    removeBtn.appendChild(ftrash)
    let listText=document.createElement('a');
    listText.textContent=saveString;
    let ul=document.querySelector('.myul');
    let list=document.createElement('li');
    
    list.appendChild(listText);
    list.appendChild(removeBtn);
    ul.appendChild(list);
    setData(saveString);
}
document.querySelector('.dropdown-content').addEventListener('click', removeFromList)
function removeFromList(e){
    let ul=document.querySelector('.myul');
    if (e.target.className.includes('fa-trash')) {
        ul.removeChild(e.target.parentElement.parentElement);
        removeFromLocal(e.target.parentElement.parentElement.textContent);
    }
}
function removeFromLocal(text){
    const rnotes=getData();
    let j=0;
    rnotes.forEach(function (note, element) {
        if (j===0) {
            if (note===text) {
                rnotes.splice(element,1);
                j++;
            }
        }
    });
    localStorage.setItem('calc', JSON.stringify(rnotes));
}
function setData(saveString){
    const data=getData();
    data.push(saveString);
    localStorage.setItem('calc',JSON.stringify(data));
 }
function getData(){
    let getFromLocal=localStorage.getItem('calc');
    let myItem;
    if (getFromLocal=== null) {
        myItem=[];
    }
    else{
        myItem=JSON.parse(getFromLocal);
    }
    return myItem;
}

document.addEventListener('DOMContentLoaded', Reload)
function Reload(){
    const localData=getData();
    localData.forEach(element => {
        const ftrash=document.createElement('i');
        ftrash.classList="fas fa-trash"
        const removeBtn=document.createElement('a');
        removeBtn.classList="rButton"
        removeBtn.appendChild(ftrash)
        let listText=document.createElement('a');
        listText.textContent=element;
        let ul=document.querySelector('.myul');
        let list=document.createElement('li');
        
        list.appendChild(listText);
        list.appendChild(removeBtn);
        ul.appendChild(list);
    });

}

//code haye zir ro aval zadam vali balayee behine tare 



/*for (var i = 0 ; i < numkey.length; i++) {
    numkey[i].addEventListener('click' , val) ; 
 }
 for (var i = 0 ; i < operatorkey.length; i++) {
    operatorkey[i].addEventListener('click' , val) ; 
 }
 //screen input

 //keyboard input
document.addEventListener('keydown' , keylog)
function keylog(e){
    str =display.textContent;
    last= str.charAt(str.length -1)
    let codeoperator =[106,107,109,111,8,13];
    let inputKey=e.key;
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || codeoperator.includes(e.keyCode)) {
        switch (e.keyCode){
            case 106:
                inputKey='×';
                break;
            case 111:
                inputKey='÷'
                break;
        }

    if (checkLastCharacter(last)==='start') {
        if (checkLastCharacter(inputKey)==='operators') {}
        else if (inputKey===".") {}
        else{
            place( inputKey)
        }
    }
    else if (checkLastCharacter(last)==='numbers') {
        if (last=='.' && checkLastCharacter(inputKey)==='operators') { }
        else if (str.charAt(0)==='=') {
            if(checkLastCharacter(inputKey)==='operators'){
                
            }
            else{
                place( inputKey)
            }
        }
        else{
            place( display.textContent+inputKey)
        }
    }
    else if (checkLastCharacter(last)==='operators') {
        if (checkLastCharacter(inputKey)==='operators') { 
            let str2 =str.slice(0, -1);
            place( str2+inputKey)
        }
        else{
            place( display.textContent+inputKey)
        }
        
            }
        }

}
 //this function check last character and place( (numbers) or (operators) or(start) or (result)
function checkLastCharacter(last){
    let result;
    const numbers= '1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 0 , .'
    const operators = '- , + , × , ÷,*,/'
    if (last=='|') { result = 'start'; }
    else if(numbers.includes(last)){ result = 'numbers'; }
    else if (operators.includes(last)) { result= 'operators'; } 
    else if (last== '=' ) { result = 'result'; }
    return result; }
//this function val our inputs on screen
function val(e){
    //str in first run give text that val in screen
    str=display.textContent;
    // whith next line we can recognize last item too check for limitations tow or more operation next to each other
    last= str.charAt(str.length -1)
    //this else if work whit place(s of checkLastCharacter function
    if (checkLastCharacter(last)==='start') {
        if (checkLastCharacter(e.target.innerText)==='operators') {}
        else if (e.target.innerText===".") {}
        else{
            place(e.target.innerText)
        }
    }
    else if (checkLastCharacter(last)==='numbers') {
        if (last=='.' && checkLastCharacter(e.target.innerText)==='operators') { }
        else if (str.charAt(0)==='=') {
            if(checkLastCharacter(e.target.innerText)==='operators'){
            }
            else{
                place( e.target.innerText)
            }
        }
        else{
            place( display.textContent+e.target.innerText)
        }
    }
    else if (checkLastCharacter(last)==='operators') {
        if (checkLastCharacter(e.target.innerText)==='operators') { 
            let str2 =str.slice(0, -1);
            place( str2+e.target.innerText)
        }
        else{
            place( display.textContent+e.target.innerText)
        }
        
            }
}
function place(str){
    display.innerText=str
}
// when tap too (=)
const equal=document.querySelector('.equal');
equal.addEventListener('click', calculation);
function calculation (e){
    const oper="+ , - , * , /"
    str=display.textContent;
    let final = str.replaceAll('×','*');
    final=final.replaceAll('÷','/');
    if (oper.includes(final.charAt(final.length-1))) {
        console.log("cant");
    }
    else if (str==='|0|') {
        
    }
    else{
    final=eval(final);
    display.innerText='='+final;
    }
}
// when tap to (AC/ce)
const remove=document.querySelectorAll('[clear]');
for (var i = 0 ; i < remove.length; i++) {
    remove[i].addEventListener('click' , clear) ; 
 }

function clear (e){
    str=display.textContent;
    if (e.target.innerText.includes('AC')) {
        display.innerText='|0|'
    }
    else if (e.target.innerText.includes('CE')) {
        if (str==='|0|') { }
        else if (str.length==1) {
            display.innerText='|0|'
        }
        else{
        let str2 =str.slice(0, -1);
        display.innerText=str2;
        }
    }
}*/


