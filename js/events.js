// Evidenzia in automatico il prossimo incontro (il primo con data non ancora passata)
// e segna come "Concluso" quelli già svolti. Per aggiornare il calendario: modifica `start`
// (formato AAAA-MM-GGTHH:MM) e i dati degli incontri qui sotto e in eventi.html.
(function(){
  var EV=[
    {n:1,start:"2026-11-22T11:00",mese:"novembre 2026",title:"Che lingua parli?",sub:"La comunicazione tipica e atipica",short:"E se per capirci meglio dovessimo prima conoscere il modo di comunicare degli altri?"},
    {n:2,start:"2026-12-20T11:00",mese:"dicembre 2026",title:"Il volume del mondo!",sub:"Quando i sensi chiedono una pausa: sensorialità e sovraccarico",short:"E se ciò che per qualcuno è piacevole e stimolante, per qualcun altro fosse troppo?"},
    {n:3,start:"2027-01-24T11:00",mese:"gennaio 2027",title:"E se la tua mente prendesse strade alternative?",sub:"Pensiero divergente, iperfocus e stato di flusso",short:"Pensieri che saltano, idee che si intrecciano e mondi in cui perdersi."},
    {n:4,start:null,mese:"febbraio 2027",title:"Che fatica essere normali!",sub:"Masking, adattamento e burnout sociale",short:"Le maschere che indossiamo, le aspettative degli altri e il coraggio di essere sé stessi."},
    {n:5,start:null,mese:"marzo 2027",title:"Lo faccio domani! Forse…",sub:"Pianificazione, funzioni esecutive e procrastinazione",short:"Quella strana distanza tra voler fare qualcosa e riuscire davvero a cominciare."},
    {n:6,start:null,mese:"aprile 2027",title:"Ti capisco. O forse no?",sub:"Empatia, alessitimia e reattività emotiva",short:"Sentire un’emozione, capirla e riuscire a raccontarla non sono la stessa cosa."},
    {n:7,start:null,mese:"maggio 2027",title:"Ma a quest’età non dovresti già…?",sub:"Traiettorie di vita fuori dagli schemi",short:"La vita non è una lista di cose da spuntare."},
    {n:8,start:null,mese:"giugno 2027",title:"Ma non l’avevi capito?",sub:"Relazioni, affettività, sessualità e consenso",short:"Amore, desideri e confini: quando leggere tra le righe non basta."}
  ];
  var GIORNI=["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"];
  var MESI=["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
  var now=new Date();
  function date(e){return e.start?new Date(e.start):null}
  function past(e){var d=date(e);if(!d)return false;var end=new Date(d);end.setHours(23,59,59,999);return now>end}
  var next=EV.filter(function(e){return !past(e)})[0]||null;
  var $=function(s,r){return (r||document).querySelector(s)};
  function when(e){
    var d=date(e);
    if(!d)return e.mese.charAt(0).toUpperCase()+e.mese.slice(1)+" · data e orario da definire";
    var h=("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
    var g=GIORNI[d.getDay()];
    return g.charAt(0).toUpperCase()+g.slice(1)+" "+d.getDate()+" "+MESI[d.getMonth()]+" "+d.getFullYear()+", ore "+h;
  }
  function setTag(el,txt,cls){if(!el)return;el.textContent=txt;el.classList.remove("tag-next","tag-past");if(cls)el.classList.add(cls);}

  // Calendario (pagina Eventi): righe e finestre
  document.querySelectorAll(".ev-row[data-n]").forEach(function(li){
    var n=+li.getAttribute("data-n"),e=EV[n-1],isNext=next&&next.n===n,isPast=past(e);
    li.classList.toggle("is-next",!!isNext);li.classList.toggle("is-past",isPast);
    var txt=isPast?"Concluso":isNext?"Prossimo evento":"Incontro "+n+" di 8",cls=isPast?"tag-past":isNext?"tag-next":"";
    setTag($(".ev-body .tag",li),txt,cls);
    var dlg=document.getElementById("ev-"+n);
    if(dlg)setTag($(".modal-head .tag",dlg),txt,cls);
  });

  // Riquadro in evidenza (pagina Eventi)
  var hero=$(".next-event");
  if(hero){
    var sec=hero.closest("section");
    if(!next){sec.hidden=true;}
    else{
      var d=date(next);
      $(".d-day",hero).textContent=d?d.getDate():"—";
      $(".d-mon",hero).textContent=d?MESI[d.getMonth()]:next.mese.split(" ")[0];
      $(".d-year",hero).textContent=d?d.getFullYear():next.mese.split(" ")[1];
      $("#next-h").textContent=next.title;
      $(".next-main .lead",hero).textContent=next.sub+". "+next.short;
      var t=$(".facts time",hero);t.textContent=when(next);
      if(d)t.setAttribute("datetime",next.start);else t.removeAttribute("datetime");
      var b=$("[data-open]",hero);if(b)b.setAttribute("data-open","ev-"+next.n);
      document.querySelectorAll("[data-only-for]").forEach(function(x){x.hidden=x.getAttribute("data-only-for")!==String(next.n);});
    }
  }

  // Card "Prossimo appuntamento" (home)
  var home=document.getElementById("home-next");
  if(home){
    if(!next){home.innerHTML="<h3>Nuovi incontri in arrivo</h3><p>Il calendario è in aggiornamento: seguici su Instagram o scrivici a <a href=\"mailto:info@m1nd.it\">info@m1nd.it</a>.</p>";}
    else{
      document.getElementById("home-tag").textContent=(next.n===1?"Primo incontro":"Prossimo incontro")+" · FRA(M)MENTI – Diversi e Connessi";
      document.getElementById("home-title").textContent=next.title;
      var w=document.getElementById("home-when"),dd=date(next);
      w.textContent=dd?when(next).replace(/^\S+ /,""):when(next);
      if(dd)w.setAttribute("datetime",next.start);else w.removeAttribute("datetime");
      document.getElementById("home-desc").textContent=next.sub+". "+next.short;
      home.querySelectorAll("[data-only-for]").forEach(function(x){x.hidden=x.getAttribute("data-only-for")!==String(next.n);});
    }
  }
})();
