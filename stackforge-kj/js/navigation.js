(function(){
 var btn=document.querySelector("[data-menu-toggle]"),nav=document.getElementById("site-nav");
 if(!btn||!nav)return;
 var mq=window.matchMedia("(max-width: 860px)");
 function set(open,returnFocus){
  nav.classList.toggle("is-open",open);
  btn.setAttribute("aria-expanded",String(open));
  btn.setAttribute("aria-label",open?"Close menu":"Open menu");
  btn.querySelector(".icon-open").style.display=open?"none":"block";
  btn.querySelector(".icon-close").style.display=open?"block":"none";
  if(!open&&returnFocus)btn.focus();
 }
 btn.addEventListener("click",function(){set(btn.getAttribute("aria-expanded")!=="true")});
 nav.addEventListener("click",function(e){if(e.target.closest("a"))set(false)});
 document.addEventListener("keydown",function(e){if(e.key==="Escape"&&btn.getAttribute("aria-expanded")==="true")set(false,true)});
 document.addEventListener("click",function(e){if(btn.getAttribute("aria-expanded")==="true"&&!e.target.closest(".site-header"))set(false)});
 mq.addEventListener("change",function(){set(false)});
})();
