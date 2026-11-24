/*
 * «Tribial futbol galderak.md» dokumentuaren irakurgailua (parser).
 *
 * Markdown dokumentutik ateratzen ditu: izenburua, sarrera, txapelketaren arau
 * bereziak, zailtasun-mailak, kategoriak eta galdera guztiak (aukerak, erantzun
 * zuzena eta azalpena barne).
 *
 * Nabigatzailean (window.TribialParser) zein Node.js-en (module.exports) erabil daiteke.
 */
(function (erroa) {
  'use strict';

  /** Testua gako bihurtzen du: minuskulak, azentu eta ikurrik gabe. */
  function gakoa(testua) {
    return String(testua)
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  }

  /** "Erraza", "Errazak", "🟢 Erraza"... → "erraza" | "ertaina" | "zaila" */
  function zailtasunGakoa(testua) {
    const g = gakoa(testua);
    if (g.startsWith('erraz')) return 'erraza';
    if (g.startsWith('ertain')) return 'ertaina';
    if (g.startsWith('zail')) return 'zaila';
    return g;
  }

  function parseatu(md) {
    const lerroak = String(md).replace(/^﻿/, '').replace(/\r\n?/g, '\n').split('\n');

    const emaitza = {
      izenburua: '',
      sarrera: '',
      arauIzenburua: '',
      arauSarrera: '',
      arauBereziak: [],
      zailtasunak: [],
      kategoriak: [],
      galderak: [],
      oharra: '',
      abisuak: []
    };

    let kategoria = null;
    let zailtasuna = null;
    let galdera = null;
    let atala = null; // 'aukerak' | 'erantzuna' | 'azalpena'
    let arauBlokean = false;

    function amaituGaldera() {
      if (!galdera) return;
      galdera.azalpena = galdera.azalpenLerroak.join('\n').trim();
      delete galdera.azalpenLerroak;

      const akatsak = [];
      if (!galdera.kategoria) akatsak.push('kategoriarik gabe');
      if (!galdera.zailtasuna) akatsak.push('zailtasunik gabe');
      if (galdera.aukerak.length < 2) akatsak.push('aukera gutxiegi');
      if (!galdera.aukerak.some(function (a) { return a.letra === galdera.zuzena; })) {
        akatsak.push('erantzun zuzena ez dago aukeren artean');
      }

      if (akatsak.length) {
        emaitza.abisuak.push(galdera.id + ' galdera baztertuta: ' + akatsak.join(', '));
      } else {
        emaitza.galderak.push(galdera);
      }
      galdera = null;
      atala = null;
    }

    for (const gordina of lerroak) {
      const l = gordina.trim();
      let m;

      // Aipu-blokeak: txapelketaren arau bereziak eta amaierako oharra
      if (l.startsWith('>')) {
        amaituGaldera();
        const barrua = l.replace(/^>\s?/, '').trim();
        if ((m = barrua.match(/^#+\s*(.+)$/))) {
          emaitza.arauIzenburua = m[1].replace(/^[^\p{L}\p{N}]+/u, '').trim();
          arauBlokean = true;
          continue;
        }
        if (/oharra/i.test(barrua) && !arauBlokean) {
          emaitza.oharra = barrua.replace(/^\S*\s*\*\*Oharra:\*\*\s*/i, '').trim();
          continue;
        }
        if (arauBlokean) {
          if ((m = barrua.match(/^-\s+(.+)$/))) emaitza.arauBereziak.push(m[1].trim());
          else if (barrua) emaitza.arauSarrera = barrua;
        }
        continue;
      }
      arauBlokean = false;

      // # Izenburua
      if ((m = l.match(/^#\s+(.+)$/))) {
        emaitza.izenburua = m[1].trim();
        continue;
      }

      // ## 1. 🟨 Epailea
      if ((m = l.match(/^##\s+(\d+)\.\s+(\S+)\s+(.+)$/))) {
        amaituGaldera();
        const izena = m[3].trim();
        kategoria = {
          id: gakoa(izena),
          zenbakia: Number(m[1]),
          ikonoa: m[2],
          izena: izena
        };
        emaitza.kategoriak.push(kategoria);
        zailtasuna = null;
        continue;
      }

      // ### 🟢 Erraza
      if ((m = l.match(/^###\s+(\S+)\s+(.+)$/))) {
        amaituGaldera();
        zailtasuna = { gakoa: zailtasunGakoa(m[2]), ikonoa: m[1], izena: m[2].trim() };
        continue;
      }

      // **1.1. Galderaren testua?**
      if ((m = l.match(/^\*\*(\d+\.\d+)\.\s+(.+?)\*\*\s*$/))) {
        amaituGaldera();
        galdera = {
          id: m[1],
          testua: m[2].trim(),
          kategoria: kategoria ? kategoria.id : null,
          kategoriaIzena: kategoria ? kategoria.izena : '',
          kategoriaIkonoa: kategoria ? kategoria.ikonoa : '',
          zailtasuna: zailtasuna ? zailtasuna.gakoa : null,
          zailtasunIzena: zailtasuna ? zailtasuna.izena : '',
          zailtasunIkonoa: zailtasuna ? zailtasuna.ikonoa : '',
          aukerak: [],
          zuzena: null,
          azalpenLerroak: []
        };
        atala = 'aukerak';
        continue;
      }

      if (l === '---') {
        amaituGaldera();
        continue;
      }

      if (galdera) {
        if ((m = l.match(/^\*\*Erantzuna:\*\*\s*([a-z])\)/i))) {
          galdera.zuzena = m[1].toLowerCase();
          atala = 'erantzuna';
          continue;
        }
        if ((m = l.match(/^\*\*Azalpena:\*\*\s*(.*)$/))) {
          atala = 'azalpena';
          if (m[1]) galdera.azalpenLerroak.push(m[1]);
          continue;
        }
        if (atala === 'aukerak' && (m = l.match(/^-\s+([a-z])\)\s+(.+)$/i))) {
          galdera.aukerak.push({ letra: m[1].toLowerCase(), testua: m[2].trim() });
          continue;
        }
        if (atala === 'azalpena') {
          galdera.azalpenLerroak.push(gordina.replace(/\s+$/, ''));
        }
        continue;
      }

      // Kategorien aurreko informazioa (sarrera eta zailtasun-mailak)
      if (!kategoria) {
        if ((m = l.match(/^-\s+(\S+)\s+\*\*(.+?)\*\*\s*:\s*(.+)$/))) {
          emaitza.zailtasunak.push({
            gakoa: zailtasunGakoa(m[2]),
            ikonoa: m[1],
            izena: m[2].trim(),
            deskribapena: m[3].trim()
          });
          continue;
        }
        if (l && !emaitza.sarrera && !l.startsWith('**') && !l.startsWith('-')) {
          emaitza.sarrera = l;
        }
      }
    }
    amaituGaldera();

    return emaitza;
  }

  const api = { parseatu: parseatu, gakoa: gakoa, zailtasunGakoa: zailtasunGakoa };

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    erroa.TribialParser = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
