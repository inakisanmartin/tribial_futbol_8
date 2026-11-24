/*
 * Futbol 8 Tribiala — jokoaren logika.
 * Datu-baserik gabe: galderak «Tribial futbol galderak.md» dokumentutik irakurtzen dira.
 */
(function () {
  'use strict';

  const GALDERA_KOPURUA = 10;
  const DOKUMENTUA = 'Tribial futbol galderak.md';

  const ZAILTASUN_AUKERAK = [
    { gakoa: 'guztiak', izena: 'Guztiak', ikonoa: '🌈', deskribapena: 'Maila guztietako galderak, nahastuta.' },
    { gakoa: 'erraza', izena: 'Errazak', ikonoa: '🟢' },
    { gakoa: 'ertaina', izena: 'Ertainak', ikonoa: '🟡' },
    { gakoa: 'zaila', izena: 'Zailak', ikonoa: '🔴' }
  ];

  const KATEGORIA_KOLOREAK = ['#ffd23f', '#ef476f', '#06d6a0', '#118ab2', '#ff8c42', '#8e5cf7', '#ff6fb5'];

  const OSPAKIZUNAK = [
    'Zuzena! GOOOL! ⚽',
    'Bikain! Barru-barruan! 🥅',
    'Hori da! Golazoa! 🎉',
    'Ederki! Zuzen-zuzena! 🙌',
    'Zoragarria! Atezainak ez du ezer egin! 🧤'
  ];
  const HUTSAK = [
    'Oi! Langa jo du! 😬',
    'Ui! Kanpora joan da... 🙈',
    'Ez da zuzena, baina ez etsi! 💪',
    'Hutsa! Hurrengoan bai! 🍀',
    'Atezainak gelditu du! 🧤'
  ];

  const MAILAK = {
    bikaina: {
      izenburua: 'TXAPELDUN! 🏆',
      aldartea: 'pozik',
      izarrak: 3,
      mezuak: [
        'Perfektua! Zure buruan arau-liburu oso bat dago! 📘',
        'Gol guztiak sartu dituzu! Kontuz, futbol 8an 9. golaren ondoren ez dira kontatzen... 😜',
        'Hau maila! Epaileak berak zuri galdetuko dizkizu arauak! 🟨',
        'Huts bat ere ez! Laster epaile-txistua oparituko dizugu! 📣'
      ]
    },
    ona: {
      izenburua: 'Oso ondo! 🥇',
      aldartea: 'pozik',
      izarrak: 2,
      mezuak: [
        'Bikain! Txartel horirik gabe gainditu duzu proba! 🙌',
        'Zer nolako jokalaria! Pixka bat gehiago eta txapeldun izango zara! 🏆',
        'Oso ondo jokatu duzu! Zure entrenatzailea harro egongo da! 📋',
        'Ia perfektua! Hurrengoan, hamarretik hamar! 🔟'
      ]
    },
    erdikoa: {
      izenburua: 'Ez dago gaizki! 🥈',
      aldartea: 'normala',
      izarrak: 1,
      mezuak: [
        'Txutea ona zen, baina batzuetan langa jo du! Saiatu berriro! 🥅',
        'Erdia baino gehiago... edo ia! Entrenatu pixka bat gehiago! 💪',
        'Ondo zoaz! Futbolean bezala, entrenatuz hobetzen da! ⚽',
        'Ez dago gaizki! Irakurri azalpenak eta hurrengoan golak sartuko dituzu! 📚'
      ]
    },
    hasiberria: {
      izenburua: 'Segi entrenatzen! 💪',
      aldartea: 'normala',
      izarrak: 0,
      mezuak: [
        'Lasai! Futbolari onenek ere huts egiten zuten hasieran. Berriro saiatu! ⚽',
        'Gaur baloia biribila zen... eta ihes egin dizu! 😅 Saiatu berriro!',
        'Epaileak txistua jo du, baina oraindik hirugarren zatia falta da! Berriro jokatu! 🔄',
        'Partida hau galdu duzu, baina txapelketa luzea da! Animo! 🌟'
      ]
    }
  };

  const TXISTEAK = [
    { g: 'Zergatik joan zen epailea liburutegira?', e: 'Arauak irakurtzera! 📚' },
    { g: 'Zergatik ez da baloia inoiz aspertzen?', e: 'Beti jokoan dagoelako! ⚽' },
    { g: 'Zer egiten du atezain batek urtebetetze-festa batean?', e: 'Pastel guztiak geldiarazi, inork jan baino lehen! 🎂' },
    { g: 'Zer esan zion baloiak oinetakoari?', e: '«Ez nazazu hain gogor jo, mesedez!» 👟' },
    { g: 'Zer esan zion txartel gorriak txartel horiari?', e: '«Zu abisua zara; ni, berriz, irteera!» 🟥' },
    { g: 'Zergatik ez dira zelaiko marrak inoiz okertzen?', e: 'Beti zuzen daudelako! 📏' },
    { g: 'Zergatik ez du atezainak inoiz hotzik pasatzen?', e: 'Beti eskularruak jantzita dituelako! 🧤' },
    { g: 'Zein da futbolari baten musikarik gogokoena?', e: 'Txistuaren doinua! 🎵' },
    { g: 'Zergatik dago baloia beti nekatuta partidaren amaieran?', e: 'Partida osoan ostikoak jaso dituelako! 😆' }
  ];

  const egoera = {
    datuak: null,
    kategoria: 'guztiak',
    zailtasuna: 'guztiak',
    jokoa: [],
    unekoa: 0,
    asmatuak: 0,
    azkenTxistea: -1,
    iragazkia: 'denak'
  };

  /* ---------- Laguntzaileak ---------- */

  const $ = (id) => document.getElementById(id);

  function nahastu(zerrenda) {
    const kopia = zerrenda.slice();
    for (let i = kopia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = kopia[i];
      kopia[i] = kopia[j];
      kopia[j] = t;
    }
    return kopia;
  }

  function ausaz(zerrenda) {
    return zerrenda[Math.floor(Math.random() * zerrenda.length)];
  }

  function ihes(testua) {
    return String(testua).replace(/[&<>"']/g, (k) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[k]));
  }

  /** Lerro bateko markdown sinplea (lodia eta etzana) HTML bihurtzen du. */
  function mdLerroa(testua) {
    return ihes(testua)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  /** Azalpenen markdown-a (paragrafoak eta zerrendak) HTML bihurtzen du. */
  function mdBlokea(testua) {
    let html = '';
    let zerrendan = false;
    String(testua).split('\n').forEach((lerroa) => {
      const l = lerroa.trim();
      const m = l.match(/^[-*]\s+(.+)$/);
      if (m) {
        if (!zerrendan) { html += '<ul>'; zerrendan = true; }
        html += '<li>' + mdLerroa(m[1]) + '</li>';
        return;
      }
      if (zerrendan) { html += '</ul>'; zerrendan = false; }
      if (l) html += '<p>' + mdLerroa(l) + '</p>';
    });
    if (zerrendan) html += '</ul>';
    return html;
  }

  function iragazi(kategoria, zailtasuna) {
    return egoera.datuak.galderak.filter((g) =>
      (kategoria === 'guztiak' || g.kategoria === kategoria) &&
      (zailtasuna === 'guztiak' || g.zailtasuna === zailtasuna));
  }

  function galderaKopurua(n) {
    return n + ' galdera';
  }

  function zailtasunEtiketa(g) {
    return '<span class="etiketa etiketa-' + ihes(g.zailtasuna) + '">' + g.zailtasunIkonoa + ' ' + ihes(g.zailtasunIzena) + '</span>';
  }

  function kategoriaEtiketa(g) {
    return '<span class="etiketa etiketa-kategoria">' + g.kategoriaIkonoa + ' ' + ihes(g.kategoriaIzena) + '</span>';
  }

  /* ---------- Soinuak (Web Audio, fitxategirik gabe) ---------- */

  const soinua = (function () {
    let ctx = null;
    let piztuta = true;
    try { piztuta = localStorage.getItem('tribiala-soinua') !== 'ez'; } catch (e) { /* ez dago biltegirik */ }

    function testuingurua() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!ctx) ctx = new AC();
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }

    /** notak: [maiztasuna, hasiera (s), iraupena (s), uhin-mota, bolumena] */
    function jo(notak) {
      if (!piztuta) return;
      const c = testuingurua();
      if (!c) return;
      const t = c.currentTime + 0.02;
      notak.forEach(([maiztasuna, hasiera, iraupena, mota, bolumena]) => {
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = mota || 'sine';
        o.frequency.setValueAtTime(maiztasuna, t + hasiera);
        g.gain.setValueAtTime(0.0001, t + hasiera);
        g.gain.exponentialRampToValueAtTime(bolumena || 0.18, t + hasiera + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + hasiera + iraupena);
        o.connect(g);
        g.connect(c.destination);
        o.start(t + hasiera);
        o.stop(t + hasiera + iraupena + 0.05);
      });
    }

    function txistua(luzea) {
      const notak = [];
      const iraupena = luzea ? 0.7 : 0.35;
      for (let s = 0; s < iraupena; s += 0.035) {
        notak.push([notak.length % 2 ? 2350 : 2150, s, 0.05, 'square', 0.05]);
      }
      jo(notak);
    }

    return {
      klik: () => jo([[660, 0, 0.08, 'triangle', 0.12]]),
      ondo: () => jo([[523, 0, 0.12], [659, 0.1, 0.12], [784, 0.2, 0.3]]),
      gaizki: () => jo([[300, 0, 0.18, 'triangle', 0.2], [200, 0.16, 0.35, 'triangle', 0.2]]),
      txistua: txistua,
      ospatu: () => jo([[523, 0, 0.15], [659, 0.15, 0.15], [784, 0.3, 0.15], [1047, 0.45, 0.5]]),
      piztuta: () => piztuta,
      aldatu: function () {
        piztuta = !piztuta;
        try { localStorage.setItem('tribiala-soinua', piztuta ? 'bai' : 'ez'); } catch (e) { /* ez dago biltegirik */ }
        return piztuta;
      }
    };
  })();

  /* ---------- Pantailak ---------- */

  function erakutsiPantaila(izena) {
    document.querySelectorAll('.pantaila').forEach((p) => {
      p.hidden = p.id !== 'pantaila-' + izena;
    });
    document.body.dataset.pantaila = izena;
    window.scrollTo(0, 0);
  }

  /* ---------- Hasiera ---------- */

  function marraztuHasiera() {
    marraztuKategoriak();
    marraztuZailtasunak();

    const kopurua = iragazi(egoera.kategoria, egoera.zailtasuna).length;
    const info = $('aukeraketa-info');
    const jokatu = $('jokatu');
    if (kopurua === 0) {
      info.innerHTML = '😕 Aukeraketa honetan ez dago galderarik. Aukeratu beste kategoria edo zailtasun bat.';
      jokatu.disabled = true;
    } else if (kopurua < GALDERA_KOPURUA) {
      info.innerHTML = 'Aukeraketa honetan <strong>' + kopurua + ' galdera</strong> baino ez daude: denak jokatuko dituzu! 💪';
      jokatu.disabled = false;
    } else {
      info.innerHTML = 'Ausazko <strong>' + GALDERA_KOPURUA + ' galdera</strong> jokatuko dituzu (' + kopurua + ' daude aukeran). 🎲';
      jokatu.disabled = false;
    }
  }

  function aukeraBotoia(klasea, aukeratuta, edukia, klikean) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = klasea;
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', aukeratuta ? 'true' : 'false');
    b.innerHTML = edukia;
    b.addEventListener('click', klikean);
    return b;
  }

  function marraztuKategoriak() {
    const edukiontzia = $('kategoriak');
    const fokua = document.activeElement && document.activeElement.dataset.kategoria;
    edukiontzia.innerHTML = '';

    const aukerak = [{ id: 'guztiak', izena: 'Guztiak', ikonoa: '🏆' }].concat(egoera.datuak.kategoriak);
    aukerak.forEach((k, i) => {
      const kopurua = iragazi(k.id, egoera.zailtasuna).length;
      const b = aukeraBotoia(
        'kategoria-botoia',
        k.id === egoera.kategoria,
        '<span class="kategoria-ikonoa">' + Marrazkiak.kategoria(k.id, k.ikonoa) + '</span>' +
        '<span class="kategoria-izena">' + ihes(k.izena) + '</span>' +
        '<span class="kategoria-kopurua">' + galderaKopurua(kopurua) + '</span>' +
        '<span class="aukeratuta-ikurra" aria-hidden="true">✔</span>',
        () => {
          egoera.kategoria = k.id;
          soinua.klik();
          marraztuHasiera();
        }
      );
      b.dataset.kategoria = k.id;
      b.style.setProperty('--kolorea', KATEGORIA_KOLOREAK[i % KATEGORIA_KOLOREAK.length]);
      edukiontzia.appendChild(b);
      if (fokua === k.id) b.focus();
    });
  }

  function marraztuZailtasunak() {
    const edukiontzia = $('zailtasunak');
    const fokua = document.activeElement && document.activeElement.dataset.zailtasuna;
    edukiontzia.innerHTML = '';

    ZAILTASUN_AUKERAK.forEach((z) => {
      const dokumentukoa = egoera.datuak.zailtasunak.find((d) => d.gakoa === z.gakoa);
      const deskribapena = z.deskribapena || (dokumentukoa ? dokumentukoa.deskribapena : '');
      const ikonoa = dokumentukoa ? dokumentukoa.ikonoa : z.ikonoa;
      const kopurua = iragazi(egoera.kategoria, z.gakoa).length;
      const b = aukeraBotoia(
        'zailtasun-botoia zailtasun-' + z.gakoa,
        z.gakoa === egoera.zailtasuna,
        '<span class="zailtasun-ikonoa" aria-hidden="true">' + ikonoa + '</span>' +
        '<span class="zailtasun-testua"><span class="zailtasun-izena">' + ihes(z.izena) + '</span>' +
        '<span class="zailtasun-deskribapena">' + mdLerroa(deskribapena) + '</span></span>' +
        '<span class="zailtasun-kopurua">' + kopurua + '</span>',
        () => {
          egoera.zailtasuna = z.gakoa;
          soinua.klik();
          marraztuHasiera();
        }
      );
      b.dataset.zailtasuna = z.gakoa;
      b.title = galderaKopurua(kopurua);
      edukiontzia.appendChild(b);
      if (fokua === z.gakoa) b.focus();
    });
  }

  /* ---------- Jokoa ---------- */

  /** Aukerak nahasten ditu eta dokumentuko letrak (a, b, d...) ordenan berresleitzen ditu. */
  function prestatuGaldera(g) {
    const letrak = g.aukerak.map((a) => a.letra).sort();
    return {
      galdera: g,
      aukerak: nahastu(g.aukerak).map((a, i) => ({
        letra: letrak[i],
        testua: a.testua,
        zuzena: a.letra === g.zuzena
      })),
      aukeratua: null
    };
  }

  function hasiJokoa() {
    const hautagaiak = iragazi(egoera.kategoria, egoera.zailtasuna);
    if (!hautagaiak.length) return;
    // Nahastu eta lehenengo 10ak hartu: ez da galderarik errepikatzen.
    egoera.jokoa = nahastu(hautagaiak).slice(0, GALDERA_KOPURUA).map(prestatuGaldera);
    egoera.unekoa = 0;
    egoera.asmatuak = 0;
    $('markagailua').textContent = '0';
    erakutsiPantaila('jokoa');
    marraztuGaldera();
    soinua.txistua(false);
  }

  function eguneratuAurrerapena() {
    const n = egoera.jokoa.length;
    const erantzunda = egoera.jokoa.filter((j) => j.aukeratua !== null).length;
    const ehunekoa = n ? (erantzunda / n) * 100 : 0;
    $('aurrerapena-baloia').style.left = 'calc(' + ehunekoa + '% * 0.86)';
    $('aurrerapena-betea').style.width = ehunekoa + '%';
    $('aurrerapena-barra').setAttribute('aria-valuenow', String(erantzunda));
    $('aurrerapena-barra').setAttribute('aria-valuemax', String(n));
  }

  function marraztuGaldera() {
    const j = egoera.jokoa[egoera.unekoa];
    const g = j.galdera;
    const n = egoera.jokoa.length;

    $('galdera-zenbakia').textContent = 'Galdera ' + (egoera.unekoa + 1) + ' / ' + n;
    $('galdera-etiketak').innerHTML = kategoriaEtiketa(g) + zailtasunEtiketa(g);
    $('galdera-testua').innerHTML = mdLerroa(g.testua);
    $('jokoa-maskota').innerHTML = Marrazkiak.maskota('harrituta');

    const aukerak = $('aukerak');
    aukerak.innerHTML = '';
    j.aukerak.forEach((a, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'aukera';
      b.dataset.indizea = String(i);
      b.innerHTML =
        '<span class="aukera-letra">' + ihes(a.letra) + ')</span>' +
        '<span class="aukera-testua">' + mdLerroa(a.testua) + '</span>' +
        '<span class="aukera-ikurra" aria-hidden="true"></span>';
      b.addEventListener('click', () => erantzun(i));
      aukerak.appendChild(b);
    });

    $('erantzun-panela').hidden = true;
    eguneratuAurrerapena();

    const txartela = $('galdera-txartela');
    txartela.classList.remove('sartzen');
    void txartela.offsetWidth; // animazioa berrabiarazteko
    txartela.classList.add('sartzen');
  }

  function erantzun(indizea) {
    const j = egoera.jokoa[egoera.unekoa];
    if (j.aukeratua !== null) return;
    j.aukeratua = indizea;

    const ondo = j.aukerak[indizea].zuzena;
    if (ondo) egoera.asmatuak++;

    document.querySelectorAll('#aukerak .aukera').forEach((b, i) => {
      b.disabled = true;
      const a = j.aukerak[i];
      if (a.zuzena) {
        b.classList.add('zuzena');
        b.querySelector('.aukera-ikurra').textContent = '✔';
      } else if (i === indizea) {
        b.classList.add('okerra');
        b.querySelector('.aukera-ikurra').textContent = '✖';
      } else {
        b.classList.add('itzalita');
      }
      if (i === indizea) b.classList.add('aukeratua');
    });

    const markagailua = $('markagailua');
    markagailua.textContent = String(egoera.asmatuak);
    if (ondo) {
      markagailua.parentElement.classList.remove('salto');
      void markagailua.offsetWidth;
      markagailua.parentElement.classList.add('salto');
    }

    const zuzena = j.aukerak.find((a) => a.zuzena);
    const panela = $('erantzun-panela');
    panela.classList.toggle('ondo', ondo);
    panela.classList.toggle('gaizki', !ondo);
    $('erantzun-maskota').innerHTML = Marrazkiak.maskota(ondo ? 'pozik' : 'triste');
    $('jokoa-maskota').innerHTML = Marrazkiak.maskota(ondo ? 'pozik' : 'triste');
    $('erantzun-izenburua').textContent = ausaz(ondo ? OSPAKIZUNAK : HUTSAK);
    $('erantzun-zuzena').innerHTML =
      (ondo ? 'Zure erantzuna zuzena da: ' : 'Erantzun zuzena: ') +
      '<strong>' + ihes(zuzena.letra) + ') ' + mdLerroa(zuzena.testua) + '</strong>';
    $('azalpena-testua').innerHTML = mdBlokea(j.galdera.azalpena);

    const azkena = egoera.unekoa === egoera.jokoa.length - 1;
    $('hurrengoa').innerHTML = azkena ? 'Emaitzak ikusi 🏁' : 'Hurrengo galdera ➜';

    panela.hidden = false;
    eguneratuAurrerapena();

    if (ondo) soinua.ondo(); else soinua.gaizki();

    const mugimendurik = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    panela.scrollIntoView({ behavior: mugimendurik ? 'auto' : 'smooth', block: 'nearest' });
    $('hurrengoa').focus({ preventScroll: true });
  }

  function hurrengoa() {
    if (egoera.unekoa < egoera.jokoa.length - 1) {
      egoera.unekoa++;
      marraztuGaldera();
      soinua.klik();
      $('pantaila-jokoa').scrollIntoView({ block: 'start' });
      const lehena = document.querySelector('#aukerak .aukera');
      if (lehena) lehena.focus({ preventScroll: true });
    } else {
      erakutsiEmaitzak();
    }
  }

  /* ---------- Emaitzak ---------- */

  function mailaKalkulatu(asmatuak, guztira) {
    const zatia = guztira ? asmatuak / guztira : 0;
    if (zatia === 1) return 'bikaina';
    if (zatia >= 0.7) return 'ona';
    if (zatia >= 0.4) return 'erdikoa';
    return 'hasiberria';
  }

  function erakutsiEmaitzak() {
    const n = egoera.jokoa.length;
    const a = egoera.asmatuak;
    const maila = mailaKalkulatu(a, n);
    const info = MAILAK[maila];

    erakutsiPantaila('emaitzak');

    $('emaitza-maskota').innerHTML = Marrazkiak.maskota(info.aldartea);
    $('emaitza-saria').innerHTML = Marrazkiak.saria(maila);
    $('emaitza-izenburua').textContent = info.izenburua;
    $('emaitza-guztira').textContent = String(n);
    $('emaitza-mezua').textContent = ausaz(info.mezuak);
    $('emaitza-izarrak').innerHTML = [0, 1, 2].map((i) =>
      '<span class="izarra' + (i < info.izarrak ? ' piztuta' : '') + '" style="animation-delay:' + (0.3 + i * 0.25) + 's">★</span>'
    ).join('');
    $('emaitza-izarrak').setAttribute('aria-label', info.izarrak + ' izar 3tik');
    $('emaitza-ehunekoa').style.width = (n ? Math.round((a / n) * 100) : 0) + '%';

    zenbatuGora($('emaitza-asmatuak'), a);

    // Txistea (aurrekoa ez errepikatzeko)
    let t;
    do { t = Math.floor(Math.random() * TXISTEAK.length); } while (TXISTEAK.length > 1 && t === egoera.azkenTxistea);
    egoera.azkenTxistea = t;
    $('txistea-galdera').textContent = TXISTEAK[t].g;
    $('txistea-erantzuna').textContent = TXISTEAK[t].e;
    $('txistea-erantzuna').hidden = true;
    $('txistea-botoia').hidden = false;

    egoera.iragazkia = 'denak';
    marraztuBerrikuspena();

    soinua.txistua(true);
    if (maila === 'bikaina' || maila === 'ona') {
      setTimeout(soinua.ospatu, 800);
      konfetia(maila === 'bikaina' ? 140 : 80);
    }
  }

  function zenbatuGora(elementua, helburua) {
    const mugimendurik = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (mugimendurik || helburua === 0) {
      elementua.textContent = String(helburua);
      return;
    }
    let balioa = 0;
    elementua.textContent = '0';
    const tartea = setInterval(() => {
      balioa++;
      elementua.textContent = String(balioa);
      if (balioa >= helburua) clearInterval(tartea);
    }, Math.max(60, 700 / helburua));
  }

  function marraztuBerrikuspena() {
    const zerrenda = $('berrikuspena');
    zerrenda.innerHTML = '';

    const asmatuak = egoera.jokoa.filter((j) => j.aukerak[j.aukeratua].zuzena).length;
    const hutsak = egoera.jokoa.length - asmatuak;
    $('iragazki-denak').textContent = String(egoera.jokoa.length);
    $('iragazki-asmatuak').textContent = String(asmatuak);
    $('iragazki-hutsak').textContent = String(hutsak);

    document.querySelectorAll('.iragazkia').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.iragazkia === egoera.iragazkia ? 'true' : 'false');
    });

    let erakutsiak = 0;
    egoera.jokoa.forEach((j, i) => {
      const g = j.galdera;
      const aukeratua = j.aukerak[j.aukeratua];
      const zuzena = j.aukerak.find((a) => a.zuzena);
      const ondo = aukeratua.zuzena;
      if ((egoera.iragazkia === 'asmatuak' && !ondo) || (egoera.iragazkia === 'hutsak' && ondo)) return;
      erakutsiak++;

      const li = document.createElement('li');
      li.className = 'berrikuspen-elementua ' + (ondo ? 'ondo' : 'gaizki');
      li.innerHTML =
        '<details' + (ondo ? '' : ' open') + '>' +
          '<summary>' +
            '<span class="berrik-ikurra" aria-label="' + (ondo ? 'Asmatua' : 'Hutsa') + '">' + (ondo ? '✅' : '❌') + '</span>' +
            '<span class="berrik-zenbakia">' + (i + 1) + '.</span>' +
            '<span class="berrik-galdera">' + mdLerroa(g.testua) + '</span>' +
            '<span class="berrik-gezia" aria-hidden="true">▾</span>' +
          '</summary>' +
          '<div class="berrik-edukia">' +
            '<div class="berrik-etiketak">' + kategoriaEtiketa(g) + zailtasunEtiketa(g) + '</div>' +
            '<p class="berrik-erantzuna ' + (ondo ? 'ondo' : 'gaizki') + '"><span>Zure erantzuna:</span> ' +
              ihes(aukeratua.letra) + ') ' + mdLerroa(aukeratua.testua) + '</p>' +
            (ondo ? '' :
              '<p class="berrik-erantzuna zuzena"><span>Erantzun zuzena:</span> ' +
              ihes(zuzena.letra) + ') ' + mdLerroa(zuzena.testua) + '</p>') +
            '<div class="azalpena"><h4>🤔 Zergatik?</h4>' + mdBlokea(g.azalpena) + '</div>' +
          '</div>' +
        '</details>';
      zerrenda.appendChild(li);
    });

    if (!erakutsiak) {
      const li = document.createElement('li');
      li.className = 'berrikuspen-hutsik';
      li.textContent = egoera.iragazkia === 'hutsak'
        ? 'Ez duzu hutsik egin! 🎉'
        : 'Oraingoan ez duzu bat ere asmatu... hurrengoan bai! 💪';
      zerrenda.appendChild(li);
    }
  }

  function konfetia(kopurua) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const edukiontzia = $('konfetia');
    const koloreak = ['#ffd23f', '#ef476f', '#06d6a0', '#118ab2', '#ff8c42', '#8e5cf7', '#ffffff'];
    for (let i = 0; i < kopurua; i++) {
      const zatia = document.createElement('span');
      zatia.className = 'konfeti-zatia';
      if (i % 12 === 0) {
        zatia.textContent = ausaz(['⚽', '⭐', '🏆']);
        zatia.classList.add('konfeti-emojia');
      } else {
        zatia.style.background = ausaz(koloreak);
        if (Math.random() < 0.35) zatia.style.borderRadius = '50%';
      }
      zatia.style.left = (Math.random() * 100) + 'vw';
      zatia.style.animationDuration = (2.6 + Math.random() * 2.2) + 's';
      zatia.style.animationDelay = (Math.random() * 0.8) + 's';
      zatia.style.setProperty('--biraketa', (Math.random() * 900 - 450) + 'deg');
      zatia.style.setProperty('--desbideratzea', (Math.random() * 200 - 100) + 'px');
      edukiontzia.appendChild(zatia);
    }
    setTimeout(() => { edukiontzia.innerHTML = ''; }, 6000);
  }

  /* ---------- Arauen leihoa ---------- */

  function betearauak() {
    const d = egoera.datuak;
    $('arauak-izenburua').textContent = '⭐ ' + (d.arauIzenburua || 'Gure txapelketaren arau bereziak');
    $('arauak-sarrera').innerHTML = mdLerroa(d.arauSarrera || '');
    $('arauak-zerrenda').innerHTML = d.arauBereziak.map((a) => '<li>' + mdLerroa(a) + '</li>').join('');
    $('arauak-mailak').innerHTML = d.zailtasunak.map((z) =>
      '<li><span aria-hidden="true">' + z.ikonoa + '</span> <strong>' + ihes(z.izena) + ':</strong> ' + mdLerroa(z.deskribapena) + '</li>'
    ).join('');
    $('arauak-oharra').innerHTML = d.oharra ? 'ℹ️ ' + mdLerroa(d.oharra) : '';
    $('oina-iturria').innerHTML = mdLerroa(d.sarrera || '');
  }

  function irekiArauak() {
    const leihoa = $('arauak-leihoa');
    soinua.klik();
    if (typeof leihoa.showModal === 'function') leihoa.showModal();
    else leihoa.setAttribute('open', '');
  }

  function itxiArauak() {
    const leihoa = $('arauak-leihoa');
    if (typeof leihoa.close === 'function') leihoa.close();
    else leihoa.removeAttribute('open');
  }

  /* ---------- Hasieratzea ---------- */

  async function kargatuDokumentua() {
    // Zerbitzari batetik zerbitzatzen bada, dokumentu originala zuzenean irakurtzen da.
    if (/^https?:$/.test(location.protocol)) {
      try {
        const erantzuna = await fetch(encodeURI(DOKUMENTUA), { cache: 'no-store' });
        if (erantzuna.ok) return await erantzuna.text();
      } catch (e) { /* kopia txertatua erabiliko da */ }
    }
    // Bestela (fitxategia zuzenean irekita), js/dokumentua.js-eko kopia erabiltzen da.
    if (typeof window.TRIBIAL_DOKUMENTUA === 'string') return window.TRIBIAL_DOKUMENTUA;
    throw new Error('Ez da galderen dokumenturik aurkitu');
  }

  function lotuGertaerak() {
    $('jokatu').addEventListener('click', hasiJokoa);
    $('hurrengoa').addEventListener('click', hurrengoa);
    $('berriro').addEventListener('click', hasiJokoa);
    $('hasierara').addEventListener('click', () => { soinua.klik(); marraztuHasiera(); erakutsiPantaila('hasiera'); });
    $('utzi').addEventListener('click', () => {
      if (window.confirm('Ziur zaude jokoa utzi nahi duzula?')) {
        marraztuHasiera();
        erakutsiPantaila('hasiera');
      }
    });
    $('arauak-ireki').addEventListener('click', irekiArauak);
    $('arauak-itxi').addEventListener('click', itxiArauak);
    $('arauak-x').addEventListener('click', itxiArauak);
    $('arauak-leihoa').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) itxiArauak(); // atzealdean klik eginez gero
    });
    $('txistea-botoia').addEventListener('click', () => {
      $('txistea-erantzuna').hidden = false;
      $('txistea-botoia').hidden = true;
      soinua.klik();
    });
    document.querySelectorAll('.iragazkia').forEach((b) => {
      b.addEventListener('click', () => {
        egoera.iragazkia = b.dataset.iragazkia;
        soinua.klik();
        marraztuBerrikuspena();
      });
    });

    const soinuBotoia = $('soinua');
    const eguneratuSoinuBotoia = () => {
      const piztuta = soinua.piztuta();
      soinuBotoia.textContent = piztuta ? '🔊' : '🔇';
      soinuBotoia.setAttribute('aria-pressed', piztuta ? 'true' : 'false');
      soinuBotoia.title = piztuta ? 'Soinua itzali' : 'Soinua piztu';
      soinuBotoia.setAttribute('aria-label', soinuBotoia.title);
    };
    soinuBotoia.addEventListener('click', () => { soinua.aldatu(); eguneratuSoinuBotoia(); soinua.klik(); });
    eguneratuSoinuBotoia();

    // Teklatua: 1-2-3 edo a-b-d letrak erantzuteko
    document.addEventListener('keydown', (e) => {
      if ($('pantaila-jokoa').hidden || e.ctrlKey || e.metaKey || e.altKey) return;
      const j = egoera.jokoa[egoera.unekoa];
      if (!j || j.aukeratua !== null) return;
      const tekla = e.key.toLowerCase();
      let indizea = j.aukerak.findIndex((a) => a.letra === tekla);
      if (indizea < 0 && /^[1-9]$/.test(tekla)) indizea = Number(tekla) - 1;
      if (indizea >= 0 && indizea < j.aukerak.length) {
        e.preventDefault();
        erantzun(indizea);
      }
    });
  }

  async function hasieratu() {
    document.querySelectorAll('[data-marrazkia="maskota"]').forEach((e) => { e.innerHTML = Marrazkiak.maskota('pozik'); });
    document.querySelectorAll('[data-marrazkia="atea"]').forEach((e) => { e.innerHTML = Marrazkiak.atea(); });

    try {
      const md = await kargatuDokumentua();
      egoera.datuak = TribialParser.parseatu(md);
      if (!egoera.datuak.galderak.length) throw new Error('Dokumentuan ez dago galderarik');
      if (egoera.datuak.abisuak.length) console.warn('Tribiala:', egoera.datuak.abisuak);
    } catch (errorea) {
      console.error(errorea);
      $('kargatzen-mezua').innerHTML =
        '😢 Ezin izan dira galderak kargatu.<br><small>Egiaztatu «' + ihes(DOKUMENTUA) +
        '» dokumentua eta <code>js/dokumentua.js</code> fitxategia karpetan daudela.</small>';
      return;
    }

    lotuGertaerak();
    betearauak();
    marraztuHasiera();
    erakutsiPantaila('hasiera');
  }

  document.addEventListener('DOMContentLoaded', hasieratu);
})();
