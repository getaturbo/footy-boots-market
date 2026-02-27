import { useState, useEffect } from "react";

const SPORTS = ["All", "Soccer", "AFL", "Rugby League", "Rugby Union"];
const CONDITIONS = ["New", "Like New", "Good", "Fair"];
const PRICE_TYPES = ["Fixed", "Offers Welcome", "Free"];
const SIZES = ["1","2","3","4","5","6","7","8","9","10","11","12","13","1J","2J","3J","4J","5J","6J","7J","8J","9J","10J","11J","12J","13J"];

const SPORT_COLORS = {
  Soccer: "#22c55e",
  AFL: "#f59e0b",
  "Rugby League": "#3b82f6",
  "Rugby Union": "#8b5cf6",
};

const SPORT_ICONS = {
  Soccer: "⚽",
  AFL: "🏉",
  "Rugby League": "🏉",
  "Rugby Union": "🏉",
};

const initialListings = [
  { id: 1, title: "Nike Mercurial Vapor 15", sport: "Soccer", brand: "Nike", size: "5", condition: "Like New", priceType: "Fixed", price: "45", swap: false, description: "Barely worn, only used for 3 games. Great condition, son grew out of them.", contact: "0412 345 678", contactType: "whatsapp", location: "Brisbane, QLD", seller: "Dave M", date: "2026-02-20" },
  { id: 2, title: "Adidas Predator Edge", sport: "Soccer", brand: "Adidas", size: "4", condition: "Good", priceType: "Offers Welcome", price: "30", swap: true, description: "Good boots, some wear on the studs. Happy to swap for size 5.", contact: "dave@email.com", contactType: "email", location: "Gold Coast, QLD", seller: "Sarah K", date: "2026-02-22" },
  { id: 3, title: "Asics Gel Lethal", sport: "AFL", brand: "Asics", size: "8", condition: "New", priceType: "Fixed", price: "120", swap: false, description: "Brand new, never worn. Wrong size, bought as a gift.", contact: "0423 456 789", contactType: "whatsapp", location: "Melbourne, VIC", seller: "Tom R", date: "2026-02-23" },
  { id: 4, title: "Canterbury Rugby Boots", sport: "Rugby League", brand: "Canterbury", size: "6", condition: "Fair", priceType: "Free", price: "", swap: true, description: "Free to a good home! End of season, time to upgrade. Pick up only.", contact: "0434 567 890", contactType: "whatsapp", location: "Sydney, NSW", seller: "Mick J", date: "2026-02-24" },
];

const emptyListing = { title: "", sport: "Soccer", brand: "", size: "", condition: "Good", priceType: "Fixed", price: "", swap: false, description: "", contact: "", contactType: "whatsapp", location: "", seller: "" };

export default function App() {
  const [view, setView] = useState("browse");
  const [listings, setListings] = useState(initialListings);
  const [selectedListing, setSelectedListing] = useState(null);
  const [filterSport, setFilterSport] = useState("All");
  const [filterSize, setFilterSize] = useState("");
  const [filterSwap, setFilterSwap] = useState(false);
  const [search, setSearch] = useState("");
  const [newListing, setNewListing] = useState({ ...emptyListing });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;900&family=DM+Sans:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const filtered = listings.filter((l) => {
    if (filterSport !== "All" && l.sport !== filterSport) return false;
    if (filterSize && l.size !== filterSize) return false;
    if (filterSwap && !l.swap) return false;
    if (search && !`${l.title} ${l.brand} ${l.sport} ${l.location}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addListing = () => {
    if (!newListing.title || !newListing.size || !newListing.contact || !newListing.seller) return;
    setListings((prev) => [...prev, { ...newListing, id: Date.now(), date: new Date().toISOString().split("T")[0] }]);
    setNewListing({ ...emptyListing });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setView("browse"); }, 2000);
  };

  const sportColor = (sport) => SPORT_COLORS[sport] || "#22c55e";
  const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });

  const inputStyle = { padding: "10px 12px", background: "#f8f8f8", border: "1px solid #e0e0e0", borderRadius: 8, color: "#111", fontFamily: "'DM Sans', sans-serif", fontSize: 14, width: "100%", boxSizing: "border-box", outline: "none" };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: "#666", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 5, display: "block", fontFamily: "'Exo 2', sans-serif" };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f4f4f0", minHeight: "100vh", color: "#111" }}>

      {/* Header */}
      <div style={{ background: "#111", padding: "0 20px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>👟</span>
            <div>
              <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 18, color: "#fff", letterSpacing: 1 }}>FOOTY BOOTS</div>
              <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 10, color: "#22c55e", letterSpacing: 3, marginTop: -2 }}>MARKET</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setView("browse")} style={{ padding: "8px 16px", background: view === "browse" ? "#22c55e" : "transparent", border: "1px solid #333", borderRadius: 20, color: view === "browse" ? "#111" : "#aaa", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1 }}>BROWSE</button>
            <button onClick={() => setView("sell")} style={{ padding: "8px 16px", background: view === "sell" ? "#22c55e" : "transparent", border: "1px solid #333", borderRadius: 20, color: view === "sell" ? "#111" : "#aaa", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1 }}>+ SELL</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>

        {/* BROWSE VIEW */}
        {view === "browse" && !selectedListing && (
          <div>
            {/* Hero */}
            <div style={{ background: "#111", borderRadius: 16, padding: "24px 20px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.05 }}>👟</div>
              <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 26, color: "#fff", lineHeight: 1.2 }}>
                Buy, Sell & Swap<br /><span style={{ color: "#22c55e" }}>Footy Boots</span>
              </div>
              <div style={{ fontSize: 14, color: "#888", marginTop: 8, marginBottom: 16 }}>For kids & parents across AFL, Soccer, Rugby League & Union</div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ background: "#1a1a1a", borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 22, color: "#22c55e" }}>{listings.length}</div>
                  <div style={{ fontSize: 11, color: "#666" }}>Listings</div>
                </div>
                <div style={{ background: "#1a1a1a", borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 22, color: "#f59e0b" }}>{listings.filter(l => l.swap).length}</div>
                  <div style={{ fontSize: 11, color: "#666" }}>Open to Swap</div>
                </div>
                <div style={{ background: "#1a1a1a", borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 22, color: "#3b82f6" }}>{listings.filter(l => l.priceType === "Free").length}</div>
                  <div style={{ fontSize: 11, color: "#666" }}>Free</div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div style={{ position: "relative", marginBottom: 12 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search boots, brand, location..." style={{ ...inputStyle, paddingLeft: 40, background: "#fff", borderRadius: 12 }} />
            </div>

            {/* Filters */}
            <div style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Sport filter */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {SPORTS.map(s => (
                  <button key={s} onClick={() => setFilterSport(s)}
                    style={{ padding: "6px 14px", background: filterSport === s ? (SPORT_COLORS[s] || "#22c55e") : "#fff", border: `1px solid ${filterSport === s ? (SPORT_COLORS[s] || "#22c55e") : "#ddd"}`, borderRadius: 20, color: filterSport === s ? "#fff" : "#555", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 12 }}>
                    {s === "All" ? "All Sports" : `${SPORT_ICONS[s]} ${s}`}
                  </button>
                ))}
              </div>
              {/* Size + swap filter */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <select value={filterSize} onChange={e => setFilterSize(e.target.value)} style={{ ...inputStyle, width: "auto", flex: 1, background: "#fff", borderRadius: 20, padding: "6px 14px" }}>
                  <option value="">Any Size</option>
                  {SIZES.map(s => <option key={s} value={s}>Size {s}</option>)}
                </select>
                <button onClick={() => setFilterSwap(!filterSwap)} style={{ padding: "6px 16px", background: filterSwap ? "#f59e0b" : "#fff", border: `1px solid ${filterSwap ? "#f59e0b" : "#ddd"}`, borderRadius: 20, color: filterSwap ? "#fff" : "#555", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 12, whiteSpace: "nowrap" }}>
                  🔄 Swap Only
                </button>
                {(filterSport !== "All" || filterSize || filterSwap || search) && (
                  <button onClick={() => { setFilterSport("All"); setFilterSize(""); setFilterSwap(false); setSearch(""); }} style={{ padding: "6px 14px", background: "#fff", border: "1px solid #ddd", borderRadius: 20, color: "#999", cursor: "pointer", fontSize: 12 }}>✕ Clear</button>
                )}
              </div>
            </div>

            {/* Results count */}
            <div style={{ fontSize: 13, color: "#888", marginBottom: 12, fontFamily: "'Exo 2', sans-serif" }}>
              {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found
            </div>

            {/* Listings */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 20px", background: "#fff", borderRadius: 16, color: "#aaa" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>👟</div>
                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700 }}>No boots found</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
                </div>
              )}
              {filtered.map((l) => (
                <div key={l.id} onClick={() => setSelectedListing(l)} style={{ background: "#fff", borderRadius: 16, padding: "16px", cursor: "pointer", border: "1px solid #eee", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "transform 0.1s", position: "relative", overflow: "hidden" }}>
                  {/* Sport color bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: sportColor(l.sport) }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ background: sportColor(l.sport) + "22", color: sportColor(l.sport), fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, fontFamily: "'Exo 2', sans-serif" }}>{SPORT_ICONS[l.sport]} {l.sport}</span>
                        <span style={{ background: "#f4f4f0", color: "#666", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, fontFamily: "'Exo 2', sans-serif" }}>Size {l.size}</span>
                        <span style={{ background: l.condition === "New" ? "#dcfce7" : l.condition === "Like New" ? "#dbeafe" : "#fef9c3", color: l.condition === "New" ? "#15803d" : l.condition === "Like New" ? "#1d4ed8" : "#854d0e", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, fontFamily: "'Exo 2', sans-serif" }}>{l.condition}</span>
                        {l.swap && <span style={{ background: "#fef3c7", color: "#d97706", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, fontFamily: "'Exo 2', sans-serif" }}>🔄 Swap</span>}
                      </div>
                      <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 16, color: "#111" }}>{l.title}</div>
                      <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{l.brand} · {l.location}</div>
                    </div>
                    <div style={{ textAlign: "right", marginLeft: 12, flexShrink: 0 }}>
                      {l.priceType === "Free" ? (
                        <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 22, color: "#22c55e" }}>FREE</div>
                      ) : (
                        <div>
                          <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 22, color: "#111" }}>${l.price}</div>
                          {l.priceType === "Offers Welcome" && <div style={{ fontSize: 10, color: "#888", fontFamily: "'Exo 2', sans-serif" }}>offers ok</div>}
                        </div>
                      )}
                      <div style={{ fontSize: 11, color: "#bbb", marginTop: 4 }}>{fmtDate(l.date)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LISTING DETAIL VIEW */}
        {view === "browse" && selectedListing && (
          <div>
            <button onClick={() => setSelectedListing(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#555", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 16, padding: 0 }}>
              ← Back to listings
            </button>
            <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #eee" }}>
              {/* Sport banner */}
              <div style={{ background: sportColor(selectedListing.sport), padding: "20px", color: "#fff" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(255,255,255,0.2)", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 12, fontFamily: "'Exo 2', sans-serif" }}>{SPORT_ICONS[selectedListing.sport]} {selectedListing.sport}</span>
                  <span style={{ background: "rgba(255,255,255,0.2)", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 12, fontFamily: "'Exo 2', sans-serif" }}>Size {selectedListing.size}</span>
                  <span style={{ background: "rgba(255,255,255,0.2)", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 12, fontFamily: "'Exo 2', sans-serif" }}>{selectedListing.condition}</span>
                  {selectedListing.swap && <span style={{ background: "rgba(255,255,255,0.2)", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 12, fontFamily: "'Exo 2', sans-serif" }}>🔄 Open to Swap</span>}
                </div>
                <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 22 }}>{selectedListing.title}</div>
                <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>{selectedListing.brand}</div>
              </div>

              <div style={{ padding: 20 }}>
                {/* Price */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: "16px", background: "#f8f8f8", borderRadius: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#888", fontFamily: "'Exo 2', sans-serif", fontWeight: 600 }}>ASKING PRICE</div>
                    {selectedListing.priceType === "Free" ? (
                      <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 32, color: "#22c55e" }}>FREE</div>
                    ) : (
                      <div>
                        <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 32, color: "#111" }}>${selectedListing.price}</div>
                        {selectedListing.priceType === "Offers Welcome" && <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600, fontFamily: "'Exo 2', sans-serif" }}>💬 Offers welcome</div>}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "#888" }}>📍 {selectedListing.location}</div>
                    <div style={{ fontSize: 12, color: "#bbb", marginTop: 4 }}>Listed {fmtDate(selectedListing.date)}</div>
                    <div style={{ fontSize: 13, color: "#555", marginTop: 4, fontWeight: 600 }}>👤 {selectedListing.seller}</div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Description</div>
                  <div style={{ fontSize: 15, color: "#333", lineHeight: 1.7 }}>{selectedListing.description}</div>
                </div>

                {/* Contact */}
                <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 13, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Contact Seller</div>
                {selectedListing.contactType === "whatsapp" ? (
                  <a href={`https://wa.me/61${selectedListing.contact.replace(/^0/, "").replace(/\s/g, "")}`} target="_blank" rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px", background: "#22c55e", borderRadius: 12, color: "#fff", textDecoration: "none", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>
                    💬 Message on WhatsApp
                  </a>
                ) : (
                  <a href={`mailto:${selectedListing.contact}`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px", background: "#3b82f6", borderRadius: 12, color: "#fff", textDecoration: "none", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 1 }}>
                    ✉️ Send Email
                  </a>
                )}
                <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, color: "#bbb" }}>{selectedListing.contact}</div>
              </div>
            </div>
          </div>
        )}

        {/* SELL VIEW */}
        {view === "sell" && (
          <div>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 24, color: "#22c55e" }}>Listing Posted!</div>
                <div style={{ color: "#888", marginTop: 8 }}>Redirecting to browse...</div>
              </div>
            ) : (
              <div>
                <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 22, color: "#111", marginBottom: 4 }}>List Your Boots</div>
                <div style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>Fill in the details below to post your listing</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                  {/* Sport */}
                  <div>
                    <label style={labelStyle}>Sport *</label>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {SPORTS.filter(s => s !== "All").map(s => (
                        <button key={s} onClick={() => setNewListing(p => ({ ...p, sport: s }))}
                          style={{ padding: "8px 14px", background: newListing.sport === s ? sportColor(s) : "#fff", border: `1px solid ${newListing.sport === s ? sportColor(s) : "#ddd"}`, borderRadius: 20, color: newListing.sport === s ? "#fff" : "#555", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 12 }}>
                          {SPORT_ICONS[s]} {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title + Brand */}
                  <div>
                    <label style={labelStyle}>Boot Name / Title *</label>
                    <input value={newListing.title} onChange={e => setNewListing(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Nike Mercurial Vapor 15" style={inputStyle} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={labelStyle}>Brand</label>
                      <input value={newListing.brand} onChange={e => setNewListing(p => ({ ...p, brand: e.target.value }))} placeholder="e.g. Nike" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Size *</label>
                      <select value={newListing.size} onChange={e => setNewListing(p => ({ ...p, size: e.target.value }))} style={inputStyle}>
                        <option value="">Select size</option>
                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <label style={labelStyle}>Condition *</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      {CONDITIONS.map(c => (
                        <button key={c} onClick={() => setNewListing(p => ({ ...p, condition: c }))}
                          style={{ flex: 1, padding: "8px 6px", background: newListing.condition === c ? "#111" : "#fff", border: `1px solid ${newListing.condition === c ? "#111" : "#ddd"}`, borderRadius: 8, color: newListing.condition === c ? "#fff" : "#555", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 11 }}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label style={labelStyle}>Price Type *</label>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                      {PRICE_TYPES.map(pt => (
                        <button key={pt} onClick={() => setNewListing(p => ({ ...p, priceType: pt }))}
                          style={{ flex: 1, padding: "8px 6px", background: newListing.priceType === pt ? "#22c55e" : "#fff", border: `1px solid ${newListing.priceType === pt ? "#22c55e" : "#ddd"}`, borderRadius: 8, color: newListing.priceType === pt ? "#fff" : "#555", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 11 }}>
                          {pt}
                        </button>
                      ))}
                    </div>
                    {newListing.priceType !== "Free" && (
                      <input value={newListing.price} onChange={e => setNewListing(p => ({ ...p, price: e.target.value }))} placeholder="$ Amount" style={inputStyle} type="number" />
                    )}
                  </div>

                  {/* Swap toggle */}
                  <div onClick={() => setNewListing(p => ({ ...p, swap: !p.swap }))}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: newListing.swap ? "#fef3c7" : "#fff", border: `1px solid ${newListing.swap ? "#f59e0b" : "#ddd"}`, borderRadius: 12, cursor: "pointer" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 4, background: newListing.swap ? "#f59e0b" : "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {newListing.swap && <span style={{ fontSize: 13, color: "#fff" }}>✓</span>}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 14 }}>🔄 Open to Swap</div>
                      <div style={{ fontSize: 12, color: "#888" }}>Tick if you'd consider swapping for another size</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label style={labelStyle}>Description</label>
                    <textarea value={newListing.description} onChange={e => setNewListing(p => ({ ...p, description: e.target.value }))} placeholder="Describe the boots — condition details, how many games worn, why selling..." rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
                  </div>

                  {/* Location */}
                  <div>
                    <label style={labelStyle}>Location *</label>
                    <input value={newListing.location} onChange={e => setNewListing(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Brisbane, QLD" style={inputStyle} />
                  </div>

                  {/* Seller name */}
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input value={newListing.seller} onChange={e => setNewListing(p => ({ ...p, seller: e.target.value }))} placeholder="e.g. Dave M" style={inputStyle} />
                  </div>

                  {/* Contact */}
                  <div>
                    <label style={labelStyle}>Contact Method *</label>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                      {[["whatsapp", "💬 WhatsApp"], ["email", "✉️ Email"]].map(([val, label]) => (
                        <button key={val} onClick={() => setNewListing(p => ({ ...p, contactType: val }))}
                          style={{ flex: 1, padding: "10px", background: newListing.contactType === val ? "#111" : "#fff", border: `1px solid ${newListing.contactType === val ? "#111" : "#ddd"}`, borderRadius: 8, color: newListing.contactType === val ? "#fff" : "#555", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 13 }}>
                          {label}
                        </button>
                      ))}
                    </div>
                    <input value={newListing.contact} onChange={e => setNewListing(p => ({ ...p, contact: e.target.value }))} placeholder={newListing.contactType === "whatsapp" ? "e.g. 0412 345 678" : "e.g. you@email.com"} style={inputStyle} />
                  </div>

                  <button onClick={addListing}
                    style={{ padding: "16px", background: (!newListing.title || !newListing.size || !newListing.contact || !newListing.seller) ? "#ccc" : "#22c55e", border: "none", borderRadius: 12, color: "#fff", cursor: "pointer", fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: 1, marginTop: 6 }}>
                    POST LISTING
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "30px 20px", color: "#bbb", fontSize: 12, fontFamily: "'Exo 2', sans-serif" }}>
        Footy Boots Market · Buy, Sell & Swap · For the community 👟
      </div>
    </div>
  );
}
