/* Bonam Curam — shared header, footer, emblem, interactions */
document.documentElement.classList.add('js');
(function(){
  // ---- favicon + social/OG meta (injected once, all pages) ----
  (function meta(){
    var head=document.head;
    function ensure(sel,make){ if(!document.querySelector(sel)){ head.appendChild(make()); } }
    ensure('link[rel="icon"]', function(){ var l=document.createElement('link'); l.rel='icon'; l.type='image/png'; l.href='assets/logo.png'; return l; });
    ensure('link[rel="apple-touch-icon"]', function(){ var l=document.createElement('link'); l.rel='apple-touch-icon'; l.href='assets/logo.png'; return l; });
    var title=document.title||'Europejskie Centrum Seniora · Bonam Curam';
    var desc='Konsorcjum Senioralne Bonam Curam — operacje, technologia, medycyna, prawo i finanse w jednym modelu dla sektora senioralnego.';
    function og(p,c){ if(document.querySelector('meta[property="'+p+'"]'))return; var m=document.createElement('meta'); m.setAttribute('property',p); m.setAttribute('content',c); head.appendChild(m); }
    if(!document.querySelector('meta[name="description"]')){ var d=document.createElement('meta'); d.name='description'; d.content=desc; head.appendChild(d); }
    og('og:title',title); og('og:description',desc); og('og:type','website'); og('og:image','assets/logo.png');
    var tw=document.createElement('meta'); tw.name='twitter:card'; tw.content='summary'; if(!document.querySelector('meta[name="twitter:card"]')) head.appendChild(tw);
  })();

  var NAV = [
    {href:'index.html',        label:'Strona główna', page:'home'},
    {href:'oferta.html',       label:'Oferta',        page:'oferta'},
    {href:'optymalizacja.html',label:'Optymalizacja', page:'optymalizacja'},
    {href:'klientde.html',     label:'Klient DE',     page:'klientde'},
    {href:'operator.html',     label:'Operator',      page:'operator'},
    {href:'dlajst.html',       label:'Dla JST',       page:'dlajst'},
    {href:'digitalcare.html',  label:'Digital care',  page:'digitalcare'},
    {href:'kontakt.html',      label:'Kontakt',       page:'kontakt'}
  ];
  var current = document.body.getAttribute('data-page') || 'home';

  // ---- emblem: the real Bonam Curam logo ----
  function emblem(size, theme){
    if(theme==='dark'){
      // dark bg → yellow heart + cream circular text on transparent
      return '<img class="mark" src="assets/logo-dark.png" width="'+size+'" height="'+size+'" alt="Konsorcjum na rzecz Seniora — Bonam Curam">';
    }
    return '<img class="mark" src="assets/logo.png" width="'+size+'" height="'+size+'" alt="Konsorcjum na rzecz Seniora — Bonam Curam">';
  }

  function header(){
    var links = NAV.map(function(n){
      return '<a href="'+n.href+'"'+(n.page===current?' class="active"':'')+'>'+n.label+'</a>';
    }).join('');
    return '<header class="site-header"><div class="bar">'
      + '<a class="brand-emblem" href="index.html" aria-label="Bonam Curam — strona główna">'+emblem(70,'light')+'</a>'
      + '<nav class="nav" aria-label="Główna nawigacja">'+links+'</nav>'
      + '<button class="menu-toggle" id="menuOpen" aria-label="Otwórz menu">'
      + '<svg width="22" height="22" viewBox="0 0 24 24" stroke="#27333c" stroke-width="1.6" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke-linecap="round"/></svg>'
      + '</button></div></header>';
  }

  function drawer(){
    var links = NAV.map(function(n){ return '<a class="m-link" href="'+n.href+'">'+n.label+'</a>'; }).join('');
    return '<div class="mobile-drawer" id="mobileDrawer">'
      + '<div class="drawer-top">'+emblem(58,'dark')
      + '<button class="drawer-close" id="menuClose" aria-label="Zamknij menu">'
      + '<svg width="20" height="20" viewBox="0 0 24 24" stroke="#fff" stroke-width="1.6" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>'
      + '</button></div>'+links
      + '<a class="btn btn-primary" href="kontakt.html" style="margin-top:26px;justify-content:center">Umów konsultację</a>'
      + '</div>';
  }

  function footer(){
    var sitemap = NAV.map(function(n){ return '<a href="'+n.href+'">'+n.label+'</a>'; }).join('');
    return '<footer class="site-footer"><div class="foot">'
      + '<div class="foot-left">'+emblem(86,'dark')+'</div>'
      + '<nav class="foot-mid" aria-label="Mapa strony"><div class="foot-maptitle">Mapa strony</div>'
      + '<div class="foot-map">'+sitemap+'</div></nav>'
      + '<div class="foot-right">'
      +   '<div class="foot-contact"><div class="foot-maptitle">Kontakt</div>'
      +     '<a href="mailto:office@bonamcuram.com">office@bonamcuram.com</a>'
      +     '<span class="foot-meta">Europejskie Centrum Seniora</span>'
      +     '<span class="foot-meta">Cała Polska · współpraca europejska</span></div>'
      +   '<div class="foot-legal"><a href="polityka-prywatnosci.html">Polityka prywatności</a><a href="regulamin.html">Regulamin strony</a></div>'
      + '</div>'
      + '</div></footer>';
  }

  var h = document.getElementById('site-header');
  if(h){ h.outerHTML = header() + drawer(); }
  var f = document.getElementById('site-footer');
  if(f){ f.outerHTML = footer(); }

  var drawerEl = document.getElementById('mobileDrawer');
  var openBtn = document.getElementById('menuOpen');
  var closeBtn = document.getElementById('menuClose');
  function open(){ drawerEl.classList.add('open'); document.body.style.overflow='hidden'; }
  function close(){ drawerEl.classList.remove('open'); document.body.style.overflow=''; }
  if(openBtn) openBtn.addEventListener('click', open);
  if(closeBtn) closeBtn.addEventListener('click', close);
  if(drawerEl) drawerEl.querySelectorAll('.m-link,.btn').forEach(function(a){ a.addEventListener('click', close); });

  // reveal — base state always visible; .in plays a one-shot fade.
  // Failsafe forces inline visibility so content can NEVER stay hidden
  // (covers frozen-animation tabs, print/PDF, and missing observer support).
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  function forceVisible(el){ el.style.opacity='1'; el.style.transform='none'; el.style.animation='none'; }
  // stagger: siblings that share a parent get an incremental entrance delay
  reveals.forEach(function(el){
    var sibs = [].slice.call(el.parentNode.children).filter(function(c){ return c.classList && c.classList.contains('reveal'); });
    var idx = sibs.indexOf(el);
    if(idx>0 && sibs.length>1 && sibs.length<=8){ el.style.animationDelay=Math.min(idx*70,420)+'ms'; }
  });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); }, {threshold:0.08, rootMargin:'0px 0px -6% 0px'});
    reveals.forEach(function(el){ io.observe(el); });
    requestAnimationFrame(function(){ reveals.forEach(function(el){ if(el.getBoundingClientRect().top < innerHeight*0.95) el.classList.add('in'); }); });
    setTimeout(function(){ reveals.forEach(forceVisible); }, 1800);
  } else { reveals.forEach(forceVisible); }
  // print: guarantee everything is visible before the print snapshot
  window.addEventListener('beforeprint', function(){ reveals.forEach(forceVisible); });

  // ---- header shrink on scroll ----
  var hdr = document.querySelector('.site-header');
  function onScroll(){ if(!hdr) return; if(window.scrollY>24) hdr.classList.add('scrolled'); else hdr.classList.remove('scrolled'); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // ---- animated count-up for stat numbers ----
  var statSel = '.stat-g .n, .of-stat .n, .de-stat .n, .jst-stat .n, .hero-stats .stat-num';
  var stats = [].slice.call(document.querySelectorAll(statSel));
  function animateCount(el){
    var raw = el.getAttribute('data-raw') || el.textContent;
    el.setAttribute('data-raw', raw);
    var m = raw.match(/^(\D*)([\d\u00a0  .,]+)(.*)$/); // prefix, number, suffix
    if(!m){ return; }
    var prefix=m[1], numStr=m[2], suffix=m[3];
    var clean=numStr.replace(/[\s\u00a0]/g,'').replace(/\./g,'').replace(',', '.');
    var target=parseFloat(clean);
    if(!isFinite(target)){ return; }
    var hasGroup=/[\s\u00a0.]/.test(numStr.trim());
    var dur=1100, t0=null;
    function fmt(v){ var n=Math.round(v); if(hasGroup){ return n.toLocaleString('pl-PL'); } return String(n); }
    function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1); var eased=1-Math.pow(1-p,3); el.textContent=prefix+fmt(target*eased)+suffix; if(p<1) requestAnimationFrame(step); else el.textContent=prefix+(hasGroup?Math.round(target).toLocaleString('pl-PL'):numStr.trim())+suffix; }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    var sio = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ animateCount(e.target); sio.unobserve(e.target); } }); }, {threshold:0.6});
    stats.forEach(function(el){ sio.observe(el); });
  }
})();
