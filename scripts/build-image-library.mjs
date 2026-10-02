/**
 * Builds the 4kdeutsch image library in public/images/iptv/ and writes lib/image-library.ts.
 *
 *  - "reused":    an existing, logo-free image is optimised (WebP) and copied into the library
 *  - "generated": abstract vector artwork in the brand style (no text, no logos), rendered to WebP
 *  - "missing":   no suitable, logo-free image exists yet – drop a file with the listed name into the folder,
 *                 set status to 'added' in SLOTS and re-run (pages render nothing for missing slots)
 *
 * Usage: node scripts/build-image-library.mjs
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUT = 'public/images/iptv';
const SRC = 'public/images/';
const W = 1344, H = 768;

// ---------------------------------------------------------------- slot definitions ----------------------------------
// [n, id, folder, status, source|generator, alt (null = decorative), capKB]
const SLOTS = [
  [1, 'iptv-streaming-home', 'home', 'reused', 'iptv-deutschland-hero.jpg', 'Dunkler Raum mit Fernseher und grüner Beleuchtung', 250],
  [2, 'iptv-streaming-erlebnis', 'home', 'reused', 'home/family-watching-tv.jpg', 'Familie schaut gemeinsam Fernsehen auf dem Sofa', 250],
  [3, 'iptv-smart-tv', 'home', 'reused', 'home/smart-tv-living-room.jpg', 'Moderner Smart-TV mit farbiger Oberfläche in einem gemütlichen Wohnzimmer', 300],
  [4, 'iptv-samsung-tv-einrichtung', 'devices', 'reused', 'devices/frameless-smart-tv.jpg', 'Moderner Smart-TV mit Streaming-Oberfläche im Wohnzimmer', 300],
  [5, 'iptv-lg-tv-einrichtung', 'devices', 'reused', 'devices/smart-tv-wall.jpg', 'Fernseher an der Wand in einem modernen Wohnzimmer', 300],
  [6, 'iptv-android-tv', 'devices', 'reused', 'devices/smart-tv-remote.jpg', 'Hand mit Fernbedienung vor einem Smart-TV mit Streaming-Oberfläche', 300],
  [7, 'iptv-apple-tv', 'devices', 'reused', 'home/streaming-device-remote.jpg', 'Streaming-Box mit Fernbedienung vor dem Fernseher', 300],
  [8, 'iptv-fire-stick', 'devices', 'reused', 'devices/streaming-stick-tv.jpg', 'Streaming-Stick am modernen Fernseher im Wohnzimmer', 300],
  [9, 'iptv-fire-stick-einrichtung', 'devices', 'fallback', 'iptv-fire-stick', 'Streaming-Stick wird am Fernseher eingerichtet', 300],
  [10, 'iptv-android-handy', 'devices', 'reused', 'devices/smartphone-in-hand.jpg', 'Smartphone in der Hand mit Streaming-App, im Hintergrund ein Fernseher', 300],
  [11, 'iptv-iphone-ipad', 'devices', 'reused', 'home/tv-phone-tablet.jpg', 'Fernseher, Smartphone und Tablet mit Streaming-Oberfläche im Wohnzimmer', 300],
  [12, 'iptv-windows-mac', 'devices', 'reused', 'devices/devices-collection.jpg', 'Fernseher, Laptop, Tablet, Smartphone und Streaming-Stick auf einem Tisch', 300],
  [13, 'iptv-apps', 'apps', 'reused', 'devices/tv-tablet-phone.jpg', 'Fernseher, Tablet und Smartphone mit Streaming-Apps', 300],
  [14, 'iptv-player', 'apps', 'fallback', 'iptv-apps', 'IPTV-Player auf einem Fernseher', 300],
  [15, 'smart-iptv', 'apps', 'fallback', 'iptv-smart-tv', 'Smart-TV mit App-Auswahl', 300],
  [16, 'iptv-m3u', 'setup', 'generated', 'm3u', 'Abstrakte Darstellung einer digitalen Streaming-Playlist', 300],
  [17, 'iptv-epg', 'setup', 'generated', 'epg', 'Abstrakte Darstellung eines elektronischen Programmführers mit Zeitleiste', 300],
  [18, 'iptv-installieren', 'setup', 'reused', 'iptv-installation-anleitung.jpg', 'Dunkler Fernseher mit Router für die Einrichtung im Heimnetz', 300],
  [19, 'iptv-einrichten', 'setup', 'generated', 'einrichten', 'Abstrakte Darstellung von drei Einrichtungsschritten', 300],
  [20, 'iptv-probleme', 'troubleshooting', 'generated', 'probleme', 'Abstrakte Darstellung einer Warnung bei Streaming-Problemen', 300],
  [21, 'iptv-kein-bild', 'troubleshooting', 'generated', 'keinbild', 'Abstrakte Darstellung eines Fernsehers ohne Bildsignal', 300],
  [22, 'iptv-verbindung', 'troubleshooting', 'generated', 'verbindung', 'Abstrakte Darstellung von Funksignalen einer Internetverbindung', 300],
  [23, 'iptv-heimnetzwerk', 'setup', 'generated', 'heimnetz', 'Abstrakte Darstellung eines Heimnetzwerks mit mehreren Geräten', 300],
  [24, 'iptv-box', 'devices', 'fallback', 'iptv-apple-tv', 'Streaming-Box neben einem Fernseher', 300],
  [25, 'iptv-receiver', 'devices', 'missing', null, 'Receiver unter einem Fernseher', 300],
  [26, 'iptv-stick', 'devices', 'fallback', 'iptv-fire-stick', 'Streaming-Stick in Nahaufnahme', 300],
  [27, 'iptv-4k', 'guides', 'reused', 'iptv-4k-qualitaet.jpg', 'Fernseher mit farbigem Bild in einem dunklen Raum mit grüner Beleuchtung', 300],
  [28, 'iptv-sport', 'sports', 'reused', 'iptv-sport-streaming.jpg', 'Fußballübertragung auf einem modernen Fernseher', 300],
  [29, 'iptv-bundesliga', 'sports', 'reused', 'bundesliga-stadion.jpg', 'Fußballstadion auf einem großen Bildschirm in einem dunklen Raum', 300],
  [30, 'iptv-champions-league', 'sports', 'fallback', 'iptv-fussball', 'Abendspiel im Stadion auf dem Fernseher', 300],
  [31, 'iptv-formel-1', 'sports', 'missing', null, 'Rennwagen auf dem Fernseher', 300],
  [32, 'iptv-fussball', 'sports', 'reused', 'fussball-streaming.jpg', 'Fußballspiel auf einem Fernseher im dunklen Wohnzimmer', 300],
  [33, 'iptv-mehrere-geraete', 'devices', 'reused', 'iptv-multi-geraete.jpg', 'Fernseher und Laptop mit Streaming-Oberfläche in einem dunklen Raum', 300],
  [34, 'iptv-home-entertainment', 'home', 'fallback', 'iptv-smart-tv', 'Heimkino mit großem Bildschirm', 300],
  [35, 'iptv-film-abend', 'home', 'fallback', 'iptv-streaming-erlebnis', 'Filmabend auf dem Sofa', 300],
  [36, 'iptv-tv-guide', 'guides', 'generated', 'tvguide', 'Abstrakte Darstellung eines Fernsehprogramms als Kachelübersicht', 300],
  [37, 'iptv-sender', 'guides', 'generated', 'sender', 'Abstrakte Darstellung vieler Fernsehsender als Kacheln', 300],
  [38, 'iptv-legal-deutschland', 'guides', 'generated', 'legal', 'Abstrakte Darstellung einer Waage als Symbol für Recht und Gesetz', 300],
  [39, 'iptv-datenschutz', 'guides', 'reused', 'iptv-sichere-zahlung.jpg', 'Abstrakte Darstellung eines digitalen Schlosses als Symbol für Datenschutz', 300],
  [40, 'iptv-sicherheit', 'guides', 'reused', 'iptv-vpn-schutz.jpg', 'Abstrakte Darstellung eines Schutzschilds mit Schloss', 300],
  [41, 'iptv-kostenlos-testen', 'business', 'generated', 'testen', 'Abstrakte Darstellung einer Uhr als Symbol für einen zeitlich begrenzten Test', 300],
  [42, 'iptv-preise', 'business', 'generated', 'preise', 'Abstrakte Darstellung dreier Preisstufen als Säulen', 300],
  [43, 'iptv-anbieter', 'business', 'reused', 'iptv-premium-abo.jpg', 'Bildschirm mit Anmeldung und Sicherheitssymbol in einem dunklen Raum', 300],
  [44, 'iptv-vergleich', 'business', 'reused', 'iptv-vergleich-editorial.jpg', 'Zwei Streaming-Geräte auf Podesten im Vergleich', 300],
  [45, 'iptv-support', 'business', 'reused', 'iptv-support-team.jpg', 'Support-Mitarbeiterin mit Headset am Arbeitsplatz', 300],
  [46, 'iptv-whatsapp-support', 'business', 'generated', 'chat', 'Abstrakte Darstellung von Chat-Sprechblasen', 300],
  [47, 'iptv-anleitung', 'guides', 'generated', 'anleitung', 'Abstrakte Darstellung einer Anleitung als gestapelte Karten mit Checkliste', 300],
  [48, 'iptv-ratgeber', 'blog', 'reused', 'iptv-cloud-streaming.jpg', 'Abstrakte Darstellung von Fernsehen aus der Cloud', 200],
  [49, 'iptv-deutschland', 'home', 'reused', 'home/living-room-hero.jpg', 'Helles Wohnzimmer mit großem Fernseher', 300],
  [50, '4kdeutsch-streaming', 'social', 'reused-social', 'iptv-familie-fernsehen.jpg', null, 300],
];

// ---------------------------------------------------------------- abstract artwork ----------------------------------
const G = '#10D96F';
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const base = (inner, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
 <radialGradient id="bg" cx="50%" cy="46%" r="78%"><stop offset="0" stop-color="#0e2c1c"/><stop offset=".55" stop-color="#08150f"/><stop offset="1" stop-color="#070707"/></radialGradient>
 <filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="46"/></filter>
 <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="${G}" stroke-opacity=".055"/></pattern>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#grid)"/>
<ellipse cx="672" cy="400" rx="420" ry="230" fill="${G}" opacity=".16" filter="url(#soft)"/>${extra}${inner}</svg>`;
const stroke = (o = 0.9, w = 3) => `fill="none" stroke="${G}" stroke-opacity="${o}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const play = (cx, cy, s, o = 1) => `<polygon points="${cx - s * 0.4},${cy - s * 0.55} ${cx - s * 0.4},${cy + s * 0.55} ${cx + s * 0.6},${cy}" fill="${G}" opacity="${o}"/>`;

const ART = {
  m3u() {
    let r = '<g transform="translate(150 0) skewX(-10)">';
    for (let i = 0; i < 7; i++) {
      const y = 110 + i * 82, hot = i === 3;
      r += `<g ${hot ? 'filter="url(#glow)"' : ''}><rect x="190" y="${y}" width="820" height="62" rx="16" fill="${G}" fill-opacity="${hot ? 0.2 : 0.06}" stroke="${G}" stroke-opacity="${hot ? 1 : 0.32}" stroke-width="${hot ? 3 : 2}"/></g>`;
      r += `<circle cx="236" cy="${y + 31}" r="20" ${stroke(hot ? 1 : 0.5, 2.5)}/>` + play(237, y + 31, 20, hot ? 1 : 0.55);
      r += `<rect x="286" y="${y + 17}" width="${260 + ((i * 53) % 150)}" height="9" rx="4.5" fill="${G}" opacity="${hot ? 0.9 : 0.4}"/><rect x="286" y="${y + 36}" width="${130 + ((i * 37) % 90)}" height="7" rx="3.5" fill="#fff" opacity=".22"/>`;
      r += `<rect x="900" y="${y + 22}" width="70" height="18" rx="9" ${stroke(hot ? 0.9 : 0.35, 2)}/>`;
    }
    return base(r + '</g>');
  },
  epg() {
    let r = '';
    for (let t = 0; t < 12; t++) r += `<line x1="${250 + t * 90}" y1="120" x2="${250 + t * 90}" y2="${t % 2 ? 132 : 146}" ${stroke(0.5, 2)}/>`;
    const rows = [[3, 5, 2, 4], [6, 3, 3, 2], [2, 2, 6, 4], [4, 4, 2, 4], [5, 2, 5, 2], [3, 6, 3, 2]];
    rows.forEach((row, i) => {
      const y = 175 + i * 87;
      r += `<rect x="120" y="${y}" width="96" height="66" rx="12" fill="${G}" fill-opacity=".08" stroke="${G}" stroke-opacity=".35" stroke-width="2"/>` + play(168, y + 33, 26, 0.7);
      let x = 250;
      row.forEach((u, j) => {
        const w = u * 90 - 10, hot = i === 2 && j === 1;
        r += `<g ${hot ? 'filter="url(#glow)"' : ''}><rect x="${x}" y="${y}" width="${w}" height="66" rx="12" fill="${G}" fill-opacity="${hot ? 0.26 : 0.07 + ((i + j) % 3) * 0.03}" stroke="${G}" stroke-opacity="${hot ? 1 : 0.3}" stroke-width="${hot ? 3 : 2}"/></g><rect x="${x + 18}" y="${y + 18}" width="${Math.min(w - 40, 120 + j * 22)}" height="8" rx="4" fill="#fff" opacity=".35"/><rect x="${x + 18}" y="${y + 38}" width="${Math.min(w - 60, 70)}" height="6" rx="3" fill="${G}" opacity=".55"/>`;
        x += u * 90;
      });
    });
    r += `<g filter="url(#glow)"><line x1="700" y1="108" x2="700" y2="705" stroke="${G}" stroke-width="4"/></g><polygon points="688,100 712,100 700,122" fill="${G}"/>`;
    return base(r);
  },
  tvguide() {
    let r = '';
    for (let i = 0; i < 12; i++) {
      const cx = i % 4, cy = Math.floor(i / 4), x = 152 + cx * 290, y = 150 + cy * 195, hot = i === 5;
      r += `<g ${hot ? 'filter="url(#glow)"' : ''} transform="${hot ? `translate(${x - 12} ${y - 10}) scale(1.08)` : `translate(${x} ${y})`}"><rect width="260" height="165" rx="20" fill="${G}" fill-opacity="${hot ? 0.2 : 0.06}" stroke="${G}" stroke-opacity="${hot ? 1 : 0.3}" stroke-width="${hot ? 3 : 2}"/><circle cx="46" cy="48" r="22" ${stroke(hot ? 1 : 0.5, 2.5)}/>${play(47, 48, 20, hot ? 1 : 0.5)}<rect x="86" y="38" width="130" height="9" rx="4.5" fill="#fff" opacity=".35"/><rect x="86" y="58" width="80" height="7" rx="3.5" fill="${G}" opacity=".6"/><rect x="26" y="108" width="208" height="8" rx="4" fill="#fff" opacity=".18"/><rect x="26" y="128" width="${120 + (i * 29) % 80}" height="8" rx="4" fill="${G}" opacity=".4"/></g>`;
    }
    return base(r);
  },
  sender() {
    let r = '';
    const R = 62;
    for (let row = 0; row < 5; row++) for (let col = 0; col < 9; col++) {
      const x = 130 + col * 135 + (row % 2) * 67, y = 130 + row * 118, lit = rnd() > 0.62;
      const pts = [0, 1, 2, 3, 4, 5].map((k) => `${(x + R * Math.cos(Math.PI / 3 * k + Math.PI / 6)).toFixed(1)},${(y + R * Math.sin(Math.PI / 3 * k + Math.PI / 6)).toFixed(1)}`).join(' ');
      r += `<g ${lit ? 'filter="url(#glow)"' : ''}><polygon points="${pts}" fill="${G}" fill-opacity="${lit ? 0.22 : 0.05}" stroke="${G}" stroke-opacity="${lit ? 1 : 0.28}" stroke-width="${lit ? 3 : 2}"/></g>` + play(x + 2, y, 30, lit ? 1 : 0.4);
    }
    return base(r);
  },
  einrichten() {
    let r = `<line x1="336" y1="384" x2="1008" y2="384" ${stroke(0.35, 3)} stroke-dasharray="10 12"/><line x1="336" y1="384" x2="800" y2="384" ${stroke(1, 4)} filter="url(#glow)"/>`;
    [336, 672, 1008].forEach((cx, i) => {
      r += `<g ${i === 2 ? 'filter="url(#glow)"' : ''}><circle cx="${cx}" cy="384" r="104" fill="${G}" fill-opacity="${i === 2 ? 0.22 : 0.07}" stroke="${G}" stroke-opacity="${i === 2 ? 1 : 0.7}" stroke-width="4"/></g>`;
    });
    // gear
    r += `<circle cx="336" cy="384" r="30" ${stroke(1, 5)}/><circle cx="336" cy="384" r="11" fill="${G}"/>` + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<line x1="${336 + 38 * Math.cos(a * Math.PI / 180)}" y1="${384 + 38 * Math.sin(a * Math.PI / 180)}" x2="${336 + 52 * Math.cos(a * Math.PI / 180)}" y2="${384 + 52 * Math.sin(a * Math.PI / 180)}" ${stroke(1, 7)}/>`).join('');
    // plug
    r += `<rect x="640" y="364" width="64" height="48" rx="10" ${stroke(1, 5)}/><line x1="656" y1="364" x2="656" y2="342" ${stroke(1, 6)}/><line x1="688" y1="364" x2="688" y2="342" ${stroke(1, 6)}/><line x1="672" y1="412" x2="672" y2="440" ${stroke(1, 6)}/>`;
    // play
    r += play(1010, 384, 90, 1);
    return base(r);
  },
  anleitung() {
    let r = '';
    [[-9, 0.35], [-3, 0.55], [5, 1]].forEach(([rot, o], i) => {
      r += `<g transform="rotate(${rot} 672 400) translate(0 ${(2 - i) * -6})" ${i === 2 ? 'filter="url(#glow)"' : ''}><rect x="392" y="150" width="560" height="470" rx="26" fill="#0a1a12" stroke="${G}" stroke-opacity="${o}" stroke-width="${i === 2 ? 3.5 : 2.5}"/></g>`;
    });
    for (let i = 0; i < 4; i++) {
      const y = 220 + i * 94;
      r += `<rect x="440" y="${y}" width="46" height="46" rx="12" ${stroke(1, 3.5)}/><polyline points="451,${y + 24} 460,${y + 33} 477,${y + 14}" ${stroke(1, 5)}/><rect x="516" y="${y + 10}" width="${300 - i * 24}" height="10" rx="5" fill="#fff" opacity=".4"/><rect x="516" y="${y + 30}" width="${190 - i * 14}" height="8" rx="4" fill="${G}" opacity=".5"/>`;
    }
    return base(r);
  },
  probleme() {
    let r = '';
    for (let i = 0; i < 16; i++) { const y = 120 + rnd() * 540, w = 80 + rnd() * 260, x = (rnd() > 0.5 ? 120 : 1224 - w) + (rnd() - 0.5) * 80; r += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(3 + rnd() * 6).toFixed(0)}" fill="${G}" opacity="${(0.15 + rnd() * 0.45).toFixed(2)}"/>`; }
    r += `<g filter="url(#glow)"><polygon points="672,170 910,590 434,590" fill="#ffb020" fill-opacity=".08" stroke="#ffb020" stroke-width="8" stroke-linejoin="round"/><line x1="672" y1="300" x2="672" y2="440" stroke="#ffb020" stroke-width="16" stroke-linecap="round"/><circle cx="672" cy="504" r="11" fill="#ffb020"/></g>`;
    return base(r);
  },
  keinbild() {
    let r = `<rect x="262" y="150" width="820" height="470" rx="30" fill="#04090a" stroke="${G}" stroke-opacity=".8" stroke-width="5"/><rect x="302" y="190" width="740" height="390" rx="12" fill="#030606"/>`;
    for (let y = 196; y < 576; y += 7) r += `<line x1="306" y1="${y}" x2="1038" y2="${y}" stroke="${G}" stroke-opacity="${(0.03 + rnd() * 0.12).toFixed(2)}" stroke-width="2"/>`;
    for (let i = 0; i < 7; i++) { const y = 210 + rnd() * 350, w = 120 + rnd() * 420; r += `<rect x="${(310 + rnd() * (700 - w)).toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="6" fill="${G}" opacity="${(0.25 + rnd() * 0.4).toFixed(2)}"/>`; }
    r += `<g filter="url(#glow)"><circle cx="672" cy="385" r="70" ${stroke(1, 6)}/><line x1="622" y1="435" x2="722" y2="335" ${stroke(1, 6)}/></g><rect x="602" y="620" width="140" height="22" rx="8" fill="${G}" fill-opacity=".25"/><rect x="520" y="640" width="304" height="12" rx="6" fill="${G}" fill-opacity=".18"/>`;
    return base(r);
  },
  verbindung() {
    let r = '';
    [90, 160, 230, 300, 370].forEach((rad, i) => {
      const a = (-135 * Math.PI) / 180, b = (-45 * Math.PI) / 180, cx = 672, cy = 560;
      r += `<path d="M ${cx + rad * Math.cos(a)} ${cy + rad * Math.sin(a)} A ${rad} ${rad} 0 0 1 ${cx + rad * Math.cos(b)} ${cy + rad * Math.sin(b)}" ${stroke(1 - i * 0.14, 9 - i)} ${i < 2 ? 'filter="url(#glow)"' : ''}/>`;
    });
    r += `<g filter="url(#glow)"><circle cx="672" cy="560" r="26" fill="${G}"/></g>`;
    for (let i = 0; i < 14; i++) { const ang = (-135 + rnd() * 90) * Math.PI / 180, rad = 130 + rnd() * 260; r += `<circle cx="${(672 + rad * Math.cos(ang)).toFixed(0)}" cy="${(560 + rad * Math.sin(ang)).toFixed(0)}" r="${(3 + rnd() * 4).toFixed(1)}" fill="${G}" opacity="${(0.3 + rnd() * 0.5).toFixed(2)}"/>`; }
    return base(r);
  },
  heimnetz() {
    const cx = 672, cy = 392;
    const nodes = [[250, 190, 'tv'], [250, 590, 'phone'], [672, 120, 'laptop'], [672, 670, 'tablet'], [1094, 190, 'speaker'], [1094, 590, 'tv']];
    let r = '';
    nodes.forEach(([x, y], i) => { r += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" ${stroke(i % 2 ? 0.45 : 0.9, 3.5)} ${i % 2 ? 'stroke-dasharray="9 11"' : 'filter="url(#glow)"'}/>`; });
    nodes.forEach(([x, y, k]) => {
      r += `<circle cx="${x}" cy="${y}" r="62" fill="${G}" fill-opacity=".07" stroke="${G}" stroke-opacity=".7" stroke-width="3"/>`;
      if (k === 'tv') r += `<rect x="${x - 30}" y="${y - 22}" width="60" height="38" rx="5" ${stroke(1, 3.5)}/><line x1="${x - 14}" y1="${y + 28}" x2="${x + 14}" y2="${y + 28}" ${stroke(1, 4)}/>`;
      if (k === 'phone') r += `<rect x="${x - 17}" y="${y - 30}" width="34" height="60" rx="8" ${stroke(1, 3.5)}/><line x1="${x - 6}" y1="${y + 20}" x2="${x + 6}" y2="${y + 20}" ${stroke(1, 3)}/>`;
      if (k === 'laptop') r += `<rect x="${x - 30}" y="${y - 22}" width="60" height="38" rx="5" ${stroke(1, 3.5)}/><line x1="${x - 40}" y1="${y + 26}" x2="${x + 40}" y2="${y + 26}" ${stroke(1, 4)}/>`;
      if (k === 'tablet') r += `<rect x="${x - 28}" y="${y - 26}" width="56" height="52" rx="8" ${stroke(1, 3.5)}/>`;
      if (k === 'speaker') r += `<rect x="${x - 18}" y="${y - 30}" width="36" height="60" rx="14" ${stroke(1, 3.5)}/><circle cx="${x}" cy="${y + 8}" r="8" ${stroke(1, 3)}/>`;
    });
    r += `<g filter="url(#glow)"><rect x="${cx - 82}" y="${cy - 34}" width="164" height="68" rx="18" fill="#0a1a12" stroke="${G}" stroke-width="4"/></g><line x1="${cx - 50}" y1="${cy - 34}" x2="${cx - 62}" y2="${cy - 78}" ${stroke(1, 5)}/><line x1="${cx + 50}" y1="${cy - 34}" x2="${cx + 62}" y2="${cy - 78}" ${stroke(1, 5)}/><circle cx="${cx - 40}" cy="${cy}" r="6" fill="${G}"/><circle cx="${cx - 14}" cy="${cy}" r="6" fill="${G}" opacity=".6"/><circle cx="${cx + 12}" cy="${cy}" r="6" fill="${G}" opacity=".35"/>`;
    return base(r);
  },
  legal() {
    let r = `<g filter="url(#glow)"><line x1="672" y1="170" x2="672" y2="600" ${stroke(1, 8)}/><line x1="560" y1="610" x2="784" y2="610" ${stroke(1, 10)}/><line x1="392" y1="250" x2="952" y2="250" ${stroke(1, 8)}/><circle cx="672" cy="170" r="16" fill="${G}"/></g>`;
    [[392, 1], [952, 1]].forEach(([x]) => {
      r += `<line x1="${x}" y1="250" x2="${x - 90}" y2="440" ${stroke(0.6, 3)}/><line x1="${x}" y1="250" x2="${x + 90}" y2="440" ${stroke(0.6, 3)}/><path d="M ${x - 112} 440 H ${x + 112} A 112 70 0 0 1 ${x - 112} 440 Z" fill="${G}" fill-opacity=".14" stroke="${G}" stroke-width="5" stroke-linejoin="round"/>`;
    });
    return base(r);
  },
  testen() {
    let r = `<g filter="url(#glow)"><circle cx="672" cy="384" r="250" ${stroke(0.35, 5)}/><circle cx="672" cy="384" r="250" ${stroke(1, 10)} stroke-dasharray="1570" stroke-dashoffset="0" transform="rotate(-90 672 384)"/></g>`;
    for (let i = 0; i < 24; i++) { const a = (i * 15 - 90) * Math.PI / 180, big = i % 6 === 0; r += `<line x1="${672 + 270 * Math.cos(a)}" y1="${384 + 270 * Math.sin(a)}" x2="${672 + (big ? 310 : 292) * Math.cos(a)}" y2="${384 + (big ? 310 : 292) * Math.sin(a)}" ${stroke(big ? 1 : 0.55, big ? 5 : 3)}/>`; }
    r += `<circle cx="672" cy="384" r="150" fill="${G}" fill-opacity=".08" stroke="${G}" stroke-opacity=".6" stroke-width="3"/><g filter="url(#glow)">${play(690, 384, 150, 1)}</g>`;
    return base(r);
  },
  preise() {
    let r = '';
    [[360, 230, 0.35], [560, 330, 1], [760, 270, 0.55]].forEach(([x, h, o], i) => {
      const y = 640 - h;
      r += `<g ${i === 1 ? 'filter="url(#glow)"' : ''}><rect x="${x}" y="${y}" width="150" height="${h}" rx="22" fill="${G}" fill-opacity="${o * 0.22}" stroke="${G}" stroke-opacity="${o}" stroke-width="${i === 1 ? 4 : 3}"/></g>`;
      for (let k = 1; k < 4; k++) r += `<line x1="${x + 24}" y1="${y + k * (h / 4.4)}" x2="${x + 126}" y2="${y + k * (h / 4.4)}" ${stroke(o * 0.55, 3)}/>`;
      r += `<circle cx="${x + 75}" cy="${y - 52}" r="30" ${stroke(o, 4)}/><circle cx="${x + 75}" cy="${y - 52}" r="15" ${stroke(o * 0.7, 3)}/>`;
    });
    r += `<line x1="300" y1="652" x2="1044" y2="652" ${stroke(0.5, 4)}/>`;
    return base(r);
  },
  chat() {
    let r = `<g><rect x="360" y="330" width="440" height="230" rx="46" fill="${G}" fill-opacity=".05" stroke="${G}" stroke-opacity=".35" stroke-width="3"/><polygon points="420,560 400,640 500,560" fill="#08150f" stroke="${G}" stroke-opacity=".35" stroke-width="3"/></g>`;
    r += `<g filter="url(#glow)"><rect x="520" y="180" width="480" height="250" rx="50" fill="${G}" fill-opacity=".16" stroke="${G}" stroke-width="5"/><polygon points="900,430 940,520 830,430" fill="#0b2a1a" stroke="${G}" stroke-width="5" stroke-linejoin="round"/></g>`;
    [650, 760, 870].forEach((x) => (r += `<circle cx="${x - 20}" cy="305" r="17" fill="${G}"/>`));
    r += `<rect x="410" y="390" width="250" height="10" rx="5" fill="#fff" opacity=".35"/><rect x="410" y="420" width="190" height="10" rx="5" fill="${G}" opacity=".5"/><rect x="410" y="450" width="220" height="10" rx="5" fill="#fff" opacity=".25"/>`;
    return base(r);
  },
};

// ---------------------------------------------------------------- build ----------------------------------------------
async function encode(pipeline, capKB, outPath, fmt = 'webp') {
  let q = 84, buf;
  while (q >= 52) {
    buf = fmt === 'webp' ? await pipeline.clone().webp({ quality: q, effort: 5 }).toBuffer() : await pipeline.clone().jpeg({ quality: q, mozjpeg: true }).toBuffer();
    if (buf.length <= capKB * 1024) break;
    q -= 4;
  }
  fs.writeFileSync(outPath, buf);
  return { bytes: buf.length, quality: q };
}

const entries = [];
for (const [n, id, folder, status, src, alt, cap] of SLOTS) {
  const dir = path.join(OUT, folder);
  fs.mkdirSync(dir, { recursive: true });
  const rec = { n, id, folder, status, source: typeof src === 'string' ? src : null, alt, width: W, height: H, bytes: 0, ext: 'webp' };
  if (status === 'missing' || status === 'fallback') { entries.push(rec); continue; }
  if (status === 'reused') {
    const out = path.join(dir, id + '.webp');
    const r = await encode(sharp(SRC + src).resize(W, H, { fit: 'cover', position: 'centre' }), cap, out);
    rec.bytes = r.bytes;
  } else if (status === 'generated') {
    seed = 7 + n;
    const svg = ART[src]();
    const out = path.join(dir, id + '.webp');
    const r = await encode(sharp(Buffer.from(svg), { density: 96 }).resize(W, H), cap, out);
    rec.bytes = r.bytes;
  } else if (status === 'reused-social') {
    rec.ext = 'jpg'; rec.width = 1200; rec.height = 630;
    const out = path.join(dir, id + '.jpg');
    const r = await encode(sharp(SRC + src).resize(1200, 630, { fit: 'cover', position: 'centre' }), cap, out, 'jpg');
    rec.bytes = r.bytes;
  }
  entries.push(rec);
}

// fallback slots point at the file/alt of an existing, semantically close library image
for (const e of entries) {
  if (e.status !== 'fallback') continue;
  const tgt = entries.find((x) => x.id === e.source);
  Object.assign(e, { folder: tgt.folder, ext: tgt.ext, bytes: tgt.bytes, alt: tgt.alt, width: tgt.width, height: tgt.height, fileId: tgt.id });
}

const ts = `// AUTO-GENERATED by scripts/build-image-library.mjs – do not edit by hand.
// status: reused = existing logo-free photo (optimised) | generated = abstract brand artwork | fallback = reuses a semantically close library image (no dedicated asset yet) | missing = file still to be supplied

export type LibraryStatus = 'reused' | 'generated' | 'missing' | 'fallback' | 'reused-social';

export interface LibraryImage {
  n: number;
  id: string;
  src: string;
  width: number;
  height: number;
  bytes: number;
  status: LibraryStatus;
  alt: string | null;
}

export const IMAGE_LIBRARY: Record<string, LibraryImage> = {
${entries
  .map((e) => `  '${e.id}': { n: ${e.n}, id: '${e.id}', src: '/images/iptv/${e.folder}/${e.fileId ?? e.id}.${e.ext}', width: ${e.width}, height: ${e.height}, bytes: ${e.bytes}, status: '${e.status}', alt: ${e.alt === null ? 'null' : JSON.stringify(e.alt)} },`)
  .join('\n')}
};

export type LibraryImageId = keyof typeof IMAGE_LIBRARY;

/** Returns the library image only if the file exists (status !== 'missing'). */
export function getLibraryImage(id: string): LibraryImage | null {
  const img = IMAGE_LIBRARY[id];
  return img && img.status !== 'missing' ? img : null;
}
`;
fs.writeFileSync('lib/image-library.ts', ts);
fs.writeFileSync(process.env.TEMP + '/image-library.json', JSON.stringify(entries, null, 1));
const cnt = (s) => entries.filter((e) => e.status === s).length;
console.log({ total: entries.length, reused: cnt('reused') + cnt('reused-social'), generated: cnt('generated'), fallback: cnt('fallback'), missing: cnt('missing'), totalKB: Math.round(entries.reduce((a, e) => a + e.bytes, 0) / 1024) });
for (const e of entries) if (e.bytes) console.log(String(e.n).padStart(2), e.id.padEnd(30), (e.bytes / 1024).toFixed(0).padStart(4) + ' KB', e.status);
