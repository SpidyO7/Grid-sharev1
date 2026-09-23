/* ============================================================================
   GridShare mock data layer — simulated generation, consumption & marketplace
   data for the prototype. Nothing here represents a real electricity grid.
   ========================================================================== */

const SOURCES = ["Rooftop Solar", "Rooftop Solar", "Rooftop Solar", "Biogas"];

const NAMES = [
  "Snehadri Bhattacharya", "Rina Das", "Manoj Gogoi", "Priya Sarma",
  "Arindam Baruah", "Kavita Deka", "Tridib Kalita", "Meera Nath",
  "Suman Chetia", "Anjali Phukan", "Rajib Saikia", "Deepa Bora",
];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function buildHouses() {
  const rnd = seededRandom(42);
  return NAMES.map((name, i) => {
    const houseNumber = 100 + i * 17 + Math.floor(rnd() * 7);
    const source = SOURCES[i % SOURCES.length];
    const capacity = source === "Biogas" ? 3 + rnd() * 2 : 4 + rnd() * 4;
    const generation = +(capacity * (0.55 + rnd() * 0.4)).toFixed(1);
    const consumption = +(3 + rnd() * 5).toFixed(1);
    const surplus = Math.max(0, +(generation - consumption).toFixed(1));
    const distance = +(0.2 + rnd() * 2.6).toFixed(1);
    const status = surplus > 1 ? "surplus" : surplus > 0 ? "balanced" : "deficit";
    return {
      id: `H${i + 1}`,
      name,
      houseNumber,
      role: i === 0 ? "prosumer" : "member",
      energySource: source,
      capacity: +capacity.toFixed(1),
      generation,
      consumption,
      surplus,
      status,
      distance,
      pos: { x: 8 + ((i * 137) % 84), y: 12 + ((i * 71) % 76) },
      totalShared: +(20 + rnd() * 40).toFixed(1),
      co2Avoided: +(10 + rnd() * 60).toFixed(1),
      earnings: +(80 + rnd() * 400).toFixed(2),
      balance: +(150 + rnd() * 300).toFixed(2),
    };
  });
}

export function buildListings(houses) {
  const rnd = seededRandom(7);
  return houses
    .filter((h) => h.id !== "H1" && h.surplus > 0.6)
    .map((h, i) => {
      const energyAmount = +(0.8 + rnd() * 3.5).toFixed(1);
      const base = h.energySource === "Biogas" ? 5.4 : 6.1;
      const pricePerKwh = +(base + rnd() * 1.4).toFixed(2);
      return {
        id: `L${i + 1}`,
        sellerId: h.id,
        houseNumber: h.houseNumber,
        energyAmount,
        remainingEnergy: energyAmount,
        pricePerKwh,
        source: h.energySource,
        distance: h.distance,
        status: "active",
        createdAt: Date.now() - Math.floor(rnd() * 3 * 3600 * 1000),
      };
    });
}

export function buildChartData24h() {
  // 24h realistic solar generation + double-hump consumption curve
  const data = [];
  for (let h = 0; h < 24; h++) {
    const solarShape = Math.max(0, Math.sin(((h - 6) / 12) * Math.PI));
    const generation = +(solarShape * 9.4 + (h > 5 && h < 20 ? 0.3 : 0)).toFixed(2);
    const morning = Math.exp(-Math.pow(h - 7.5, 2) / 3) * 4.2;
    const evening = Math.exp(-Math.pow(h - 19.5, 2) / 4) * 6.8;
    const base = 1.6;
    const consumption = +(base + morning + evening).toFixed(2);
    const surplus = +Math.max(0, generation - consumption).toFixed(2);
    data.push({
      time: `${h.toString().padStart(2, "0")}:00`,
      hour: h,
      generation,
      consumption,
      surplus,
    });
  }
  return data;
}

export function buildChartData7d() {
  const rnd = seededRandom(101);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((d) => ({
    time: d,
    generation: +(90 + rnd() * 60).toFixed(1),
    consumption: +(70 + rnd() * 40).toFixed(1),
    surplus: +(15 + rnd() * 30).toFixed(1),
  }));
}

export function buildChartData30d() {
  const rnd = seededRandom(202);
  return Array.from({ length: 30 }, (_, i) => ({
    time: `${i + 1}`,
    generation: +(85 + rnd() * 70).toFixed(1),
    consumption: +(65 + rnd() * 45).toFixed(1),
    surplus: +(10 + rnd() * 35).toFixed(1),
  }));
}

export const SOURCE_MIX = [
  { name: "Solar", value: 68, color: "#059669" },
  { name: "Biogas", value: 14, color: "#84cc16" },
  { name: "Grid", value: 12, color: "#94a3b8" },
  { name: "Other", value: 6, color: "#facc15" },
];

export const BADGES = ["Solar Pioneer", "Energy Contributor", "Green Champion", "Community Hero"];

export const INITIAL_HOUSES = buildHouses();
export const INITIAL_LISTINGS = buildListings(INITIAL_HOUSES);
export const CHART_DATA_24H = buildChartData24h();
export const CHART_DATA_7D = buildChartData7d();
export const CHART_DATA_30D = buildChartData30d();
