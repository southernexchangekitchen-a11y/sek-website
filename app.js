/* Southern Exchange Kitchen — truck menu app */
const MENU = [
  {
    id: "combos", label: "Sandwich Combos",
    subtitle: "Any sandwich + 4 oz side + drink",
    items: [
      { name: "Brisket Combo", desc: "18-hour smoked brisket \u00b7 sandwich only $10.99", price: "$17.99", img: "images/brisket.jpg", badge: "Must Try" },
      { name: "Pulled Chicken Combo", desc: "Smoked pulled chicken \u00b7 sandwich only $7.99", price: "$14.99", img: "images/pulled-chicken-sandwich.jpg" },
      { name: "Pulled Pork Combo", desc: "Slow-smoked pulled pork \u00b7 sandwich only $6.99", price: "$13.99", img: "images/pulled-pork-sandwich.jpg" },
      { name: "Hot Link Combo", desc: "Smoked hot link, split & seared to order \u00b7 sandwich only $5.99", price: "$12.99", img: "images/hot-link-sandwich.jpg" }
    ]
  },
  {
    id: "dinners", label: "Meat Dinners",
    subtitle: "2 sides + Texas toast",
    items: [
      { name: "1 Meat Dinner", desc: "1/3 lb of one meat", price: "$14.99", img: "images/one-meat-dinner.jpg" },
      { name: "2 Meat Dinner", desc: "1/3 lb + 1/4 lb \u2014 your pick of two", price: "$18.99", img: "images/two-meat-dinner.jpg" }
    ]
  },
  {
    id: "bigback", label: "Big Back Loaded Potato",
    subtitle: "Jumbo russet with cheese, sour cream, scallions & BBQ drizzle",
    items: [
      { name: "Big Back Loaded Potato", desc: "1/3 lb pulled pork or pulled chicken \u00b7 brisket +$4", price: "$14.99", img: "images/big-back-potato.jpg", badge: "Fan Favorite" },
      { name: "Big Back \u2014 Meat Less", desc: "All the toppings, no meat", price: "$9.00", img: "images/big-back-potato.jpg" }
    ]
  },
  {
    id: "pound", label: "Meats by the Pound",
    items: [
      { name: "Brisket", desc: "18-hour smoked", price: "$31.99/lb", img: "images/brisket-slab.jpg" },
      { name: "Pulled Pork", desc: "Slow-smoked", price: "$20.99/lb", img: "images/pulled-pork.jpg" },
      { name: "Pulled Chicken", desc: "Smoked & pulled", price: "$20.99/lb", img: "images/pulled-chicken-sandwich.jpg" },
      { name: "Rib Tips", desc: "Rich BBQ glaze, perfect smoke ring", price: "$14.99/lb", img: "images/rib-tips.jpg", badge: "Best Seller" }
    ]
  },
  {
    id: "sides", label: "Signature Sides",
    items: [
      { name: "Potato Salad", desc: "Classic Southern potato salad, creamy and well-seasoned.", price: "$3.99", img: "images/potato-salad.jpg" },
      { name: "Coleslaw", desc: "Creamy, tangy Southern coleslaw with a fresh crunch.", price: "$3.99", img: "images/coleslaw.jpg" },
      { name: "Pasta Salad", desc: "Chilled pasta salad with fresh vegetables and Southern seasoning.", price: "$3.99", img: "images/pasta-salad.jpg" },
      { name: "Baked Mac & Cheese", desc: "Creamy, rich Southern-style baked mac with a golden crust.", price: "$4.99", img: "images/mac-cheese.jpg", badge: "Premium" },
      { name: "Brickhouse Baked Beans", desc: "Signature slow-cooked baked beans, a customer favorite.", price: "$4.99", img: "images/baked-beans.jpg", badge: "Premium" }
    ]
  },
  {
    id: "desserts", label: "Dessert & Drinks",
    items: [
      { name: "Peach Cobbler", desc: "Golden-brown crust, bubbling peach filling.", price: "$5.99", img: "images/peach-cobbler.jpg" },
      { name: "Lemonade & Sweet Tea", desc: "Peach, strawberry or mango flavor +$0.50", price: "$2.99", img: "images/lemonade.jpg" }
    ]
  },
  {
    id: "special", label: "Today\u2019s Special",
    subtitle: "Ask about today\u2019s special \u2014 ribs (regular & jerk) when we run \u2019em",
    items: [
      { name: "Smoked Ribs", desc: "Regular & jerk", price: "Ask", img: "images/smoked-ribs.jpg" }
    ]
  }
];

const tabsEl = document.getElementById("menuTabs");
const gridEl = document.getElementById("menuGrid");
let activeTab = "combos";

function renderTabs() {
  tabsEl.innerHTML = "";
  MENU.forEach(sec => {
    const b = document.createElement("button");
    b.className = "menu-tab" + (sec.id === activeTab ? " active" : "");
    b.textContent = sec.label;
    b.setAttribute("role", "tab");
    b.onclick = () => { activeTab = sec.id; renderTabs(); renderGrid(); };
    tabsEl.appendChild(b);
  });
}

function cardHTML(item, i) {
  const badge = item.badge ? `<span class="badge">${item.badge}</span>` : "";
  return `
  <article class="menu-card" style="transition-delay:${Math.min(i * 40, 320)}ms">
    <div class="menu-photo">${badge}<img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.closest('.menu-photo').style.display='none'"/></div>
    <div class="menu-body">
      <h3>${item.name}</h3>
      <p class="menu-desc">${item.desc}</p>
      <div class="menu-row"><span class="price">${item.price}</span></div>
    </div>
  </article>`;
}

function renderGrid() {
  const sec = MENU.find(s => s.id === activeTab);
  gridEl.innerHTML =
    (sec.subtitle ? `<p class="section-sub" style="grid-column:1/-1;text-align:center;margin-bottom:.4rem">${sec.subtitle}</p>` : "") +
    sec.items.map(cardHTML).join("");
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      gridEl.querySelectorAll(".menu-card").forEach(c => c.classList.add("visible"))
    )
  );
}

renderTabs();
renderGrid();

/* mobile nav */
const navToggle = document.getElementById("navToggle");
const siteNav = document.querySelector(".site-nav");
navToggle.addEventListener("click", () => siteNav.classList.toggle("open"));
siteNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => siteNav.classList.remove("open")));
