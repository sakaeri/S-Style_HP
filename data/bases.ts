export interface Course {
  name: string;
  area: string;
}

export interface Base {
  name: string;
  displayName: string;
  role: "本拠点" | "支店";
  courses: Course[];
}

export const bases: Base[] = [
  {
    name: "千葉",
    displayName: "千葉県",
    role: "本拠点",
    courses: [
      { name: "カレドニアン・ゴルフクラブ", area: "千葉県" },
      { name: "グリッサンドゴルフクラブ", area: "千葉県" },
      { name: "PGM総成ゴルフクラブ", area: "千葉県" },
      { name: "総武カントリークラブ総武コース", area: "千葉県" },
      { name: "中山カントリークラブ", area: "千葉県" },
      { name: "鷹之台カンツリークラブ", area: "千葉県" },
      { name: "袖ヶ浦カンツリークラブ", area: "千葉県" },
      { name: "京葉カントリー俱楽部", area: "千葉県" },
      { name: "東京クラシッククラブ", area: "千葉県" },
      { name: "麻倉ゴルフ倶楽部", area: "千葉県" },
      { name: "浜野ゴルフクラブ", area: "千葉県" },
      { name: "ザ・カントリークラブ・ジャパン", area: "千葉県" },
      { name: "キングフィールズゴルフクラブ", area: "千葉県" },
    ],
  },
  {
    name: "北海道",
    displayName: "北海道",
    role: "支店",
    courses: [{ name: "御前水ゴルフ倶楽部", area: "北海道" }],
  },
  {
    name: "沖縄",
    displayName: "沖縄県",
    role: "支店",
    courses: [
      { name: "カヌチャベイリゾートゴルフコース", area: "沖縄県" },
      { name: "PGMゴルフリゾート沖縄", area: "沖縄県" },
      { name: "那覇ゴルフ倶楽部", area: "沖縄県" },
      { name: "琉球ゴルフ倶楽部", area: "沖縄県" },
      { name: "ザ・サザンリンクスゴルフクラブ", area: "沖縄県" },
      { name: "パームヒルズゴルフリゾートクラブ", area: "沖縄県" },
    ],
  },
  {
    name: "埼玉",
    displayName: "埼玉県",
    role: "支店",
    courses: [
      { name: "鳩山カントリークラブ", area: "埼玉県" },
      { name: "嵐山カントリークラブ", area: "埼玉県" },
    ],
  },
  {
    name: "山梨",
    displayName: "山梨県",
    role: "支店",
    courses: [
      { name: "富士桜カントリー倶楽部", area: "山梨県" },
      { name: "鳴沢ゴルフ俱楽部", area: "山梨県" },
    ],
  },
  {
    name: "三重",
    displayName: "三重県",
    role: "支店",
    courses: [{ name: "スリーレイクスカントリークラブ", area: "三重県" }],
  },
  {
    name: "大阪",
    displayName: "大阪府",
    role: "支店",
    courses: [{ name: "茨木国際ゴルフ倶楽部", area: "大阪府" }],
  },
  {
    name: "兵庫",
    displayName: "兵庫県",
    role: "支店",
    courses: [
      { name: "鳴尾ゴルフ倶楽部", area: "兵庫県" },
      { name: "吉川カントリー倶楽部", area: "兵庫県" },
      { name: "西宮カントリー倶楽部", area: "兵庫県" },
    ],
  },
];
