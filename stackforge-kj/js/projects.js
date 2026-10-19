(function(){
 var PROJECTS=[
  {slug:"cinevault",name:"CineVault",cats:["Web Apps"],case:true,short:"A movie streaming web app with free trailers, a personal wishlist and Paystack-powered subscriptions, built on Firebase.",desc:"CineVault is a movie streaming web app where users can sign up, browse trending titles, watch free trailers, and save movies to a personal wishlist. Subscribers unlock full movie streaming and downloads through secure Paystack payments, with accounts and data powered by Firebase.",tags:["HTML","CSS","JavaScript","Firebase","Paystack","TMDB API"],c:["#1e293b","#334155","#94a3b8"],img:"assets/images/cinevault.webp",live:"https://cinevault-project-zeta.vercel.app",repo:"https://github.com/Stackforge-KJ/cinevault-project",alt:"CineVault home page showing a featured movie and a trending titles row"},
  {slug:"taskflow-pro",name:"TaskFlow Pro",cats:["Web Apps"],case:true,desc:"A modern task management platform for teams and individuals, with real-time collaboration.",tags:["Next.js","Tailwind CSS","Node.js"],c:["#1e3a8a","#2563eb","#60a5fa"]},
  {slug:"swiftauth",name:"SwiftAuth",cats:["Web Apps","APIs"],case:true,desc:"Secure authentication infrastructure with multi-factor support and social login.",tags:["React","Node.js","MongoDB"],c:["#0c4a6e","#0ea5e9","#38bdf8"]},
  {slug:"databridge",name:"DataBridge",cats:["Tools","Web Apps"],case:true,desc:"A data pipeline and analytics platform for business intelligence.",tags:["Next.js","Python","PostgreSQL"],c:["#581c87","#a21caf","#e879f9"]},
  {slug:"portfolio-hub",name:"Portfolio Hub",cats:["Others"],case:false,desc:"A personal portfolio platform with animations and performance optimization.",tags:["Next.js","Tailwind CSS","TypeScript"],c:["#1e293b","#334155","#94a3b8"]}
 ];
 function shot(i,p){var c=p.c;return '<svg viewBox="0 0 320 200" role="img" aria-label="Placeholder mockup of '+p.name+'"><defs><linearGradient id="p'+i+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></linearGradient></defs><rect width="320" height="200" fill="url(#p'+i+')"/><rect x="26" y="24" width="268" height="152" rx="10" fill="#0b1220" fill-opacity=".88"/><circle cx="42" cy="38" r="3" fill="#94a3b8"/><circle cx="53" cy="38" r="3" fill="#94a3b8"/><rect x="36" y="52" width="44" height="114" rx="6" fill="#fff" fill-opacity=".06"/><rect x="92" y="52" width="60" height="38" rx="6" fill="'+c[2]+'" fill-opacity=".5"/><rect x="160" y="52" width="60" height="38" rx="6" fill="#fff" fill-opacity=".09"/><rect x="228" y="52" width="56" height="38" rx="6" fill="#fff" fill-opacity=".09"/><path d="M92 150l30-22 28 10 34-30 40 14 22-18" stroke="'+c[2]+'" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="92" y="100" width="120" height="6" rx="3" fill="#fff" fill-opacity=".14"/></svg>'}
 function visual(i,p){return p.img?'<img src="'+p.img+'" alt="'+(p.alt||p.name+' screenshot')+'" width="1200" height="750" loading="lazy" decoding="async">':shot(i,p)}
 function mediaBox(i,p){return '<div class="media'+(p.img?'':' is-loaded')+'">'+visual(i,p)+'</div>'}
 function links(p){
  var h="";
  if(p.live)h+='<a class="text-link" href="'+p.live+'" target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">&#8599;</span><span class="sr-only"> (opens in a new tab)</span></a>';
  if(p.repo)h+='<a class="text-link" href="'+p.repo+'" target="_blank" rel="noopener noreferrer">Code <span aria-hidden="true">&#8599;</span><span class="sr-only"> on GitHub (opens in a new tab)</span></a>';
  return h;
 }
 function tagsHtml(p){return p.tags.map(function(t){return '<li class="badge">'+t+'</li>'}).join("")}
 function href(p){return 'case-study-detail.html?project='+p.slug}
 function card(p,i){return '<article class="card project-card" data-category="'+p.cats.join("|")+'">'+mediaBox(i,p)+'<div class="project-card__body"><h3>'+p.name+'</h3><p>'+(p.short||p.desc)+'</p><ul class="tags" aria-label="Technologies">'+tagsHtml(p)+'</ul><div class="link-row"><a class="text-link" href="'+href(p)+'">View details <span aria-hidden="true">&rarr;</span></a>'+links(p)+'</div></div></article>'}
 function row(p,i){return '<article class="case-row" data-category="'+p.cats.join("|")+'">'+mediaBox(i,p)+'<div><h3>'+p.name+'</h3><p>'+(p.short||p.desc)+'</p><div class="link-row"><a class="text-link" href="'+href(p)+'">View case study <span aria-hidden="true">&rarr;</span></a>'+links(p)+'</div></div></article>'}
 document.querySelectorAll("[data-projects]").forEach(function(el){
  var rows=el.getAttribute("data-layout")==="rows",n=parseInt(el.getAttribute("data-limit"),10)||PROJECTS.length;
  var list=PROJECTS.map(function(p,i){return {p:p,i:i}}).filter(function(x){return !rows||x.p.case}).slice(0,n);
  el.innerHTML=list.map(function(x){return rows?row(x.p,x.i):card(x.p,x.i)}).join("");
 });
 document.querySelectorAll("[data-projects] .media img").forEach(function(img){
  var box=img.closest(".media");
  function ok(){box.classList.add("is-loaded")}
  function bad(){box.classList.add("is-error")}
  if(img.complete&&img.naturalWidth)ok();else{img.addEventListener("load",ok,{once:true});img.addEventListener("error",bad,{once:true})}
 });
 var d=document.querySelector("[data-case]");
 if(d){
  var slug=new URLSearchParams(location.search).get("project"),idx=0;
  PROJECTS.forEach(function(p,i){if(p.slug===slug)idx=i});
  var p=PROJECTS[idx],nx=PROJECTS[(idx+1)%PROJECTS.length];
  document.title=p.name+" | Case Study | STACKFORGE-KJ";
  d.querySelector("[data-case-title]").textContent=p.name;
  d.querySelector("[data-case-summary]").textContent=p.desc;
  d.querySelector("[data-case-tags]").innerHTML=tagsHtml(p);
  d.querySelector("[data-case-links]").innerHTML=links(p);
  d.querySelector("[data-case-media]").innerHTML=visual(idx,p);
  var n=document.querySelector("[data-case-next]");n.href=href(nx);n.textContent="Next project: "+nx.name;
 }
})();
