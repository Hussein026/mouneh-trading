/* ===================== CART ENGINE (localStorage) ===================== */
const CART_KEY = "mouneh_cart_v1";

function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(id, qty){
  const cart = getCart();
  cart[id] = (cart[id] || 0) + (qty || 1);
  saveCart(cart);
  showToast(`Added ${findProduct(id).name} to your crate.`);
}
function setQty(id, qty){
  const cart = getCart();
  if(qty <= 0){ delete cart[id]; } else { cart[id] = qty; }
  saveCart(cart);
}
function removeFromCart(id){
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
}
function cartCount(){
  const cart = getCart();
  return Object.values(cart).reduce((a,b) => a+b, 0);
}
function cartTotal(){
  const cart = getCart();
  let total = 0;
  Object.entries(cart).forEach(([id, qty]) => {
    const p = findProduct(id);
    if(p) total += p.price * qty;
  });
  return total;
}
function updateCartCount(){
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = cartCount());
}

/* ===================== TOAST ===================== */
let toastTimer;
function showToast(msg){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>&#10003;</span><span>${msg}</span>`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ===================== TABS ===================== */
function initTabs(){
  document.querySelectorAll("[data-tabs]").forEach(group => {
    const buttons = group.querySelectorAll(".tab-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        group.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
        group.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`).classList.add("active");
      });
    });
  });
}

/* ===================== SCROLL REVEAL ===================== */
function initReveal(){
  const els = document.querySelectorAll(".fade-up");
  if(!("IntersectionObserver" in window)){ els.forEach(el => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add("in"); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ===================== NAV TOGGLE (mobile) ===================== */
function initNavToggle(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if(!toggle) return;
  toggle.addEventListener("click", () => {
    const open = links.style.display === "flex";
    links.style.display = open ? "none" : "flex";
    links.style.cssText = open ? "" : "display:flex;position:absolute;top:70px;left:0;right:0;background:var(--parchment);flex-direction:column;padding:20px 32px;border-bottom:1px solid var(--line);gap:18px;";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  initTabs();
  initReveal();
  initNavToggle();
});
