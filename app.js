const products = [
 {id:1,name:"Studio Kopfhörer",category:"Elektronik",price:79.90,condition:"Neu",tag:"Beliebt",image:"https://images.unsplash.com/photo-150 is?auto=format&fit=crop&w=800&q=85",description:"Klarer Sound und angenehmer Sitz für Musik, Podcasts und unterwegs."},
 {id:2,name:"Everyday Canvas Bag",category:"Mode",price:24.50,condition:"Sehr gut",tag:"Fundstück",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",description:"Eine schlichte Tasche für jeden Tag mit viel Platz für deine Essentials."},
 {id:3,name:"Keramik Vase",category:"Wohnen",price:18.00,condition:"Neu",tag:"Neu",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=85",description:"Zeitlose Keramik für frische Blumen oder als schönes Einzelstück."},
 {id:4,name:"Retro Sneaker",category:"Mode",price:54.00,condition:"Sehr gut",tag:"Beliebt",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",description:"Bequeme Sneaker mit klassischer Silhouette und sportlichem Look."},
 {id:5,name:"Kompaktkamera",category:"Elektronik",price:112.00,condition:"Gut",tag:"Vintage",image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85",description:"Kompakte Kamera für spontane Fotos und kreative Ausflüge."},
 {id:6,name:"Trainingsmatte",category:"Sport",price:21.90,condition:"Sehr gut",tag:"Guter Deal",image:"https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=85",description:"Rutschfeste Matte für dein Training zu Hause."},
 {id:7,name:"Design Bildband",category:"Bücher",price:16.00,condition:"Gut",tag:"Fundstück",image:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=85",description:"Ein inspirierender Bildband zum Blättern, Entdecken und Verschenken."},
 {id:8,name:"Minimalistische Uhr",category:"Accessoires",price:39.00,condition:"Neu",tag:"Neu",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",description:"Zurückhaltendes Design, das zu fast jedem Outfit passt."}
];
let activeCategory="Alle", searchTerm="", favorites=new Set(), cart=[];
const $=s=>document.querySelector(s);
const money=n=>new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(n);
function render(){
 let list=products.filter(p=>(activeCategory==="Alle"||p.category===activeCategory)&&[p.name,p.category,p.description].join(" ").toLowerCase().includes(searchTerm));
 const sort=$("#sort-select").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);
 if(sort==="high")list.sort((a,b)=>b.price-a.price);
 $("#product-grid").innerHTML=list.map(p=>`<article class="product-card" data-id="${p.id}" tabindex="0" aria-label="${p.name}, ${money(p.price)}">
 <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"><span class="product-tag">${p.tag}</span><button class="heart ${favorites.has(p.id)?"saved":""}" data-fav="${p.id}" aria-label="Merken">${favorites.has(p.id)?"♥":"♡"}</button></div>
 <div class="product-info"><div class="product-category">${p.category}</div><div class="product-name">${p.name}</div><div class="product-bottom"><span class="price">${money(p.price)}</span><span class="condition">${p.condition}</span></div></div></article>`).join("");
 $("#empty-state").hidden=list.length!==0;
 $("#product-grid").hidden=list.length===0;
 $("#results-line").textContent=list.length+" Produkte entdeckt";
 $("#favorite-count").textContent=favorites.size;
 $("#cart-count").textContent=cart.reduce((n,p)=>n+p.qty,0);
}
function message(title,body){$("#message-title").textContent=title;$("#message-body").textContent=body;$("#message-dialog").showModal()}
function showProduct(id){
 const p=products.find(x=>x.id===id);if(!p)return;
 $("#product-detail").innerHTML=`<img class="detail-image" src="${p.image}" alt="${p.name}"><p class="eyebrow">${p.category.toUpperCase()}</p><h2>${p.name}</h2><p class="detail-price">${money(p.price)}</p><p class="detail-copy">${p.description}</p><p class="detail-copy">Zustand: ${p.condition}</p><button class="detail-add" id="detail-add" data-id="${p.id}">In den Warenkorb legen</button>`;
 $("#product-dialog").showModal();
}
function showCart(){
 $("#cart-items").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><span>${x.name} × ${x.qty}</span><strong>${money(x.price*x.qty)}</strong></div>`).join(""):"<p class='detail-copy'>Dein Warenkorb ist noch leer.</p>";
 $("#cart-total").innerHTML=cart.length?`<span>Zwischensumme</span><span>${money(cart.reduce((n,p)=>n+p.price*p.qty,0))}</span>`:"";
 $("#cart-dialog").showModal();
}
$("#search-form").addEventListener("submit",e=>{e.preventDefault();searchTerm=$("#search-input").value.trim().toLowerCase();render();$("#discover").scrollIntoView({behavior:"smooth"})});
$("#search-input").addEventListener("input",e=>{searchTerm=e.target.value.trim().toLowerCase();render()});
$("#category-list").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x===b));render()});
$("#sort-select").addEventListener("change",render);
$("#product-grid").addEventListener("click",e=>{const fav=e.target.closest("[data-fav]");if(fav){const id=Number(fav.dataset.fav);favorites.has(id)?favorites.delete(id):favorites.add(id);render();return}const card=e.target.closest("[data-id]");if(card)showProduct(Number(card.dataset.id))});
$("#product-grid").addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.matches(".product-card"))showProduct(Number(e.target.dataset.id))});
$("#product-detail").addEventListener("click",e=>{if(e.target.id==="detail-add"){const p=products.find(x=>x.id===Number(e.target.dataset.id));const existing=cart.find(x=>x.id===p.id);existing?existing.qty++:cart.push({...p,qty:1});render();$("#product-dialog").close();message("Im Warenkorb","Das Produkt wurde deinem Demo-Warenkorb hinzugefügt.")}});
$("#cart-button").addEventListener("click",showCart);
$("#favorites-button").addEventListener("click",()=>{activeCategory="Alle";searchTerm="";$("#search-input").value="";document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x.dataset.category==="Alle"));const ids=new Set(favorites);const cards=products.filter(p=>ids.has(p.id));$("#product-grid").innerHTML=cards.map(p=>`<article class="product-card" data-id="${p.id}"><div class="product-image"><img src="${p.image}" alt="${p.name}"><button class="heart saved" data-fav="${p.id}">♥</button></div><div class="product-info"><div class="product-category">${p.category}</div><div class="product-name">${p.name}</div><div class="price">${money(p.price)}</div></div></article>`).join("");$("#empty-state").hidden=cards.length!==0;$("#product-grid").hidden=cards.length===0;$("#results-line").textContent="Deine Merkliste";$("#discover").scrollIntoView({behavior:"smooth"})});
$("#reset-filters").addEventListener("click",()=>{activeCategory="Alle";searchTerm="";$("#search-input").value="";document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x.dataset.category==="Alle"));render()});
["sell-button","sell-banner-button","footer-sell"].forEach(id=>$("#"+id).addEventListener("click",()=>message("Verkaufen kommt bald","Wir bereiten gerade Verkäuferkonten und das Einstellen von Artikeln vor.")));
$("#account-button").addEventListener("click",()=>message("Konten kommen bald","Registrierung und Anmeldung werden in einer späteren Version ergänzt."));
$("#all-categories").addEventListener("click",()=>message("Alle Kategorien","Weitere Kategorien kommen mit dem Ausbau des Vendoo-Marktplatzes."));
document.addEventListener("click",e=>{if(e.target.matches("[data-close]"))e.target.closest("dialog").close()});
document.querySelectorAll("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close()}));
render();