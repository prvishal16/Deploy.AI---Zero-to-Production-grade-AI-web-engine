export const MOCK_WEBSITES_FREE = [
  {
    _id: "site_001",
    title: "Portfolio Website",
    latestcode: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);color:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;}h1{font-size:3rem;font-weight:800;background:linear-gradient(to right,#f953c6,#b91d73);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1rem;}p{color:#ccc;font-size:1.1rem;max-width:500px;line-height:1.8;}.btn{margin-top:2rem;padding:12px 32px;background:linear-gradient(to right,#f953c6,#b91d73);border:none;border-radius:50px;color:#fff;font-size:1rem;cursor:pointer;font-weight:600;}.skills{display:flex;gap:12px;margin-top:2rem;flex-wrap:wrap;justify-content:center;}.tag{background:rgba(255,255,255,0.1);padding:8px 18px;border-radius:20px;font-size:0.85rem;border:1px solid rgba(255,255,255,0.2);}</style></head><body><h1>Alex Johnson</h1><p>Full Stack Developer crafting beautiful digital experiences with React, Node.js and AI.</p><div class="skills"><span class="tag">React</span><span class="tag">Node.js</span><span class="tag">MongoDB</span><span class="tag">AI/ML</span></div><button class="btn">View My Work</button></body></html>`,
    deployed: false,
    deployUrl: null,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: "site_002",
    title: "SaaS Landing Page",
    latestcode: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Segoe UI',sans-serif;background:#0a0a0a;color:#fff;}.nav{display:flex;justify-content:space-between;align-items:center;padding:20px 60px;border-bottom:1px solid #222;}.logo{font-size:1.5rem;font-weight:800;color:#6c63ff;}.hero{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:80vh;text-align:center;padding:40px;background:radial-gradient(ellipse at center,#1a1040 0%,#0a0a0a 70%);}h1{font-size:3.5rem;font-weight:900;line-height:1.2;margin-bottom:1.5rem;}span{background:linear-gradient(to right,#6c63ff,#48cfad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}p{color:#888;font-size:1.2rem;max-width:600px;line-height:1.8;margin-bottom:2rem;}.btns{display:flex;gap:16px;}.btn1{padding:14px 36px;background:#6c63ff;border:none;border-radius:8px;color:#fff;font-size:1rem;cursor:pointer;font-weight:600;}.btn2{padding:14px 36px;background:transparent;border:1px solid #444;border-radius:8px;color:#fff;font-size:1rem;cursor:pointer;}</style></head><body><nav class="nav"><div class="logo">LaunchKit</div><div>Features Pricing Docs</div></nav><div class="hero"><h1>Ship Faster With <span>LaunchKit</span></h1><p>The all-in-one platform to build, deploy, and scale your SaaS in record time.</p><div class="btns"><button class="btn1">Start Free Trial</button><button class="btn2">See Demo</button></div></div></body></html>`,
    deployed: false,
    deployUrl: null,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const MOCK_WEBSITES_PRO = [
  ...MOCK_WEBSITES_FREE,
  {
    _id: "site_003",
    title: "E-Commerce Fashion Store",
    latestcode: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Segoe UI',sans-serif;background:#fff;color:#111;}.nav{display:flex;justify-content:space-between;align-items:center;padding:20px 60px;border-bottom:1px solid #eee;font-weight:600;}.hero{background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;padding:80px 60px;}.hero h1{font-size:3rem;font-weight:900;line-height:1.2;margin-bottom:1rem;}.hero p{color:#aaa;font-size:1.1rem;margin-bottom:2rem;}.btn{padding:14px 36px;background:linear-gradient(to right,#e96c50,#f7b731);border:none;border-radius:8px;color:#fff;font-size:1rem;cursor:pointer;font-weight:700;}.products{padding:60px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}.card{border:1px solid #eee;border-radius:16px;overflow:hidden;}.card-img{height:160px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;font-size:3rem;}.card-body{padding:16px;}.price{color:#e96c50;font-weight:800;}</style></head><body><nav class="nav"><div>LUXE</div><div>Women Men Kids Sale</div><div>Cart</div></nav><div class="hero"><h1>New Season Collection 2025</h1><p>Discover the latest trends in luxury fashion.</p><button class="btn">Shop Now</button></div><div class="products"><div class="card"><div class="card-img">👗</div><div class="card-body"><h3>Silk Evening Dress</h3><p class="price">299</p></div></div><div class="card"><div class="card-img">👠</div><div class="card-body"><h3>Designer Heels</h3><p class="price">189</p></div></div><div class="card"><div class="card-img">👜</div><div class="card-body"><h3>Leather Handbag</h3><p class="price">449</p></div></div></div></body></html>`,
    deployed: false,
    deployUrl: null,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    _id: "site_004",
    title: "Restaurant Website",
    latestcode: `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Segoe UI',sans-serif;background:#0d0d0d;color:#fff;}.hero{background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),linear-gradient(135deg,#c94b4b,#4b134f);min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;}.logo{font-size:1.8rem;font-weight:900;letter-spacing:4px;color:#f7b731;margin-bottom:2rem;}h1{font-size:3.5rem;font-weight:900;margin-bottom:1rem;}p{color:#ddd;font-size:1.1rem;margin-bottom:2rem;}.btn{padding:14px 40px;background:#f7b731;border:none;border-radius:4px;color:#000;font-size:1rem;font-weight:800;cursor:pointer;}.menu{padding:60px;background:#111;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;text-align:center;}.item{padding:24px;border:1px solid #222;border-radius:12px;}.item span{font-size:2.5rem;}.item h3{margin:12px 0 6px;font-weight:700;}.item p{color:#888;}</style></head><body><div class="hero"><div class="logo">BELLA CUCINA</div><h1>Authentic Italian Experience</h1><p>Fresh ingredients. Traditional recipes. Unforgettable taste.</p><button class="btn">RESERVE A TABLE</button></div><div class="menu"><div class="item"><span>🍝</span><h3>Pasta Carbonara</h3><p>22</p></div><div class="item"><span>🍕</span><h3>Margherita Pizza</h3><p>18</p></div><div class="item"><span>🥗</span><h3>Caesar Salad</h3><p>14</p></div></div></body></html>`,
    deployed: false,
    deployUrl: null,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];
