// Lightweight progressive enhancement for tabs
document.addEventListener('DOMContentLoaded', function(){
  const tablist = document.getElementById('audience-tabs');
  if(!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('.tab'));
  const panels = Array.from(tablist.parentElement.querySelectorAll('.tab-panels > div'));

  function targetIdFrom(tab){
    const explicit = tab.getAttribute('aria-controls');
    if (explicit) return explicit;
    const data = tab.getAttribute('data-tab');
    return `panel-${data}`;
  }

  function activate(tab){
    const targetId = targetIdFrom(tab);
    tabs.forEach(t => {
      const selected = (t === tab);
      t.classList.toggle('active', selected);
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
    panels.forEach(p => {
      const show = (p.id === targetId);
      p.classList.toggle('active', show);
      p.hidden = !show;
    });
  }

  // Initialize hidden state
  panels.forEach(p => { if(!p.classList.contains('active')) p.hidden = true; });

  tabs.forEach(tab => tab.addEventListener('click', (e) => { e.preventDefault(); activate(tab); }));
  // Keyboard support
  tablist.addEventListener('keydown', (e) => {
    const i = tabs.findIndex(t => t.classList.contains('active'));
    if(e.key === 'ArrowRight'){ e.preventDefault(); const n = tabs[(i+1)%tabs.length]; activate(n); n.focus(); }
    if(e.key === 'ArrowLeft'){ e.preventDefault(); const p = tabs[(i-1+tabs.length)%tabs.length]; activate(p); p.focus(); }
  });
});
