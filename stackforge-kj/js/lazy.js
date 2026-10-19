(function(){
 var conn=navigator.connection||{};
 var slow=conn.saveData||/(^|-)2g$|3g/.test(conn.effectiveType||"");
 if(slow)document.documentElement.classList.add("slow-net");
 function done(img,ok){var box=img.closest(".media");if(box)box.classList.add(ok?"is-loaded":"is-error")}
 function watch(img){
  if(img.complete&&img.naturalWidth)return done(img,true);
  if(img.complete&&img.getAttribute("src"))return done(img,false);
  img.addEventListener("load",function(){done(img,true)},{once:true});
  img.addEventListener("error",function(){done(img,false)},{once:true});
 }
 function load(img){
  if(img.dataset.srcset)img.srcset=img.dataset.srcset;
  if(img.dataset.src)img.src=img.dataset.src;
 }
 var imgs=[].slice.call(document.querySelectorAll(".media img"));
 var deferred=imgs.filter(function(i){return i.dataset.src||i.dataset.srcset});
 imgs.forEach(watch);
 if(!deferred.length)return;
 if(!("IntersectionObserver"in window)){deferred.forEach(load);return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){load(e.target);io.unobserve(e.target)}})},{rootMargin:slow?"50px":"300px"});
 deferred.forEach(function(i){io.observe(i)});
})();
