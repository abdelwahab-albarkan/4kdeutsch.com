export interface Device {
  slug: string;
  name: string;
  /** Rough platform family; used to vary troubleshooting advice. */
  category: 'box' | 'smart-tv' | 'apple' | 'mobile';
  /** Where users install apps on this device. */
  store: string;
  /** Device-specific practical tip (no version or spec claims). */
  tip: string;
  /** Existing device landing page, for internal links. */
  page: string;
  /** Navigation / operation hint for the remote or touch input. */
  nav: string;
  /** How to restart the device. */
  restart: string;
  /** How to clear an app cache (or the closest equivalent). */
  cache: string;
  /** How to remove and reinstall an app. */
  reinstall: string;
  /** Where network settings live. */
  network: string;
  /** Preparation steps before installing an IPTV app. */
  prep: string[];
}

export interface IptvApp {
  slug: string;
  name: string;
  /** Existing dedicated page for this app, if any (avoid cannibalising it). */
  existingPage?: string;
  /** How the user signs in with our credentials. */
  login: string;
  strength: string;
  devices: string[];
  /** Per-device install source when it differs from the device's default store. */
  installOverride?: Record<string, string>;
  /** Hub-only apps (no per-device combination pages) carry their own guide content. */
  guide?: AppGuide;
  /** Additional sections rendered on the app hub page. */
  extra?: AppSection[];
}

export interface AppSection {
  title: string;
  paragraphs: string[];
}

export interface AppGuide {
  about: string[];
  steps: string[];
  notes: string[];
  faq: { question: string; answer: string }[];
}

/** Extra, device-specific sections for app×device pages that have keyword evidence (keeps them distinct from sibling pages). */
export const COMBO_EXTRA: Record<string, AppSection[]> = {
  'iptv-smarters-pro/samsung-tv': [
    {
      title: 'Besonderheiten auf Samsung Smart TVs',
      paragraphs: [
        'Samsung-Fernseher nutzen das Betriebssystem Tizen. Welche Apps im Samsung App Store erscheinen, hängt von Modell, Baujahr und Region ab – Smarters Pro ist daher nicht auf jedem Modell auffindbar.',
        'Die Texteingabe mit der Fernbedienung ist mühsam: Halten Sie Server-URL, Benutzername und Passwort bereit und tippen Sie sie in Ruhe ein. Achten Sie auf Groß- und Kleinschreibung sowie auf das Protokoll (http/https) in der Server-URL.',
        'Finden Sie die App nicht, hilft die Anleitung „App nicht im Store gefunden“; alternativ sind Player mit Web-Portal-Anmeldung, etwa Smart IPTV oder IBO Player, eine Option.',
      ],
    },
  ],
  'iptv-smarters-pro/android-tv': [
    {
      title: 'Besonderheiten auf Android TV',
      paragraphs: [
        'Auf Android TV und Google TV finden Sie Smarters Pro in der Regel direkt im Google Play Store. Bei Android-Boxen ohne Play Store erfolgt die Installation häufig über eine APK-Datei der Herstellerseite – laden Sie Dateien nur aus vertrauenswürdigen Quellen.',
        'Die Bedienung erfolgt per Steuerkreuz der Fernbedienung. Der Programmführer (EPG) erscheint nur, wenn die Playlist entsprechende Daten enthält; er lässt sich in der App nachladen.',
        'Bei Ruckeln hilft oft ein kabelgebundener Netzwerkanschluss statt WLAN.',
      ],
    },
  ],
  'iptv-smarters-pro/android-handy': [
    {
      title: 'Smarters Pro auf Smartphone und Tablet: Play Store oder APK?',
      paragraphs: [
        'Installieren Sie die App bevorzugt aus dem Google Play Store. Wer eine APK-Datei verwendet, sollte nur Dateien von der offiziellen Herstellerseite nutzen – Dateien aus unbekannten Quellen können Schadsoftware enthalten. Die Option „Unbekannte Quellen“ sollte nach der Installation wieder deaktiviert werden.',
        'Unterwegs verbraucht Live-TV mobile Daten. Nutzen Sie WLAN oder prüfen Sie Ihr Datenvolumen; in der App lässt sich die Streaming-Qualität bei Bedarf senken.',
        'Auf dem Tablet profitieren Sie vom größeren Bildschirm, der Akku sinkt bei hoher Helligkeit jedoch schnell. Für die Wiedergabe auf dem Fernseher ist ein Smart-TV oder eine TV-Box meist die stabilere Lösung.',
      ],
    },
  ],
  'smart-iptv/samsung-tv': [
    {
      title: 'Smart IPTV auf Samsung: MAC-Adresse und Playlist-Upload',
      paragraphs: [
        'Smart IPTV arbeitet mit der MAC-Adresse Ihres Fernsehers: Sie notieren die in der App angezeigte Adresse und laden Ihre Playlist im Web-Portal des Herstellers hoch. Die Anmeldung per Benutzername und Passwort wie bei Xtream-Apps entfällt.',
        'Nach dem Upload starten Sie die App neu, damit die Playlist geladen wird. Ändert sich Ihr Playlist-Link, muss er im Portal erneut hinterlegt werden.',
        'Ob die App kostenlos genutzt werden kann oder nach einer Testphase eine einmalige Aktivierung verlangt, steht in den aktuellen Angaben der App. Prüfen Sie das vor der Einrichtung.',
      ],
    },
  ],
};

/** Shown wherever an app is said to be available on a device. */
export const AVAILABILITY_NOTE = 'Die Verfügbarkeit kann je nach Gerät, Modell und Region variieren.';

/** Shown wherever menu paths appear – they differ by model, OS version and region. */
export const MENU_NOTE = 'Die Menübezeichnungen können je nach Modell und Software-Version abweichen.';

export const DEVICES: Device[] = [
  {
    slug: 'fire-stick',
    name: 'Fire Stick',
    category: 'box',
    store: 'den Amazon Appstore (alternativ per Downloader-App)',
    tip: 'Für flüssiges Streaming empfehlen wir 5-GHz-WLAN oder einen Ethernet-Adapter und ausreichend freien Speicherplatz auf dem Stick.',
    page: '/iptv-fire-stick',
    nav: 'Die Fire-TV-Fernbedienung steuert die App über das Steuerkreuz; Wiedergabe- und Menütasten wechseln zwischen Sendern und Optionen.',
    restart: 'Einstellungen > Mein Fire TV > Neu starten',
    cache: 'Einstellungen > Anwendungen > Installierte Anwendungen verwalten > App auswählen > Cache leeren',
    reinstall: 'Unter „Installierte Anwendungen verwalten“ die App deinstallieren und danach erneut aus dem Appstore installieren',
    network: 'Einstellungen > Netzwerk',
    prep: [
      'Fire Stick mit dem WLAN oder per Ethernet-Adapter verbinden.',
      'Unter Einstellungen > Mein Fire TV > Info nach Systemupdates suchen.',
      'Freien Speicherplatz prüfen und nicht mehr benötigte Apps deinstallieren.',
      'Nur wenn eine App nicht im Appstore verfügbar ist: Installation aus unbekannten Quellen ausschließlich für die genutzte Downloader-App erlauben und Apps nur von vertrauenswürdigen Quellen laden.',
    ],
  },
  {
    slug: 'android-tv',
    name: 'Android TV',
    category: 'box',
    store: 'den Google Play Store',
    tip: 'Mit der Sprachsuche der Fernbedienung finden Sie Sender und Apps besonders schnell.',
    page: '/iptv-android-tv',
    nav: 'Die Fernbedienung mit Steuerkreuz und Google-Assistant-Taste erlaubt Sprachsuche direkt in vielen Apps.',
    restart: 'Einstellungen > System > Neu starten',
    cache: 'Einstellungen > Apps > Alle Apps anzeigen > App auswählen > Cache leeren',
    reinstall: 'In den App-Einstellungen deinstallieren und danach erneut aus dem Google Play Store laden',
    network: 'Einstellungen > Netzwerk & Internet',
    prep: [
      'Fernseher oder Box mit dem Internet verbinden (LAN oder 5-GHz-WLAN).',
      'Im Google Play Store nach App-Updates suchen und Systemupdates installieren.',
      'Mit einem Google-Konto anmelden, damit der Play Store Apps laden kann.',
      'Genügend freien Speicher sicherstellen.',
    ],
  },
  {
    slug: 'samsung-tv',
    name: 'Samsung Smart TV',
    category: 'smart-tv',
    store: 'den Samsung Smart Hub (Apps)',
    tip: 'Auf Samsung-Fernsehern läuft alles direkt am TV – ohne zusätzliche Box.',
    page: '/iptv-samsung-tv',
    nav: 'Die Samsung-Fernbedienung bedient die App über Steuerkreuz und Auswahltaste; die Menüführung kann je nach Modell abweichen.',
    restart: 'Fernseher ausschalten, vom Strom trennen, etwa 30 Sekunden warten und wieder einschalten',
    cache: 'Ein separater Cache-Knopf ist bei Smart-TV-Apps meist nicht vorhanden – die App löschen und neu installieren',
    reinstall: 'Im Smart Hub bzw. in den App-Einstellungen die App auswählen, löschen und erneut installieren',
    network: 'In den Einstellungen unter „Netzwerk“ (je nach Modell unter „Allgemein“)',
    prep: [
      'Fernseher mit dem Netzwerk verbinden und die Verbindung unter den Netzwerkeinstellungen testen.',
      'Die Firmware des Fernsehers aktualisieren (in den Einstellungen unter „Support“ bzw. „Software-Update“).',
      'Datum, Uhrzeit und Region korrekt einstellen, damit der Smart Hub Apps laden kann.',
      'Bei Bedarf mit einem Samsung-Konto anmelden.',
    ],
  },
  {
    slug: 'lg-tv',
    name: 'LG Smart TV',
    category: 'smart-tv',
    store: 'den LG Content Store',
    tip: 'Die Magic Remote von LG erleichtert das Navigieren durch lange Senderlisten.',
    page: '/iptv-lg-tv',
    nav: 'Mit der Magic Remote steuern Sie die App per Zeiger; alternativ funktioniert das Steuerkreuz.',
    restart: 'Fernseher ausschalten, vom Strom trennen, etwa 30 Sekunden warten und wieder einschalten',
    cache: 'Ein separater Cache-Knopf ist bei webOS-Apps meist nicht vorhanden – die App löschen und neu installieren',
    reinstall: 'Im Startmenü die App auswählen, über die Bearbeiten- bzw. Löschen-Option entfernen und erneut aus dem LG Content Store installieren',
    network: 'In den Einstellungen unter „Netzwerk“ (meist unter „Alle Einstellungen“)',
    prep: [
      'Fernseher per LAN oder WLAN verbinden und die Verbindung im Netzwerkmenü prüfen.',
      'Software-Update des Fernsehers ausführen (in den Einstellungen unter „Support“ bzw. „Software-Update“).',
      'Datum, Uhrzeit und Land richtig einstellen, damit der Content Store erreichbar ist.',
      'Bei Bedarf mit einem LG-Konto anmelden.',
    ],
  },
  {
    slug: 'apple-tv',
    name: 'Apple TV',
    category: 'apple',
    store: 'den App Store auf dem Apple TV',
    tip: 'Die Siri Remote ermöglicht schnelles Umschalten und Suchen per Sprache.',
    page: '/iptv-apple-tv',
    nav: 'Die Siri Remote steuert per Touchfläche; ein Wisch wechselt durch Listen, ein Klick wählt einen Sender.',
    restart: 'Einstellungen > System > Neustart',
    cache: 'Ein Cache-Knopf ist nicht vorhanden – die App löschen und neu installieren',
    reinstall: 'App auf dem Home-Bildschirm gedrückt halten, „App löschen“ wählen und erneut aus dem App Store laden',
    network: 'Einstellungen > Netzwerk',
    prep: [
      'Apple TV per Ethernet oder WLAN verbinden.',
      'tvOS aktualisieren (in den Einstellungen unter „System“ bzw. „Softwareupdates“).',
      'Mit der Apple-ID anmelden, damit Apps aus dem App Store geladen werden können.',
    ],
  },
  {
    slug: 'iphone-ipad',
    name: 'iPhone & iPad',
    category: 'mobile',
    store: 'den App Store',
    tip: 'Per AirPlay können Sie das Bild – sofern die App es unterstützt – auf einen Fernseher übertragen.',
    page: '/devices',
    nav: 'Die Bedienung erfolgt per Touch; Senderlisten scrollen Sie per Wischen, Vollbild öffnen Sie per Tippen.',
    restart: 'Gerät ausschalten und nach kurzer Wartezeit wieder einschalten',
    cache: 'Einstellungen > Allgemein > iPhone-Speicher > App auswählen > App auslagern (Daten bleiben erhalten) oder App löschen',
    reinstall: 'App gedrückt halten, „App entfernen“ wählen und erneut aus dem App Store laden',
    network: 'Einstellungen > WLAN',
    prep: [
      'Mit dem WLAN verbinden und iOS bzw. iPadOS aktualisieren.',
      'Mit der Apple-ID im App Store angemeldet sein.',
      'Bei mobiler Nutzung prüfen, ob die App Mobilfunkdaten verwenden darf.',
    ],
  },
  {
    slug: 'android-handy',
    name: 'Android Handy & Tablet',
    category: 'mobile',
    store: 'den Google Play Store',
    tip: 'Unterwegs streamen Sie am besten im WLAN; per Chromecast lässt sich – sofern unterstützt – auf den TV übertragen.',
    page: '/devices',
    nav: 'Die Bedienung erfolgt per Touch; die Zurück-Geste oder -Taste bringt Sie aus dem Vollbild zurück zur Senderliste.',
    restart: 'Gerät neu starten (Ein-/Aus-Taste gedrückt halten > Neu starten)',
    cache: 'Einstellungen > Apps > App auswählen > Speicher > Cache leeren',
    reinstall: 'Unter Einstellungen > Apps deinstallieren und erneut aus dem Google Play Store laden',
    network: 'Einstellungen > Netzwerk & Internet',
    prep: [
      'Mit dem WLAN verbinden und das System aktualisieren.',
      'Im Google Play Store angemeldet sein und App-Updates installieren.',
      'Energiesparmodus für die IPTV-App deaktivieren, damit die Wiedergabe nicht unterbrochen wird.',
    ],
  },
];


const SMART_IPTV_EXTRA: AppSection[] = [
  {
    title: 'Aktivierung und Playlist-Upload bei Smart IPTV',
    paragraphs: [
      'Smart IPTV (SIPTV) wird nicht über Benutzername und Passwort eingerichtet, sondern über die MAC-Adresse Ihres Fernsehers. Die Adresse wird beim Start der App auf dem Bildschirm angezeigt – notieren Sie sie vollständig.',
      'Im Web-Portal des Herstellers tragen Sie diese MAC-Adresse ein und hinterlegen Ihren M3U-Link (Playlist-URL) oder laden eine Playlist-Datei hoch. Starten Sie danach die App neu, damit die Senderliste geladen wird.',
      'Ob die App dauerhaft kostenlos nutzbar ist oder nach einer Testphase eine einmalige Aktivierung verlangt, kann sich ändern und steht in den aktuellen Angaben der App bzw. des Herstellers. Prüfen Sie das vor der Einrichtung.',
    ],
  },
  {
    title: 'Playlist lädt nicht? Häufige Ursachen',
    paragraphs: [
      'Prüfen Sie, ob die MAC-Adresse ohne Tippfehler eingetragen wurde und der M3U-Link vollständig eingefügt ist (ohne zusätzliche Leerzeichen). Wurde der Link geändert, muss er im Portal neu hinterlegt werden. Weitere Schritte finden Sie in den Anleitungen zu Login- und Ladeproblemen.',
    ],
  },
];

const IBO_EXTRA: AppSection[] = [
  {
    title: 'IBO Player installieren und anmelden',
    paragraphs: [
      'Installieren Sie die App über den Store Ihres Geräts bzw. – wo sie dort nicht erscheint – über den vom Hersteller vorgesehenen Weg. Beim ersten Start zeigt der IBO Player eine MAC-Adresse und einen Gerätecode an.',
      'Mit diesen Angaben melden Sie sich im Web-Portal des Players an und fügen Ihre Playlist (M3U-Link oder Xtream-Zugangsdaten) hinzu. Danach starten Sie die App neu.',
    ],
  },
  {
    title: 'Kosten der App',
    paragraphs: [
      'Der Player selbst enthält keine Sender. Je nach App-Version kann für die Nutzung eine Aktivierung oder Lizenz nötig sein – die aktuellen Bedingungen stehen im Store bzw. in der App. Die Sender beziehen Sie über Ihr IPTV-Abo.',
    ],
  },
];

export const APPS: IptvApp[] = [
  { slug: 'iptv-smarters-pro', name: 'IPTV Smarters Pro', existingPage: '/iptv-smarters-pro', login: 'Melden Sie sich mit Xtream Codes (Server-URL, Benutzername, Passwort) an.', strength: 'integrierter Programmführer (EPG) und VOD-Bereich', devices: ['fire-stick', 'android-tv', 'samsung-tv', 'lg-tv', 'apple-tv', 'iphone-ipad', 'android-handy'] },
  { slug: 'tivimate', name: 'TiviMate', existingPage: '/tivimate-iptv', login: 'Fügen Sie Ihre Playlist per Xtream Codes oder M3U-Link hinzu.', strength: 'sehr komfortable Oberfläche und Programmführer', devices: ['fire-stick', 'android-tv'], installOverride: { 'fire-stick': 'TiviMate ist im Amazon Appstore nicht verfügbar. Die Installation erfolgt in der Regel über die Downloader-App mit dem Installationslink des Herstellers' } },
  { slug: 'ibo-player', name: 'IBO Player', login: 'Notieren Sie MAC-Adresse und Gerätecode aus der App und laden Sie Ihre Playlist im Web-Portal des Players hoch.', strength: 'schnelle, aufgeräumte Oberfläche', devices: ['fire-stick', 'android-tv', 'samsung-tv', 'lg-tv', 'android-handy'], extra: IBO_EXTRA, installOverride: { 'fire-stick': 'Ob IBO Player im Amazon Appstore verfügbar ist, kann variieren. Ist die App dort nicht zu finden, erfolgt die Installation in der Regel über die Downloader-App mit dem Installationslink des Herstellers' } },
  { slug: 'smart-iptv', name: 'Smart IPTV (SIPTV)', login: 'Notieren Sie die MAC-Adresse aus der App und laden Sie Ihren M3U-Link im Web-Portal hoch.', strength: 'einfache Verwaltung der Playlist über das Web-Portal', devices: ['samsung-tv', 'lg-tv'], extra: SMART_IPTV_EXTRA },
  { slug: 'gse-smart-iptv', name: 'GSE Smart IPTV', login: 'Fügen Sie eine neue Playlist per Xtream Codes oder M3U-Link hinzu.', strength: 'flexible Playlist-Verwaltung und viele Einstellungen', devices: ['iphone-ipad', 'apple-tv', 'android-handy'] },
  { slug: 'flix-iptv', name: 'Flix IPTV', login: 'Notieren Sie die MAC-Adresse aus der App und laden Sie Ihre Playlist im Web-Portal hoch.', strength: 'übersichtliches Design für den Fernseher', devices: ['samsung-tv', 'lg-tv', 'android-tv', 'android-handy'] },
  { slug: 'ott-navigator', name: 'OTT Navigator', login: 'Fügen Sie Ihren M3U-Link oder Ihre Xtream-Codes-Daten als Provider hinzu.', strength: 'viele Anpassungsmöglichkeiten und Favoritenverwaltung', devices: ['fire-stick', 'android-tv', 'android-handy'], installOverride: { 'fire-stick': 'OTT Navigator ist im Amazon Appstore nicht verfügbar. Die Installation erfolgt in der Regel über die Downloader-App mit dem Installationslink des Herstellers' } },
  { slug: 'vlc', name: 'VLC Media Player', login: 'Öffnen Sie unter „Netzwerkstream“ Ihren M3U-Link.', strength: 'kostenloser, bewährter Player für nahezu jedes Format', devices: ['fire-stick', 'android-tv', 'apple-tv', 'iphone-ipad', 'android-handy'] },
  {
    slug: 'net-iptv', name: 'Net IPTV', login: 'Notieren Sie die MAC-Adresse aus der App und laden Sie Ihren M3U-Link über die Upload-Seite des Herstellers hoch.', strength: 'einfache Playlist-Verwaltung per Upload', devices: [],
    guide: {
      about: [
        'Net IPTV (auch „NetIPTV“) ist ein Player für IPTV-Playlists. Die App bringt keine Sender mit – Sie benötigen ein IPTV-Abo wie 4kdeutsch und fügen Ihre Playlist hinzu.',
        'Bekannt ist Net IPTV vor allem von Smart-TVs wie Samsung und LG; Versionen für weitere Plattformen (z. B. Android, Fire TV oder iOS) existieren, die Verfügbarkeit hängt jedoch von Gerät, Modell und Region ab.',
      ],
      steps: [
        'Öffnen Sie den App-Store Ihres Geräts und installieren Sie Net IPTV (prüfen Sie Namen und Entwickler).',
        'Starten Sie die App und notieren Sie die angezeigte MAC-Adresse.',
        'Öffnen Sie am Smartphone oder PC die Upload-Seite des Herstellers, tragen Sie die MAC-Adresse und Ihren M3U-Link aus der E-Mail ein und bestätigen Sie den Upload.',
        'Starten Sie die App (ggf. das Gerät) neu – die Senderliste wird geladen.',
        'Der Programmführer (EPG) erscheint nur, wenn die Playlist EPG-Daten enthält.',
      ],
      notes: [
        'Je nach App-Version kann nach einer Testphase eine einmalige Aktivierung pro Gerät erforderlich sein. Die aktuellen Bedingungen stehen im Store bzw. in der App.',
        'Geben Sie Ihren M3U-Link nicht an Dritte weiter – er enthält Ihre Zugangsdaten.',
        'Keine Sender in der App? Prüfen Sie MAC-Adresse und Link auf Tippfehler und starten Sie neu.',
      ],
      faq: [
        { question: 'Was ist Net IPTV?', answer: 'Net IPTV ist ein Player für IPTV-Playlists. Er enthält keine Sender; Sie fügen Ihre eigene Playlist (M3U-Link) hinzu.' },
        { question: 'Wie lade ich meine Playlist in Net IPTV?', answer: 'Notieren Sie die MAC-Adresse aus der App und laden Sie Ihren M3U-Link über die Upload-Seite des Herstellers hoch. Danach starten Sie die App neu.' },
        { question: 'Ist Net IPTV kostenlos?', answer: 'Das kann je nach Version variieren, häufig gibt es eine Testphase und danach eine einmalige Aktivierung. Prüfen Sie die aktuellen Angaben im Store bzw. in der App.' },
      ],
    },
  },
  {
    slug: 'ss-iptv', name: 'SS IPTV', login: 'Fügen Sie Ihren M3U-Link in den Einstellungen als externe Playlist hinzu oder hinterlegen Sie ihn über das Web-Portal des Herstellers.', strength: 'Playlist-Verwaltung direkt in der App oder per Web-Portal', devices: [],
    guide: {
      about: [
        'SS IPTV (auch „SSIPTV“) ist ein Player für Playlists, der vor allem auf LG- und Samsung-Smart-TVs genutzt wird; es gibt auch Varianten für andere Plattformen.',
        'Die App enthält keine Sender. Sie benötigen ein IPTV-Abo wie 4kdeutsch und fügen Ihre Playlist per M3U-Link hinzu.',
      ],
      steps: [
        'Installieren Sie SS IPTV über den App-Store Ihres Fernsehers (Verfügbarkeit je nach Modell und Region).',
        'Öffnen Sie die App und rufen Sie die Einstellungen auf.',
        'Fügen Sie Ihren M3U-Link als externe Playlist hinzu – alternativ hinterlegen Sie ihn über das Web-Portal des Herstellers mit dem in der App angezeigten Code.',
        'Kehren Sie zur Startansicht zurück und laden Sie die Senderliste neu.',
        'Testen Sie einen Sender und prüfen Sie, ob der Programmführer erscheint.',
      ],
      notes: [
        'Die Bezeichnungen der Menüpunkte unterscheiden sich je nach App-Version und Fernseher.',
        'Der Programmführer (EPG) erscheint nur, wenn die Playlist EPG-Daten enthält.',
        'Bewahren Sie Ihren M3U-Link sicher auf – er enthält Ihre Zugangsdaten.',
      ],
      faq: [
        { question: 'Was ist SS IPTV?', answer: 'SS IPTV ist ein Player für IPTV-Playlists, vor allem für LG- und Samsung-Smart-TVs. Er enthält keine Sender.' },
        { question: 'Wie füge ich eine Playlist in SS IPTV hinzu?', answer: 'Entweder direkt in den App-Einstellungen als externe Playlist oder über das Web-Portal des Herstellers. Verwenden Sie den M3U-Link aus Ihrer E-Mail.' },
        { question: 'Was ist der Unterschied zu Smart IPTV (SIPTV)?', answer: 'Es handelt sich um verschiedene Apps mit ähnlichem Zweck. Smart IPTV arbeitet über die MAC-Adresse und ein Web-Portal, SS IPTV ermöglicht zusätzlich das Hinzufügen einer Playlist direkt in der App.' },
      ],
    },
  },
  {
    slug: 'televizo', name: 'Televizo', login: 'Fügen Sie über „Playlist hinzufügen“ Ihren M3U-Link oder Ihre Xtream-Codes-Daten hinzu und vergeben Sie einen Namen.', strength: 'moderne Oberfläche für Android-Geräte', devices: [],
    guide: {
      about: [
        'Televizo ist ein IPTV-Player für Android, Android TV und Fire OS. Die App liefert keine Sender – Sie nutzen sie mit Ihrem IPTV-Abo wie 4kdeutsch.',
        'Sie können Playlists im M3U-Format oder per Xtream Codes hinzufügen.',
      ],
      steps: [
        'Installieren Sie Televizo aus dem Google Play Store (Android/Android TV). Auf Fire-OS-Geräten hängt der Weg von der Verfügbarkeit im Amazon Appstore ab.',
        'Starten Sie die App und wählen Sie „Playlist hinzufügen“.',
        'Wählen Sie das Format (M3U oder Xtream Codes), vergeben Sie einen Namen und tragen Sie Link bzw. Zugangsdaten ein.',
        'Speichern Sie die Playlist und warten Sie, bis die Sender geladen sind.',
        'Aktivieren Sie bei Bedarf den Programmführer (EPG) in den Einstellungen.',
      ],
      notes: [
        'Laden Sie Apps nur aus vertrauenswürdigen Quellen; bei APK-Dateien nur von der Herstellerseite.',
        'Der Programmführer erscheint nur, wenn die Playlist EPG-Daten enthält.',
        'Bei Ruckeln: kabelgebundenes Netzwerk nutzen und andere Downloads pausieren.',
      ],
      faq: [
        { question: 'Was ist Televizo?', answer: 'Televizo ist ein IPTV-Player für Android, Android TV und Fire OS. Er enthält keine Sender, sondern spielt Ihre Playlist ab.' },
        { question: 'Wie richte ich Televizo ein?', answer: 'Wählen Sie „Playlist hinzufügen“, danach M3U oder Xtream Codes, und tragen Sie die Daten aus Ihrer Zugangs-E-Mail ein.' },
        { question: 'Läuft Televizo auf dem iPhone oder Apple TV?', answer: 'Nach den uns vorliegenden Angaben ist Televizo für Android-basierte Geräte gedacht. Für iPhone und Apple TV nutzen Sie andere Player.' },
      ],
    },
  },
  {
    slug: 'kodi', name: 'Kodi (PVR IPTV Simple Client)', login: 'Tragen Sie in den Einstellungen des PVR IPTV Simple Client Ihren M3U-Link (und optional die EPG-URL) ein.', strength: 'Media-Center mit integriertem IPTV-Client', devices: [],
    guide: {
      about: [
        'Kodi ist ein kostenloses Open-Source-Media-Center. Für Live-TV nutzen Sie darin den mitgelieferten PVR-Client „PVR IPTV Simple Client“, der eine M3U-Playlist und optional einen XMLTV-Programmführer einliest.',
        'Kodi bringt keine Sender mit – Sie benötigen ein IPTV-Abo wie 4kdeutsch mit M3U-Link. Eine direkte Xtream-Codes-Anmeldung bietet der Simple Client nicht; Sie nutzen stattdessen den M3U-Link.',
      ],
      steps: [
        'Installieren Sie Kodi nur von der offiziellen Website des Projekts oder aus dem Store Ihres Geräts.',
        'Öffnen Sie in Kodi „Add-ons“ → „Meine Add-ons“ → „PVR-Clients“ und wählen Sie „PVR IPTV Simple Client“.',
        'Aktivieren Sie das Add-on (falls nötig) und öffnen Sie „Konfigurieren“.',
        'Wählen Sie im Reiter „Allgemein“ als Ort „Remote-Pfad (Internetadresse)“ und tragen Sie bei „M3U-Wiedergabelisten-URL“ Ihren M3U-Link ein.',
        'Optional: Tragen Sie im Reiter „EPG-Einstellungen“ die XMLTV-URL ein, damit der Programmführer erscheint.',
        'Speichern Sie, starten Sie Kodi neu und öffnen Sie „TV“ im Hauptmenü, sobald die Kanäle geladen sind.',
      ],
      notes: [
        'Die Menübezeichnungen unterscheiden sich je nach Kodi-Version und Sprache.',
        'Installieren Sie keine Add-ons aus unbekannten Repositories: Sie können Schadsoftware enthalten oder Inhalte ohne Lizenz anbieten. Für IPTV genügt der mitgelieferte Simple Client.',
        'Geben Sie Ihren M3U-Link nicht weiter – er enthält Ihre Zugangsdaten.',
      ],
      faq: [
        { question: 'Wie richte ich IPTV in Kodi ein?', answer: 'Aktivieren Sie den PVR IPTV Simple Client unter Add-ons → PVR-Clients, öffnen Sie „Konfigurieren“ und tragen Sie Ihren M3U-Link als Playlist-URL ein. Optional ergänzen Sie die XMLTV-URL für den Programmführer.' },
        { question: 'Unterstützt Kodi Xtream Codes?', answer: 'Der mitgelieferte PVR IPTV Simple Client arbeitet mit M3U-Links und nicht direkt mit der Xtream-Codes-Anmeldung. Verwenden Sie den M3U-Link aus Ihrer Zugangs-E-Mail.' },
        { question: 'Brauche ich zusätzliche Kodi-Add-ons für IPTV?', answer: 'Nein. Der PVR IPTV Simple Client ist Teil von Kodi. Add-ons aus unbekannten Quellen sind ein Sicherheits- und Rechtsrisiko.' },
      ],
    },
  },
  {
    slug: 'smarters-player-lite', name: 'Smarters Player Lite', login: 'Wählen Sie die Anmeldung per Xtream Codes API und tragen Sie Server-URL, Benutzername und Passwort ein.', strength: 'schlanke Oberfläche, vor allem für iPhone, iPad und Apple TV', devices: [],
    guide: {
      about: [
        'Smarters Player Lite ist ein schlanker Player für eigene Playlists. Er ist unter anderem für iPhone, iPad und weitere Geräte verfügbar (je nach Gerät und Region unterschiedlich) und unterstützt gängige Formate wie M3U.',
        'Der Player enthält keine Sender. Sie nutzen ihn mit Ihrem IPTV-Abo wie 4kdeutsch.',
        'Er ist nicht dasselbe wie IPTV Smarters Pro: Beide stammen aus derselben Produktfamilie, unterscheiden sich aber in Verfügbarkeit und Funktionsumfang je nach Plattform.',
      ],
      steps: [
        'Suchen Sie im App Store bzw. Play Store nach „Smarters Player Lite“ und prüfen Sie Entwickler und Bewertungen.',
        'Installieren und starten Sie die App.',
        'Wählen Sie die Anmeldung per Xtream Codes API (oder die Playlist-Option für einen M3U-Link).',
        'Tragen Sie Server-URL, Benutzername und Passwort aus Ihrer Zugangs-E-Mail ein und bestätigen Sie.',
        'Warten Sie, bis Live-TV, Filme und Serien geladen sind.',
      ],
      notes: [
        'Verfügbarkeit und Funktionsumfang können je nach Plattform und App-Version variieren.',
        'Laden Sie die App nur aus dem offiziellen Store; Fälschungen mit ähnlichen Namen sind verbreitet.',
        'Für den Fire Stick oder Android TV ist häufig IPTV Smarters Pro oder TiviMate die passendere Wahl.',
      ],
      faq: [
        { question: 'Was ist Smarters Player Lite?', answer: 'Ein schlanker Player für eigene Playlists (M3U/Xtream), vor allem auf iPhone, iPad und weiteren Geräten. Er enthält keine Sender.' },
        { question: 'Was ist der Unterschied zu IPTV Smarters Pro?', answer: 'Beide gehören zur selben Produktfamilie; Verfügbarkeit und Umfang unterscheiden sich je nach Plattform. Prüfen Sie die Angaben im jeweiligen Store.' },
        { question: 'Ist Smarters Player Lite kostenlos?', answer: 'Der Download ist in den Stores in der Regel kostenlos; aktuelle Preise und In-App-Käufe prüfen Sie im Store.' },
      ],
    },
  },
  {
    slug: 'iptvnator', name: 'IPTVnator', login: 'Importieren Sie Ihre Playlist per M3U-Link oder Datei und ergänzen Sie optional die XMLTV-URL.', strength: 'kostenloser Open-Source-Player für den Computer', devices: [],
    guide: {
      about: [
        'IPTVnator ist ein kostenloser Open-Source-Player für IPTV-Playlists (M3U/M3U8), der als Desktop-Anwendung (Windows, macOS, Linux) und als Web-App (PWA) genutzt werden kann.',
        'Playlists lassen sich per Internetadresse oder als Datei importieren; ein Programmführer kann über eine XMLTV-Adresse ergänzt werden. Sender sind nicht enthalten – Sie benötigen ein IPTV-Abo wie 4kdeutsch.',
      ],
      steps: [
        'Laden Sie IPTVnator ausschließlich von der offiziellen Projektseite bzw. dem Projekt-Repository herunter.',
        'Installieren Sie die Anwendung und starten Sie sie.',
        'Wählen Sie „Playlist hinzufügen“ und importieren Sie Ihren M3U-Link (oder eine M3U-Datei).',
        'Optional: Tragen Sie die XMLTV-URL für den Programmführer ein.',
        'Wählen Sie einen Sender und starten Sie die Wiedergabe.',
      ],
      notes: [
        'Open-Source-Software gibt es in mehreren Varianten und Mirrors – laden Sie nur aus der offiziellen Quelle.',
        'Aktivieren Sie unter Windows und macOS die Sicherheitsabfragen nicht pauschal ab; installieren Sie nur geprüfte Software.',
        'Alternativ funktioniert am PC auch der VLC Media Player (M3U als Netzwerkstream).',
      ],
      faq: [
        { question: 'Was ist IPTVnator?', answer: 'Ein kostenloser Open-Source-Player für IPTV-Playlists (M3U/M3U8), als Desktop-App und als Web-App nutzbar.' },
        { question: 'Wie füge ich meine Playlist in IPTVnator hinzu?', answer: 'Über „Playlist hinzufügen“ per M3U-Link oder Datei. Einen Programmführer ergänzen Sie optional per XMLTV-URL.' },
        { question: 'Brauche ich ein Abo für IPTVnator?', answer: 'Die Software ist kostenlos, enthält aber keine Sender. Für Inhalte benötigen Sie ein IPTV-Abo.' },
      ],
    },
  },
];

export const getDevice = (slug: string) => DEVICES.find((d) => d.slug === slug);
export const getApp = (slug: string) => APPS.find((a) => a.slug === slug);

export const COMBOS = APPS.flatMap((a) => a.devices.map((d) => ({ app: a.slug, geraet: d })));
/** Apps that get their own hub page (those with a dedicated existing page are excluded). */
export const APP_PAGES = APPS.filter((a) => !a.existingPage);
