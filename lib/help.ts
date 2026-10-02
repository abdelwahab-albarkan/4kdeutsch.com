import type { Device } from './apps';

type Category = Device['category'];

export interface Problem {
  slug: string;
  /** Short symptom used in titles, e.g. "IPTV App lädt nicht". */
  title: string;
  symptom: string;
  causes: string[];
  /** Device-independent checks, in order. */
  checks: string[];
  /** Which generic device actions apply. */
  actions: ('restart' | 'network' | 'cache' | 'reinstall')[];
  /** Category-specific extra advice – this is what makes device pages differ. */
  extra: Record<Category, string[]>;
  related: string[];
}

export const PROBLEMS: Problem[] = [
  {
    slug: 'app-laedt-nicht',
    title: 'IPTV App lädt nicht',
    symptom: 'Die App bleibt beim Start auf dem Ladebildschirm hängen oder zeigt dauerhaft einen Ladekreis.',
    causes: ['Instabile oder langsame Internetverbindung', 'Beschädigte App-Daten oder ein unvollständiges Update', 'Zu wenig freier Speicher auf dem Gerät', 'Veraltete Systemsoftware'],
    checks: ['Prüfen Sie, ob andere Apps (z. B. ein Browser oder eine Mediathek) mit dem Internet arbeiten.', 'Warten Sie einige Minuten – große Senderlisten brauchen beim ersten Laden Zeit.', 'Kontrollieren Sie, ob eine neue Version der App verfügbar ist.'],
    actions: ['restart', 'network', 'cache', 'reinstall'],
    extra: {
      box: ['Trennen Sie das Gerät kurz vom Strom, wenn ein normaler Neustart nicht hilft.', 'Geben Sie Speicherplatz frei, indem Sie ungenutzte Apps entfernen.'],
      'smart-tv': ['Prüfen Sie, ob die Firmware des Fernsehers aktuell ist – ältere Versionen können neuere App-Versionen nicht korrekt laden.', 'Kontrollieren Sie Datum und Uhrzeit des Fernsehers; falsche Werte verhindern oft Verbindungen.'],
      apple: ['Prüfen Sie, ob ein Software-Update für tvOS bzw. iOS bereitsteht.', 'Deaktivieren Sie testweise VPN oder private Relay-Funktionen.'],
      mobile: ['Schließen Sie die App vollständig in der App-Übersicht und starten Sie sie neu.', 'Prüfen Sie, ob die App im Hintergrund durch den Energiesparmodus eingeschränkt wird.'],
    },
    related: ['app-startet-nicht', 'senderliste-laedt-nicht', 'app-stuerzt-ab'],
  },
  {
    slug: 'app-startet-nicht',
    title: 'IPTV App startet nicht',
    symptom: 'Ein Tipp auf die App bewirkt nichts, oder die App schließt sich sofort wieder.',
    causes: ['Beschädigte Installation', 'Nicht genug Arbeitsspeicher oder Speicherplatz', 'Inkompatible App-Version für das Gerät', 'Fehlerhafte Systemsoftware'],
    checks: ['Starten Sie das Gerät neu und öffnen Sie die App erneut.', 'Prüfen Sie im Store, ob ein Update vorhanden ist.', 'Testen Sie, ob andere Apps normal starten – dann liegt das Problem bei dieser App.'],
    actions: ['restart', 'cache', 'reinstall'],
    extra: {
      box: ['Beenden Sie im Hintergrund laufende Apps, um Arbeitsspeicher freizugeben.', 'Prüfen Sie den freien Speicher – viele Boxen haben nur begrenzten Platz.'],
      'smart-tv': ['Manche ältere Fernseher unterstützen neuere App-Versionen nicht mehr; prüfen Sie im Store die Kompatibilität.', 'Ein Werksreset des Fernsehers ist die letzte Option und löscht alle Einstellungen.'],
      apple: ['Löschen Sie die App und laden Sie sie neu aus dem App Store.', 'Starten Sie das Gerät neu, bevor Sie neu installieren.'],
      mobile: ['Prüfen Sie, ob genügend Speicher frei ist.', 'Aktualisieren Sie zuerst das Betriebssystem und danach die App.'],
    },
    related: ['app-laedt-nicht', 'app-stuerzt-ab', 'app-nicht-im-store-gefunden'],
  },
  {
    slug: 'login-funktioniert-nicht',
    title: 'IPTV Login funktioniert nicht',
    symptom: 'Die App meldet „Anmeldung fehlgeschlagen“, „Ungültige Zugangsdaten“ oder zeigt nach der Eingabe keine Sender an.',
    causes: ['Tippfehler in Server-URL, Benutzername oder Passwort', 'Leerzeichen am Anfang oder Ende beim Einfügen', 'Verwechslung von Groß- und Kleinschreibung', 'Falsches Anmeldeformat (Xtream Codes statt M3U oder umgekehrt)', 'Abgelaufenes Abonnement'],
    checks: ['Geben Sie die Daten Zeichen für Zeichen aus der E-Mail neu ein oder kopieren Sie sie ohne Leerzeichen.', 'Prüfen Sie, ob Sie das richtige Format nutzen: Xtream Codes (URL, Benutzername, Passwort) oder M3U-Link.', 'Kontrollieren Sie, ob Ihr Abonnement noch aktiv ist.'],
    actions: ['network'],
    extra: {
      box: ['Mit einer Bluetooth-Tastatur oder der Fernbedienungs-App geben Sie lange URLs zuverlässiger ein.', 'Vermeiden Sie Sonderzeichen-Verwechslungen wie 0/O und 1/l.'],
      'smart-tv': ['Die Bildschirmtastatur ist fehleranfällig – nutzen Sie, wenn möglich, das Web-Portal der App oder eine Smartphone-App zur Eingabe.', 'Prüfen Sie nach der Eingabe jede Zeile noch einmal auf Tippfehler.'],
      apple: ['Nutzen Sie die Diktier- oder iPhone-Tastaturfunktion, um lange Zugangsdaten einzugeben.', 'Prüfen Sie, ob die Autokorrektur Zeichen verändert hat.'],
      mobile: ['Deaktivieren Sie die Autokorrektur und Großschreibung am Zeilenanfang beim Eintippen.', 'Fügen Sie Daten am besten per Copy & Paste aus der E-Mail ein und löschen Sie Leerzeichen.'],
    },
    related: ['senderliste-laedt-nicht', 'app-laedt-nicht', 'epg-wird-nicht-angezeigt'],
  },
  {
    slug: 'epg-wird-nicht-angezeigt',
    title: 'IPTV EPG wird nicht angezeigt',
    symptom: 'Der Programmführer bleibt leer, zeigt keine Sendungsinfos oder die Zeiten stimmen nicht.',
    causes: ['EPG wurde noch nicht heruntergeladen', 'EPG-Quelle in der App nicht aktiviert', 'Falsche Zeitzone oder Uhrzeit am Gerät', 'Sender ohne EPG-Zuordnung in der Playlist'],
    checks: ['Warten Sie nach dem ersten Einrichten einige Minuten, bis der Programmführer geladen ist.', 'Aktualisieren Sie den EPG in den App-Einstellungen manuell.', 'Prüfen Sie, ob die Zeitzone auf Deutschland (Europe/Berlin) steht.'],
    actions: ['restart', 'network'],
    extra: {
      box: ['Stellen Sie sicher, dass Datum, Uhrzeit und Zeitzone automatisch aus dem Netzwerk bezogen werden.', 'Manche Player bieten eine Zeitverschiebung für den EPG – korrigieren Sie sie bei falschen Zeiten.'],
      'smart-tv': ['Prüfen Sie Uhrzeit und Zeitzone im Fernseher-Menü; ein falscher Wert verschiebt alle Sendungen.', 'Nach dem Ändern der Uhrzeit die App vollständig neu starten.'],
      apple: ['Prüfen Sie unter Einstellungen > Allgemein > Datum & Uhrzeit die automatische Einstellung.', 'Starten Sie die App neu, nachdem der EPG aktualisiert wurde.'],
      mobile: ['Aktivieren Sie die automatische Zeitzone in den Systemeinstellungen.', 'Öffnen Sie in der App die EPG-Einstellungen und starten Sie die Aktualisierung manuell.'],
    },
    related: ['senderliste-laedt-nicht', 'login-funktioniert-nicht', 'wiedergabe-startet-nicht'],
  },
  {
    slug: 'senderliste-laedt-nicht',
    title: 'IPTV Senderliste lädt nicht',
    symptom: 'Nach dem Login bleibt die Senderliste leer oder lädt nur teilweise.',
    causes: ['Sehr große Playlist, die erst nach einiger Zeit geladen ist', 'Verbindungsabbrüche während des Downloads', 'Falsch eingegebener Playlist-Link', 'Speicher- oder Rechenlimit des Geräts'],
    checks: ['Warten Sie einige Minuten und beobachten Sie, ob sich die Liste aufbaut.', 'Prüfen Sie den eingegebenen Link oder die Xtream-Daten auf Tippfehler.', 'Aktualisieren Sie die Playlist in den App-Einstellungen.'],
    actions: ['network', 'cache', 'restart'],
    extra: {
      box: ['Eine kabelgebundene Verbindung (Ethernet) lädt große Listen stabiler als WLAN.', 'Reduzieren Sie in der App die Zahl sichtbarer Gruppen, wenn das Gerät langsam reagiert.'],
      'smart-tv': ['Ältere Fernseher haben wenig Arbeitsspeicher – verwenden Sie, falls möglich, kleinere Playlist-Gruppen.', 'Starten Sie den Fernseher nach dem Aktualisieren komplett neu.'],
      apple: ['Laden Sie die Playlist auf einem stabilen WLAN und lassen Sie die App im Vordergrund geöffnet.', 'Entfernen Sie die Playlist und fügen Sie sie erneut hinzu.'],
      mobile: ['Bleiben Sie beim Laden im WLAN und lassen Sie die App im Vordergrund.', 'Deaktivieren Sie Datensparmodus, damit die App vollständig laden darf.'],
    },
    related: ['login-funktioniert-nicht', 'app-laedt-nicht', 'epg-wird-nicht-angezeigt'],
  },
  {
    slug: 'wiedergabe-startet-nicht',
    title: 'IPTV Wiedergabe startet nicht',
    symptom: 'Ein Sender wird ausgewählt, doch das Bild startet nicht oder es erscheint eine Fehlermeldung.',
    causes: ['Zu geringe Bandbreite', 'Vorübergehende Störung eines einzelnen Senders', 'Falsche Player-Einstellung (z. B. Decoder)', 'Netzwerkfilter oder VPN'],
    checks: ['Testen Sie mehrere andere Sender – liegt es nur an einem, ist es meist eine Senderstörung.', 'Prüfen Sie Ihre Internetgeschwindigkeit; für HD sind mindestens etwa 15 Mbit/s empfehlenswert.', 'Schalten Sie ein VPN testweise aus.'],
    actions: ['network', 'restart'],
    extra: {
      box: ['Wechseln Sie in den Player-Einstellungen zwischen Hardware- und Software-Decoder.', 'Nutzen Sie bei WLAN-Problemen das 5-GHz-Band oder ein LAN-Kabel.'],
      'smart-tv': ['Wechseln Sie, falls die App die Option bietet, zwischen den Wiedergabe-Engines.', 'Prüfen Sie, ob der Fernseher mit dem Router verbunden ist und nicht im Energiesparmodus schwächere WLAN-Leistung nutzt.'],
      apple: ['Aktivieren Sie in der App, falls vorhanden, einen alternativen Player.', 'Testen Sie die Wiedergabe ohne aktive VPN-Verbindung.'],
      mobile: ['Wechseln Sie testweise zwischen WLAN und Mobilfunk, um Netzwerkprobleme auszuschließen.', 'Schließen Sie andere Apps, die viel Bandbreite nutzen.'],
    },
    related: ['bild-bleibt-schwarz', 'ruckeln-und-puffern', 'kein-ton'],
  },
  {
    slug: 'bild-bleibt-schwarz',
    title: 'IPTV Bild bleibt schwarz',
    symptom: 'Der Ton läuft, aber das Bild bleibt schwarz, oder umgekehrt.',
    causes: ['Inkompatibler Video-Decoder', 'Auflösung oder Bildwiederholrate vom Gerät nicht unterstützt', 'Fehler im Player nach einem Sendewechsel', 'HDMI- oder Kabelproblem'],
    checks: ['Wechseln Sie zu einem anderen Sender und wieder zurück.', 'Wechseln Sie in den Player-Einstellungen den Decoder.', 'Prüfen Sie, ob andere Apps ein Bild zeigen – falls nicht, liegt es am Gerät oder Kabel.'],
    actions: ['restart', 'cache'],
    extra: {
      box: ['Prüfen Sie das HDMI-Kabel und testen Sie einen anderen HDMI-Anschluss am Fernseher.', 'Stellen Sie in den Anzeigeeinstellungen versuchsweise eine niedrigere Auflösung oder Bildrate ein.'],
      'smart-tv': ['Prüfen Sie im Bildmenü, ob ein besonderer Bildmodus aktiv ist, der das Bild überlagert.', 'Wechseln Sie in der App auf einen anderen Player, falls angeboten.'],
      apple: ['Prüfen Sie unter Einstellungen > Video und Audio das Format und die Bildrate.', 'Testen Sie ein anderes HDMI-Kabel oder einen anderen Anschluss.'],
      mobile: ['Deaktivieren Sie testweise die Hardwarebeschleunigung in den Player-Einstellungen.', 'Drehen Sie das Gerät oder starten Sie den Vollbildmodus neu.'],
    },
    related: ['wiedergabe-startet-nicht', 'kein-ton', 'bild-und-ton-nicht-synchron'],
  },
  {
    slug: 'kein-ton',
    title: 'IPTV kein Ton',
    symptom: 'Das Bild läuft, aber es kommt kein Ton oder nur auf einem Kanal.',
    causes: ['Falsche Audiospur ausgewählt', 'Audioformat wird vom Ausgabegerät nicht unterstützt (z. B. 5.1)', 'Stummschaltung oder falsches Ausgabegerät', 'HDMI-ARC- oder Receiver-Einstellung'],
    checks: ['Prüfen Sie Lautstärke und Stummschaltung am Gerät und am Fernseher.', 'Wählen Sie im Player eine andere Audiospur.', 'Testen Sie den Ton in einer anderen App.'],
    actions: ['restart'],
    extra: {
      box: ['Stellen Sie in den Audioeinstellungen des Geräts das Format auf „Stereo“ um, wenn Ihr Fernseher kein Surround unterstützt.', 'Prüfen Sie bei angeschlossenem Receiver die HDMI-ARC-Einstellung.'],
      'smart-tv': ['Prüfen Sie im Tonmenü den Lautsprecher-Ausgang (interne Lautsprecher oder externes Gerät).', 'Wechseln Sie in der App auf Stereo, wenn ein Dolby-Format Probleme macht.'],
      apple: ['Prüfen Sie unter Einstellungen > Video und Audio > Audioformat und wechseln Sie auf „Ändern“ > Stereo.', 'Prüfen Sie den Audioausgang, z. B. HomePod oder AirPlay-Lautsprecher.'],
      mobile: ['Prüfen Sie, ob das Gerät auf einen Bluetooth-Lautsprecher oder Kopfhörer ausgibt.', 'Stellen Sie die Medienlautstärke separat ein.'],
    },
    related: ['bild-und-ton-nicht-synchron', 'wiedergabe-startet-nicht', 'bild-bleibt-schwarz'],
  },
  {
    slug: 'app-stuerzt-ab',
    title: 'IPTV App stürzt ab',
    symptom: 'Die App schließt sich unerwartet, während Sie Sender wechseln oder die Liste öffnen.',
    causes: ['Zu wenig Arbeitsspeicher', 'Sehr große Playlist', 'Fehlerhafte App-Version', 'Beschädigte lokale Daten'],
    checks: ['Aktualisieren Sie die App auf die neueste Version.', 'Verkleinern Sie, wenn möglich, die geladene Playlist.', 'Starten Sie das Gerät neu.'],
    actions: ['restart', 'cache', 'reinstall'],
    extra: {
      box: ['Schließen Sie andere Apps, die im Hintergrund laufen.', 'Geben Sie Speicherplatz frei, denn zu wenig Speicher führt oft zu Abstürzen.'],
      'smart-tv': ['Manche Smart-TVs haben sehr wenig Arbeitsspeicher – reduzieren Sie die Zahl der Gruppen und Favoriten.', 'Prüfen Sie, ob ein Firmware-Update den Fehler behebt.'],
      apple: ['Löschen Sie die App und installieren Sie sie neu.', 'Aktualisieren Sie das Betriebssystem, bevor Sie es erneut versuchen.'],
      mobile: ['Schließen Sie andere Apps und starten Sie das Gerät neu.', 'Prüfen Sie, ob der Speicherplatz knapp ist.'],
    },
    related: ['app-startet-nicht', 'app-laedt-nicht', 'ruckeln-und-puffern'],
  },
  {
    slug: 'ruckeln-und-puffern',
    title: 'IPTV ruckelt und puffert',
    symptom: 'Das Bild bleibt hängen, ruckelt oder es erscheinen wiederholt Ladekreise.',
    causes: ['Zu geringe oder schwankende Bandbreite', 'Schwaches WLAN-Signal', 'Netzwerk durch andere Geräte ausgelastet', 'Zu hohe Streaming-Auflösung für die Leitung'],
    checks: ['Machen Sie einen Geschwindigkeitstest am selben Gerät.', 'Pausieren Sie andere Downloads und Streams im Haushalt.', 'Starten Sie Router und Gerät neu.'],
    actions: ['network', 'restart'],
    extra: {
      box: ['Nutzen Sie nach Möglichkeit ein Ethernet-Kabel statt WLAN.', 'Stellen Sie den Router näher am Gerät auf oder nutzen Sie das 5-GHz-Band.'],
      'smart-tv': ['Prüfen Sie den WLAN-Empfang des Fernsehers im Netzwerkmenü; ein LAN-Kabel ist stabiler.', 'Reduzieren Sie in der App die Wiedergabequalität, wenn die Leitung schwankt.'],
      apple: ['Nutzen Sie den Ethernet-Anschluss des Apple TV, sofern vorhanden.', 'Prüfen Sie, ob der Router im 5-GHz-Band stabil erreichbar ist.'],
      mobile: ['Wechseln Sie näher an den Router.', 'Deaktivieren Sie Datensparmodus und prüfen Sie den Mobilfunkempfang.'],
    },
    related: ['wiedergabe-startet-nicht', 'bild-und-ton-nicht-synchron', 'app-stuerzt-ab'],
  },
  {
    slug: 'bild-und-ton-nicht-synchron',
    title: 'IPTV Bild und Ton nicht synchron',
    symptom: 'Der Ton läuft dem Bild voraus oder hinterher.',
    causes: ['Verzögerung durch externe Lautsprecher oder Soundbar', 'Falsche Decoder-Einstellung', 'Überlastete Verbindung', 'Bildverarbeitung des Fernsehers'],
    checks: ['Wechseln Sie den Sender und prüfen Sie, ob das Problem bleibt.', 'Nutzen Sie die Audio-Verzögerungseinstellung im Player, falls vorhanden.', 'Testen Sie ohne Soundbar oder Bluetooth.'],
    actions: ['restart'],
    extra: {
      box: ['Stellen Sie im Player eine Audioverzögerung ein und passen Sie sie in kleinen Schritten an.', 'Prüfen Sie die HDMI-Verbindung zum Receiver.'],
      'smart-tv': ['Aktivieren Sie den „Spielmodus“ oder deaktivieren Sie Bildverbesserungen, die Verzögerung erzeugen.', 'Prüfen Sie die Audio-Sync-Einstellung im Tonmenü.'],
      apple: ['Nutzen Sie die Audio-Sync-Funktion über Einstellungen > Video und Audio.', 'Testen Sie ohne AirPlay- oder Bluetooth-Lautsprecher.'],
      mobile: ['Trennen Sie Bluetooth-Kopfhörer, um die Verzögerung zu prüfen.', 'Starten Sie die Wiedergabe neu.'],
    },
    related: ['kein-ton', 'bild-bleibt-schwarz', 'ruckeln-und-puffern'],
  },
  {
    slug: 'app-nicht-im-store-gefunden',
    title: 'IPTV App nicht im Store gefunden',
    symptom: 'Die gesuchte IPTV App erscheint im Store nicht.',
    causes: ['App ist für diese Plattform oder dieses Modell nicht verfügbar', 'Region des Kontos passt nicht', 'Schreibweise des App-Namens weicht ab', 'Veraltete Systemsoftware'],
    checks: ['Prüfen Sie auf der App-Seite, ob Ihr Gerät unterstützt wird.', 'Suchen Sie den genauen App-Namen ohne Zusätze.', 'Aktualisieren Sie das System, damit der Store die App anzeigt.'],
    actions: ['network', 'restart'],
    extra: {
      box: ['Wenn die App im Store fehlt, kann es eine andere Bezugsquelle des Herstellers geben; laden Sie Apps nur aus vertrauenswürdigen Quellen.', 'Prüfen Sie, ob Ihr Konto auf die richtige Region eingestellt ist.'],
      'smart-tv': ['Nicht jede App ist für jeden Fernseher-Hersteller und jedes Baujahr verfügbar – prüfen Sie Alternativen.', 'Stellen Sie sicher, dass Land und Region richtig eingestellt sind.'],
      apple: ['Prüfen Sie, ob die App eine tvOS-Version hat – nicht alle iPhone-Apps gibt es für Apple TV.', 'Ändern Sie testweise nicht die Store-Region, ohne die Folgen zu kennen.'],
      mobile: ['Prüfen Sie im Play Store bzw. App Store die Gerätekompatibilität.', 'Achten Sie auf offizielle Entwickler, um Fälschungen zu vermeiden.'],
    },
    related: ['app-startet-nicht', 'app-laedt-nicht', 'login-funktioniert-nicht'],
  },
];

export const getProblem = (slug: string) => PROBLEMS.find((p) => p.slug === slug);

export interface SetupTopic {
  slug: string;
  title: string;
  desc: string;
  /** If true, a page per device exists (device-specific instructions). */
  perDevice: boolean;
  intro: string;
  steps: string[];
  tips: string[];
  related: string[];
  /** Additional sections for sub-intents (e.g. playlist URL, portal login). */
  extra?: { title: string; paragraphs: string[] }[];
}

export const SETUP_TOPICS: SetupTopic[] = [
  {
    slug: 'app-installieren',
    title: 'IPTV App installieren',
    desc: 'So installieren Sie eine IPTV-App auf Ihrem Gerät',
    perDevice: true,
    intro: 'Bevor Sie IPTV nutzen können, brauchen Sie einen Player. Die Installation unterscheidet sich je nach Gerät.',
    steps: ['Öffnen Sie den Store Ihres Geräts.', 'Suchen Sie nach dem Namen der gewünschten IPTV-App.', 'Prüfen Sie Entwickler und Bewertungen, um Fälschungen zu vermeiden.', 'Installieren Sie die App und öffnen Sie sie.'],
    tips: ['Nutzen Sie nur offizielle Stores, wenn möglich.', 'Prüfen Sie vor der Installation den freien Speicherplatz.'],
    related: ['geraet-vorbereiten', 'zugangsdaten-eingeben', 'player-konfigurieren'],
  },
  {
    slug: 'geraet-vorbereiten',
    title: 'Gerät für IPTV vorbereiten',
    desc: 'Vorbereitung vor der Einrichtung',
    perDevice: true,
    intro: 'Eine saubere Vorbereitung verhindert viele spätere Probleme mit Verbindung und Installation.',
    steps: ['Verbinden Sie das Gerät mit dem Netzwerk.', 'Aktualisieren Sie die Systemsoftware.', 'Stellen Sie Datum, Uhrzeit und Region richtig ein.', 'Sorgen Sie für ausreichend freien Speicher.'],
    tips: ['Ein Neustart nach Updates ist sinnvoll.', 'Ein LAN-Kabel ist stabiler als WLAN.'],
    related: ['app-installieren', 'wlan-und-netzwerk-optimieren', 'zugangsdaten-eingeben'],
  },
  {
    slug: 'wlan-und-netzwerk-optimieren',
    title: 'WLAN und Netzwerk für IPTV optimieren',
    desc: 'Stabile Verbindung für flüssiges Streaming',
    perDevice: true,
    intro: 'Streaming ist auf stabile Verbindungen angewiesen. Oft lassen sich Probleme mit wenigen Handgriffen beheben.',
    steps: ['Prüfen Sie die Verbindung in den Netzwerkeinstellungen des Geräts.', 'Machen Sie einen Geschwindigkeitstest.', 'Starten Sie Router und Gerät neu.', 'Verringern Sie parallele Downloads im Haushalt.'],
    tips: ['Für HD sind etwa 15 Mbit/s und für 4K etwa 25 Mbit/s empfehlenswert.', 'Das 5-GHz-Band ist meist schneller, aber weniger reichweitenstark.'],
    related: ['geraet-vorbereiten', 'player-konfigurieren', 'epg-einrichten'],
  },
  {
    slug: 'epg-einrichten',
    title: 'IPTV EPG einrichten',
    desc: 'Programmführer aktivieren und aktualisieren',
    perDevice: true,
    intro: 'Der elektronische Programmführer (EPG) zeigt aktuelle und kommende Sendungen. Er muss in der App aktiviert und geladen werden.',
    steps: ['Öffnen Sie die Einstellungen Ihrer IPTV-App.', 'Aktivieren Sie den EPG oder die Programminformationen.', 'Starten Sie die manuelle Aktualisierung.', 'Prüfen Sie, ob die Zeitzone auf Europe/Berlin steht.'],
    tips: ['Der erste Download kann einige Minuten dauern.', 'Nicht jeder Sender hat Programminformationen.'],
    related: ['zugangsdaten-eingeben', 'player-konfigurieren', 'wlan-und-netzwerk-optimieren'],
  },
  {
    slug: 'm3u-einrichten',
    title: 'IPTV M3U-Link einrichten',
    desc: 'Playlist per M3U-Link hinzufügen',
    perDevice: false,
    intro: 'Ein M3U-Link (oft „IPTV M3U“ genannt) ist eine Playlist-Adresse, die Ihre IPTV-App aufruft, um die Senderliste zu laden.',
    steps: ['Öffnen Sie die App und wählen Sie „Playlist hinzufügen“ oder „M3U-URL“.', 'Fügen Sie Ihren M3U-Link aus der E-Mail ein.', 'Bestätigen Sie die Eingabe und warten Sie, bis die Liste geladen ist.', 'Wählen Sie einen Sender, um die Wiedergabe zu testen.'],
    tips: ['Achten Sie darauf, dass beim Einfügen keine Leerzeichen dazukommen.', 'Behandeln Sie den Link vertraulich.'],
    related: ['xtream-codes-einrichten', 'zugangsdaten-eingeben', 'epg-einrichten'],
    extra: [
      {
        title: 'Playlist, M3U-Datei und Playlist-URL: Was ist der Unterschied?',
        paragraphs: [
          'Eine Playlist ist die Senderliste. Sie liegt entweder als Datei (z. B. .m3u oder .m3u8) oder als Internetadresse (Playlist-URL) vor. Die URL-Variante ist bequemer, weil sich die Liste bei Änderungen des Anbieters automatisch aktualisiert.',
          'Die meisten Player bieten beide Wege an: „Playlist-URL hinzufügen“ für den Link oder „Datei hinzufügen“ für eine heruntergeladene Datei. Auf Fernsehern ohne Tastatur ist der Upload über das Web-Portal der App (mit der MAC-Adresse des Geräts) oft einfacher als das Eintippen.',
          'Ihre Playlist-URL enthält Ihre Zugangsdaten. Geben Sie sie nicht weiter und veröffentlichen Sie sie nicht. Öffentlich im Netz kursierende „kostenlose Listen“ sind keine sichere Quelle – mehr dazu unter Kostenloses IPTV.',
        ],
      },
      {
        title: 'Portal-Anmeldung (Stalker/MAG)',
        paragraphs: [
          'Manche Geräte und Player, vor allem MAG-Boxen und Apps mit „Portal“-Funktion, melden sich nicht über eine M3U-Datei, sondern über eine Portal-URL an, die an die MAC-Adresse des Geräts gebunden ist. Tragen Sie die Portal-URL in den Geräteeinstellungen ein und starten Sie das Gerät neu.',
          'Ob Ihr Zugang per Portal, Xtream Codes oder M3U-Link genutzt werden kann, entnehmen Sie Ihrer Zugangs-E-Mail bzw. dem Support.',
        ],
      },
    ],
  },
  {
    slug: 'xtream-codes-einrichten',
    title: 'IPTV Xtream Codes einrichten',
    desc: 'Anmeldung per Server-URL, Benutzername und Passwort',
    perDevice: false,
    intro: 'Xtream Codes ist ein Anmeldeformat, bei dem Server-URL, Benutzername und Passwort getrennt eingegeben werden.',
    steps: ['Wählen Sie in der App „Xtream Codes“ oder „Login mit Zugangsdaten“.', 'Tragen Sie Server-URL, Benutzername und Passwort ein.', 'Speichern Sie den Eintrag und warten Sie den Ladevorgang ab.', 'Prüfen Sie, ob Senderliste und EPG erscheinen.'],
    tips: ['Achten Sie auf Groß- und Kleinschreibung.', 'Die URL beginnt meist mit http:// oder https://.'],
    related: ['m3u-einrichten', 'zugangsdaten-eingeben', 'player-konfigurieren'],
  },
  {
    slug: 'zugangsdaten-eingeben',
    title: 'IPTV Zugangsdaten eingeben',
    desc: 'Zugangsdaten richtig eingeben',
    perDevice: false,
    intro: 'Die meisten Anmeldeprobleme entstehen durch kleine Tippfehler. So geben Sie Zugangsdaten sicher ein.',
    steps: ['Öffnen Sie die E-Mail mit Ihren Zugangsdaten.', 'Kopieren Sie die Angaben einzeln, ohne Leerzeichen.', 'Fügen Sie sie in die passenden Felder der App ein.', 'Speichern Sie und warten Sie, bis die Senderliste erscheint.'],
    tips: ['Verwechslungen wie 0/O oder 1/l vermeiden.', 'Bei Smart-TVs die Eingabe über Smartphone oder Web-Portal erleichtern.'],
    related: ['m3u-einrichten', 'xtream-codes-einrichten', 'epg-einrichten'],
  },
  {
    slug: 'player-konfigurieren',
    title: 'IPTV Player konfigurieren',
    desc: 'Wichtige Einstellungen für Bild, Ton und Puffer',
    perDevice: false,
    intro: 'Mit einigen Einstellungen läuft der Player stabiler und passt besser zu Ihrem Gerät und Ihrer Leitung.',
    steps: ['Öffnen Sie die Player-Einstellungen der App.', 'Wählen Sie den passenden Decoder (Hardware oder Software).', 'Passen Sie den Puffer an Ihre Verbindung an.', 'Stellen Sie Audioformat und Sprache ein.'],
    tips: ['Ändern Sie immer nur eine Einstellung und testen Sie danach.', 'Ein größerer Puffer kann Ruckeln verringern, verlängert aber die Startzeit.'],
    related: ['epg-einrichten', 'wlan-und-netzwerk-optimieren', 'app-installieren'],
  },
];

export const getSetupTopic = (slug: string) => SETUP_TOPICS.find((t) => t.slug === slug);
