const e = React.createElement;

const DATA = [
  {
    id: "safety",
    name: "安全",
    items: [
      {
        id: "arrival-safety",
        title: "到着時の安全確認の流れ",
        minutes: 6,
        tags: ["新人必須","現場基本"],
        body: [
          "現場到着前にハザード・路肩寄せ・停止位置の選定（自他の安全最優先）。",
          "三角表示板・パイロン・発炎筒の配置（見える位置・風向きを考慮）。",
          "同乗者の退避誘導（ガードレール外側・安全地帯に集める）。",
          "暗所はヘッドライト“下向き”＋作業灯、反射ベストを着用。"
        ]
      },
      {
        id: "lane-control",
        title: "車線規制と合図",
        minutes: 4,
        tags: ["夜間","高速道路"],
        body: [
          "渋滞末尾の“後方保安”を意識。必要時は路肩に追従車を配置。",
          "誘導は大きく・ゆっくり・一定（合図を統一）。",
          "写真記録は安全確保後に実施。"
        ]
      }
    ]
  },
  {
    id: "electrical",
    name: "電装",
    items: [
      {
        id: "battery-basics",
        title: "バッテリー/オルタネータ基礎",
        minutes: 8,
        tags: ["基礎知識"],
        body: [
          "エンジン始動：バッテリー→セルモーターが回転。",
          "エンジン始動後：オルタネータ（発電機）が電装品へ供給し、余剰をバッテリーへ充電。",
          "発電が不足すると不足分をバッテリーが賄う→残量低下に注意。"
        ]
      },
      {
        id: "warning-lights",
        title: "警告灯の基本説明（言い換え）",
        minutes: 6,
        tags: ["お客様説明"],
        body: [
          "充電警告灯＝発電機（オルタネータ）系の不具合サイン。",
          "エンジン警告灯＝制御系/センサー異常の可能性。",
          "ABS/ブレーキ＝制動系の異常表示。走行継続の可否は安全最優先で判断。"
        ]
      }
    ]
  },
  {
    id: "towing",
    name: "レッカー/積載",
    items: [
      {
        id: "tie-down",
        title: "固定ポイントと荷重バランス",
        minutes: 7,
        tags: ["積載車","基礎"],
        body: [
          "メーカー指定の固定ポイントを優先。樹脂部や薄板は避ける。",
          "前後左右のバランスを意識し、再締付までをワンセットで。",
          "走行前に2名クロスチェック（声出し確認）。"
        ]
      }
    ]
  },
  {
    id: "office",
    name: "事務・伝票",
    items: [
      {
        id: "forms-basics",
        title: "伝票の必須項目（漏れゼロ）",
        minutes: 5,
        tags: ["信頼","請求"],
        body: [
          "到着完了時間／作業区分（レッカー・現場作業・点検）を必ず記載。",
          "特殊作業の有無／高速代の有無／搬送先情報を明確に。",
          "控えの渡し方と鍵の受け渡しをダブルチェック。"
        ]
      }
    ]
  },
  {
    id: "customer",
    name: "お客様対応",
    items: [
      {
        id: "explanation",
        title: "状況説明のコツ",
        minutes: 4,
        tags: ["コミュニケーション"],
        body: [
          "専門用語は避け、例え話と“目的→対策→所要時間”で簡潔に。",
          "答えにくい「値段」は社方針に準拠し、確定前は幅で伝える。",
          "不安ワードより先に“今やること”を提示。"
        ]
      }
    ]
  }
];

function App(){
  const [activeCat, setActiveCat] = React.useState(DATA[0].id);
  const [query, setQuery] = React.useState("");

  const categories = DATA.map(c => ({ id: c.id, name: c.name }));
  const current = DATA.find(c => c.id === activeCat);

  const filteredItems = (current?.items || []).filter(item => {
    const q = query.trim();
    if (!q) return true;
    const hay = (item.title + " " + item.tags.join(" ") + " " + item.body.join(" ")).toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  const Tag = ({children}) => e("span", {className:"badge"}, children);
  const Meta = ({minutes}) => e("div", {className:"meta"}, e("span", null, `所要 ${minutes}分`));

  return e("div", {className:"grid", style:{marginTop:16}},
    e("aside", {className:"sidebar"},
      e("div", {className:"card"},
        e("div", {className:"toolbar"},
          e("div", {className:"search"},
            e("input", {
              className:"input",
              placeholder:"検索（タイトル/タグ/本文）",
              value: query,
              onChange: e => setQuery(e.target.value)
            })
          )
        ),
        e("div", {className:"tabs", style:{marginBottom:8}},
          categories.map(c =>
            e("button", {
              key: c.id,
              className: "tab " + (activeCat === c.id ? "active" : ""),
              onClick: () => setActiveCat(c.id)
            }, c.name)
          )
        ),
        e("div", {className:"muted", style:{fontSize:12, marginTop:8}},
          "カテゴリをクリックすると右側の内容が切り替わります。検索は現在のカテゴリ内のみです。"
        )
      )
    ),
    e("section", {className:"content"},
      e("div", {className:"list"},
        filteredItems.map(item =>
          e("details", {key:item.id, className:"section", open:false},
            e("summary", null, item.title),
            e("div", {className:"section-body"},
              e(Meta, {minutes: item.minutes}),
              e("div", {className:"badges"}, item.tags.map(t => e(Tag, {key:t}, t))),
              e("ul", null, item.body.map((line, i) => e("li", {key:i, style:{marginTop:6}}, line)))
            )
          )
        ),
        filteredItems.length === 0 && e("div", {className:"card"}, "該当する項目がありません。検索条件を調整してください。")
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(e(App));
