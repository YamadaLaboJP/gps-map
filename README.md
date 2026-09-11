# 現在地マップ (GPS Map)

シンプルな地図アプリケーション。ブラウザのGeolocation APIを使って現在地を取得し、OpenStreetMap上に表示します。

**公開URL:** https://dj8bit.github.io/gps-map/

## 機能

- 📍 現在地の自動取得と地図表示
- 🗺️ OpenStreetMap + Leafletによる地図表示
- 📱 モバイルフレンドリーなフルスクリーン表示
- ⚠️ 位置情報エラー時の日本語メッセージ表示
- 🔄 「現在地に移動」ボタンで再取得

## ローカルでの実行方法

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ブラウザで http://localhost:5173 を開く
```

## ビルド

```bash
npm run build
```

ビルド成果物は `dist/` フォルダに出力されます。

## GitHub Pages

`main` への push で GitHub Actions が Vite ビルドを実行し、[GitHub Pages](https://dj8bit.github.io/gps-map/) に公開します。手動実行する場合は Actions の **Deploy to GitHub Pages** ワークフローから Run workflow を選んでください。

## 技術スタック

- [Vite](https://vite.dev/) - ビルドツール
- [Leaflet](https://leafletjs.com/) - 地図ライブラリ
- [OpenStreetMap](https://www.openstreetmap.org/) - 地図タイル

## 注意事項

- 位置情報の取得にはHTTPS接続またはlocalhost環境が必要です
- 位置情報の利用許可をブラウザに求められます
- 位置情報が取得できない場合は東京（東京駅付近）がデフォルト表示されます

## ライセンス

MIT
