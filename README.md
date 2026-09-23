# GridShare — Community P2P Renewable Energy Marketplace (Prototype)

A simulated, hackathon/college-project prototype of a community peer-to-peer
renewable energy marketplace and microgrid dashboard. **No real electricity is
transferred by this app** — all generation, consumption, pricing and trades
are simulated.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  main.jsx              # React entry point
  App.jsx                # Top-level app state, routing between pages/modals
  index.css               # Tailwind directives + font imports
  data/
    mockData.js            # Simulated houses, listings, chart data, source mix
    nav.js                  # Sidebar / bottom-nav item config
  utils/
    format.js                # Number/currency/time formatting helpers
  components/               # Reusable building blocks (cards, modals, nav, etc.)
    Landing.jsx
    Login.jsx
    Sidebar.jsx
    BottomNav.jsx
    TopBar.jsx
    FlowDiagram.jsx
    KpiCard.jsx
    LiveStatusCard.jsx
    GenerationChart.jsx
    MyEnergyCard.jsx
    Recommendations.jsx
    Modal.jsx
    SellModal.jsx
    BuyModal.jsx
    HouseModal.jsx
    CommunityMap.jsx
    Leaderboard.jsx
    ToastStack.jsx
    StatusDot.jsx
    SourceTag.jsx
  pages/                    # One file per main navigation screen
    DashboardPage.jsx
    MarketPage.jsx
    MyEnergyPage.jsx
    TransactionsPage.jsx
    CommunityPage.jsx
    ImpactPage.jsx
    ProfilePage.jsx
    AdminPage.jsx
```

## What actually works

- **Sell surplus energy** → creates a real marketplace listing, reduces your
  available surplus, shows a toast + notification.
- **Buy energy** → reduces the seller's listing, records a transaction,
  updates your balance, shows a success toast.
- **Marketplace filters** (price / availability / distance / source / search)
  actually filter the listing list.
- **Transactions** page reflects every buy/sell immediately, with running
  totals.
- **Community map** — click any house to see its live generation/consumption/
  surplus in a modal.
- **Notifications** — bell icon shows unread count; clicking a notification
  marks it read.
- **Live microgrid status** card ticks every ~4 seconds with small simulated
  fluctuations.
- Fully responsive: sidebar nav on desktop, bottom nav on mobile.

## Tech stack

React 18 + Vite, Tailwind CSS, Recharts, lucide-react. All data lives in
React state (see `src/data/mockData.js`) — no backend required.
