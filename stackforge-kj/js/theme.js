(function(){
 var root=document.documentElement,KEY="sfkj-theme",saved=null;
 root.classList.add("js");
 try{saved=localStorage.getItem(KEY)}catch(e){}
 root.setAttribute("data-theme",(saved==="dark"||saved==="light")?saved:"light");
 document.addEventListener("DOMContentLoaded",function(){
  var btn=document.querySelector("[data-theme-toggle]");
  function sync(){
   var dark=root.getAttribute("data-theme")==="dark";
   if(btn){btn.setAttribute("aria-label",dark?"Switch to light theme":"Switch to dark theme");btn.setAttribute("aria-pressed",String(dark))}
  }
  sync();
  if(btn)btn.addEventListener("click",function(){
   root.classList.add("theme-ready");
   var next=root.getAttribute("data-theme")==="dark"?"light":"dark";
   root.setAttribute("data-theme",next);
   try{localStorage.setItem(KEY,next)}catch(e){}
   sync();
  });
 });
})();
