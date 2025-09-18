// Lightweight progressive enhancement for tabs
(function(){
  const tablist = document.getElementById('audience-tabs');
  if(!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.tab-panels > div'));

  function activate(tab){
    const target = tab.getAttribute('data-tab');
    tabs.forEach(t => { t.classList.toggle('active', t===tab); t.setAttribute('aria-selected', t===tab ? 'true' : 'false'); });
    panels.forEach(p => p.classList.toggle('active', p.id === `panel-${target}`));
  }

  tabs.forEach(tab => tab.addEventListener('click', () => activate(tab)));
  // Keyboard support
  tablist.addEventListener('keydown', (e) => {
    const i = tabs.findIndex(t => t.classList.contains('active'));
    if(e.key === 'ArrowRight'){ e.preventDefault(); activate(tabs[(i+1)%tabs.length]); tabs[(i+1)%tabs.length].focus(); }
    if(e.key === 'ArrowLeft'){ e.preventDefault(); activate(tabs[(i-1+tabs.length)%tabs.length]); tabs[(i-1+tabs.length)%tabs.length].focus(); }
  });
})();

