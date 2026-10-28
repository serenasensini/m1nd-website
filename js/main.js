(function(){
  var root=document.documentElement, KEY="m1nd-a11y";
  var st={fs:0,readable:false,contrast:false};
  try{st=Object.assign(st,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){}
  function apply(){
    root.classList.remove("fs-1","fs-2","fs-3");
    if(st.fs>0)root.classList.add("fs-"+st.fs);
    root.classList.toggle("readable",!!st.readable);
    root.classList.toggle("contrast",!!st.contrast);
    var r=document.getElementById("a-read"),c=document.getElementById("a-contrast");
    if(r)r.setAttribute("aria-pressed",!!st.readable);
    if(c)c.setAttribute("aria-pressed",!!st.contrast);
    try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}
  }
  apply();
  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-a11y]");if(!b)return;
    var a=b.getAttribute("data-a11y");
    if(a==="plus")st.fs=Math.min(3,st.fs+1);
    if(a==="minus")st.fs=Math.max(0,st.fs-1);
    if(a==="readable")st.readable=!st.readable;
    if(a==="contrast")st.contrast=!st.contrast;
    if(a==="reset")st={fs:0,readable:false,contrast:false};
    apply();
  });
  // Commenti Disqus: caricati solo su richiesta (privacy, prestazioni, niente cookie di terzi all'apertura)
  var btn=document.getElementById("load-comments");
  if(btn){
    btn.addEventListener("click",function(){
      var cfg=window.M1ND||{},box=document.getElementById("disqus_thread");
      if(!cfg.disqusShortname){
        box.innerHTML='<p class="notice">I commenti non sono ancora attivi: manca lo shortname Disqus in <code>js/config.js</code>.</p>';
        return;
      }
      window.disqus_config=function(){
        var prod=/(^|\.)m1nd\.it$/.test(location.hostname);
        this.page.url=prod?btn.dataset.url:location.href.split("#")[0];
        this.page.identifier=btn.dataset.id;
      };
      var s=document.createElement("script");
      s.src="https://"+cfg.disqusShortname+".disqus.com/embed.js";
      s.setAttribute("data-timestamp",+new Date());s.async=true;
      document.body.appendChild(s);btn.hidden=true;
    });
  }
})();
