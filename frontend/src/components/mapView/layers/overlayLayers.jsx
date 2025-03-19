import L from "leaflet"

const createCustomOverlay = (className) =>
  L.Layer.extend({
    onAdd(map) {
      this._div = L.DomUtil.create("div", className)
      this._div.innerHTML = "</>"

      map.getPanes().overlayPane.appendChild(this._div)

      // Päivitä overlayn sijainti kartan mukana
      this._updatePosition(map)
      map.on("move", this._onMapMove, this)
    },

    onRemove(map) {
      if (this._div) {
        map.getPanes().overlayPane.removeChild(this._div)
      }
      map.off("move", this._onMapMove, this)
    },

    _onMapMove() {
      this._updatePosition(this._map)
    },

    _updatePosition(map) {
      const center = map.latLngToLayerPoint(map.getCenter())
      L.DomUtil.setPosition(this._div, center)
    },
  })

// Luo kolme erilaista overlayta
export const LiikaOverlay = createCustomOverlay("liika-layer")
export const DarkOverlay = createCustomOverlay("dark-layer")
export const UserOverlay = createCustomOverlay("user-layer")
