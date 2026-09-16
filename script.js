const screens=[...document.querySelectorAll('.screen')];
const bar=document.getElementById('progressBar');
const order=['cover','story1','question1','experiment1','question2','experiment2','question3','space','ending','teaser'];
function show(id){
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  const i=order.indexOf(id); bar.style.width=((i)/(order.length-1)*100)+'%';
  window.scrollTo(0,0);
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-next]'); if(b) show(b.dataset.next);
});
const answers={
  q1:{right:'paths',next:'experiment1',ok:'对。不是“两个钟声”，而是同一次振动沿不同介质传播。现在试试哪条路更快。',bad:'这个解释很诱人，但它解释不了“为什么贴着墙反而先听到”。再想想：同一个振动，能不能走两条路？'},
  q2:{right:'vibration',next:'experiment2',ok:'对。钟先振动，再让周围介质发生一连串振动。声音不是独立飞行的小东西。',bad:'如果它真是独立飞出来的“东西”，换一种介质时速度为什么会明显改变？'},
  q3:{right:'no',next:'space',ok:'对。没有介质，就没有下一层粒子可以接过振动。真空中不能传播声音。',bad:'声音再大，本质仍需要介质把振动接力下去。'},
  q4:{right:'see',next:'ending',ok:'对。我们可以接收到光，但太空接近真空，声波不能像在空气中那样传来。',bad:'关键不在爆炸有多大，而在“有没有介质替声音接力”。'}
};
document.querySelectorAll('.choices').forEach(group=>{
  group.addEventListener('click',e=>{
    const btn=e.target.closest('button'); if(!btn) return;
    const q=group.dataset.question, cfg=answers[q];
    [...group.children].forEach(x=>x.disabled=true);
    const good=btn.dataset.value===cfg.right;
    btn.classList.add(good?'correct':'wrong');
    if(!good){[...group.children].find(x=>x.dataset.value===cfg.right)?.classList.add('correct')}
    const fb=document.getElementById(q+'-feedback');
    fb.innerHTML=(good?'<strong>成立。</strong> ':'<strong>再看一步。</strong> ')+(good?cfg.ok:cfg.bad)+`<br><button class="primary" style="margin-top:14px" data-next="${cfg.next}">继续</button>`;
  });
});
const tapBtn=document.getElementById('tapBtn');
tapBtn.addEventListener('click',()=>{
  const solid=document.querySelector('.pulse.solid'), air=document.querySelector('.pulse.air');
  solid.classList.remove('go'); air.classList.remove('go'); void solid.offsetWidth;
  solid.classList.add('go'); air.classList.add('go');
  document.getElementById('solidTime').textContent='先到';
  document.getElementById('airTime').textContent='后到';
  setTimeout(()=>document.getElementById('exp1next').classList.remove('hidden'),700);
});
const slider=document.getElementById('distance');
function updateTimes(){
  const d=+slider.value;
  const meters=d*2;
  document.getElementById('tSolid').textContent=(meters/3500).toFixed(3)+' s';
  document.getElementById('tAir').textContent=(meters/343).toFixed(3)+' s';
  document.getElementById('observer').style.right=(100-d)*.25+'%';
}
slider.addEventListener('input',updateTimes);updateTimes();
show('cover');