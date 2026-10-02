export const SITE_CONFIG = {
  name: "4kdeutsch",
  domain: "https://4kdeutsch.com",
  /** Confirmed business contact details. */
  supportEmail: "support@streamb4.com",
  /** E.164 format (used for schema.org and wa.me). */
  whatsappNumber: "+212625218443",
  /** Human-readable number for the UI. */
  whatsappDisplay: "+212 625 218 443",
  whatsappUrl: "https://wa.me/212625218443",
  /** Display form of the website. */
  websiteDisplay: "4kdeutsch.com",
};

/**
 * 24h free trial (confirmed by the business). Action: request the test access via WhatsApp – there is no separate
 * trial route. Do not add further duration, feature or guarantee claims.
 */
export const TRIAL = {
  label: '24h kostenlos testen',
  url: `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
    'Hallo, ich möchte den 24h kostenlosen Testzugang anfragen. Bitte senden Sie mir die nächsten Schritte.'
  )}`,
};

/** Reseller packages – CONNECTION-based (prices in USD, as specified by the business). */
export const RESELLER_PLANS = [
  { id: 'starter', tier: 'STARTER', connections: 10, price: 100, popular: false, mailSubject: 'Reseller 10 Connections' },
  { id: 'basic', tier: 'BASIC', connections: 20, price: 200, popular: false, mailSubject: 'Reseller 20 Connections' },
  { id: 'popular', tier: 'POPULAR', connections: 50, price: 500, popular: true, mailSubject: 'Reseller 50 Connections' },
  { id: 'pro', tier: 'PRO', connections: 100, price: 1000, popular: false, mailSubject: 'Reseller 100 Connections' },
];

// Social media profile URLs. Leave empty to hide a platform in the footer.
// Fill in the REAL profile URLs — do not invent handles.
export const SOCIAL_LINKS: Record<
  'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'x' | 'linkedin',
  string
> = {
  instagram: "",
  facebook: "",
  youtube: "",
  tiktok: "",
  x: "",
  linkedin: "",
};

export const NAV_LINKS = [
  { label: "Startseite", href: "/" },
  { label: "Tarife & Preise", href: "/pricing" },
  { label: "Kompatible Geräte", href: "/devices" },
  { label: "Funktionen", href: "/features" },
  { label: "FAQ & Hilfe", href: "/faq" },
  { label: "Installationsanleitung", href: "/install" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/contact" }
];

export const STATS = [
  { value: "HD & 4K", label: "je nach Sender und Gerät" },
  { value: "EPG", label: "Programmführer" },
  { value: "Deutsch", label: "Support per WhatsApp & E-Mail" },
  { value: "Ohne Vertrag", label: "monatlich kündbar" }
];

// Identische Leistungen für alle Laufzeiten (1 Bildschirm / SOLO-Paket)
export const PLAN_FEATURES = [
  "Live-Sender in HD/UHD (je nach Sender)",
  "VOD-Mediathek mit Filmen & Serien",
  "Sportkanäle",
  "4K/UHD-Qualität (je nach Sender und Gerät)",
  "Kompatibel mit vielen IPTV-Apps und Geräten",
  "EPG TV-Programmführer inklusive",
  "7 Tage Catch-Up & Mediathek-Pause",
  "VPN-Nutzung grundsätzlich möglich",
  "Zugang per Xtream Codes oder M3U",
  "Automatische Freischaltung nach Zahlung",
  "Deutscher WhatsApp & E-Mail Support",
  "Kein Abo-Zwang & keine autom. Verlängerung"
];

export const PAYMENT_METHODS = [
  "PayPal",
  "Visa",
  "Mastercard",
  "Apple Pay",
  "Google Pay",
  "Bitcoin",
  "USDT",
  "Ethereum"
];

// Preismodell nach Laufzeit (SOLO – 1 Bildschirm)
export const PRICING_PLANS = [
  {
    id: "3-monate",
    name: "3 Monate",
    months: 3,
    price: 40.99,
    perMonth: 13.66,
    discount: "20% Rabatt",
    popular: false
  },
  {
    id: "6-monate",
    name: "6 Monate",
    months: 6,
    price: 55.99,
    perMonth: 9.33,
    discount: "40% Rabatt",
    popular: false
  },
  {
    id: "12-monate",
    name: "12 Monate",
    months: 12,
    price: 70.99,
    perMonth: 5.92,
    discount: "50% Rabatt",
    popular: true
  }
];

export const FEATURES = [
  {
    title: "4K Ultra HD (H.265)",
    description: "Viele Sender und Filme stehen in HD und 4K bereit. Die tatsächliche Qualität hängt von Sender, Gerät und Internetverbindung ab. Der moderne H.265-Codec kann bei gleicher Qualität weniger Bandbreite benötigen.",
    icon: "Tv"
  },
  {
    title: "Stabile Wiedergabe",
    description: "Die Wiedergabe hängt von Ihrer Internetverbindung, Ihrem Gerät und dem jeweiligen Sender ab. Mit LAN-Kabel oder 5-GHz-WLAN und ausreichender Bandbreite lassen sich Live-Übertragungen wie Bundesliga-Konferenzen in der Regel stabil ansehen.",
    icon: "Cpu"
  },
  {
    title: "Große Auswahl an Live-TV",
    description: "Live-Sender aus Deutschland und weiteren Ländern, darunter Sport, Nachrichten und Dokumentationen. Der genaue Senderumfang kann sich ändern.",
    icon: "Radio"
  },
  {
    title: "Filme & Serien auf Abruf",
    description: "VOD-Bibliothek mit Filmen, Dokumentationen und Serien. Verfügbare Tonspuren und Untertitel hängen vom jeweiligen Titel ab.",
    icon: "Play"
  },
  {
    title: "Flexible Nutzung",
    description: "Ihr Zugang funktioniert mit kompatiblen Apps auf verschiedenen Geräten. Ob und wie eine Nutzung im Ausland möglich ist, hängt von Ihrem Netzwerk und den lokalen Gegebenheiten ab.",
    icon: "Globe"
  },
  {
    title: "Universelle Kompatibilität",
    description: "4kdeutsch läuft nahtlos auf all Ihren Geräten. Ob Fire TV Stick, Samsung & LG Smart TV (Tizen/webOS), Apple TV, Android-Boxen, iOS, Android, Windows oder Mac. Einfach per M3U oder Xtream API einrichten.",
    icon: "Laptop"
  }
];

/**
 * Audit 2026-09: these testimonials cannot be verified from the project (avatars are reused
 * across different names, "verified" is hard-coded). Publishing unverifiable reviews is a legal
 * and SEO risk, so the section is hidden. Set to true only once real, attributable reviews replace
 * this data.
 */
export const SHOW_REVIEWS = false;

export const REVIEWS = [
  {
    name: "Markus S. - München, Deutschland",
    avatar: "/avatars/marcus.png",
    rating: 5,
    text: "Vom Kabel gewechselt und keine Sekunde bereut. Der Sport läuft in guter Qualität – so macht Fernsehen endlich wieder Spaß.",
    date: "24. Juli 2026",
    verified: true
  },
  {
    name: "Sarah L. - Berlin, Deutschland",
    avatar: "/avatars/ahmed.png",
    rating: 5,
    text: "Einrichtung auf dem Fire Stick in unter 3 Minuten. Der Support hat sofort per WhatsApp geantwortet – wirklich erstklassiger Service.",
    date: "18. Juli 2026",
    verified: true
  },
  {
    name: "David K. - Hamburg, Deutschland",
    avatar: "/avatars/diana.png",
    rating: 5,
    text: "Riesige Sender- und Filmauswahl in einem einzigen Abo. Das hat mir hunderte Euro im Jahr gespart – absolute Empfehlung.",
    date: "12. Juli 2026",
    verified: true
  },
  {
    name: "Mohamed A. - Frankfurt, Deutschland",
    avatar: "/avatars/marcus.png",
    rating: 5,
    text: "Selbst beim Champions-League-Abend bleibt der Stream absolut stabil. Der EPG-Programmführer funktioniert einwandfrei auf TiviMate. Top.",
    date: "05. Juli 2026",
    verified: true
  }
];

const FAQ_ITEMS_RAW = [
  {
    question: "Was ist 4kdeutsch IPTV und wie funktioniert es?",
    answer: "4kdeutsch ist ein Premium-IPTV-Dienst (Internet Protocol Television), der digitale Fernsehstreams in HD und 4K/UHD über Ihre Internetverbindung anstelle von herkömmlichem Kabel- oder Satellitenanschluss bereitstellt. Sie benötigen lediglich ein internetfähiges Gerät. Nach der Bestellung erhalten Sie Ihre Zugangsdaten vollautomatisch per E-Mail, um sofort loszulegen."
  },
  {
    question: "Gibt es versteckte Kosten oder automatische Verlängerungen?",
    answer: "Nein, bei uns gibt es keine Abo-Fallen oder automatische Verlängerungen. Alle angebotenen Tarife sind Prepaid-Pakete. Sie zahlen einmalig für die gewählte Laufzeit (3, 6 oder 12 Monate) und nach Ablauf der Zeit endet Ihr Zugang automatisch. Sie müssen nicht kündigen, und es erfolgt keine automatische Folgebuchung."
  },
  {
    question: "Wie funktioniert die Erstattung?",
    answer: "Für Verbraucher gilt das gesetzliche Widerrufsrecht. Die Einzelheiten finden Sie in unserer Widerrufsbelehrung und in der Rückerstattungsrichtlinie. Bei technischen Problemen wenden Sie sich bitte zuerst an unseren Support per WhatsApp oder E-Mail."
  },
  {
    question: "Kann ich das IPTV-Abonnement vor dem Kauf kostenlos testen?",
    answer: "Ja, wir möchten, dass Sie sich vor dem Kauf persönlich von unserer Qualität überzeugen. Kontaktieren Sie uns einfach kurz über unseren WhatsApp-Support, um einen kostenlosen und unverbindlichen 24-Stunden-Testzugang zu erhalten. So können Sie Servergeschwindigkeit, Bildqualität und Kanalauswahl auf Ihrem eigenen Gerät risikofrei prüfen."
  },
  {
    question: "Welche Geräte werden unterstützt?",
    answer: "Unsere Abonnements sind mit nahezu jedem Gerät kompatibel: Amazon Fire TV Sticks, Smart-TVs (Samsung, LG, Sony, Philips), Android TV & Google TV Boxen, Apple TV, Smartphones & Tablets (iOS, Android) sowie PCs und Laptops. In unserem Installationsbereich finden Sie Schritt-für-Schritt-Anleitungen für alle Systeme."
  },
  {
    question: "Wie schnell erhalte ich meine Zugangsdaten nach der Zahlung?",
    answer: "Die Bereitstellung erfolgt vollautomatisch in Echtzeit. Unmittelbar nach erfolgreicher Zahlung (z. B. per PayPal oder Kreditkarte) erhalten Sie eine E-Mail mit Ihrem M3U-Wiedergabelisten-Link sowie Ihren Xtream-API-Zugangsdaten (Server-URL, Benutzername, Passwort) für Ihre bevorzugte IPTV-App."
  },
  {
    question: "Welche Internetgeschwindigkeit benötige ich für 4K-Streaming?",
    answer: "Für Standard-HD-Kanäle genügt eine stabile Internetverbindung von 15 Mbit/s. Für ein flüssiges, stabiles Streaming-Erlebnis von Live-Sport und VOD-Inhalten in HD und 4K/UHD empfehlen wir eine Bandbreite von mindestens 25 bis 50 Mbit/s. Eine Verbindung per LAN-Kabel oder über ein 5 GHz WLAN wird empfohlen."
  },
  {
    question: "Welche Zahlungsmethoden werden akzeptiert?",
    answer: "Wir bieten Ihnen eine Vielzahl an sicheren Zahlungsoptionen: PayPal, Kreditkarte (Visa, Mastercard), Apple Pay, Google Pay sowie führende Kryptowährungen wie Bitcoin, Ethereum und USDT. Alle Transaktionen sind SSL-verschlüsselt und absolut sicher."
  },
  {
    question: "Für wie viele Geräte bzw. Bildschirme gilt ein Tarif?",
    answer: "Jeder Standard-Tarif (SOLO-Paket) gilt für 1 aktive Verbindung auf einem Gerät zur gleichen Zeit. Sie können die Zugangsdaten zwar auf mehreren Geräten (z. B. Smart-TV und Smartphone) einrichten, dürfen jedoch nur auf einem Gerät gleichzeitig streamen. Wenn Sie mehrere gleichzeitige Verbindungen benötigen, kontaktieren Sie uns für ein individuelles WhatsApp-Angebot."
  },
  {
    question: "Ist die Nutzung von VPNs erlaubt?",
    answer: "Eine VPN-Nutzung ist grundsätzlich möglich. Ob und wie gut sie funktioniert, hängt vom VPN-Anbieter und Ihrer Verbindung ab. Bei Problemen schalten Sie das VPN testweise aus."
  },
  {
    question: "Worauf sollte ich bei einem IPTV Anbieter achten?",
    answer: "Achten Sie auf transparente Preise und Laufzeiten, klare Angaben zu Verlängerung und Erstattung, einen erreichbaren Support, nachvollziehbare Zahlungswege und darauf, dass keine unrealistischen Versprechen gemacht werden. Sehr günstige „Komplettpakete“ sind ein Warnsignal. Ausführliche Kriterien finden Sie im IPTV Anbieter Vergleich."
  },
  {
    question: "Was ist der Unterschied zwischen M3U und Xtream Codes?",
    answer: "Ein M3U-Link ist eine Playlist-Adresse, die Ihre IPTV-App lädt. Bei Xtream Codes geben Sie Server-URL, Benutzername und Passwort getrennt ein. Beide Wege führen zur Senderliste; welche Option Ihre App bietet, sehen Sie beim Hinzufügen einer Playlist."
  },
  {
    question: "Brauche ich eine IPTV Box, oder reicht eine IPTV App?",
    answer: "In der Regel genügt eine IPTV-App auf einem Smart TV, Fire TV Stick, Android-TV-Gerät, Apple TV oder Smartphone. Eine separate IPTV-Box (z. B. MAG-Box) ist nicht zwingend nötig. Ein herkömmlicher Sat- oder Kabel-Receiver empfängt IPTV nicht, weil die Übertragung über das Internet erfolgt."
  },
  {
    question: "Welche IPTV App bzw. welcher IPTV Player ist der richtige?",
    answer: "Das hängt von Ihrem Gerät ab. Auf Fire TV und Android TV sind zum Beispiel TiviMate oder IPTV Smarters Pro gängige Optionen, auf Samsung und LG etwa Smart IPTV oder IBO Player. Die Verfügbarkeit kann je nach Gerät, Modell und Region variieren – unsere Übersicht zeigt, welche App auf welchem Gerät eingerichtet werden kann."
  }
];

/** FAQ without duplicate questions (the raw list repeated several of them). First occurrence wins. */
export const FAQ_ITEMS = FAQ_ITEMS_RAW.filter(
  (item, i, arr) => arr.findIndex((x) => x.question.trim().toLowerCase() === item.question.trim().toLowerCase()) === i
);

/** Compact FAQ for the home page (schema and visible content are identical). */
export const HOME_FAQ_ITEMS = FAQ_ITEMS.slice(0, 12);


export const SPORTS_CATEGORIES = [
  { name: "Fußball (Bundesliga & Int.)", leagues: ["1. & 2. Bundesliga", "UEFA Champions League", "Premier League", "La Liga", "Serie A"] },
  { name: "US-Sport", leagues: ["NFL (Super Bowl)", "NBA", "MLB", "NHL"] },
  { name: "Kampfsport", leagues: ["UFC Pay-Per-View", "WBA/WBC Box-Weltmeisterschaften"] },
  { name: "Motorsport", leagues: ["Formel 1", "MotoGP", "NASCAR"] },
  { name: "Andere Sportarten", leagues: ["Tennis (Wimbledon, US Open)", "Darts-Weltmeisterschaft", "Golf PGA Tour"] }
];

export const DEVICES = [
  { name: "Amazon Firestick & Fire TV", icon: "Tv", description: "Kompatibel mit TiviMate, IPTV Smarters Pro und Downloader-Einrichtungen." },
  { name: "Smart-TVs (Samsung / LG / Sony)", icon: "Monitor", description: "Verwenden Sie Apps wie Smart IPTV, Ibo Player oder IPTV Smarters." },
  { name: "Apple TV & iOS-Geräte", icon: "Smartphone", description: "Kompatibel mit GSE Smart IPTV, IPTV Smarters oder Snappy-Playern." },
  { name: "Android TV & Android-Boxen", icon: "Cpu", description: "Unterstützt TiviMate, XCIPTV und allgemeine Android-Anwendungen." },
  { name: "MAG-Boxen & Enigma2", icon: "Radio", description: "Unterstützt Portal-Konfigurationen über die MAC-Adresse des Geräts." },
  { name: "PC & Mac Computer", icon: "Laptop", description: "Streamen Sie direkt über den VLC Player oder unsere responsive Webplayer-Oberfläche." }
];

export const FAQ_PAGE_ITEMS = [
  {
    question: "Was genau ist IPTV und wie funktioniert es?",
    answer: "IPTV steht für Internet Protocol Television. Dabei werden Fernsehprogramme und Video-Inhalte digital über eine Breitband-Internetverbindung übertragen, anstatt über traditionelle Kabelanschlüsse, Satellitenschüsseln oder terrestrische Antennen. Die Daten werden in IP-Pakete verpackt und in Echtzeit an Ihren Mediaplayer bzw. Ihre IPTV-App gestreamt."
  },
  {
    question: "Ist die Nutzung von IPTV in Deutschland legal?",
    answer: "Die IPTV-Technologie selbst ist absolut legal (wie z. B. Telekom MagentaTV oder Waipu.tv). Entscheidend für die Rechtmäßigkeit ist, ob der Anbieter die Ausstrahlungsrechte für die übertragenen Sender besitzt. 4kdeutsch bietet verschlüsselte Serververbindungen und transparente Tarife ohne versteckte Verträge. Wir weisen darauf hin, dass die rechtliche Verantwortung für den Empfang urheberrechtlich geschützter Kanäle stets beim Nutzer liegt und wir den Dienst primär als technische Infrastruktur bereitstellen."
  },
  {
    question: "Welche Internetgeschwindigkeit ist für IPTV erforderlich?",
    answer: "Für Standard-Definition (SD) reichen 8-10 Mbit/s. Für Full HD (1080p) benötigen Sie mindestens 15 Mbit/s. Um hochauflösende Live-Sport-Events oder Filme in 4K Ultra HD stabil streamen zu können, empfehlen wir eine stabile Verbindung von 25-50 Mbit/s."
  },
  {
    question: "Benötige ich für die Nutzung einen bestimmten Internetanbieter?",
    answer: "Nein. 4kdeutsch ist vollkommen unabhängig von Ihrem Internetanbieter (ISP). Sie können unseren Dienst über jeden Breitbandanschluss (Telekom, Vodafone, 1&1, O2 etc.) sowie über Kabel-Internet, DSL, Glasfaser, LTE/5G oder Satelliten-Internet (z.B. Starlink) nutzen."
  },
  {
    question: "Wie schnell nach dem Kauf wird mein Zugang freigeschaltet?",
    answer: "Die Freischaltung erfolgt vollautomatisch in Echtzeit. Unmittelbar nach Abschluss des Zahlungsvorgangs generiert unser System Ihre persönlichen Zugangsdaten und sendet Ihnen eine Bestätigungs-E-Mail mit Ihrem M3U-Wiedergabelisten-Link sowie Ihren Xtream Codes API-Zugangsdaten (Server-URL, Benutzername, Passwort)."
  },
  {
    question: "Welche Zahlungsmethoden stehen zur Verfügung?",
    answer: "Wir bieten Ihnen eine Auswahl an sicheren und verschlüsselten Zahlungsmethoden: PayPal, Kreditkarten (Visa, Mastercard, American Express), Apple Pay, Google Pay sowie führende Kryptowährungen wie Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC) und USDT (TRC20)."
  },
  {
    question: "Gibt es eine automatische Verlängerung oder versteckte Kosten?",
    answer: "Nein. Alle unsere Tarife sind Prepaid-Pakete. Sie zahlen einmalig für die ausgewählte Laufzeit (3, 6 oder 12 Monate). Nach Ablauf dieser Zeit endet Ihr Zugang automatisch. Es gibt keine automatischen Verlängerungen, keine Abonnement-Fallen und Sie müssen nicht kündigen."
  },
  {
    question: "Bieten Sie einen kostenlosen Testzugang an?",
    answer: "Ja. Wir bieten Ihnen die Möglichkeit, unseren Service 24 Stunden lang kostenlos und unverbindlich zu testen. So können Sie die Serverstabilität und Bildqualität auf Ihrem eigenen Gerät prüfen. Schreiben Sie uns dazu einfach eine kurze Nachricht über unseren WhatsApp-Support."
  },
  {
    question: "Wie funktioniert die Erstattung?",
    answer: "Für Verbraucher gilt das gesetzliche Widerrufsrecht. Die Einzelheiten finden Sie in unserer Widerrufsbelehrung und in der Rückerstattungsrichtlinie. Bei technischen Problemen wenden Sie sich bitte zuerst an unseren Support per WhatsApp oder E-Mail."
  },
  {
    question: "Welche Geräte werden unterstützt?",
    answer: "Unser Dienst ist universell kompatibel. Er läuft auf Amazon Fire TV Sticks, Smart-TVs (Samsung, LG, Sony, Philips, Panasonic), Android TV-Boxen (Nvidia Shield, Xiaomi Mi Box), Apple TV, Smartphones und Tablets (iOS & Android), Computern (Windows, macOS, Linux) sowie MAG-Boxen und Linux-Receivern (Enigma2)."
  },
  {
    question: "Welche IPTV-App ist die beste für den Fire TV Stick?",
    answer: "Für den Amazon Fire TV Stick empfehlen wir wärmstens TiviMate (Premium-Version) oder IPTV Smarters Pro. Beide Apps bieten eine moderne Benutzeroberfläche, schnelles Zappen, vollständige EPG-Unterstützung und eine hervorragende Integration unserer Xtream Codes API."
  },
  {
    question: "Welche App nutze ich am besten auf einem Samsung oder LG Smart-TV?",
    answer: "Auf Smart-TVs mit Tizen OS (Samsung) oder webOS (LG) sind die Apps IPTV Smarters Pro, IBO Player, Smart IPTV oder Set IPTV die beste Wahl. Sie finden diese direkt im integrierten App-Store Ihres Fernsehers."
  },
  {
    question: "Wie richte ich IPTV auf dem Apple TV (tvOS) ein?",
    answer: "Laden Sie aus dem Apple TV App Store eine kompatible IPTV-App wie IPTVX, TiviMax oder Smarters Player Lite herunter. Öffnen Sie die App, wählen Sie 'Xtream Codes API hinzufügen' und tragen Sie Ihre Server-URL sowie Benutzername und Passwort ein."
  },
  {
    question: "Kann ich denselben Zugang auf mehreren Geräten gleichzeitig nutzen?",
    answer: "Das standardmäßige SOLO-Paket ist für 1 aktive Verbindung ausgelegt. Sie können Ihre Zugangsdaten zwar auf mehreren Geräten einrichten (z.B. Fernseher und Smartphone), dürfen jedoch nur auf einem Gerät gleichzeitig streamen. Wenn Sie mehrere gleichzeitige Streams benötigen, kontaktieren Sie uns für ein Multi-Screen-Angebot."
  },
  {
    question: "Was ist der EPG (Electronic Program Guide) und ist er enthalten?",
    answer: "Ja, der EPG (elektronische Programmführer) ist in jedem Paket kostenlos enthalten. Er liefert Ihnen Echtzeit-Informationen zum aktuellen und kommenden TV-Programm inklusive Sendungstiteln, Beschreibungen und Sendezeiten. Die EPG-Daten werden automatisch über unsere Server geladen."
  },
  {
    question: "Was ist der Unterschied zwischen M3U und Xtream Codes API?",
    answer: "Ein M3U-Link ist eine Textdatei, die alle Kanallisten als URLs enthält. Die Xtream Codes API ist ein modernerer Verbindungsstandard, der die Zugangsdaten in Server-URL, Benutzername und Passwort aufteilt. Wir empfehlen die Nutzung der Xtream Codes API, da sie stabiler lädt und EPG-Daten zuverlässiger synchronisiert."
  },
  {
    question: "Unterstützt Ihr Dienst die Catch-Up-Funktion (zeitversetztes Fernsehen)?",
    answer: "Ja, für die meisten wichtigen deutschen und internationalen Sender bieten wir eine 7-tägige Catch-Up-Funktion (Aufnahme-Archiv). Sie können verpasste Sendungen, Filme oder Sport-Events der letzten 7 Tage jederzeit nachträglich starten, pausieren oder vorspulen."
  },
  {
    question: "Gibt es eine integrierte Aufnahmefunktion (Cloud-Rekorder)?",
    answer: "Unser Server stellt das Catch-Up-Archiv bereit. Wenn Sie Sendungen permanent aufnehmen möchten, unterstützen viele Player-Apps (wie TiviMate Premium) eine lokale Aufnahmefunktion. Sie können damit Sendungen auf einem USB-Stick oder einem Netzwerkspeicher (NAS) aufzeichnen."
  },
  {
    question: "Sind alle Sport-Events und Bundesliga-Spiele enthalten?",
    answer: "Sportkanäle sind Teil des Angebots. Welche Wettbewerbe und Übertragungen aktuell enthalten sind, klären Sie bitte vor der Bestellung mit unserem Support. Die Qualität hängt von Sender, Gerät und Internetverbindung ab."
  },
  {
    question: "Welche Tonspuren und Audiosprachen sind verfügbar?",
    answer: "Für unsere VOD-Mediathek (Filme & Serien) bieten wir standardmäßig die deutsche Tonspur sowie die englische Original-Tonspur (O-Ton) an. Bei vielen Sendern und Filmen können Sie zudem Untertitel aktivieren oder die Tonspur direkt im Player umschalten."
  },
  {
    question: "Kann ich den IPTV-Dienst auch im Ausland nutzen?",
    answer: "Die Nutzung im Ausland ist technisch abhängig von Ihrem Netzwerk und den lokalen Gegebenheiten. Wenn Sie den Dienst auf Reisen nutzen möchten, wenden Sie sich vorab an unseren Support."
  },
  {
    question: "Benötige ich zwingend ein VPN für IPTV?",
    answer: "Nein, ein VPN ist für die Nutzung von 4kdeutsch nicht zwingend erforderlich, da all unsere Streams über gesicherte und verschlüsselte Protokolle übertragen werden. Die Nutzung eines VPNs kann jedoch hilfreich sein, um Drosselungen Ihres lokalen Internetanbieters zu umgehen."
  },
  {
    question: "Ist Ihr Dienst mit VPNs kompatibel?",
    answer: "Eine VPN-Nutzung ist grundsätzlich möglich. Ob und wie gut es funktioniert, hängt vom VPN-Anbieter, dem gewählten Server und Ihrer Verbindung ab. Bei Problemen schalten Sie das VPN testweise aus."
  },
  {
    question: "Warum ruckelt oder puffert mein Stream gelegentlich?",
    answer: "Pufferung entsteht meist durch eine Schwankung Ihrer lokalen Internetleitung, WLAN-Interferenzen oder Drosselungen durch Ihren Provider. Lösungsansätze: Verbinden Sie Ihr Gerät per LAN-Kabel, wechseln Sie auf das stabilere 5 GHz WLAN, starten Sie Ihren Router neu oder aktivieren Sie testweise ein VPN."
  },
  {
    question: "Wie aktualisiere ich die Senderliste und das EPG?",
    answer: "Moderne IPTV-Apps aktualisieren die Senderliste und die EPG-Daten bei jedem Start der Anwendung automatisch im Hintergrund. Sie können die Aktualisierung in den Einstellungen Ihrer App (z. B. unter 'Playlists' oder 'EPG') auch manuell erzwingen."
  },
  {
    question: "Was mache ich, wenn ein bestimmter Sender nicht funktioniert?",
    answer: "Sender können vorübergehend ausfallen, zum Beispiel wegen einer Störung der Quelle. Prüfen Sie zunächst, ob andere Sender funktionieren. Melden Sie den betroffenen Sender anschließend an unseren Support per WhatsApp oder E-Mail – wir schauen uns die Quelle an."
  },
  {
    question: "Wie kann ich mein Abonnement nach Ablauf verlängern?",
    answer: "Da wir keine automatische Abbuchungen durchführen, verlängert sich Ihr Zugang nicht von selbst. Um Ihr Abo zu verlängern, besuchen Sie vor Ablauf einfach erneut unsere Website, wählen Sie den gewünschten Tarif und schließen Sie den Kauf ab. Ihre bestehende Kanalliste bleibt dabei erhalten."
  },
  {
    question: "Was ist der Unterschied zwischen 4kdeutsch und günstigeren IPTV-Anbietern?",
    answer: "Anbieter unterscheiden sich bei Preis, Sendervielfalt, Einrichtung und Support. 4kdeutsch setzt auf transparente Preise ohne Vertrag, viele kompatible Geräte und deutschsprachigen Support. Vergleichen Sie Anbieter immer anhand der konkreten Bedingungen."
  },
  {
    question: "Sind meine persönlichen Daten bei Ihnen sicher?",
    answer: "Wir verarbeiten Ihre Daten nach den Vorgaben unserer Datenschutzerklärung. Die Website wird über eine verschlüsselte HTTPS-Verbindung ausgeliefert. Details zu Zweck, Umfang und Empfängern der Datenverarbeitung finden Sie in der Datenschutzerklärung."
  },
  {
    question: "Wie richte ich IPTV auf einer MAG-Box ein?",
    answer: "Senden Sie uns nach dem Kauf die MAC-Adresse Ihrer MAG-Box per E-Mail oder WhatsApp. Wir tragen diese in unser System ein. Tragen Sie anschließend in den Portaleinstellungen Ihrer MAG-Box unsere Portal-URL ein und starten Sie das Gerät neu."
  },
  {
    question: "Welche Internet-Latenz (Ping) ist optimal für IPTV?",
    answer: "Für Live-TV und insbesondere Live-Sport ist eine niedrige Latenz (Ping) zum Server entscheidend. Ein niedriger Ping (etwa unter 30 ms) ist günstig, Werte bis etwa 60 ms sind meist unkritisch. Sie können die Latenz verbessern, indem Sie eine Kabelverbindung statt WLAN nutzen."
  },
  {
    question: "Kann ich Kanäle in Favoritenlisten organisieren?",
    answer: "Ja. Fast jede moderne IPTV-App (wie TiviMate oder IPTV Smarters) bietet die Möglichkeit, eigene Favoritenlisten zu erstellen. Sie können Ihre meistgesehenen Sender markieren, um schnell darauf zuzugreifen, ohne die gesamte Senderliste durchsuchen zu müssen."
  },
  {
    question: "Wie unterscheidet sich H.265 von älteren Codecs?",
    answer: "H.265 (auch HEVC genannt) ist ein moderner Videokompressionsstandard. Er benötigt bei gleicher Bildqualität etwa 50% weniger Bandbreite als der ältere H.264-Standard. Das bedeutet, dass Sie hochauflösende 4K-Inhalte auch mit einer schwächeren Internetverbindung flüssig streamen können."
  },
  {
    question: "Was passiert, wenn ich mit dem Service unzufrieden bin?",
    answer: "Für Verbraucher gilt das gesetzliche Widerrufsrecht. Die Einzelheiten finden Sie in unserer Widerrufsbelehrung und in der Rückerstattungsrichtlinie. Bei technischen Problemen wenden Sie sich bitte zuerst an unseren Support per WhatsApp oder E-Mail."
  },
  {
    question: "Worauf sollte ich bei einem IPTV Anbieter achten?",
    answer: "Achten Sie auf transparente Preise und Laufzeiten, klare Angaben zu Verlängerung und Erstattung, einen erreichbaren Support, nachvollziehbare Zahlungswege und darauf, dass keine unrealistischen Versprechen gemacht werden. Sehr günstige „Komplettpakete“ sind ein Warnsignal. Ausführliche Kriterien finden Sie im IPTV Anbieter Vergleich."
  },
  {
    question: "Was ist der Unterschied zwischen M3U und Xtream Codes?",
    answer: "Ein M3U-Link ist eine Playlist-Adresse, die Ihre IPTV-App lädt. Bei Xtream Codes geben Sie Server-URL, Benutzername und Passwort getrennt ein. Beide Wege führen zur Senderliste; welche Option Ihre App bietet, sehen Sie beim Hinzufügen einer Playlist."
  },
  {
    question: "Brauche ich eine IPTV Box, oder reicht eine IPTV App?",
    answer: "In der Regel genügt eine IPTV-App auf einem Smart TV, Fire TV Stick, Android-TV-Gerät, Apple TV oder Smartphone. Eine separate IPTV-Box (z. B. MAG-Box) ist nicht zwingend nötig. Ein herkömmlicher Sat- oder Kabel-Receiver empfängt IPTV nicht, weil die Übertragung über das Internet erfolgt."
  },
  {
    question: "Welche IPTV App bzw. welcher IPTV Player ist der richtige?",
    answer: "Das hängt von Ihrem Gerät ab. Auf Fire TV und Android TV sind zum Beispiel TiviMate oder IPTV Smarters Pro gängige Optionen, auf Samsung und LG etwa Smart IPTV oder IBO Player. Die Verfügbarkeit kann je nach Gerät, Modell und Region variieren – unsere Übersicht zeigt, welche App auf welchem Gerät eingerichtet werden kann."
  }
];
