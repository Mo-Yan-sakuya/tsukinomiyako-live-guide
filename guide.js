
const minimum=16, maximum=42, step=2;
const fontDown=document.querySelector('#font-down'),fontUp=document.querySelector('#font-up'),fontValue=document.querySelector('#font-value');
let size=24;
try{const previous=Number(localStorage.getItem('moon-guide-reading-size'));if(previous>=minimum&&previous<=maximum)size=previous;}catch{}
function applySize(){document.documentElement.style.setProperty('--reading-size',size+'px');fontValue.textContent=size+' px';fontDown.disabled=size<=minimum;fontUp.disabled=size>=maximum;try{localStorage.setItem('moon-guide-reading-size',String(size));}catch{}}
fontDown.addEventListener('click',()=>{size=Math.max(minimum,size-step);applySize()});
fontUp.addEventListener('click',()=>{size=Math.min(maximum,size+step);applySize()});applySize();
const search=document.querySelector('#find');const productCards=[...document.querySelectorAll('.card')];const thumbnails=[...document.querySelectorAll('.product-gallery a')];
function filter(){const raw=search.value.trim().toLowerCase();const q=raw.replace(/号$/,'');const byNumber=/^\d{1,2}$/.test(q)&&(raw.endsWith('号')||(Number(q)>=1&&Number(q)<=21));const color=q.replace(/^([红橙黄绿青蓝紫粉黑白棕灰金银])色$/,'$1');const hits=new Set();for(const a of thumbnails){const n=a.hash.slice(2);const hit=byNumber?Number(q)===Number(n):!q||a.dataset.key.toLowerCase().includes(color)||a.innerText.toLowerCase().includes(q);a.hidden=!hit;if(hit)hits.add(a.hash.slice(1));}for(const card of productCards)card.hidden=!hits.has(card.id);document.querySelector('#gallery-count').textContent=hits.size?`找到 ${hits.size} 款，点图片查看提词稿`:'没有找到，试试颜色、珠形或吊饰，或清空搜索。';}
search.addEventListener('input',filter);document.querySelector('#clear-search').addEventListener('click',()=>{search.value='';filter();search.focus()});
const dialog=document.querySelector('.image-dialog');const expanded=dialog.querySelector('img');
document.querySelectorAll('.image-view').forEach(button=>button.addEventListener('click',()=>{const image=button.previousElementSibling;expanded.src=image.currentSrc||image.src;expanded.alt=image.alt;dialog.showModal();}));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
