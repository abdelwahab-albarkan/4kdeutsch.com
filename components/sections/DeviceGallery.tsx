import React from 'react';
import Image from 'next/image';

const ITEMS: { src: string; label: string; alt: string; w: number; h: number }[] = [
  { src: 'fire-tv-cube', label: 'Fire TV Cube', alt: 'Amazon Fire TV Cube', w: 377, h: 360 },
  { src: 'fire-tablet', label: 'Fire Tablet', alt: 'Amazon Fire Tablet', w: 338, h: 231 },
  { src: 'nvidia-shield', label: 'NVIDIA Shield', alt: 'NVIDIA Shield mit Fernbedienung', w: 345, h: 360 },
  { src: 'android-tv-box', label: 'Android-TV-Box', alt: 'Android-TV-Box mit Fernbedienung', w: 361, h: 360 },
  { src: 'formuler-box', label: 'Streaming-Box', alt: 'Formuler Streaming-Box', w: 465, h: 322 },
  { src: 'smart-tv', label: 'Smart TV', alt: 'Smart TV mit App-Oberfläche', w: 480, h: 270 },
  { src: 'ipad', label: 'iPad', alt: 'iPad Modelle', w: 274, h: 360 },
  { src: 'iphone', label: 'iPhone', alt: 'iPhone Modelle', w: 317, h: 360 },
  { src: 'windows-laptop', label: 'Windows-Laptop', alt: 'Windows-Laptop', w: 456, h: 360 },
];

/**
 * Visual overview of device types. Purely illustrative: availability of apps depends on device, model and region
 * (see the note below the grid) – this is not a compatibility list.
 */
export default function DeviceGallery() {
  return (
    <section aria-labelledby="geraete-ueberblick" className="max-w-7xl mx-auto px-6 py-14">
      <div className="mb-10 text-center">
        <h2 id="geraete-ueberblick" className="font-spartan text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
          Geräte im <span className="text-gradient">Überblick</span>
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-gray-500">
          Beispiele für Gerätetypen, auf denen IPTV-Apps genutzt werden. Die Verfügbarkeit von Apps hängt von Gerät, Modell und Region ab; nicht jede App läuft auf jedem
          abgebildeten Gerät.
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map((d) => (
          <li key={d.src} className="flex flex-col items-center rounded-xl border border-border-subtle bg-surface-card/50 p-4">
            <div className="flex h-32 w-full items-center justify-center sm:h-36">
              <Image
                src={`/images/devices/products/${d.src}.webp`}
                alt={d.alt}
                width={d.w}
                height={d.h}
                sizes="(max-width: 640px) 45vw, 200px"
                loading="lazy"
                className="max-h-full w-auto max-w-full object-contain"
              />
            </div>
            <span className="mt-3 text-center text-sm font-semibold text-gray-300">{d.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
