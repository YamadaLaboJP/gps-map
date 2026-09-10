import './style.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const TOKYO = { lat: 35.6812, lng: 139.7671 }
const DEFAULT_ZOOM = 15

const statusEl = document.getElementById('status')
const locateBtn = document.getElementById('locate-btn')

const map = L.map('map').setView([TOKYO.lat, TOKYO.lng], DEFAULT_ZOOM)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

let userMarker = null

function showStatus(message, type = 'info') {
  statusEl.textContent = message
  statusEl.className = type
  
  if (type === 'success') {
    setTimeout(() => {
      statusEl.className = 'hidden'
    }, 3000)
  }
}

function hideStatus() {
  statusEl.className = 'hidden'
}

function setLoading(loading) {
  locateBtn.disabled = loading
  locateBtn.textContent = loading ? '📍 取得中...' : '📍 現在地に移動'
}

function updateLocation(lat, lng) {
  if (userMarker) {
    userMarker.setLatLng([lat, lng])
  } else {
    userMarker = L.marker([lat, lng]).addTo(map)
    userMarker.bindPopup('現在地').openPopup()
  }
  map.setView([lat, lng], DEFAULT_ZOOM)
}

function getErrorMessage(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return '位置情報の取得が許可されていません。ブラウザの設定を確認してください。'
    case error.POSITION_UNAVAILABLE:
      return '位置情報を取得できませんでした。'
    case error.TIMEOUT:
      return '位置情報の取得がタイムアウトしました。'
    default:
      return '位置情報の取得中にエラーが発生しました。'
  }
}

function requestLocation() {
  if (!navigator.geolocation) {
    showStatus('お使いのブラウザは位置情報に対応していません。', 'error')
    return
  }

  setLoading(true)
  hideStatus()

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLoading(false)
      const { latitude, longitude } = position.coords
      updateLocation(latitude, longitude)
      showStatus('現在地を取得しました', 'success')
    },
    (error) => {
      setLoading(false)
      showStatus(getErrorMessage(error), 'error')
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    }
  )
}

locateBtn.addEventListener('click', requestLocation)

requestLocation()
