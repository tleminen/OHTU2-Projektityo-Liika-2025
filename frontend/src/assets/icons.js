import L from "leaflet"

const ICONSIZE = [64, 64]
const ICONANCHOR = [32, 32]
const POPUPANCHOR = [0, -16]

export const selectIcon = (categoryID) => {
  const categoryMap = {
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
  }

  return Icongroup[categoryMap[categoryID]] || null
}

const Icongroup = {
  amerikkalainen_jalkapallo: L.icon({
    iconUrl: "/lajit/amerikkalainen_jalkapallo.png", // Tulee olla public-kansiossa
    iconSize: ICONSIZE, // Ikonin koko pixeleinä
    iconAnchor: ICONANCHOR, // Minkä verran offsettiä painalluskohdasta
    popupAnchor: POPUPANCHOR, // -""-
  }),

  avantouinti: L.icon({
    iconUrl: "/lajit/avantouinti.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  biljardi: L.icon({
    iconUrl: "/lajit/biljardi.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  golf: L.icon({
    iconUrl: "/lajit/golf.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  jaakiekko: L.icon({
    iconUrl: "/lajit/jaakiekko.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  jalkapallo: L.icon({
    iconUrl: "/lajit/jalkapallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  juoksu: L.icon({
    iconUrl: "/lajit/juoksu.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  keilaus: L.icon({
    iconUrl: "/lajit/keilaus.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  koripallo: L.icon({
    iconUrl: "/lajit/koripallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  lentopallo: L.icon({
    iconUrl: "/lajit/lentopallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  nyrkkeily: L.icon({
    iconUrl: "/lajit/nyrkkeily.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  padel: L.icon({
    iconUrl: "/lajit/padel.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  pesapallo: L.icon({
    iconUrl: "/lajit/pesapallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  pingis: L.icon({
    iconUrl: "/lajit/pingis.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  puntti: L.icon({
    iconUrl: "/lajit/puntti.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  pyoraily: L.icon({
    iconUrl: "/lajit/pyoraily.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  sulkapallo: L.icon({
    iconUrl: "/lajit/sulkapallo.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  tennis: L.icon({
    iconUrl: "/lajit/tennis.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),

  uinti: L.icon({
    iconUrl: "/lajit/uinti.png",
    iconSize: ICONSIZE,
    iconAnchor: ICONANCHOR,
    popupAnchor: POPUPANCHOR,
  }),
}

export default { Icongroup, selectIcon }
