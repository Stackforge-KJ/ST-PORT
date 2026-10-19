(function(){
 var bar=document.querySelector("[data-filters]");if(!bar)return;
 var items=[].slice.call(document.querySelectorAll("[data-projects] [data-category]"));
 var empty=document.querySelector("[data-empty]"),status=document.querySelector("[data-status]");
 bar.addEventListener("click",function(e){
  var b=e.target.closest("[data-filter]");if(!b)return;
  var f=b.getAttribute("data-filter"),shown=0;
  [].forEach.call(bar.querySelectorAll("[data-filter]"),function(x){x.setAttribute("aria-pressed",String(x===b))});
  items.forEach(function(c){var ok=f==="all"||c.getAttribute("data-category").split("|").indexOf(f)>-1;c.hidden=!ok;if(ok)shown++});
  if(empty)empty.hidden=shown>0;
  if(status)status.textContent=shown+(shown===1?" item":" items")+" shown";
 });
})();
