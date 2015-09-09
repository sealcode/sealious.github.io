function show(){
    if(document.querySelector('#navigation').style.height == '25rem') {
        document.querySelector('#navigation').style.height= '4rem';
    }
    else
    {
        document.querySelector('#navigation').style.height= '25rem';
    }
}
function hide(){
    document.querySelector('#navigation').style.height= '4rem';
}