/* ============ I VIGENTINI — interazioni ============ */
(function(){
  'use strict';

  var intro=document.getElementById('intro');
  if(intro){
    window.addEventListener('load',function(){setTimeout(function(){intro.classList.add('gone');},1150);});
    setTimeout(function(){intro.classList.add('gone');},2600);
  }

  /* orari (getDay 0=Dom..6=Sab): Mar–Ven 9:30–18, Sab 9:30–15, Dom/Lun chiuso */
  var HOURS={0:[],1:[],2:[[9.5,18]],3:[[9.5,18]],4:[[9.5,18]],5:[[9.5,18]],6:[[9.5,15]]};
  var DAYS_IT=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  var DAYS_EN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function romeNow(){try{return new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}));}catch(e){return new Date();}}
  function fmt(h){var hh=Math.floor(h),mm=Math.round((h-hh)*60);return hh+(mm?(':'+(mm<10?'0':'')+mm):'');}
  function computeStatus(){
    var now=romeNow(),d=now.getDay(),cur=now.getHours()+now.getMinutes()/60,today=HOURS[d]||[],i,w;
    for(i=0;i<today.length;i++){w=today[i];if(cur>=w[0]&&cur<w[1])return {open:true,until:w[1]};}
    for(i=0;i<today.length;i++){if(cur<today[i][0])return {open:false,next:today[i][0],nextDay:d,sameDay:true};}
    for(var k=1;k<=7;k++){var nd=(d+k)%7,arr=HOURS[nd]||[];if(arr.length)return {open:false,next:arr[0][0],nextDay:nd,sameDay:false};}
    return {open:false};
  }
  function renderStatus(lang){
    var s=computeStatus(),badge=document.getElementById('openBadge');if(!badge)return;
    var t=badge.querySelector('.t'),en=(lang==='en');badge.classList.toggle('op',s.open);
    if(s.open){t.innerHTML='<b>'+(en?'Open now':'Aperto ora')+'</b>'+(en?'until ':'fino alle ')+fmt(s.until);}
    else if(s.next!=null){var day=s.sameDay?(en?'today':'oggi'):(en?DAYS_EN[s.nextDay]:DAYS_IT[s.nextDay]);t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'opens ':'apre ')+day+' '+fmt(s.next);}
    else{t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'see hours':'vedi orari');}
  }
  function renderHours(lang){
    var box=document.getElementById('hoursList');if(!box)return;var en=(lang==='en'),today=romeNow().getDay(),order=[1,2,3,4,5,6,0];
    box.innerHTML=order.map(function(d){
      var arr=HOURS[d]||[],label=en?DAYS_EN[d]:DAYS_IT[d];
      var val=arr.length?arr.map(function(w){return fmt(w[0])+'–'+fmt(w[1]);}).join(' · '):(en?'Closed':'Chiuso');
      return '<div class="hourrow'+(d===today?' today':'')+'"><span class="d">'+label+'</span><span>'+val+'</span></div>';
    }).join('');
  }

  /* i18n */
  var I18N={en:{
    "nav.story":"Since 1968","nav.rules":"House rules","nav.serv":"What we do","nav.gallery":"The shop","nav.visit":"Find us",
    "bar.book":"Book",
    "hero.kick":"Barbershop since 1968 · Porta Vigentina",
    "hero.h1":"The barber of<br>Porta Vigentina, <em>since 1968</em>",
    "hero.sub":"Haircut, beard and a corner of calm. A traditional Milanese barbershop opened by Pino in 1968 — today in the hands of three women who keep the trade, and its manners, alive.",
    "hero.book":"Book a chair","hero.rules":"The house rules",
    "hero.f1n":"1968","hero.f1l":"the trade",
    "hero.f2n":"4,9★","hero.f2l":"192 reviews",
    "hero.f3n":"3","hero.f3l":"women barbers",
    "hero.tag":"le tre barbiere","hero.tags":"dal 1968",
    "ribbon":"TAGLIO · BARBA · RASATURA CLASSICA · BARBA RICAMATA · BAFFI · DAL 1968 · UN ANGOLO DI PACE ·",
    "story.kick":"Dal 1968 · Porta Vigentina",
    "story.h2":"A trade of 1968, <em>today in three</em>",
    "story.p1":"Pino — Giuseppe Muollo — has stood behind this chair since 1968, and his grandfather cut hair in Salerno before him. Today the trade carries on in three: his daughter Claudia, with Chantal and Alessia, under Pino's watchful eye.",
    "story.pull":"“We don't want to be simple barbers, but barbers with a touch of kindness.”",
    "story.p2":"They do it the old way — a clean cut, a classic shave, a beard shaped with care — with a rare thing on top: manners. It is, quite simply, one of the most loved barbershops in Milan.",
    "who1":"Claudia","who2":"Chantal","who3":"Alessia","who0":"Pino",
    "rules.kick":"La firma della casa",
    "rules.h2":"Le regole <em>della bottega</em>",
    "rules.sub":"Da noi non si cerca solo un buon taglio, ma un angolo di pace. Poche regole, d'altri tempi, che valgono per tutti.",
    "r1.t":"Si dà del «lei»","r1.p":"Buone maniere, sempre. Il rispetto comincia da come ci si rivolge l'un l'altro.",
    "r2.t":"Niente pettegolezzi","r2.p":"Qui non entra il vizio del chiacchiericcio. Solo forbici, rasoio e due parole gentili.",
    "r3.t":"La tua privacy è sacra","r3.p":"Non chiediamo chi sei o che lavoro fai. Ti siedi, ti rilassi, e basta.",
    "r4.t":"Un angolo di pace","r4.p":"Mezz'ora per sé, lontano dallo stress. Esci con la testa a posto — in tutti i sensi.",
    "rules.foot":"«La possibilità di ritagliarsi un angolo di pace, di fuggire dallo stress.»",
    "serv.kick":"In bottega",
    "serv.h2":"Cosa facciamo",
    "v1.t":"Taglio classico","v1.p":"Il taglio d'altri tempi, fatto con forbici e cura. Uomo, ragazzo e bambino.",
    "v2.t":"Rasatura classica","v2.p":"Rasoio, panno caldo e schiuma. La rasatura come si faceva una volta.",
    "v3.t":"Barba & fading","v3.p":"Barba curata, contorni netti e sfumature moderne su misura del viso.",
    "v4.t":"Barba ricamata","v4.p":"La nostra firma: disegni e contorni di precisione, ricamati a mano libera.",
    "v5.t":"Baffi","v5.p":"Baffi rifiniti e messi in forma, dai più discreti ai più importanti.",
    "v6.t":"Su appuntamento","v6.p":"Meglio prenotare: si trova posto anche al volo, ma il tuo orario è più comodo.",
    "serv.note":"<b>Si prenota online</b> o al telefono. Per il prezzo, chiedi pure in bottega — dipende dal servizio.",
    "gal.kick":"La bottega",
    "gal.h2":"Le due <em>poltrone</em>",
    "rev.kick":"La voce dei clienti","rev.h2":"Recensioni","rev.sub":"4,9 su Google · 192 recensioni",
    "rc1":"«Ottimo servizio, sono veramente professionisti. Sono molto felice di aver conosciuto il signor Pino: il primo posto che mi taglia bene i capelli.»",
    "rc1m":"Daniel Nuñez · Google",
    "rc2":"“I just walked by this authentic-looking shop and had probably one of the best hairdresser experiences of my life. A really nice cut.”",
    "rc2m":"Pascal · Google",
    "rc3":"«Mi fanno subito accomodare. Gentilissimi, molto professionali, simpatici e ambiente pulito. Che dire… un piacere.»",
    "rc3m":"Rosario Pugliese · Google",
    "visit.kick":"Dove siamo","visit.h2":"Viale Beatrice d'Este 49",
    "visit.addr":"Address","visit.hours":"Opening hours","visit.phone":"Phone","visit.book":"Book a chair","visit.dir":"Directions",
    "faq.kick":"Good to know","faq.h2":"Questions & answers",
    "q1":"Where is I Vigentini and how long has it been open?","a1":"We are at Viale Beatrice d'Este 49, in Porta Vigentina, near the Crocetta. The barbershop has been open since 1968, with Pino behind the chair from the very start.",
    "q2":"Who works here?","a2":"Pino — Giuseppe Muollo — opened the shop in 1968 and still guides it. Today three women run the chairs: his daughter Claudia, with Chantal and Alessia.",
    "q3":"What do you do?","a3":"Traditional men's barbering: classic cuts, hot-towel shaves, beard shaping and fading, moustaches, and our signature «barba ricamata» — hand-drawn beard designs.",
    "q4":"Do I need to book?","a4":"It's best to book, online or by phone — you can often find a spot on the day too, but an appointment means your own time. Call 02 5830 0369.",
    "q5":"When are you open?","a5":"Tuesday to Friday 9:30–18:00 and Saturday 9:30–15:00. Closed Sunday and Monday.",
    "ft.tag":"Traditional barbershop in Porta Vigentina since 1968. Haircut, beard and a corner of calm — today in the hands of three women.",
    "ft.explore":"Explore","ft.contact":"Contact","ft.rights":"Demo site — not the official shop site.",
    "ft.disc":"Independent demonstration site created to show a possible online presence for I Vigentini. Photos, reviews and details come from public sources (Google Maps and press) and belong to their owners. Not affiliated with the shop."
  }};
  var current='it',ITCACHE={};
  function collectIT(){document.querySelectorAll('[data-i18n]').forEach(function(el){ITCACHE[el.getAttribute('data-i18n')]=el.innerHTML;});}
  function apply(lang){
    current=lang;var dict=(lang==='en')?I18N.en:null;
    document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(lang==='en'){if(dict[k]!=null)el.innerHTML=dict[k];}else{if(ITCACHE[k]!=null)el.innerHTML=ITCACHE[k];}});
    document.documentElement.lang=lang;
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-l')===lang);});
    renderHours(lang);renderStatus(lang);
  }

  function initReveal(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    els.forEach(function(e){io.observe(e);});
  }

  document.addEventListener('DOMContentLoaded',function(){
    collectIT();
    document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){apply(b.getAttribute('data-l'));});});
    var burger=document.querySelector('.burger'),links=document.querySelector('nav.links');
    if(burger){burger.addEventListener('click',function(){
      if(links.style.display==='flex'){links.style.display='';}
      else{links.style.display='flex';links.style.position='absolute';links.style.top='70px';links.style.right='18px';links.style.flexDirection='column';links.style.background='var(--cream)';links.style.padding='16px 20px';links.style.border='1px solid var(--line)';links.style.boxShadow='var(--shadow)';}
    });}
    document.querySelectorAll('nav.links a').forEach(function(a){a.addEventListener('click',function(){if(links&&window.innerWidth<=940)links.style.display='';});});
    renderHours('it');renderStatus('it');initReveal();
    setInterval(function(){renderStatus(current);},60000);
  });
})();
