import { useState, useEffect, useMemo, useCallback } from "react";

import Landing from "./components/Landing.jsx";
import Login from "./components/Login.jsx";
import Sidebar from "./components/Sidebar.jsx";
import BottomNav from "./components/BottomNav.jsx";
import TopBar from "./components/TopBar.jsx";
import SellModal from "./components/SellModal.jsx";
import BuyModal from "./components/BuyModal.jsx";
import HouseModal from "./components/HouseModal.jsx";
import ToastStack from "./components/ToastStack.jsx";

import DashboardPage from "./pages/DashboardPage.jsx";
import MarketPage from "./pages/MarketPage.jsx";
import MyEnergyPage from "./pages/MyEnergyPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import ImpactPage from "./pages/ImpactPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

import { INITIAL_HOUSES, INITIAL_LISTINGS } from "./data/mockData.js";
import { fmt, inr } from "./utils/format.js";

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | login | app
  const [role, setRole] = useState("member");
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const [houses] = useState(INITIAL_HOUSES);
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [transactions, setTransactions] = useState([
    { id: "T0", type: "sold", energyAmount: 3.0, pricePerKwh: 6.5, totalAmount: 19.5, timestamp: Date.now() - 86400000, buyerHouse: 217, sellerHouse: 104 },
    { id: "T1", type: "bought", energyAmount: 1.5, pricePerKwh: 6.2, totalAmount: 9.3, timestamp: Date.now() - 3 * 3600000, buyerHouse: 104, sellerHouse: 309 },
  ]);
  const [notifications, setNotifications] = useState([
    { id: "N1", icon: "☀️", text: "Solar generation is currently high.", time: Date.now() - 20 * 60000, read: false },
    { id: "N2", icon: "📈", text: "Energy market price increased to ₹6.80/kWh.", time: Date.now() - 60 * 60000, read: false },
    { id: "N3", icon: "🌱", text: "You reached 50 kg CO₂ savings.", time: Date.now() - 5 * 3600000, read: true },
  ]);
  const [toasts, setToasts] = useState([]);

  const [user, setUser] = useState({
    ...INITIAL_HOUSES[0],
    mySurplus: Math.max(0, +(INITIAL_HOUSES[0].generation - INITIAL_HOUSES[0].consumption).toFixed(1)),
    todaysEarnings: 18.9,
  });

  const [live, setLive] = useState({ generation: 8.42, consumption: 5.71, surplus: 2.71, gridDependency: 31 });
  const [liveTime, setLiveTime] = useState(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));

  const [sellModal, setSellModal] = useState(false);
  const [buyListing, setBuyListing] = useState(null);
  const [houseModal, setHouseModal] = useState(null);

  // Live ticking simulation — purely cosmetic, updates every few seconds.
  useEffect(() => {
    const iv = setInterval(() => {
      setLive((prev) => {
        const gen = Math.max(1, +(prev.generation + (Math.random() - 0.5) * 0.6).toFixed(2));
        const cons = Math.max(1, +(prev.consumption + (Math.random() - 0.5) * 0.4).toFixed(2));
        const surplus = Math.max(0, +(gen - cons).toFixed(2));
        const gridDependency = Math.max(8, Math.min(60, Math.round(prev.gridDependency + (Math.random() - 0.5) * 4)));
        return { generation: gen, consumption: cons, surplus, gridDependency };
      });
      setLiveTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  const pushToast = useCallback((title, desc) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, title, desc }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const pushNotification = useCallback((icon, text) => {
    setNotifications((n) => [{ id: Math.random().toString(36).slice(2), icon, text, time: Date.now(), read: false }, ...n]);
  }, []);

  const communityStats = useMemo(() => {
    const listingSurplusDelta =
      listings.reduce((s, l) => s + l.remainingEnergy, 0) - INITIAL_LISTINGS.reduce((s, l) => s + l.remainingEnergy, 0);
    return {
      generation: 128.6,
      consumption: 94.2,
      surplus: Math.max(0, +(34.4 + listingSurplusDelta).toFixed(1)),
      co2: 21.4,
      homes: houses.length,
    };
  }, [houses, listings]);

  const marketStats = useMemo(() => {
    const activeListings = listings.filter((l) => l.remainingEnergy > 0.05);
    const available = activeListings.reduce((s, l) => s + l.remainingEnergy, 0);
    const avgPrice = activeListings.length
      ? activeListings.reduce((s, l) => s + l.pricePerKwh, 0) / activeListings.length
      : 6.42;
    const demand = available < 20 ? "High" : available < 35 ? "Medium" : "Low";
    return { available, sellers: activeListings.length, avgPrice, demand };
  }, [listings]);

  const marketPrice = useMemo(() => {
    const base = 6.0;
    const supplyFactor = Math.max(0.5, 1 - marketStats.available / 60);
    return +(base + supplyFactor * 1.4).toFixed(2);
  }, [marketStats.available]);

  function handleSell({ amount, price, duration }) {
    const newListing = {
      id: `L${Date.now()}`,
      sellerId: user.id,
      houseNumber: user.houseNumber,
      energyAmount: amount,
      remainingEnergy: amount,
      pricePerKwh: price,
      source: user.energySource,
      distance: 0,
      status: "active",
      createdAt: Date.now(),
      duration,
    };
    setListings((l) => [newListing, ...l]);
    setUser((u) => ({ ...u, mySurplus: +(u.mySurplus - amount).toFixed(1) }));
    setSellModal(false);
    pushToast("Energy listed", `${fmt(amount)} kWh at ${inr(price)}/kWh is now live in the Energy Market.`);
    pushNotification("⚡", `Your listing of ${fmt(amount)} kWh at ${inr(price)}/kWh went live.`);
  }

  function handleBuy({ qty, total }) {
    const listing = buyListing;
    setListings((ls) =>
      ls.map((l) => (l.id === listing.id ? { ...l, remainingEnergy: Math.max(0, +(l.remainingEnergy - qty).toFixed(1)) } : l))
    );
    setTransactions((ts) => [
      {
        id: `T${Date.now()}`,
        type: "bought",
        energyAmount: qty,
        pricePerKwh: listing.pricePerKwh,
        totalAmount: +total.toFixed(2),
        timestamp: Date.now(),
        buyerHouse: user.houseNumber,
        sellerHouse: listing.houseNumber,
      },
      ...ts,
    ]);
    setUser((u) => ({ ...u, balance: +(u.balance - total).toFixed(2) }));
    setBuyListing(null);
    pushToast("Energy purchase completed ⚡", `You bought ${fmt(qty)} kWh from House #${listing.houseNumber} for ${inr(total)}.`);
    pushNotification("⚡", "Your energy listing was purchased.");
    setTimeout(() => pushNotification("💰", `You earned ${inr(total)}.`), 600);
  }

  function markNotifRead(id) {
    setNotifications((n) => n.map((x) => (x.id === id ? { ...x, read: true } : x)));
  }

  function handleLogin(r) {
    setRole(r);
    setActive("dashboard");
    setScreen("app");
  }

  if (screen === "landing") {
    return <Landing onDemo={() => setScreen("login")} onMarket={() => setScreen("login")} />;
  }
  if (screen === "login") {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 min-w-0 flex flex-col" onClick={() => notifOpen && setNotifOpen(false)}>
        <TopBar
          onMenu={() => setMobileOpen(true)}
          notifications={notifications}
          notifOpen={notifOpen}
          onOpenNotifications={(e) => {
            e.stopPropagation();
            setNotifOpen((o) => !o);
          }}
          onMarkRead={markNotifRead}
          user={user}
          liveTime={liveTime}
        />

        <main className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-6 max-w-7xl w-full mx-auto">
        <div key={active} className="anim-fade-up">
          {role === "admin" && active === "dashboard" ? (
            <AdminPage houses={houses} transactions={transactions} communityStats={communityStats} marketStats={marketStats} />
          ) : active === "dashboard" ? (
            <DashboardPage
              user={user}
              live={live}
              communityStats={communityStats}
              onSell={() => setSellModal(true)}
              price={marketPrice}
              demand={marketStats.demand}
            />
          ) : active === "market" ? (
            <MarketPage listings={listings} onBuy={setBuyListing} marketStats={{ ...marketStats, avgPrice: marketPrice }} />
          ) : active === "myenergy" ? (
            <MyEnergyPage user={user} onSell={() => setSellModal(true)} />
          ) : active === "transactions" ? (
            <TransactionsPage transactions={transactions} />
          ) : active === "community" ? (
            <CommunityPage houses={houses} communityStats={communityStats} onSelectHouse={setHouseModal} />
          ) : active === "impact" ? (
            <ImpactPage user={user} />
          ) : active === "profile" ? (
            <ProfilePage
              user={user}
              communityStats={communityStats}
              role={role}
              onLogout={() => {
                setScreen("landing");
                setActive("dashboard");
              }}
            />
          ) : null}
        </div>
        </main>
      </div>

      <BottomNav active={active} setActive={setActive} />

      {sellModal && <SellModal user={user} onClose={() => setSellModal(false)} onSubmit={handleSell} />}
      {buyListing && <BuyModal listing={buyListing} onClose={() => setBuyListing(null)} onSubmit={handleBuy} />}
      {houseModal && <HouseModal house={houseModal} onClose={() => setHouseModal(null)} />}

      <ToastStack toasts={toasts} />
    </div>
  );
}
