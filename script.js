 let products = [
    { id: 1, name: "Purple and Pink Rose", price: 1590, img: "Flower - 1.png", stock: 12, sku: "stock1" },
    { id: 2, name: "Pink Lily and Carnation", price: 1890, img: "Flower - 2.png", stock: 8, sku: "stock2" },
    { id: 3, name: "Classic Red Rose", price: 2250, img: "Flower - 3.png", stock: 15, sku: "stock3" },
    { id: 4, name: "Red Rose and Baby's Breath", price: 1750, img: "Flower - 4.png", stock: 20, sku: "stock4" },
    { id: 5, name: "Crimson Elegance", price: 2390, img: "Flower - 5.png", stock: 5, sku: "stock5" },
    { id: 6, name: "Purple Lisianthus and Pompom Chrysanthemum", price: 1990, img: "Flower - 6.png", stock: 10, sku: "stock6" }
  ];

  let weddingEvents = [
    { name: "Floral Backdrop / Flower Wall", desc: "A full, dense wall of flowers used as a focal point behind a seating area or stage.", img: "weddings - 2.jpg" },
    { name: "Ceremony Runway / Aisle Runne", desc: "The pathway that the bridal party walks down, lined with decorations.", img: "weddings - 3.jpg" },
    { name: "Arched Backdrop / Minimalist Arch", desc: "he structure itself is a modern, geometric arch (often made of wood or acrylic) used for modern event styling.", img: "wedding 4.jpg" },
    { name: "Sweetheart Stage / Couple's Stage", desc: "The dedicated centerpiece area of a reception hall designed specifically to frame the newlyweds' table or couch.", img: "wedding 5.jpg" }
  ];

  let cart = []; 
  let totalSales = 0;

  function updateInventoryUI() {
    let container = document.getElementById("inventoryList");
    if(container){
      container.innerHTML = products.map(p => `<div class="inventory-row"><span>🌸 ${p.name}</span><span style="font-weight:700;">${p.stock} left ${p.stock <= 3 ? '⚠️' : '✅'}</span></div>`).join('');
    }
    let cartTotalItems = cart.reduce((acc,i)=>acc+i.quantity,0);
    document.getElementById("cartCountNum") && (document.getElementById("cartCountNum").innerText = cartTotalItems);
    document.getElementById("cartDetails") && (document.getElementById("cartDetails").innerHTML = cart.length ? cart.map(i=>`${i.name} x${i.quantity} — ₱${i.price*i.quantity}`).join('<br>') : "✨ Cart is empty");
    document.getElementById("totalSalesDisplay") && (document.getElementById("totalSalesDisplay").innerHTML = `₱${totalSales.toLocaleString()}`);
  }

  function renderProducts() {
    const grid = document.getElementById("productsContainer");
    if(!grid) return;
    grid.innerHTML = products.map(p => `
      <div class="product-card">
        <div class="product-img"><img src="${p.img}" alt="${p.name}"></div>
        <div class="product-info">
          <div class="product-title">${p.name}</div>
          <div class="price">₱${p.price}</div>
          <div class="product-actions">
            <button class="cart-add" onclick="addToCart(${p.id})"><i class="fas fa-shopping-cart"></i> Add</button>
            <button class="buy-now" onclick="buyNow(${p.id})"><i class="fas fa-bolt"></i> Buy</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderWeddings() {
    const weddingGrid = document.getElementById("eventsGrid");
    if(weddingGrid) weddingGrid.innerHTML = weddingEvents.map(e => `
      <div class="event-card"><img src="${e.img}" alt="${e.name}"><h3>${e.name}</h3><p>${e.desc}</p></div>
    `).join('');
  }

  function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    if(product.stock <= 0) { alert(`🌹 ${product.name} is out of stock`); return; }
    let existing = cart.find(i => i.id === productId);
    if(existing) existing.quantity++;
    else cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
    updateInventoryUI();
    alert(`✨ ${product.name} added to your studio cart`);
}

function buyNow(productId) {
    let product = products.find(p => p.id === productId);
    if(product.stock <= 0) { alert(`Out of stock: ${product.name}`); return; }
    product.stock--;
    totalSales += product.price;

    let trackingId = "BLOOM-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    alert(`✅ Purchase successful! Tracking ID: ${trackingId}\nThank you for your order!`);
    updateInventoryUI();
    renderProducts(); 
}

function liveTrackOrder() {
    let trackingId = document.getElementById("globalTrackingInput").value.trim();
    let resultDiv = document.getElementById("trackResultDisplay");
    if(!trackingId) { resultDiv.style.display="block"; resultDiv.innerHTML="<span style='color:var(--rose);'>🌸 Enter a valid tracking ID (e.g., BLOOM-XX)</span>"; return; }
    const randomStatus = ["Preparing your bouquet 💐","Quality check 🌿","Dispatched with courier 🚚","Out for delivery 🚘","Delivered with love ❤️"][Math.floor(Math.random()*5)];
    resultDiv.style.display="block";
    resultDiv.innerHTML = `<strong><i class="fas fa-map-marker-alt"></i> Tracking ${trackingId}</strong><br> Status: ${randomStatus}<br><span style="font-size:13px;">Estimated arrival: Today - 2 days</span>`;
}

function trackFromDash() {
    let id = document.getElementById("dashTrackInput").value;
    document.getElementById("dashTrackMsg").innerHTML = id ? `🔍 Order ${id} : ${["Processing","Shipped","Arriving soon"][Math.floor(Math.random()*3)]}` : "Provide tracking ID";
  }

  function bookFloralEvent() {
    let name = document.getElementById("bookName").value;
    if(!name) { alert("Please enter your name"); return; }
    alert(`✨ ${name}, your floral event request has been sent! Our dream team will contact you within 24h.`);
    document.getElementById("bookName").value = "";
    document.getElementById("bookEmail").value = "";
    document.getElementById("bookDetails").value = "";
}

function openDashboard() { document.getElementById("dashboardPanel").classList.add("open"); updateInventoryUI(); }
function closeDashboard() { document.getElementById("dashboardPanel").classList.remove("open"); }
function openLoginModal() { document.getElementById("loginModal").style.display = "flex"; }
function openSignupModal() { closeModal(); document.getElementById("signupModal").style.display = "flex"; }
function closeModal() { document.getElementById("loginModal").style.display = "none"; document.getElementById("signupModal").style.display = "none"; }
function performLogin() { alert("Welcome back to BloomSync ✨"); closeModal(); }
function performSignup() { alert("Account created! Enjoy floral luxury."); closeModal(); }


window.addToCart = addToCart; window.buyNow = buyNow; window.liveTrackOrder = liveTrackOrder;
window.trackFromDash = trackFromDash; window.bookFloralEvent = bookFloralEvent;
window.openDashboard = openDashboard; window.closeDashboard = closeDashboard;
window.openLoginModal = openLoginModal; window.openSignupModal = openSignupModal; window.closeModal = closeModal;
window.performLogin = performLogin; window.performSignup = performSignup;

renderProducts();
renderWeddings();
updateInventoryUI();