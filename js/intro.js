(function(){
  var el=document.getElementById("intro"),btn=document.getElementById("intro-skip");
  if(!el||!document.documentElement.classList.contains("intro-on"))return;
  var done=false;
  function close(){
    if(done)return;done=true;
    try{sessionStorage.setItem("m1nd-intro","1")}catch(e){}
    el.classList.add("out");
    setTimeout(function(){document.documentElement.classList.remove("intro-on");
      var m=document.getElementById("contenuto");if(m)m.focus({preventScroll:true});},720);
    document.removeEventListener("keydown",onKey);
  }
  function onKey(e){if(e.key==="Escape")close();}
  document.addEventListener("keydown",onKey);
  btn.addEventListener("click",close);
  btn.focus();
  setTimeout(close,4600);
})();
