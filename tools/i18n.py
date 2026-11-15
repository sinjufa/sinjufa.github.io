# 英文、日文版內容（2026-11-15）。結構與中文版相同；改中文時這裡也要一起改。
# 原則：約→approx./約、3D→模擬示意、格局以合約圖說為準、店鋪「可開業」→ business use permitted / 営業可。

UI = {
    "zh": {"nav": {"works": "聚社區", "plans": "格局圖", "renders": "3D 圖", "story": "品牌故事", "service": "售後服務"},
           "home": "首頁", "contact": "預約看屋・洽詢", "book": "用 LINE 預約看屋", "phone": "公司電話",
           "company": "新聚發建設股份有限公司｜創立於 2021 年｜統一編號 90486525", "tag": "聚，一家人的日常。", "note": ""},
    "en": {"nav": {"works": "Ju Residence", "plans": "Floor Plans", "renders": "3D Images", "story": "Our Story", "service": "After-Sales"},
           "home": "Home", "contact": "Viewings & Enquiries", "book": "Book a viewing on LINE", "phone": "Tel",
           "company": "Sinjufa Construction Co., Ltd.｜Est. 2021｜Taichung, Taiwan", "tag": "Ju — everyday life, together.",
           "note": "This English page is a translation for reference. The Traditional Chinese version prevails."},
    "ja": {"nav": {"works": "聚社區", "plans": "間取り図", "renders": "3Dパース", "story": "ブランドストーリー", "service": "アフターサービス"},
           "home": "ホーム", "contact": "内覧予約・お問い合わせ", "book": "LINEで内覧を予約", "phone": "電話",
           "company": "新聚發建設股份有限公司｜2021年創業｜台湾・台中", "tag": "家族が集う、いつもの日々。",
           "note": "日本語ページは参考訳です。内容は繁体字中国語版が優先します。"},
}

UNITS = {
    "en": [("Faces 10 m road｜Shop・business use permitted", "No. 10", "Land approx. 33 ping・Floor area approx. 100 ping"),
           ("Faces 10 m road｜Shop・business use permitted", "No. 8", "Land approx. 25 ping・Floor area approx. 100 ping"),
           ("Inside the community｜Residence", "No. 6-3", "Land approx. 42 ping・Floor area approx. 113 ping"),
           ("Inside the community｜Residence", "No. 2-1", "Land approx. 40 ping・Floor area approx. 112 ping")],
    "ja": [("10m道路に面する｜店舗・営業可", "10号", "土地 約33坪・延床 約100坪"),
           ("10m道路に面する｜店舗・営業可", "8号", "土地 約25坪・延床 約100坪"),
           ("コミュニティ内｜住宅", "6-3号", "土地 約42坪・延床 約113坪"),
           ("コミュニティ内｜住宅", "2-1号", "土地 約40坪・延床 約112坪")],
}


def units_html(lang):
    return "".join(f'<div class="unit"><p class="tag">{t}</p><p class="no">{n}</p><p class="num">{a}</p></div>' for t, n, a in UNITS[lang])


def spec_html(rows):
    return "".join(f"<div><dt>{a}</dt><dd>{b}</dd></div>" for a, b in rows)


def zoom_fig(src, alt, w, h, cap, lazy=True):
    return (f'<figure><a href="assets/{src}" target="_blank" rel="noopener"><img src="assets/{src}" alt="{alt}" width="{w}" height="{h}"'
            f'{" loading=\"lazy\"" if lazy else ""}></a><figcaption>{cap}</figcaption></figure>')


T = {"en": {}, "ja": {}}

# ---------- EN ----------
T["en"]["index"] = ("Sinjufa Construction｜Taichung Beitun Developer・Ju Residence Elevator Townhouses",
    "Sinjufa Construction is a residential developer in Beitun, Taichung. Our first project, Ju Residence, is a newly completed elevator townhouse community with EV charging, approx. 3 minutes' walk from Taiyuan Station.", """
<figure class="full"><img src="assets/garden_day.jpg" alt="Ju Residence lane and pine garden" width="1800" height="1134"></figure>
<section class="intro"><div class="wrap narrow stack">
<p class="eyebrow">Beitun, Taichung｜Residential Developer</p><h1>Ju — everyday life, together.</h1>
<p class="lead">We are Sinjufa Construction. We build only a few homes, so every detail gets our full attention.<br>Homes a family wants to come back to, every evening.</p>
</div></section>
<section><div class="wrap feature">
<figure style="margin:0"><img src="assets/facade.jpg" alt="Ju Residence exterior" width="1406" height="1800" loading="lazy"><figcaption class="cap">Ju Residence｜Actual photo</figcaption></figure>
<div class="stack"><p class="eyebrow">Our first project</p><h2>Ju Residence</h2>
<p>Beitun, Taichung・Elevator townhouses・Newly completed.<br>Approx. 3 minutes' walk to Taiyuan Station.</p>
<a class="btn" href="works.html">View Ju Residence</a></div></div></section>""")

T["en"]["works"] = ("Ju Residence｜New Elevator Townhouses near Taiyuan Station, Beitun, Taichung｜Sinjufa",
    "Ju Residence, Beian St., Beitun District, Taichung: newly completed 5-storey elevator townhouses with EV charging, 5 bedrooms / 6 bathrooms (3 en-suites), 2 ground-floor parking spaces. Approx. 3 minutes' walk to Taiyuan Station. Shop units on a 10 m road.", f"""
<figure class="full"><img src="assets/entrance.jpg" alt="Ju Residence entrance and garden" width="1800" height="1078"></figure>
<section class="intro"><div class="wrap narrow stack">
<p class="eyebrow">Project 01｜Beian St., Beitun District, Taichung</p><h1>Ju Residence</h1>
<p class="lead">Elevator townhouses, newly completed.<br>Approx. 3 minutes' walk to Taiyuan Station.</p></div></section>
<section><div class="wrap stack" style="gap:12px"><div class="pics">
<figure><img src="assets/facade.jpg" alt="Exterior" width="1406" height="1800" loading="lazy"></figure>
<figure><img src="assets/lane_night.jpg" alt="Lane at night" width="1687" height="1800" loading="lazy"></figure>
<figure><img src="assets/garden_night.jpg" alt="Pine garden at night" width="1800" height="1215" loading="lazy"></figure>
<figure><img src="assets/lane_day.jpg" alt="Lane by day" width="1800" height="1350" loading="lazy"></figure>
</div><p class="cap">All actual photos</p></div></section>
<section><div class="wrap stack" style="gap:32px">
<div class="stack narrow"><p class="eyebrow">Available now</p><h2>2 shops・2 residences</h2><p>Please contact us for prices. 1 ping ≈ 3.3 m².</p></div>
<div class="units">{units_html("en")}</div>
<dl class="spec">{spec_html([("Layout","5 bed / 6 bath (3 en-suites)"),("Floors","5 floors + roof structure"),("Parking","2 spaces, ground floor"),("Facilities","Elevator・EV charger")])}</dl></div></section>
<section><div class="wrap feature" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:16px">
<a class="unit" href="plans.html" style="text-decoration:none"><p class="tag">Type D2｜1F to roof</p><p class="no">Floor plans →</p><p>Tap to enlarge</p></a>
<a class="unit" href="renders.html" style="text-decoration:none"><p class="tag">Illustrative</p><p class="no">3D images →</p><p>Shops and residences</p></a>
</div></section>
<section><div class="wrap stack" style="gap:24px">
<div class="stack narrow"><p class="eyebrow">Location</p><h2>Close to the station, close to family.</h2>
<p>Taiyuan Station: approx. 3 min walk｜Taichung HSR Station: approx. 15 min by train｜Schools: Beitun Elementary・Sanguang Junior High</p></div>
<figure style="margin:0"><picture><source media="(max-width:720px)" srcset="assets/map_tall.jpg"><img src="assets/map_wide.jpg" alt="Location map" width="1920" height="1080" loading="lazy"></picture><figcaption class="cap">Illustrative map, not to scale｜Map data © OpenStreetMap contributors｜Times are approximate</figcaption></figure></div></section>
<section><div class="wrap narrow stack" style="gap:0">
<details class="fold"><summary>Full specifications</summary><div><dl class="spec" style="grid-template-columns:1fr">{spec_html([("Frontage","approx. 6 m"),("Elevator","Yungtay"),("Bathrooms","TOTO"),("Materials","Marble"),("Architect","嵐建築師事務所")])}</dl></div></details>
<details class="fold"><summary>Nearby</summary><div><dl class="spec" style="grid-template-columns:1fr">{spec_html([("Expressway 74","approx. 7 min drive"),("Taichung Municipal Geriatric Rehabilitation Hospital (run by China Medical University)","approx. 10 min drive"),("Costco North Taichung","approx. 10 min drive"),("Hanshin Department Store, Taichung","approx. 15 min drive"),("Shopping streets","Taiyuan Rd.・Changping Rd.・Beitun Rd.")])}</dl></div></details>
<details class="fold"><summary>FAQ</summary><div><dl class="faq"><dt>Is it newly built?</dt><dd>Yes. Ju Residence is completed and you can book a viewing of the actual homes.</dd><dt>Is there EV charging?</dt><dd>Yes. EV charging is provided, with 2 parking spaces on the ground floor.</dd><dt>Can the shops be used for business?</dt><dd>Nos. 8 and 10, facing the 10 m road, are shop units where business use is permitted.</dd><dt>How much?</dt><dd>Please contact us on LINE: tim0108.</dd></dl></div></details>
</div></section>""")

T["en"]["plans"] = ("Floor Plans｜Ju Residence Type D2, 5 Bed 6 Bath｜Sinjufa",
    "Ju Residence Type D2 floor plans: 2 ground-floor parking spaces, 5 bedrooms / 6 bathrooms, 5 floors + roof. Tap to enlarge. Contract drawings prevail.", f"""
<section><div class="wrap narrow stack" style="gap:16px">
<p class="eyebrow">Ju Residence｜Type D2</p><h1>Floor plans</h1>
<p>Tap an image to open it full size. On a phone, pinch to zoom.</p>
<p class="note">Contract drawings prevail. Furniture is illustrative.</p></div></section>
<section style="padding-top:0"><div class="wrap narrow zoom">
{zoom_fig("plan_1f2f.jpg","1F and 2F floor plan",1080,1350,"1F・2F｜Tap to enlarge",False)}
{zoom_fig("plan_3f4f.jpg","3F and 4F floor plan",1080,1350,"3F・4F｜Tap to enlarge")}
{zoom_fig("plan_5fr.jpg","5F and roof floor plan",1080,1350,"5F・Roof｜Tap to enlarge")}
<a class="btn" href="works.html">← Back to Ju Residence</a></div></section>""")

T["en"]["renders"] = ("3D Images｜Ju Residence, Beitun, Taichung｜Sinjufa",
    "3D images of Ju Residence: shop units on the 10 m road, residences and entrance. For illustration only.", f"""
<section><div class="wrap narrow stack" style="gap:16px">
<p class="eyebrow">Ju Residence</p><h1>3D images</h1>
<p>Tap an image to open it full size.</p>
<p class="note">3D images are for illustration only. The actual site and contract drawings prevail.</p></div></section>
<section style="padding-top:0"><div class="wrap zoom">
{zoom_fig("render_shop.jpg","Shop units, 3D image",1080,640,"Shop units on the 10 m road｜Illustrative",False)}
{zoom_fig("render_court.jpg","Residences, 3D image",1080,640,"Residences inside the community｜Illustrative")}
{zoom_fig("render_entry.jpg","Entrance, 3D image",1080,560,"Community entrance｜Illustrative")}
<a class="btn" href="works.html">← Back to Ju Residence</a></div></section>""")

T["en"]["story"] = ("Our Story｜Sinjufa Construction, Taichung",
    "All the hard work of the day is for this table in the evening. The story of Sinjufa Construction: less, careful, together.", """
<figure class="full"><img src="assets/garden_night.jpg" alt="Garden at night" width="1800" height="1215"></figure>
<section><div class="wrap narrow stack story">
<p class="eyebrow">Our Story</p><h1>All the hard work of the day<br>is for this table in the evening.</h1>
<h2>Ju, in the middle of our name</h2>
<p>Sin means a new beginning. Fa means good fortune. But the character we care about most is the one in the middle: Ju, to gather. A family, every evening, back at the same table.</p>
<h2>An old master builder</h2>
<p>He built houses all his life, yet often missed dinner at home. So he changed how he built: think about the evening first, then draw. Elders shouldn't have to fight the stairs, so there is an elevator. Every generation needs its own space, so there are three en-suites.</p>
<p>The pipes inside the walls, the joints between tiles — he crouched down to check them all. "I'd want to live here myself."</p>
<h2>Three colours</h2>
<p>Deep green is the shade of trees at dusk. Sand gold is the lamp lit for dinner. Rice white is a freshly cooked pot of rice.</p>
<p style="padding-top:16px">Ju — everyday life, together.</p>
</div></section>""")

T["en"]["service"] = ("After-Sales Service｜Sinjufa Construction, Taichung",
    "After handover, send us a photo of any issue on LINE. We reply within 2 working days.", """
<section><div class="wrap narrow stack" style="gap:28px">
<p class="eyebrow">After-Sales Service</p><h1>After handover,<br>we are still here.</h1>
<ol class="steps">
<li><div><h3>Take a photo</h3><p>Photograph the issue and tell us where it is and what happened.</p></div></li>
<li><div><h3>Send it on LINE</h3><p>LINE: tim0108</p></div></li>
<li><div><h3>Reply within 2 working days</h3><p>We will explain how we will fix it and arrange a time with you.</p></div></li>
</ol></div></section>""")

# ---------- JA ----------
T["ja"]["index"] = ("新聚發建設｜台中・北屯の住宅デベロッパー・聚社區 エレベーター付き一戸建て",
    "新聚發建設は台中市北屯区の住宅デベロッパーです。第一弾「聚社區」は新築のエレベーター付き一戸建て、EV充電設備付き、太原駅から徒歩約3分。", """
<figure class="full"><img src="assets/garden_day.jpg" alt="聚社區の路地と松の庭" width="1800" height="1134"></figure>
<section class="intro"><div class="wrap narrow stack">
<p class="eyebrow">台中・北屯｜住宅デベロッパー</p><h1>家族が集う、いつもの日々。</h1>
<p class="lead">新聚發建設です。戸数を絞り、そのぶん細部に力を注ぎます。<br>家族が毎晩帰りたくなる家だけを建てています。</p>
</div></section>
<section><div class="wrap feature">
<figure style="margin:0"><img src="assets/facade.jpg" alt="聚社區 外観" width="1406" height="1800" loading="lazy"><figcaption class="cap">聚社區｜実景写真</figcaption></figure>
<div class="stack"><p class="eyebrow">第一弾プロジェクト</p><h2>聚社區</h2>
<p>台中・北屯・エレベーター付き一戸建て・新築完成。<br>太原駅から徒歩約3分。</p>
<a class="btn" href="works.html">聚社區を見る</a></div></div></section>""")

T["ja"]["works"] = ("聚社區｜台中・太原駅徒歩約3分 新築エレベーター付き一戸建て・店舗｜新聚發建設",
    "台中市北屯区北安街「聚社區」。新築・地上5階エレベーター付き一戸建て、EV充電設備、寝室5・バス6（スイート3室）、1階駐車2台。太原駅から徒歩約3分。10m道路沿いの店舗併用住宅あり。", f"""
<figure class="full"><img src="assets/entrance.jpg" alt="聚社區 エントランスと庭" width="1800" height="1078"></figure>
<section class="intro"><div class="wrap narrow stack">
<p class="eyebrow">プロジェクト01｜台中市北屯区北安街</p><h1>聚社區</h1>
<p class="lead">エレベーター付き一戸建て、新築完成。<br>太原駅から徒歩約3分。</p></div></section>
<section><div class="wrap stack" style="gap:12px"><div class="pics">
<figure><img src="assets/facade.jpg" alt="外観" width="1406" height="1800" loading="lazy"></figure>
<figure><img src="assets/lane_night.jpg" alt="夜の路地" width="1687" height="1800" loading="lazy"></figure>
<figure><img src="assets/garden_night.jpg" alt="夜の松の庭" width="1800" height="1215" loading="lazy"></figure>
<figure><img src="assets/lane_day.jpg" alt="昼の路地" width="1800" height="1350" loading="lazy"></figure>
</div><p class="cap">すべて実景写真</p></div></section>
<section><div class="wrap stack" style="gap:32px">
<div class="stack narrow"><p class="eyebrow">販売中</p><h2>店舗2戸・住宅2戸</h2><p>価格はお問い合わせください。1坪＝約3.3㎡。</p></div>
<div class="units">{units_html("ja")}</div>
<dl class="spec">{spec_html([("間取り","寝室5・バス6（スイート3室）"),("階数","地上5階＋塔屋"),("駐車場","1階 平面2台"),("設備","エレベーター・EV充電設備")])}</dl></div></section>
<section><div class="wrap feature" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:16px">
<a class="unit" href="plans.html" style="text-decoration:none"><p class="tag">D2タイプ｜1階〜屋上</p><p class="no">間取り図 →</p><p>タップで拡大</p></a>
<a class="unit" href="renders.html" style="text-decoration:none"><p class="tag">イメージ</p><p class="no">3Dパース →</p><p>店舗と住宅</p></a>
</div></section>
<section><div class="wrap stack" style="gap:24px">
<div class="stack narrow"><p class="eyebrow">ロケーション</p><h2>駅に近く、家族にも近く。</h2>
<p>太原駅 徒歩約3分｜高速鉄道台中駅 在来線で約15分｜学区：北屯小学校・三光中学校</p></div>
<figure style="margin:0"><picture><source media="(max-width:720px)" srcset="assets/map_tall.jpg"><img src="assets/map_wide.jpg" alt="位置図" width="1920" height="1080" loading="lazy"></picture><figcaption class="cap">位置イメージ図（縮尺不定）｜地図データ © OpenStreetMap 貢献者｜時間は目安</figcaption></figure></div></section>
<section><div class="wrap narrow stack" style="gap:0">
<details class="fold"><summary>詳細仕様</summary><div><dl class="spec" style="grid-template-columns:1fr">{spec_html([("間口","約6m"),("エレベーター","永大（Yungtay）"),("水回り","TOTO"),("建材","大理石"),("設計","嵐建築師事務所")])}</dl></div></details>
<details class="fold"><summary>周辺環境</summary><div><dl class="spec" style="grid-template-columns:1fr">{spec_html([("国道74号快速道路","車で約7分"),("台中市立老人リハビリ総合病院（中国医薬大学運営）","車で約10分"),("コストコ北台中店","車で約10分"),("漢神洲際百貨","車で約15分"),("商店街","太原路・昌平路・北屯路")])}</dl></div></details>
<details class="fold"><summary>よくある質問</summary><div><dl class="faq"><dt>新築ですか？</dt><dd>はい。完成済みのため、実際の住戸をご内覧いただけます。</dd><dt>EV充電設備はありますか？</dt><dd>はい。EV充電設備があり、1階に平面駐車場2台分があります。</dd><dt>店舗として営業できますか？</dt><dd>10m道路に面した8号・10号は店舗で、営業が可能です。</dd><dt>価格は？</dt><dd>LINE（ID：tim0108）でお問い合わせください。日本語で対応いたします。</dd></dl></div></details>
</div></section>""")

T["ja"]["plans"] = ("間取り図｜聚社區 D2タイプ｜新聚發建設",
    "聚社區 D2タイプの間取り図。1階駐車2台、寝室5・バス6、地上5階＋塔屋。タップで拡大。契約図面が優先します。", f"""
<section><div class="wrap narrow stack" style="gap:16px">
<p class="eyebrow">聚社區｜D2タイプ</p><h1>間取り図</h1>
<p>画像をタップすると大きく表示されます。スマートフォンではピンチで拡大できます。</p>
<p class="note">間取りは契約図面に準じます。家具配置はイメージです。</p></div></section>
<section style="padding-top:0"><div class="wrap narrow zoom">
{zoom_fig("plan_1f2f.jpg","1階・2階 間取り図",1080,1350,"1F・2F｜タップで拡大",False)}
{zoom_fig("plan_3f4f.jpg","3階・4階 間取り図",1080,1350,"3F・4F｜タップで拡大")}
{zoom_fig("plan_5fr.jpg","5階・屋上 間取り図",1080,1350,"5F・屋上｜タップで拡大")}
<a class="btn" href="works.html">← 聚社區に戻る</a></div></section>""")

T["ja"]["renders"] = ("3Dパース｜聚社區 台中・北屯｜新聚發建設",
    "聚社區の3Dパース：10m道路沿いの店舗、住宅、エントランス。イメージ図です。", f"""
<section><div class="wrap narrow stack" style="gap:16px">
<p class="eyebrow">聚社區</p><h1>3Dパース</h1>
<p>画像をタップすると大きく表示されます。</p>
<p class="note">3Dパースはイメージです。実際の現地・契約図面が優先します。</p></div></section>
<section style="padding-top:0"><div class="wrap zoom">
{zoom_fig("render_shop.jpg","店舗 3Dパース",1080,640,"10m道路沿いの店舗｜イメージ",False)}
{zoom_fig("render_court.jpg","住宅 3Dパース",1080,640,"コミュニティ内の住宅｜イメージ")}
{zoom_fig("render_entry.jpg","エントランス 3Dパース",1080,560,"エントランス｜イメージ")}
<a class="btn" href="works.html">← 聚社區に戻る</a></div></section>""")

T["ja"]["story"] = ("ブランドストーリー｜新聚發建設 台中",
    "一日の頑張りは、夜のこの食卓のために。新聚發建設のブランドストーリー：少・細・聚。", """
<figure class="full"><img src="assets/garden_night.jpg" alt="夜の庭" width="1800" height="1215"></figure>
<section><div class="wrap narrow stack story">
<p class="eyebrow">ブランドストーリー</p><h1>一日の頑張りは、<br>夜のこの食卓のために。</h1>
<h2>「聚」は、名前の真ん中に</h2>
<p>「新」は始まり、「發」は福。けれど私たちが一番大切にしているのは、真ん中の一文字「聚（集う）」です。家族が毎晩、同じ食卓に帰ってくること。</p>
<h2>ひとりの棟梁</h2>
<p>彼は一生家を建て続けながら、家族の夕食にはよく間に合いませんでした。そこで建て方を変えました。まず夜のことを考え、それから図面を描く。年配の家族が階段に苦労しないようにエレベーターを。世代ごとに自分の空間が要るから、スイートを3室。</p>
<p>壁の中の配管も、タイルの目地も、しゃがみ込んで確かめる。「自分も住みたいと思えるように」。</p>
<h2>三つの色</h2>
<p>深緑は夕暮れの木陰の色。沙金は夕食に灯るあかり。米白は炊きたてのご飯の色です。</p>
<p style="padding-top:16px">家族が集う、いつもの日々。</p>
</div></section>""")

T["ja"]["service"] = ("アフターサービス｜新聚發建設 台中",
    "お引き渡し後、気になる点は写真をLINEで送ってください。2営業日以内にご返信します。", """
<section><div class="wrap narrow stack" style="gap:28px">
<p class="eyebrow">アフターサービス</p><h1>お引き渡しのあとも、<br>私たちはここにいます。</h1>
<ol class="steps">
<li><div><h3>写真を撮る</h3><p>気になる箇所を撮影し、場所と状況をお知らせください。</p></div></li>
<li><div><h3>LINEで送る</h3><p>LINE：tim0108</p></div></li>
<li><div><h3>2営業日以内にご返信</h3><p>対応方法をご連絡し、日程を調整します。</p></div></li>
</ol></div></section>""")
