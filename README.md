# beauty salon AURA - Landing Page Demo

デモポートフォリオ用の美容サロン向けランディングページです。

## 概要

AI活用受託事業のポートフォリオの一部として実装された、モダンで高品質な美容サロンのランディングページ（LP）です。

## 技術スタック

- **HTML5** - セマンティックマークアップ
- **CSS3** - モダンレイアウト、レスポンシブデザイン
- **Vanilla JavaScript** - 軽量なインタラクション

## フロントエンド機能

- Google Fonts（Playfair Display、Noto Sans JP）
- Unsplash 画像ライセンス（フリー）
- ハンバーガーメニュー（モバイル対応）
- スティッキーヘッダー
- スムーズスクロール
- Google Maps 埋め込み
- レスポンシブデザイン（モバイルファースト）

## デザイン仕様

- **プライマリカラー**: #8B4513（サドルブラウン）
- **セカンダリカラー**: #D4A574（タン）
- **背景色**: #FFFAF0（フローラルホワイト）
- **コンテナ幅**: max-width 1200px
- **ブレークポイント**: 1024px（タブレット）、768px、640px（モバイル）

## ページセクション

1. **Header** - 固定ナビゲーション
2. **Hero** - ファーストビュー（背景画像、CTA）
3. **Services** - 4つのサービスカード（カット、カラー、パーマ、トリートメント）
4. **Stylists** - 3名のスタイリスト紹介
5. **Reviews** - 3件のお客様の声
6. **Pricing** - 料金表
7. **Access** - 店舗情報＋Google Maps
8. **Footer CTA** - 最終予約ボタン

## デプロイ

このプロジェクトはVercelでホスティングされています。

### ローカル実行

```bash
# ローカルサーバーで実行（Python）
python3 -m http.server 8000

# または Live Server（VS Code拡張機能）で実行
```

### デプロイ（Vercel）

```bash
# GitHub連携でVercelに自動デプロイ
# 以下のコマンドでデプロイ
vercel --prod
```

## ファイル構成

```
beauty-salon-lp/
├── index.html       # メインHTMLファイル
├── css/
│   └── style.css    # スタイルシート
├── js/
│   └── script.js    # JavaScriptロジック
└── README.md        # このファイル
```

## サロン情報（ダミーデータ）

- **サロン名**: beauty salon "AURA"
- **住所**: 東京都渋谷区道玄坂1-2-3
- **電話**: 03-XXXX-XXXX
- **営業時間**: 10:00-20:00（日曜15:00-19:00）
- **定休日**: 月曜日

※このサロンは架空の企業です。デモンストレーション目的で使用しています。

## ライセンス

このプロジェクトはデモポートフォリオです。

## 制作

**AI活用受託事業ポートフォリオ**  
制作者: koya@irohani.tech  
制作日: 2026年2月24日

---

**© 2026 beauty salon AURA. All rights reserved.**
