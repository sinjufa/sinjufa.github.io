# 新聚發建設 官網產生器 v2（2026-11-15 改版預覽）：python3 build_v2.py
# 輸出 site/（正式上線用，完整 HTML）與 preview_index.html（Claude 預覽用，無 doctype 外殼）
import pathlib

ROOT = pathlib.Path(__file__).parent
SITE = ROOT / "site_v2"

FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500&family=Noto+Serif+TC:wght@500;600&display=swap">'

CSS = """
/* 版面：無印式留白，單欄閱讀，圖片滿版，文字窄欄 */
:root{
  --green:#374836; --sand:#DFC4A6; --rice:#F3F0EA;
  --paper:#FAF8F4; --ink:#2A2E29; --mute:#6B7068; --line:#D9D3C7;
  --serif:"Noto Serif TC","Songti TC","PMingLiU",serif;
  --sans:"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif;
  color-scheme:light;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--rice);color:var(--ink);font:400 16px/1.9 var(--sans);letter-spacing:.04em}
img{max-width:100%;display:block;height:auto}
a{color:inherit}
a:focus-visible{outline:2px solid var(--green);outline-offset:3px}
.wrap{max-width:1080px;margin:0 auto;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}
.narrow{max-width:640px}
.wrap.narrow{max-width:1080px}
.wrap.narrow>*{max-width:640px}
header.site{background:var(--rice);border-bottom:1px solid var(--line)}
header.site .wrap{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 24px;padding-block:14px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none}
.brand img{width:44px;height:44px}
.brand span{font:500 15px/1 var(--serif);letter-spacing:.2em;color:var(--green)}
nav.main{display:flex;flex-wrap:wrap;gap:4px 22px;font-size:14px}
nav.main a{text-decoration:none;color:var(--mute);padding-block:4px;border-bottom:1px solid transparent}
nav.main a:hover,nav.main a[aria-current]{color:var(--green);border-bottom-color:var(--sand)}
h1,h2,h3{font-family:var(--serif);font-weight:600;color:var(--green);text-wrap:balance;letter-spacing:.08em;line-height:1.5;margin:0}
h1{font-size:clamp(28px,5vw,40px)}
h2{font-size:clamp(22px,3.4vw,28px)}
h3{font-size:18px}
p{margin:0}
.stack{display:flex;flex-direction:column;gap:20px}
section{padding-block:72px}
section+section{border-top:1px solid var(--line)}
.eyebrow{font-size:12px;letter-spacing:.3em;color:var(--mute)}
.jp{font-family:var(--serif);font-size:15px;color:var(--mute);letter-spacing:.12em}
.hero{background:var(--paper)}
.hero figure{margin:0}
.hero img{width:100%;max-height:560px;object-fit:cover}
.cap{font-size:12px;color:var(--mute);letter-spacing:.1em;padding-top:8px}
.hero .copy{padding-block:48px 8px}
.lead{font-family:var(--serif);font-size:clamp(18px,2.6vw,22px);color:var(--ink);line-height:2}
.three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px}
.three .k{font:600 34px/1 var(--serif);color:var(--green)}
.three .k::after{content:"";display:block;width:24px;height:1px;background:var(--sand);margin-top:16px}
@media (max-width:720px){.three{grid-template-columns:1fr;gap:28px}section{padding-block:56px}}
.feature{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:40px;align-items:center}
@media (max-width:720px){.feature{grid-template-columns:1fr;gap:24px}}
.btn{display:inline-block;align-self:flex-start;text-decoration:none;color:var(--green);border:1px solid var(--green);padding:10px 22px;font-size:14px;letter-spacing:.15em}
.btn:hover{background:var(--green);color:var(--rice)}
.band{background:var(--green);color:var(--rice)}
.band h2,.band h3{color:var(--rice)}
.band .eyebrow,.band .cap{color:var(--sand)}
.band .btn{color:var(--rice);border-color:var(--sand)}
.band .btn:hover{background:var(--sand);color:var(--green)}
dl.spec{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 32px;margin:0}
dl.spec div{display:flex;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line);padding-block:12px}
dl.spec dt{color:var(--mute);font-size:14px}
dl.spec dd{margin:0;text-align:right}
@media (max-width:600px){dl.spec{grid-template-columns:1fr}}
.units{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
@media (max-width:600px){.units{grid-template-columns:1fr}}
.unit{background:var(--paper);border:1px solid var(--line);padding:24px;display:flex;flex-direction:column;gap:6px}
.unit .tag{font-size:12px;color:var(--mute);letter-spacing:.2em}
.unit .no{font:600 22px/1.4 var(--serif);color:var(--green)}
.unit .num{font-variant-numeric:tabular-nums}
.gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.gallery figure{margin:0}
@media (max-width:600px){.gallery{grid-template-columns:1fr}}
.plans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.plans figure{margin:0;background:#fff;border:1px solid var(--line)}
@media (max-width:720px){.plans{grid-template-columns:1fr}}
.note{font-size:13px;color:var(--mute)}
dl.faq{margin:0;display:grid;gap:0}
dl.faq dt{font-family:var(--serif);font-weight:600;color:var(--green);padding-top:18px}
dl.faq dd{margin:0;padding-bottom:18px;border-bottom:1px solid var(--line)}
.todo{border:1px dashed var(--sand);background:var(--paper);color:var(--mute);padding:28px;text-align:center;font-size:14px}
ol.steps{list-style:none;margin:0;padding:0;display:grid;gap:0;counter-reset:s}
ol.steps li{counter-increment:s;display:grid;grid-template-columns:48px minmax(0,1fr);gap:12px;padding-block:18px;border-bottom:1px solid var(--line)}
ol.steps li::before{content:counter(s);font:600 22px/1.4 var(--serif);color:var(--sand)}
.story p{font-family:var(--serif);font-size:17px;line-height:2.2}
.story h2{font-size:20px;padding-top:24px}
.line-id{font:600 clamp(26px,5vw,36px)/1.3 var(--serif);color:var(--green);letter-spacing:.06em;user-select:all}
footer.site{border-top:1px solid var(--line);padding-block:40px;font-size:12px;color:var(--mute);letter-spacing:.1em}
footer.site .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px}
.full{width:100%;margin:0}
.full img{width:100%;max-height:78vh;object-fit:cover}
.intro{padding-block:64px 72px}
details.fold{border-bottom:1px solid var(--line)}
details.fold:first-child{border-top:1px solid var(--line)}
details.fold summary{cursor:pointer;list-style:none;padding:18px 0;font-family:var(--serif);font-weight:600;color:var(--green);display:flex;justify-content:space-between}
details.fold summary::-webkit-details-marker{display:none}
details.fold summary::after{content:"＋";color:var(--sand)}
details.fold[open] summary::after{content:"－"}
details.fold>div{padding-bottom:24px}
.pics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.pics figure{margin:0}.pics img{width:100%;aspect-ratio:4/3;object-fit:cover}
@media (max-width:600px){.pics{grid-template-columns:1fr}}
.zoom{display:grid;gap:40px}.zoom figure{margin:0;background:#fff;border:1px solid var(--line)}.zoom a{display:block;cursor:zoom-in}.zoom figcaption{padding:10px 14px;font-size:13px;color:var(--mute);border-top:1px solid var(--line);background:var(--paper)}
.navs{display:flex;flex-direction:column;align-items:flex-end;gap:6px}nav.lang{font-size:12px;color:var(--mute);letter-spacing:.1em}nav.lang a{text-decoration:none;color:var(--mute)}nav.lang a:hover{color:var(--green)}nav.lang [aria-current]{color:var(--green);font-weight:500}\n@media (max-width:720px){.navs{align-items:flex-start;width:100%}}\nfooter.site .line{font:600 20px/1.4 var(--serif);color:var(--green);letter-spacing:.08em;text-decoration:none}
footer.site .contact{display:flex;flex-direction:column;gap:12px;align-items:flex-start}
@media (prefers-reduced-motion:no-preference){.btn,nav.main a{transition:color .2s,background .2s,border-color .2s}}
"""

exec(open(ROOT / "i18n.py", encoding="utf-8").read())
ORDER = ["works", "plans", "renders", "story", "service"]
LANGS = {"zh": ("", "zh-Hant-TW", "繁中", "zh_TW"), "en": ("en/", "en", "EN", "en_US"), "ja": ("ja/", "ja", "日本語", "ja_JP")}
LINE_URL = "https://line.me/ti/p/~tim0108"


def fname(key):
    return "index.html" if key == "index" else f"{key}.html"


def rel(src, dst, key):
    # 從 src 語言的某頁，連到 dst 語言同一頁的相對路徑
    up = "../" if LANGS[src][0] else ""
    return up + LANGS[dst][0] + fname(key)


def header(cur, lang="zh"):
    ui = UI[lang]
    links = "".join(f'<a href="{fname(k)}"{" aria-current=\"page\"" if k == cur else ""}>{ui["nav"][k]}</a>' for k in ORDER)
    sw = "｜".join((f'<span aria-current="true">{LANGS[l][2]}</span>' if l == lang else
                   f'<a href="{rel(lang, l, cur)}" lang="{LANGS[l][1]}" hreflang="{LANGS[l][1]}">{LANGS[l][2]}</a>') for l in LANGS)
    up = "../" if LANGS[lang][0] else ""
    return (f'<header class="site"><div class="wrap"><a class="brand" href="./" aria-label="{ui["home"]}">'
            f'<img src="{up}assets/logo.png" alt="新聚發建設 LOGO" width="44" height="44"><span>新聚發建設</span></a>'
            f'<div class="navs"><nav class="lang" aria-label="Language">{sw}</nav>'
            f'<nav class="main" aria-label="Menu">{links}</nav></div></div></header>')


def footer(lang="zh"):
    ui = UI[lang]
    note = f'<p class="note" style="flex-basis:100%">{ui["note"]}</p>' if ui["note"] else ""
    return (f'<footer class="site"><div class="wrap">'
            f'<div class="contact"><span class="eyebrow">{ui["contact"]}</span>'
            f'<a class="line" href="{LINE_URL}" target="_blank" rel="noopener">LINE：tim0108</a>'
            f'<a class="btn" href="{LINE_URL}" target="_blank" rel="noopener">{ui["book"]}</a></div>'
            f'<span style="align-self:flex-end">{ui["company"]}<br>{ui["phone"]} 04-2232-5169｜{ui["tag"]}</span>{note}'
            f'</div></footer>')


PAGES = {}

PAGES["index"] = ("新聚發建設｜台中北屯建設公司・聚社區電梯透天", "新聚發建設是台中北屯區的建設公司。第一個作品「聚社區」是全新完工的電梯透天新成屋，附電動車充電樁，步行約 3 分鐘到太原車站。", """
<figure class="full"><img src="assets/garden_day.jpg" alt="聚社區 社區巷道與松樹庭園" width="1800" height="1134"></figure>
<section class="intro"><div class="wrap narrow stack">
<p class="eyebrow">台中北屯｜建設公司</p><h1>聚，一家人的日常。</h1><p class="jp">家族が集う、いつもの日々。</p>
<p class="lead">我們是新聚發建設。戶數不多，把力氣留給每一處細節。<br>只蓋讓一家人，每天晚上都想回來的房子。</p>
</div></section>
<section><div class="wrap feature">
<figure style="margin:0"><img src="assets/facade.jpg" alt="聚社區外觀實景" width="1406" height="1800" loading="lazy"><figcaption class="cap">聚社區｜實景拍攝</figcaption></figure>
<div class="stack"><p class="eyebrow">第一個作品</p><h2>聚社區</h2>
<p>台中北屯・電梯透天別墅・全新完工。<br>步行約 3 分鐘到太原車站。</p>
<a class="btn" href="works.html">看聚社區</a></div></div></section>""")

PAGES["works"] = ("聚社區｜台中北屯電梯透天新成屋・太原車站・店面｜新聚發建設", "聚社區位於台中市北屯區北安街，全新完工電梯透天別墅（新成屋），設電動車充電樁，5 房 6 衛含 3 間套房、一樓平面雙車位、約 6 米面寬。步行約 3 分鐘到太原車站，臨 10 米路店面可開業。價格歡迎洽詢。", """
<figure class="full"><img src="assets/entrance.jpg" alt="聚社區 社區入口與庭園" width="1800" height="1078"></figure>
<section class="intro"><div class="wrap narrow stack">
<p class="eyebrow">作品 01｜台中市北屯區北安街</p><h1>聚社區</h1>
<p class="lead">電梯透天別墅，全新完工。<br>太原車站走路約 3 分鐘。</p></div></section>

<section><div class="wrap stack" style="gap:12px">
<div class="pics">
<figure><img src="assets/facade.jpg" alt="聚社區外觀實景" width="1406" height="1800" loading="lazy"></figure>
<figure><img src="assets/lane_night.jpg" alt="聚社區 夜間巷道" width="1687" height="1800" loading="lazy"></figure>
<figure><img src="assets/garden_night.jpg" alt="聚社區 夜間庭園松樹" width="1800" height="1215" loading="lazy"></figure>
<figure><img src="assets/lane_day.jpg" alt="聚社區 白天巷道" width="1800" height="1350" loading="lazy"></figure>
</div><p class="cap">以上皆為實景拍攝</p></div></section>

<section><div class="wrap stack" style="gap:32px">
<div class="stack narrow"><p class="eyebrow">目前在售</p><h2>店鋪 2 戶・住宅 2 戶</h2><p>價格歡迎洽詢。</p></div>
<div class="units">
<div class="unit"><p class="tag">臨 10 米路｜店鋪・可開業</p><p class="no">10 號</p><p class="num">地坪約 33 坪・建坪約 100 坪</p></div>
<div class="unit"><p class="tag">臨 10 米路｜店鋪・可開業</p><p class="no">8 號</p><p class="num">地坪約 25 坪・建坪約 100 坪</p></div>
<div class="unit"><p class="tag">社區內｜住宅</p><p class="no">6-3 號</p><p class="num">地坪約 42 坪・建坪約 113 坪</p></div>
<div class="unit"><p class="tag">社區內｜住宅</p><p class="no">2-1 號</p><p class="num">地坪約 40 坪・建坪約 112 坪</p></div>
</div>
<dl class="spec">
<div><dt>格局</dt><dd>5 房 6 衛（含 3 間套房）</dd></div>
<div><dt>樓層</dt><dd>地上 5 層＋屋突</dd></div>
<div><dt>車位</dt><dd>一樓平面雙車位</dd></div>
<div><dt>設備</dt><dd>電梯・電動車充電樁</dd></div>
</dl></div></section>

<section><div class="wrap feature" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:16px">
<a class="unit" href="plans.html" style="text-decoration:none"><p class="tag">D2 戶型｜1F～屋頂</p><p class="no">格局圖 →</p><p>點圖可放大</p></a>
<a class="unit" href="renders.html" style="text-decoration:none"><p class="tag">模擬示意</p><p class="no">3D 外觀圖 →</p><p>店鋪與社區內住宅</p></a>
</div></section>

<section><div class="wrap stack" style="gap:24px">
<div class="stack narrow"><p class="eyebrow">位置</p><h2>離車站近，離家人也近。</h2>
<p>太原車站步行約 3 分鐘｜高鐵台中站搭台鐵約 15 分鐘｜學區：北屯國小・三光國中</p></div>
<figure style="margin:0"><picture><source media="(max-width:720px)" srcset="assets/map_tall.jpg"><img src="assets/map_wide.jpg" alt="聚社區位置圖：太原車站、三光國中、北屯國小、北屯市場、74 快速道路、老人復健綜合醫院" width="1920" height="1080" loading="lazy"></picture><figcaption class="cap">位置示意圖，非實際比例｜地圖資料 © OpenStreetMap 貢獻者｜時間為約略值</figcaption></figure></div></section>

<section><div class="wrap narrow stack" style="gap:0">
<details class="fold"><summary>完整規格</summary><div><dl class="spec" style="grid-template-columns:1fr">
<div><dt>面寬</dt><dd>約 6 米</dd></div><div><dt>電梯</dt><dd>永大電梯</dd></div><div><dt>衛浴</dt><dd>TOTO</dd></div><div><dt>建材</dt><dd>花崗岩</dd></div>
<div><dt>建築設計</dt><dd>嵐建築師事務所</dd></div></dl></div></details>
<details class="fold"><summary>生活機能</summary><div><dl class="spec" style="grid-template-columns:1fr">
<div><dt>74 快速道路</dt><dd>開車約 7 分鐘</dd></div>
<div><dt>臺中市立老人復健綜合醫院（中國醫藥大學經營）</dt><dd>開車約 10 分鐘</dd></div>
<div><dt>Costco 北台中店</dt><dd>開車約 10 分鐘</dd></div>
<div><dt>漢神洲際百貨</dt><dd>開車約 15 分鐘</dd></div>
<div><dt>商圈</dt><dd>太原路・昌平路・北屯路</dd></div></dl></div></details>
<details class="fold"><summary>常見問題</summary><div><dl class="faq"><dt>是新成屋嗎？</dt><dd>是。聚社區已全新完工，可以預約直接看實屋。</dd><dt>有電動車充電樁嗎？</dt><dd>有。聚社區設有電動車充電樁，一樓為平面雙車位。</dd><dt>店面可以做生意嗎？</dt><dd>臨 10 米路的 8 號、10 號為店鋪，可開業，適合店住合一。</dd><dt>學區是哪裡？</dt><dd>北屯國小、三光國中（北興里全里劃入學區）。</dd><dt>價格多少？</dt><dd>價格歡迎洽詢，請用 LINE 聯絡：tim0108。</dd></dl></div></details>
</div></section>""")


PAGES["plans"] = ("格局圖｜聚社區 D2 戶型 5 房 6 衛電梯透天｜新聚發建設", "聚社區 D2 戶型格局圖：1 樓雙車位、5 房 6 衛含 3 間套房、地上 5 層＋屋突。點圖可放大，格局以合約圖說為準。", """
<section><div class="wrap narrow stack" style="gap:16px">
<p class="eyebrow">聚社區｜D2 戶型</p><h1>格局圖</h1>
<p>點圖片可以開大圖，手機可用兩指放大。</p>
<p class="note">格局圖以合約圖說為準。家具配置為示意。</p></div></section>
<section style="padding-top:0"><div class="wrap narrow zoom">
<figure><a href="assets/plan_1f2f.jpg" target="_blank" rel="noopener"><img src="assets/plan_1f2f.jpg" alt="聚社區 1 樓、2 樓格局圖" width="1080" height="1350"></a><figcaption>1F・2F｜點圖放大</figcaption></figure>
<figure><a href="assets/plan_3f4f.jpg" target="_blank" rel="noopener"><img src="assets/plan_3f4f.jpg" alt="聚社區 3 樓、4 樓格局圖" width="1080" height="1350" loading="lazy"></a><figcaption>3F・4F｜點圖放大</figcaption></figure>
<figure><a href="assets/plan_5fr.jpg" target="_blank" rel="noopener"><img src="assets/plan_5fr.jpg" alt="聚社區 5 樓、屋頂格局圖" width="1080" height="1350" loading="lazy"></a><figcaption>5F・屋頂｜點圖放大</figcaption></figure>
<a class="btn" href="works.html">← 回聚社區</a>
</div></section>""")

PAGES["renders"] = ("3D 外觀圖｜聚社區 台中北屯電梯透天｜新聚發建設", "聚社區 3D 外觀模擬圖：臨 10 米路店鋪、社區內住宅與入口。3D 圖為模擬示意。", """
<section><div class="wrap narrow stack" style="gap:16px">
<p class="eyebrow">聚社區</p><h1>3D 外觀圖</h1>
<p>點圖片可以開大圖。</p>
<p class="note">3D 圖為模擬示意，實際以現場與合約圖說為準。</p></div></section>
<section style="padding-top:0"><div class="wrap zoom">
<figure><a href="assets/render_shop.jpg" target="_blank" rel="noopener"><img src="assets/render_shop.jpg" alt="聚社區 臨路店鋪 3D 圖" width="1080" height="640"></a><figcaption>臨 10 米路店鋪｜3D 模擬示意</figcaption></figure>
<figure><a href="assets/render_court.jpg" target="_blank" rel="noopener"><img src="assets/render_court.jpg" alt="聚社區 社區內住宅 3D 圖" width="1080" height="640" loading="lazy"></a><figcaption>社區內住宅｜3D 模擬示意</figcaption></figure>
<figure><a href="assets/render_entry.jpg" target="_blank" rel="noopener"><img src="assets/render_entry.jpg" alt="聚社區 入口 3D 圖" width="1080" height="560" loading="lazy"></a><figcaption>社區入口｜3D 模擬示意</figcaption></figure>
<a class="btn" href="works.html">← 回聚社區</a>
</div></section>""")

PAGES["story"] = ("品牌故事｜新聚發建設 台中北屯", "一天的辛苦，都是為了晚上這一桌。台中北屯建設公司「新聚發建設」的品牌故事：少、細、聚。", """
<figure class="full"><img src="assets/garden_night.jpg" alt="聚社區 夜晚庭園" width="1800" height="1215"></figure>
<section><div class="wrap narrow stack story">
<p class="eyebrow">品牌故事</p><h1>一天的辛苦，<br>都是為了晚上這一桌。</h1>
<h2>聚，在名字的正中間</h2>
<p>新，是開始。發，是福氣。但我們最在乎的，是中間那個字。一家人，每天晚上，回到同一張桌子。</p>
<h2>一位老師傅</h2>
<p>他蓋了一輩子房子，卻常常趕不上家裡的晚餐。後來他換了一種蓋法：先想晚上，再畫圖。長輩不必和樓梯計較，所以有電梯；每一代都要自己的空間，所以有三間套房。</p>
<p>牆裡的管線、磁磚的縫，他都蹲下來看。「我自己也會想住。」</p>
<h2>三種顏色</h2>
<p>深綠，是傍晚樹影的顏色。沙金，是晚餐亮起的那盞燈。米白，是剛煮好的一鍋白飯。</p>
<p style="padding-top:16px">聚，一家人的日常。<br><span class="jp">家族が集う、いつもの日々。</span></p>
</div></section>""")

PAGES["service"] = ("售後服務｜新聚發建設 台中北屯", "交屋之後，有問題拍照用 LINE 傳給我們，2 個工作天內回覆。", """
<section><div class="wrap narrow stack" style="gap:28px">
<p class="eyebrow">售後服務</p><h1>交屋之後，<br>我們還在。</h1>
<ol class="steps">
<li><div><h3>拍照</h3><p>拍下有問題的地方，說明位置與狀況。</p></div></li>
<li><div><h3>LINE 傳給我們</h3><p>LINE：tim0108</p></div></li>
<li><div><h3>2 個工作天內回覆</h3><p>我們會回覆處理方式，並和您約時間。</p></div></li>
</ol></div></section>""")

BASE_URL = "https://sinjufa.github.io/"
ORG_LD = {"@context": "https://schema.org", "@type": "Organization", "name": "新聚發建設股份有限公司",
          "alternateName": ["新聚發建設", "SINJUFA CONSTRUCTION CO., LTD"], "url": BASE_URL,
          "logo": BASE_URL + "assets/logo.png", "telephone": "+886-4-2232-5169", "email": "sinjufa@gmail.com",
          "foundingDate": "2021", "taxID": "90486525",
          "address": {"@type": "PostalAddress", "streetAddress": "天祥街228-7號", "addressLocality": "北區",
                      "addressRegion": "臺中市", "addressCountry": "TW"}}
WORKS_LD = {"@context": "https://schema.org", "@type": "Residence", "name": "聚社區",
            "description": "台中北屯電梯透天別墅，全新完工，步行約 3 分鐘到太原車站。",
            "url": BASE_URL + "works.html", "image": BASE_URL + "assets/facade.jpg",
            "address": {"@type": "PostalAddress", "streetAddress": "北安街", "addressLocality": "北屯區",
                        "addressRegion": "臺中市", "addressCountry": "TW"},
            "geo": {"@type": "GeoCoordinates", "latitude": 24.163694, "longitude": 120.698094}}


FAQ_LD = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{'@type': 'Question', 'name': '聚社區在哪裡？', 'acceptedAnswer': {'@type': 'Answer', 'text': '台中市北屯區北安街（北興里），步行約 3 分鐘到台鐵太原車站，搭台鐵約 15 分鐘到高鐵台中站，開車約 7 分鐘上 74 快速道路。'}}, {'@type': 'Question', 'name': '是新成屋嗎？', 'acceptedAnswer': {'@type': 'Answer', 'text': '是。聚社區已全新完工，可以預約直接看實屋。'}}, {'@type': 'Question', 'name': '有電動車充電樁嗎？', 'acceptedAnswer': {'@type': 'Answer', 'text': '有。聚社區設有電動車充電樁，一樓為平面雙車位。'}}, {'@type': 'Question', 'name': '店面可以做生意嗎？', 'acceptedAnswer': {'@type': 'Answer', 'text': '臨 10 米路的 8 號、10 號為店鋪，可開業，適合店住合一。'}}, {'@type': 'Question', 'name': '學區是哪裡？', 'acceptedAnswer': {'@type': 'Answer', 'text': '北屯國小、三光國中（北興里全里劃入學區）。'}}, {'@type': 'Question', 'name': '價格多少？', 'acceptedAnswer': {'@type': 'Answer', 'text': '價格歡迎洽詢，請用 LINE 聯絡：tim0108。'}}]}

KEYWORDS = "台中,北屯,北屯區,台中透天,北屯透天,電梯透天,透天別墅,新成屋,北屯新成屋,太原車站,太原車站透天,北屯店面,店住合一,充電樁,電動車,雙車位,三光國中,北屯國小,新聚發建設,聚社區,台中 一戸建て,新築,太原駅"


def page_url(key, lang="zh"):
    p = LANGS[lang][0] + ("" if key == "index" else f"{key}.html")
    return BASE_URL + p


def fix_assets(html, lang):
    if not LANGS[lang][0]:
        return html
    for a in ('src="assets/', 'href="assets/', 'srcset="assets/'):
        html = html.replace(a, a.replace("assets/", "../assets/"))
    return html


def full(key, title, desc, body, lang="zh"):
    import json
    url = page_url(key, lang)
    img = BASE_URL + ("assets/entrance.jpg" if key == "works" else "assets/garden_day.jpg")
    lds = [ORG_LD] + ([WORKS_LD] + ([FAQ_LD] if lang == "zh" else []) if key == "works" else [])
    ld = "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in lds)
    alt = "".join(f'<link rel="alternate" hreflang="{LANGS[l][1]}" href="{page_url(key, l)}">' for l in LANGS)
    alt += f'<link rel="alternate" hreflang="x-default" href="{page_url(key, "zh")}">'
    up = "../" if LANGS[lang][0] else ""
    kw = f'<meta name="keywords" content="{KEYWORDS}">' if lang == "zh" else ""
    return (f'<!doctype html><html lang="{LANGS[lang][1]}"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
            f'<meta name="google-site-verification" content="omOODyRiy1-LgXparDs0G9Vi0wbMmfsLvm_B5a5UhSU">'
            f'<title>{title}</title><meta name="description" content="{desc}">{kw}'
            f'<link rel="canonical" href="{url}">{alt}<link rel="icon" href="{up}assets/logo.png">'
            f'<meta property="og:type" content="website"><meta property="og:site_name" content="新聚發建設">'
            f'<meta property="og:locale" content="{LANGS[lang][3]}"><meta property="og:url" content="{url}">'
            f'<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">'
            f'<meta property="og:image" content="{img}"><meta name="twitter:card" content="summary_large_image">'
            f'{ld}{FONTS}<style>{CSS}</style></head><body>{header(key, lang)}<main>{fix_assets(body, lang)}</main>{footer(lang)}</body></html>')


def preview(key, title, desc, body):
    return (f'<title>新聚發建設官網</title><meta name="claude:viewport-fit-sides" content="cover">'
            f'{FONTS}<style>{CSS}</style>{header(key)}<main>{body}</main>{footer()}')


ALL = {"zh": PAGES, "en": T["en"], "ja": T["ja"]}
for lang, pages in ALL.items():
    d = SITE / LANGS[lang][0]
    d.mkdir(parents=True, exist_ok=True)
    for key, (title, desc, body) in pages.items():
        (d / fname(key)).write_text(full(key, title, desc, body, lang), encoding="utf-8")
# 舊的單頁日文網址導到新日文首頁
(SITE / "ja.html").write_text('<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>聚社區｜日本語</title><link rel="canonical" href="https://sinjufa.github.io/ja/"><meta http-equiv="refresh" content="0; url=ja/"><meta name="robots" content="noindex"></head><body><a href="ja/">日本語ページへ</a></body></html>', encoding="utf-8")
import datetime
today = datetime.date.today().isoformat()
(SITE / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(
    f"  <url><loc>{page_url(k, l)}</loc><lastmod>{today}</lastmod></url>\n" for l in ALL for k in ALL[l]) + "</urlset>\n", encoding="utf-8")
(SITE / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {BASE_URL}sitemap.xml\n", encoding="utf-8")
(ROOT / "preview_v2_index.html").write_text(preview("index", *PAGES["index"]), encoding="utf-8")
print("ok")
