# 新聚發建設 官網產生器：python3 build.py
# 輸出 site/（正式上線用，完整 HTML）與 preview_index.html（Claude 預覽用，無 doctype 外殼）
import pathlib

ROOT = pathlib.Path(__file__).parent
SITE = ROOT / "site"

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
.todo{border:1px dashed var(--sand);background:var(--paper);color:var(--mute);padding:28px;text-align:center;font-size:14px}
ol.steps{list-style:none;margin:0;padding:0;display:grid;gap:0;counter-reset:s}
ol.steps li{counter-increment:s;display:grid;grid-template-columns:48px minmax(0,1fr);gap:12px;padding-block:18px;border-bottom:1px solid var(--line)}
ol.steps li::before{content:counter(s);font:600 22px/1.4 var(--serif);color:var(--sand)}
.story p{font-family:var(--serif);font-size:17px;line-height:2.2}
.story h2{font-size:20px;padding-top:24px}
.line-id{font:600 clamp(26px,5vw,36px)/1.3 var(--serif);color:var(--green);letter-spacing:.06em;user-select:all}
footer.site{border-top:1px solid var(--line);padding-block:40px;font-size:12px;color:var(--mute);letter-spacing:.1em}
footer.site .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px}
@media (prefers-reduced-motion:no-preference){.btn,nav.main a{transition:color .2s,background .2s,border-color .2s}}
"""

NAV = [("./", "首頁", "index"), ("story.html", "品牌故事", "story"), ("works.html", "作品", "works"),
       ("service.html", "售後服務", "service"), ("contact.html", "聯絡我們", "contact")]


def header(cur):
    links = "".join(
        f'<a href="{h}"{" aria-current=\"page\"" if k == cur else ""}>{t}</a>' for h, t, k in NAV if k != "index")
    return (f'<header class="site"><div class="wrap"><a class="brand" href="./" aria-label="新聚發建設 首頁">'
            f'<img src="assets/logo.png" alt="新聚發建設 LOGO" width="44" height="44"><span>新聚發建設</span></a>'
            f'<nav class="main" aria-label="主選單">{links}</nav></div></header>')


FOOTER = ('<footer class="site"><div class="wrap"><span>新聚發建設股份有限公司｜創立於 2021 年｜統一編號 90486525<br>'
          '台中市北區天祥街 228-7 號｜電話 04-2232-5169｜sinjufa@gmail.com</span>'
          '<span>聚，一家人的日常。</span></div></footer>')

LINE_CTA = '''<section class="band"><div class="wrap narrow stack">
<p class="eyebrow">預約看屋</p><h2>想來看看，先跟阿廷說一聲。</h2>
<p>阿廷｜LINE：tim0108</p><a class="btn" href="contact.html">聯絡方式</a></div></section>'''

PAGES = {}

PAGES["index"] = ("新聚發建設｜台中北屯建設公司・聚社區電梯透天", "新聚發建設是台中北屯的建設公司。第一個作品「聚社區」是全新完工的電梯透天別墅，步行約 3 分鐘到太原車站，搭台鐵約 15 分鐘到高鐵台中站。", f'''
<section class="hero" style="padding-block:0"><div class="wrap" style="padding-top:24px">
<figure><img src="assets/photo_front.jpg" alt="聚社區外觀" width="1080" height="821"><figcaption class="cap">聚社區｜實景拍攝</figcaption></figure>
<div class="copy stack narrow" style="padding-bottom:64px">
<p class="eyebrow">台中北屯｜建設公司</p><h1>聚，一家人的日常。</h1><p class="jp">家族が集う、いつもの日々。</p>
<p class="lead">一天的辛苦，都是為了晚上這一桌。</p></div></div></section>

<section><div class="wrap stack" style="gap:40px">
<div class="stack narrow"><p class="eyebrow">我們在意的三件事</p><h2>少・細・聚</h2></div>
<div class="three">
<div class="stack"><p class="k">少</p><p>只做該做的。戶數不多，把力氣留給每一處細節。</p></div>
<div class="stack"><p class="k">細</p><p>看不見的地方不省。牆裡的管線、磁磚的縫，都蹲下來看。</p></div>
<div class="stack"><p class="k">聚</p><p>讓一家人，每天晚上都想回來。</p></div>
</div></div></section>

<section><div class="wrap feature">
<figure style="margin:0"><img src="assets/render_court.jpg" alt="聚社區 社區內住宅 3D 圖" width="1080" height="640"><figcaption class="cap">3D 模擬示意</figcaption></figure>
<div class="stack"><p class="eyebrow">第一個作品</p><h2>聚社區</h2>
<p>台中北屯・電梯透天別墅・全新完工。<br>步行約 3 分鐘到太原車站，搭台鐵約 15 分鐘到高鐵台中站。</p>
<a class="btn" href="works.html">看聚社區</a></div></div></section>

<section><div class="wrap narrow stack">
<p class="eyebrow">品牌故事</p><h2>聚，在名字的正中間。</h2>
<p>新，是開始。發，是福氣。但我們最在乎的，是中間那個字。一家人，每天晚上，回到同一張桌子。</p>
<a class="btn" href="story.html">讀完整故事</a></div></section>
{LINE_CTA}''')

STORY = [
    ("晚上七點", ["晚上七點，巷口的燈一盞一盞亮起。爸爸停好車，媽媽把湯端上桌。阿嬤坐在老位子，等孫子下樓。", "一天的辛苦，都是為了這一刻。"]),
    ("一位老師傅", ["我們心裡，一直住著一位老師傅。", "他蓋了一輩子房子。天還沒亮就出門，回到家，桌上的菜已經涼了。",
               "有一年過年，他終於早一點回家。一家人，卻圍不滿一張桌子。兒子在外地，孫子在另一座城市，父親的房間空著。",
               "那天晚上，他想了很久。房子蓋了那麼多，卻沒有一間，讓一家人晚上想回來。"]),
    ("為了晚上這一桌", ["後來，他換了一種蓋法。先想晚上，再畫圖。",
                  "長輩累了一天，不必再和樓梯計較，所以有一部電梯。每一代都需要自己的空間，所以有三間套房。關上門各自休息，打開門就是一家人。下班的人不想繞圈找車位，所以一樓有平面雙車位。在外地工作的孩子，下了火車，走約 3 分鐘就到太原車站旁的家。"]),
    ("看不見的地方", ["他每天都到現場。牆裡的管線，他看。磁磚的縫，他蹲下來看。", "有人問他：「客人又看不到，何必？」他只說一句：「我自己也會想住。」",
                "看不見的地方不省，是他最在意的事。"]),
    ("聚，在名字的正中間", ["新聚發。「聚」，我們放在正中間。", "新，是開始。發，是福氣。但我們最在乎的，是中間那個字。", "一家人，每天晚上，回到同一張桌子。"]),
    ("三種顏色", ["深綠，是傍晚院子裡樹影的顏色。忙了一天，看見它，就知道快到家了。", "沙金，是晚餐時亮起的那盞燈。米白，是剛煮好的一鍋白飯。",
              "我們把這三種顏色，放進每一個看得見的地方。"]),
    ("第一個作品", ["聚社區，是新聚發建設的第一個作品。", "戶數不多。我們寧可少蓋一點，把每一處做細。",
               "少，是只做該做的。細，是看不見的地方也不省。聚，是讓一家人，每天晚上都想回來。"]),
]
story_html = "".join(f"<h2>{h}</h2>" + "".join(f"<p>{p}</p>" for p in ps) for h, ps in STORY)
PAGES["story"] = ("品牌故事｜新聚發建設 台中北屯", "一天的辛苦，都是為了晚上這一桌。台中北屯建設公司「新聚發建設」的品牌故事：少、細、聚。", f'''
<section><div class="wrap narrow stack story">
<p class="eyebrow">品牌故事</p><h1>一天的辛苦，<br>都是為了晚上這一桌。</h1>
{story_html}
<p style="padding-top:24px">聚，一家人的日常。<br><span class="jp">家族が集う、いつもの日々。</span></p>
<p>萃聚一堂，福澤綿長。</p></div></section>
{LINE_CTA}''')

PAGES["works"] = ("聚社區｜台中北屯太原車站電梯透天別墅・店面｜新聚發建設", "聚社區位於台中市北屯區北安街，全新完工電梯透天別墅，5 房 6 衛含 3 間套房、一樓平面雙車位、約 6 米面寬。步行約 3 分鐘到太原車站，臨 10 米路店面可開業。價格歡迎洽詢。", f'''
<section class="hero" style="padding-block:0"><div class="wrap" style="padding-top:24px">
<figure><img src="assets/render_shop.jpg" alt="聚社區 臨路店鋪 3D 圖" width="1080" height="640"><figcaption class="cap">3D 模擬示意</figcaption></figure>
<div class="copy stack narrow" style="padding-bottom:64px"><p class="eyebrow">作品 01｜台中市北屯區北安街</p>
<h1>聚社區</h1><p class="lead">太原車站走路約 3 分鐘，高鐵約 15 分鐘，全新完工。</p></div></div></section>

<section><div class="wrap stack" style="gap:32px">
<div class="stack narrow"><p class="eyebrow">產品規格</p><h2>電梯透天別墅</h2></div>
<dl class="spec">
<div><dt>格局</dt><dd>5 房 6 衛（含 3 間套房）</dd></div>
<div><dt>樓層</dt><dd>地上 5 層＋屋突</dd></div>
<div><dt>面寬</dt><dd>約 6 米</dd></div>
<div><dt>車位</dt><dd>一樓平面雙車位</dd></div>
<div><dt>電梯</dt><dd>永大電梯</dd></div>
<div><dt>衛浴</dt><dd>TOTO</dd></div>
<div><dt>建材</dt><dd>大理石</dd></div>
<div><dt>設備</dt><dd>電動車充電樁</dd></div>
</dl></div></section>

<section><div class="wrap stack" style="gap:32px">
<div class="stack narrow"><p class="eyebrow">交通與生活</p><h2>離車站近，離家人也近。</h2></div>
<dl class="spec">
<div><dt>太原車站</dt><dd>步行約 3 分鐘</dd></div>
<div><dt>高鐵台中站</dt><dd>搭台鐵約 15 分鐘</dd></div>
<div><dt>74 快速道路</dt><dd>開車約 7 分鐘</dd></div>
<div><dt>臺中市立老人復健綜合醫院（中國醫藥大學經營）</dt><dd>開車約 10 分鐘</dd></div>
<div><dt>Costco 北台中店</dt><dd>開車約 10 分鐘</dd></div>
<div><dt>漢神洲際百貨</dt><dd>開車約 15 分鐘</dd></div>
<div><dt>學區</dt><dd>北屯國小・三光國中</dd></div>
<div><dt>商圈</dt><dd>太原路・昌平路・北屯路</dd></div>
</dl>
<p class="note">時間為約略值，依實際路況而定。</p>
<figure style="margin:0"><picture><source media="(max-width:720px)" srcset="assets/map_tall.jpg"><img src="assets/map_wide.jpg" alt="聚社區位置圖：太原車站、三光國中、北屯國小、北屯市場、74 快速道路、老人復健綜合醫院" width="1920" height="1080" loading="lazy"></picture><figcaption class="cap">位置示意圖，非實際比例｜地圖資料 © OpenStreetMap 貢獻者</figcaption></figure></div></section>

<section><div class="wrap stack" style="gap:32px">
<div class="stack narrow"><p class="eyebrow">目前在售</p><h2>店鋪 2 戶・住宅 2 戶</h2><p>價格歡迎洽詢。</p></div>
<div class="units">
<div class="unit"><p class="tag">臨 10 米路｜店鋪・可開業</p><p class="no">10 號</p><p class="num">地坪約 33 坪・建坪約 100 坪</p></div>
<div class="unit"><p class="tag">臨 10 米路｜店鋪・可開業</p><p class="no">8 號</p><p class="num">地坪約 25 坪・建坪約 100 坪</p></div>
<div class="unit"><p class="tag">社區內｜住宅</p><p class="no">6-3 號</p><p class="num">地坪約 42 坪・建坪約 113 坪</p></div>
<div class="unit"><p class="tag">社區內｜住宅</p><p class="no">2-1 號</p><p class="num">地坪約 40 坪・建坪約 112 坪</p></div>
</div></div></section>

<section><div class="wrap stack" style="gap:24px">
<div class="stack narrow"><p class="eyebrow">外觀</p><h2>實景與模擬</h2></div>
<div class="gallery">
<figure><img src="assets/photo_side.jpg" alt="聚社區外觀實景" width="1080" height="690" loading="lazy"><figcaption class="cap">實景拍攝</figcaption></figure>
<figure><img src="assets/render_entry.jpg" alt="聚社區入口 3D 圖" width="1080" height="560" loading="lazy"><figcaption class="cap">3D 模擬示意</figcaption></figure>
</div></div></section>

<section><div class="wrap stack" style="gap:24px">
<div class="stack narrow"><p class="eyebrow">格局規劃｜D2 戶型</p><h2>每一代，都有自己的房間。</h2></div>
<div class="plans">
<figure><img src="assets/plan_1f2f.jpg" alt="1 樓、2 樓格局圖" width="1080" height="1350" loading="lazy"></figure>
<figure><img src="assets/plan_3f4f.jpg" alt="3 樓、4 樓格局圖" width="1080" height="1350" loading="lazy"></figure>
<figure><img src="assets/plan_5fr.jpg" alt="5 樓、屋頂格局圖" width="1080" height="1350" loading="lazy"></figure>
</div>
<p class="note">格局圖以合約圖說為準。家具配置為示意。</p></div></section>

<section><div class="wrap narrow stack"><p class="eyebrow">團隊</p>
<dl class="spec" style="grid-template-columns:1fr"><div><dt>投資興建</dt><dd>新聚發建設</dd></div><div><dt>建築設計</dt><dd>嵐建築師事務所</dd></div></dl></div></section>
{LINE_CTA}''')

PAGES["service"] = ("售後服務｜新聚發建設 台中北屯", "交屋之後，有問題用 LINE 告訴阿廷，2 個工作天內回覆。", f'''
<section><div class="wrap narrow stack">
<p class="eyebrow">售後服務</p><h1>交屋之後，<br>我們還在。</h1>
<p>房子住進去，才是日常的開始。哪裡不對勁，拍張照傳給我們。</p></div></section>
<section><div class="wrap narrow stack" style="gap:24px"><h2>報修三步驟</h2>
<ol class="steps">
<li><div><h3>拍照</h3><p>拍下有問題的地方，說明位置與狀況。</p></div></li>
<li><div><h3>LINE 傳給阿廷</h3><p>LINE：tim0108</p></div></li>
<li><div><h3>2 個工作天內回覆</h3><p>我們會回覆處理方式，並和您約時間。</p></div></li>
</ol></div></section>
{LINE_CTA}''')

PAGES["contact"] = ("聯絡我們・預約看屋｜新聚發建設 聚社區", "預約看聚社區：阿廷｜LINE：tim0108。公司電話 04-2232-5169，台中市北區天祥街 228-7 號。", '''
<section><div class="wrap narrow stack" style="gap:28px">
<p class="eyebrow">聯絡我們</p><h1>看屋、洽詢，<br>都找阿廷。</h1>
<p>看屋請先用 LINE 預約時間，我們會帶您看實屋。</p>
<div class="stack" style="gap:8px;padding-block:24px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
<p class="eyebrow">LINE ID</p><p class="line-id">tim0108</p><p class="note">聯絡人：阿廷</p>
<a class="btn" href="https://line.me/ti/p/~tim0108" target="_blank" rel="noopener">用 LINE 加好友</a></div>
<div class="stack" style="gap:8px"><p class="eyebrow">建案位置</p><p>聚社區｜台中市北屯區北安街</p></div>
<div class="stack" style="gap:8px"><p class="eyebrow">公司</p><p>新聚發建設股份有限公司<br>台中市北區天祥街 228-7 號<br>電話 04-2232-5169<br>Email：sinjufa@gmail.com</p></div>
</div></section>''')


BASE_URL = "https://sinjufa.github.io/"
ORG_LD = {"@context": "https://schema.org", "@type": "Organization", "name": "新聚發建設股份有限公司",
          "alternateName": ["新聚發建設", "SINJUFA CONSTRUCTION CO., LTD"], "url": BASE_URL,
          "logo": BASE_URL + "assets/logo.png", "telephone": "+886-4-2232-5169", "email": "sinjufa@gmail.com",
          "foundingDate": "2021", "taxID": "90486525",
          "address": {"@type": "PostalAddress", "streetAddress": "天祥街228-7號", "addressLocality": "北區",
                      "addressRegion": "臺中市", "addressCountry": "TW"}}
WORKS_LD = {"@context": "https://schema.org", "@type": "Residence", "name": "聚社區",
            "description": "台中北屯電梯透天別墅，全新完工，步行約 3 分鐘到太原車站。",
            "url": BASE_URL + "works.html", "image": BASE_URL + "assets/render_shop.jpg",
            "address": {"@type": "PostalAddress", "streetAddress": "北安街", "addressLocality": "北屯區",
                        "addressRegion": "臺中市", "addressCountry": "TW"},
            "geo": {"@type": "GeoCoordinates", "latitude": 24.163694, "longitude": 120.698094}}


def page_url(key):
    return BASE_URL if key == "index" else f"{BASE_URL}{key}.html"


def full(key, title, desc, body):
    import json
    url = page_url(key)
    img = BASE_URL + ("assets/render_shop.jpg" if key == "works" else "assets/photo_front.jpg")
    lds = [ORG_LD] + ([WORKS_LD] if key == "works" else [])
    ld = "".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in lds)
    return (f'<!doctype html><html lang="zh-Hant-TW"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
            f'<meta name="google-site-verification" content="omOODyRiy1-LgXparDs0G9Vi0wbMmfsLvm_B5a5UhSU">'
            f'<title>{title}</title><meta name="description" content="{desc}">'
            f'<link rel="canonical" href="{url}"><link rel="icon" href="assets/logo.png">'
            f'<meta property="og:type" content="website"><meta property="og:site_name" content="新聚發建設">'
            f'<meta property="og:locale" content="zh_TW"><meta property="og:url" content="{url}">'
            f'<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">'
            f'<meta property="og:image" content="{img}"><meta name="twitter:card" content="summary_large_image">'
            f'{ld}{FONTS}<style>{CSS}</style></head><body>{header(key)}<main>{body}</main>{FOOTER}</body></html>')


def preview(key, title, desc, body):
    return (f'<title>新聚發建設官網</title><meta name="claude:viewport-fit-sides" content="cover">'
            f'{FONTS}<style>{CSS}</style>{header(key)}<main>{body}</main>{FOOTER}')


SITE.mkdir(exist_ok=True)
for key, (title, desc, body) in PAGES.items():
    name = "index.html" if key == "index" else f"{key}.html"
    (SITE / name).write_text(full(key, title, desc, body), encoding="utf-8")
import datetime
today = datetime.date.today().isoformat()
(SITE / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(
    f"  <url><loc>{page_url(k)}</loc><lastmod>{today}</lastmod></url>\n" for k in PAGES) + "</urlset>\n", encoding="utf-8")
(SITE / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {BASE_URL}sitemap.xml\n", encoding="utf-8")
(ROOT / "preview_index.html").write_text(preview("index", *PAGES["index"]), encoding="utf-8")
print("ok")
