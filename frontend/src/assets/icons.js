import L from "leaflet";

const ICONSIZE = [64, 64];
const ICONANCHOR = [32, 32];
const POPUPANCHOR = [0, -16];

export const categoryMap = {
  1: "amerikkalainen_jalkapallo",
  2: "avantouinti",
  3: "biljardi",
  4: "golf",
  5: "jaakiekko",
  6: "jalkapallo",
  7: "juoksu",
  8: "keilaus",
  9: "koripallo",
  10: "lentopallo",
  11: "nyrkkeily",
  12: "padel",
  13: "pesapallo",
  14: "pingis",
  15: "puntti",
  16: "pyoraily",
  17: "sulkapallo",
  18: "tennis",
  19: "uinti",
};

export const selectIcon = (categoryID) => {
  const categoryMapping = categoryMap;
  return Icongroup[categoryMapping[categoryID]] || null;
};

// Voidaan käyttää traslation hakemisessa. Translatios sisältää avaimet näillä kategorianimillä
export const selectCategoryName = (categoryID) => {
  return categoryMap[categoryID] || "";
};

const Icongroup = {
  amerikkalainen_jalkapallo: L.icon({
    iconUrl: "/lajit/amerikkalainen_jalkapallo.png", // Tulee olla public-kansiossa
    iconSize: ICONSIZE, // Ikonin koko pixeleinä
    iconAnchor: ICONANCHOR, // Minkä verran offsettiä painalluskohdasta
    popupAnchor: POPUPANCHOR, // -""-
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  avantouinti: L.icon({
    iconUrl: "/lajit/avantouinti.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  biljardi: L.icon({
    iconUrl: "/lajit/biljardi.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  golf: L.icon({
    iconUrl: "/lajit/golf.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  jaakiekko: L.icon({
    iconUrl: "/lajit/jaakiekko.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  jalkapallo: L.icon({
    iconUrl: "/lajit/jalkapallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  juoksu: L.icon({
    iconUrl: "/lajit/juoksu.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  keilaus: L.icon({
    iconUrl: "/lajit/keilaus.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  koiralenkki: L.icon({
    iconUrl: "/lajit/koiralenkki.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  koripallo: L.icon({
    iconUrl: "/lajit/koripallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  lentopallo: L.icon({
    iconUrl: "/lajit/lentopallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  nyrkkeily: L.icon({
    iconUrl: "/lajit/nyrkkeily.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  padel: L.icon({
    iconUrl: "/lajit/padel.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  pesapallo: L.icon({
    iconUrl: "/lajit/pesapallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  pihapelit: L.icon({
    iconUrl: "/lajit/pihapelit.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  pingis: L.icon({
    iconUrl: "/lajit/pingis.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  puntti: L.icon({
    iconUrl: "/lajit/puntti.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  pyoraily: L.icon({
    iconUrl: "/lajit/pyoraily.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  sulkapallo: L.icon({
    iconUrl: "/lajit/sulkapallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  tennis: L.icon({
    iconUrl: "/lajit/tennis.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),

  uinti: L.icon({
    iconUrl: "/lajit/uinti.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
    shadowUrl: "/lajit/uusintaustapalloMusta.png", // Varjon polku
    shadowSize: [70, 70], // Varjon koko
    shadowAnchor: [34, 34], // Varjon ankkuripiste
  }),
};

export default { Icongroup, selectIcon };
