/*
 * Aplikazioaren marrazkiak (SVG): Baloitxo maskota, atea, kategorien ikonoak eta sariak.
 * Funtzio bakoitzak SVG testua itzultzen du, innerHTML bidez txertatzeko.
 */
(function (erroa) {
  'use strict';

  let kontagailua = 0;
  const bakarra = (aurrizkia) => aurrizkia + '-' + (++kontagailua);

  /**
   * Baloitxo, aplikazioaren maskota (aurpegidun baloia).
   * @param {'normala'|'pozik'|'triste'|'harrituta'} aldartea
   */
  function maskota(aldartea) {
    const clip = bakarra('baloi-clip');
    let ahoa;
    switch (aldartea) {
      case 'pozik':
        ahoa = '<path d="M43 76 Q60 102 77 76 Z" fill="#c0392b" stroke="#22313f" stroke-width="3" stroke-linejoin="round"/>' +
               '<path d="M51 89 Q60 95 69 89 Q60 84 51 89Z" fill="#ff8fa3"/>';
        break;
      case 'triste':
        ahoa = '<path d="M47 90 Q60 79 73 90" fill="none" stroke="#22313f" stroke-width="3.5" stroke-linecap="round"/>' +
               '<path d="M84 64 q-3 6 0 9 q3 -3 0 -9z" fill="#4cc9f0"/>';
        break;
      case 'harrituta':
        ahoa = '<ellipse cx="60" cy="85" rx="7" ry="8" fill="#c0392b" stroke="#22313f" stroke-width="3"/>';
        break;
      default:
        ahoa = '<path d="M47 80 Q60 92 73 80" fill="none" stroke="#22313f" stroke-width="3.5" stroke-linecap="round"/>';
    }
    const bekainak = aldartea === 'triste'
      ? '<path d="M38 47 L52 51 M82 47 L68 51" stroke="#22313f" stroke-width="3" stroke-linecap="round"/>'
      : '<path d="M38 49 Q45 44 52 48 M68 48 Q75 44 82 49" fill="none" stroke="#22313f" stroke-width="3" stroke-linecap="round"/>';

    return '' +
      '<svg class="maskota-svg" viewBox="0 0 120 130" role="img" aria-label="Baloitxo maskota">' +
        '<defs><clipPath id="' + clip + '"><circle cx="60" cy="60" r="46"/></clipPath></defs>' +
        '<ellipse class="maskota-itzala" cx="60" cy="123" rx="32" ry="5" fill="#000" opacity=".18"/>' +
        '<circle cx="60" cy="60" r="46" fill="#fff"/>' +
        '<g clip-path="url(#' + clip + ')" fill="#22313f">' +
          '<polygon points="60,14 76,25 70,42 50,42 44,25"/>' +
          '<polygon points="4,36 20,30 28,46 18,60 2,56"/>' +
          '<polygon points="116,36 100,30 92,46 102,60 118,56"/>' +
          '<polygon points="10,96 24,90 32,104 24,118 8,114"/>' +
          '<polygon points="110,96 96,90 88,104 96,118 112,114"/>' +
          '<path d="M50 42 L44 25 L20 30 M70 42 L76 25 L100 30 M28 46 L50 42 M92 46 L70 42 M18 60 L24 90 M102 60 L96 90" ' +
            'stroke="#22313f" stroke-width="1.5" fill="none" opacity=".35"/>' +
        '</g>' +
        '<circle cx="60" cy="60" r="46" fill="none" stroke="#22313f" stroke-width="4"/>' +
        '<ellipse cx="35" cy="74" rx="7" ry="4.5" fill="#ff8fa3" opacity=".85"/>' +
        '<ellipse cx="85" cy="74" rx="7" ry="4.5" fill="#ff8fa3" opacity=".85"/>' +
        bekainak +
        '<ellipse cx="46" cy="62" rx="7.5" ry="9" fill="#fff" stroke="#22313f" stroke-width="2.5"/>' +
        '<ellipse cx="74" cy="62" rx="7.5" ry="9" fill="#fff" stroke="#22313f" stroke-width="2.5"/>' +
        '<circle class="maskota-ninia" cx="47" cy="64" r="4.2" fill="#22313f"/>' +
        '<circle class="maskota-ninia" cx="75" cy="64" r="4.2" fill="#22313f"/>' +
        '<circle cx="48.6" cy="62" r="1.5" fill="#fff"/>' +
        '<circle cx="76.6" cy="62" r="1.5" fill="#fff"/>' +
        ahoa +
      '</svg>';
  }

  /** Futbol 8ko atea, sarearekin. */
  function atea() {
    const sarea = bakarra('sarea');
    return '' +
      '<svg class="atea-svg" viewBox="0 0 160 110" aria-hidden="true">' +
        '<defs><pattern id="' + sarea + '" width="9" height="9" patternUnits="userSpaceOnUse">' +
          '<path d="M0 0 L9 9 M9 0 L0 9" stroke="#fff" stroke-width="1.2" opacity=".75"/></pattern></defs>' +
        '<ellipse cx="80" cy="100" rx="78" ry="8" fill="#000" opacity=".12"/>' +
        '<path d="M14 14 L28 30 L132 30 L146 14 Z" fill="url(#' + sarea + ')"/>' +
        '<rect x="14" y="14" width="132" height="82" fill="url(#' + sarea + ')"/>' +
        '<path d="M10 98 V10 H150 V98" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round"/>' +
        '<path d="M10 98 V10 H150 V98" fill="none" stroke="#d9d9d9" stroke-width="2" stroke-linejoin="round" transform="translate(2 2)"/>' +
      '</svg>';
  }

  const IKONOAK = {
    guztiak:
      '<path d="M18 10h28v10c0 10-6 18-14 18s-14-8-14-18z" fill="#ffd23f" stroke="#c79100" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M18 14H10c0 8 4 12 9 13M46 14h8c0 8-4 12-9 13" fill="none" stroke="#c79100" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="28" y="37" width="8" height="9" fill="#e0a800"/>' +
      '<rect x="19" y="46" width="26" height="9" rx="2.5" fill="#8d5524"/>' +
      '<path d="M32 15l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8z" fill="#fff"/>',
    epailea:
      '<rect x="33" y="7" width="16" height="22" rx="2.5" fill="#ef476f" stroke="#b3123d" stroke-width="2" transform="rotate(16 41 18)"/>' +
      '<rect x="22" y="5" width="16" height="22" rx="2.5" fill="#ffd23f" stroke="#c79100" stroke-width="2" transform="rotate(-10 30 16)"/>' +
      '<rect x="23" y="34" width="30" height="10" rx="3" fill="#adb5bd" stroke="#495057" stroke-width="2"/>' +
      '<circle cx="22" cy="45" r="12" fill="#ced4da" stroke="#495057" stroke-width="2.5"/>' +
      '<circle cx="22" cy="45" r="4" fill="#495057"/>' +
      '<circle cx="11" cy="34" r="4" fill="none" stroke="#118ab2" stroke-width="2.5"/>',
    atezaina:
      '<rect x="16" y="15" width="8.5" height="24" rx="4.25" fill="#06d6a0" stroke="#048a67" stroke-width="2"/>' +
      '<rect x="24.5" y="8" width="8.5" height="28" rx="4.25" fill="#06d6a0" stroke="#048a67" stroke-width="2"/>' +
      '<rect x="33" y="8" width="8.5" height="28" rx="4.25" fill="#06d6a0" stroke="#048a67" stroke-width="2"/>' +
      '<rect x="41.5" y="14" width="8.5" height="24" rx="4.25" fill="#06d6a0" stroke="#048a67" stroke-width="2"/>' +
      '<rect x="4" y="30" width="18" height="9" rx="4.5" fill="#06d6a0" stroke="#048a67" stroke-width="2" transform="rotate(-38 13 34)"/>' +
      '<rect x="16" y="26" width="34" height="21" rx="7" fill="#06d6a0" stroke="#048a67" stroke-width="2"/>' +
      '<path d="M24 36 h18" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>' +
      '<rect x="17" y="45" width="32" height="12" rx="3" fill="#073b4c"/>' +
      '<path d="M22 51 h22" stroke="#ffd23f" stroke-width="2.5"/>',
    jokalaria:
      '<path d="M22 8 L8 16 L14 29 L20 26 V57 H44 V26 L50 29 L56 16 L42 8 C41 13 37 16 32 16 S23 13 22 8Z" ' +
        'fill="#ef476f" stroke="#a4133c" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M22 8 C23 13 27 16 32 16 S41 13 42 8" fill="none" stroke="#fff" stroke-width="2.5"/>' +
      '<text x="32" y="48" text-anchor="middle" font-size="20" font-weight="800" fill="#fff" ' +
        'font-family="Baloo 2, Trebuchet MS, sans-serif">8</text>',
    zelaia:
      '<rect x="5" y="12" width="54" height="40" rx="3" fill="#2a9d47"/>' +
      '<rect x="14" y="12" width="9" height="40" fill="#fff" opacity=".1"/>' +
      '<rect x="32" y="12" width="9" height="40" fill="#fff" opacity=".1"/>' +
      '<rect x="5" y="12" width="54" height="40" rx="3" fill="none" stroke="#fff" stroke-width="2.5"/>' +
      '<path d="M32 12v40" stroke="#fff" stroke-width="2"/>' +
      '<circle cx="32" cy="32" r="7" fill="none" stroke="#fff" stroke-width="2"/>' +
      '<rect x="5" y="22" width="9" height="20" fill="none" stroke="#fff" stroke-width="2"/>' +
      '<rect x="50" y="22" width="9" height="20" fill="none" stroke="#fff" stroke-width="2"/>' +
      '<circle cx="32" cy="32" r="1.8" fill="#fff"/>',
    entrenatzailea:
      '<rect x="12" y="9" width="40" height="50" rx="4" fill="#a0522d"/>' +
      '<rect x="16" y="15" width="32" height="40" rx="2" fill="#fff"/>' +
      '<rect x="24" y="5" width="16" height="9" rx="2" fill="#adb5bd" stroke="#495057" stroke-width="2"/>' +
      '<path d="M21 22l6 6m0-6l-6 6" stroke="#ef476f" stroke-width="2.6" stroke-linecap="round"/>' +
      '<circle cx="40" cy="45" r="4.2" fill="none" stroke="#118ab2" stroke-width="2.6"/>' +
      '<path d="M27 32 Q35 30 37 39" fill="none" stroke="#22313f" stroke-width="2" stroke-dasharray="3 3"/>' +
      '<path d="M37 41 l-3.5 -4 l5 -1.2z" fill="#22313f"/>'
  };

  /** Kategoriaren ikonoa. Ikonorik ez badago, dokumentuko emojia erabiltzen da. */
  function kategoria(id, emojia) {
    const barrua = IKONOAK[id];
    if (!barrua) {
      return '<span class="kategoria-emojia" aria-hidden="true">' + (emojia || '⚽') + '</span>';
    }
    return '<svg class="kategoria-svg" viewBox="0 0 64 64" aria-hidden="true">' + barrua + '</svg>';
  }

  /** Domina bat (urrea edo zilarra), izar batekin. */
  function domina(betea, ertza, zinta) {
    return '' +
      '<svg class="saria-svg" viewBox="0 0 64 64" aria-hidden="true">' +
        '<path d="M20 2 L32 24 L44 2" fill="none" stroke="' + zinta + '" stroke-width="8" stroke-linejoin="round"/>' +
        '<path d="M26 2 L32 14 L38 2" fill="none" stroke="#fff" stroke-width="2.5"/>' +
        '<circle cx="32" cy="41" r="19" fill="' + betea + '" stroke="' + ertza + '" stroke-width="3"/>' +
        '<circle cx="32" cy="41" r="13" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>' +
        '<path d="M32 32l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="#fff"/>' +
      '</svg>';
  }

  /** Emaitzaren saria: kopa (bikaina), urrezko domina (ona), zilarrezkoa (erdikoa). */
  function saria(maila) {
    if (maila === 'bikaina') {
      return '<svg class="saria-svg" viewBox="0 0 64 64" aria-hidden="true">' + IKONOAK.guztiak + '</svg>';
    }
    if (maila === 'ona') return domina('#ffd23f', '#c79100', '#ef476f');
    if (maila === 'erdikoa') return domina('#cfd8dc', '#78909c', '#118ab2');
    return '';
  }

  erroa.Marrazkiak = { maskota: maskota, atea: atea, kategoria: kategoria, saria: saria };
})(window);
