import Link from "next/link";

export default function ContactTabs({ active }: { active: "course" | "event" }) {
  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    flex: 1,
    textAlign: "center",
    padding: 12,
    background: isActive ? "#22564b" : "transparent",
    color: isActive ? "#fff" : "#5d6b5a",
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 14,
  });

  return (
    <section style={{ maxWidth: 820, margin: "0 auto", padding: "40px 5vw 0" }}>
      <div style={{ display: "flex", gap: 10, background: "#ecebe1", borderRadius: 999, padding: 6 }}>
        {active === "course" ? (
          <span style={tabStyle(true)}>ゴルフ場様</span>
        ) : (
          <Link href="/contact-course" style={tabStyle(false)}>
            ゴルフ場様
          </Link>
        )}
        {active === "event" ? (
          <span style={tabStyle(true)}>イベント／プレーヤー様</span>
        ) : (
          <Link href="/contact-event" style={tabStyle(false)}>
            イベント／プレーヤー様
          </Link>
        )}
      </div>
    </section>
  );
}
