/*
 * Zelaiaren eta atearen mapa interaktiboa.
 * Zati bakoitza sakatzean, zer den, zer neurri duen eta zertarako balio duen erakusten da.
 * Neurriak futbol 8ko araudietatik hartuta daude (NFF eta FGF).
 */
(function (erroa) {
  'use strict';

  /* ---------- Datuak ---------- */

  const MAPAK = {
    zelaia: {
      izena: 'Zelaia',
      ikonoa: '🏟️',
      oharra: 'Marrazkian 60 × 40 metroko zelai bat ageri da. Futbol 8ko zelaiek 50–65 metro luze eta 30–45 metro zabal izan ditzakete. Neurriak futbol 8ko araudietatik hartuta daude.',
      zatiak: [
        {
          id: 'jokalekua', ikonoa: '🟩', izena: 'Jokalekua',
          zer: 'Jokatzeko lauki zuzena, marrek mugatua. Belar naturala, belar artifiziala edo lurra izan daiteke.',
          neurria: '<strong>50 eta 65 metro</strong> arteko luzera eta <strong>30 eta 45 metro</strong> arteko zabalera. Gutxi gorabehera, futbol 11ko zelai erdia.',
          zertarako: 'Baloia zelaiaren barruan dagoen bitartean, jokoa martxan dago.'
        },
        {
          id: 'alboko-marrak', ikonoa: '↔️', izena: 'Alboko marrak (banda-marrak)',
          zer: 'Zelaiaren bi marra luzeak.',
          neurria: 'Zelaiaren luzera bera (50–65 m). Marra guztiak gehienez <strong>12 cm</strong> zabal dira.',
          zertarako: 'Baloia <strong>osorik</strong> marratik kanpo ateratzen bada, <strong>banda-sakea</strong> egiten da. Marrak zelaiaren barrukoak dira: baloia marraren gainean badago, jokoan dago.'
        },
        {
          id: 'ate-marrak', ikonoa: '↕️', izena: 'Ate-marrak',
          zer: 'Zelaiaren bi marra laburrak. Ateak marra horien erdian daude.',
          neurria: 'Zelaiaren zabalera bera (30–45 m). Zutoinen arteko zatiak zutoinen zabalera bera du (gehienez 12 cm).',
          zertarako: 'Baloia osorik pasatzen bada, zutoinen artean eta langaren azpitik, <strong>gola</strong> da. Atetik kanpo pasatzen bada, <strong>ate-sakea</strong> edo <strong>kornerra</strong> da, azken ukitua nork egin duen kontuan hartuta.'
        },
        {
          id: 'erdiko-marra', ikonoa: '➗', izena: 'Erdiko marra',
          zer: 'Zelaia bi zati berdinetan banatzen duen marra, alboko marra batetik bestera.',
          neurria: 'Zelaiaren erdi-erdian dago, bi ate-marretatik distantzia berera.',
          zertarako: 'Hasierako sakean, talde bakoitzak <strong>bere zelai erdian</strong> egon behar du. Gure txapelketan, hirugarren zatiko aldaketak <strong>zelai erditik</strong> egiten dira.'
        },
        {
          id: 'erdiko-zirkulua', ikonoa: '⭕', izena: 'Erdiko zirkulua eta puntua',
          zer: 'Erdiko marraren erdian dagoen puntua eta haren inguruko zirkulua.',
          neurria: 'Zirkuluak <strong>6 metroko erradioa</strong> du, erdiko puntutik neurtuta.',
          zertarako: '<strong>Hasierako sakea</strong> erdiko puntutik egiten da. Aurkariek zirkulutik kanpo egon behar dute baloia jokoan egon arte.'
        },
        {
          id: 'area-handia', ikonoa: '🟥', izena: 'Area handia (penalti-area)',
          zer: 'Atearen aurrean dagoen lauki handia.',
          neurria: 'Zutoin bakoitzetik <strong>9 metro</strong> alboetara eta <strong>9 metro</strong> zelai barrura: 24 m zabal eta 9 m sakon.',
          zertarako: 'Atezainak baloia <strong>eskuekin</strong> har dezake bertan bakarrik. Defentsak bertan falta zuzena egiten badu, <strong>penaltia</strong> da. Ate-sakean, aurkariek areatik kanpo egon behar dute.'
        },
        {
          id: 'area-txikia', ikonoa: '🟧', izena: 'Area txikia (ate-area)',
          zer: 'Atearen ondo-ondoan dagoen lauki txikia, area handiaren barruan.',
          neurria: 'Zutoin bakoitzetik <strong>3 metro</strong> alboetara eta <strong>3 metro</strong> zelai barrura: 12 m zabal eta 3 m sakon.',
          zertarako: '<strong>Ate-sakea</strong> area txikiko edozein puntutik egiten da. Erasoko taldeak zeharkako jaurtiketa librea area txikiaren barruan badu, baloia area txikiaren marrara ateratzen da.'
        },
        {
          id: 'penalti-puntua', ikonoa: '⚪', izena: 'Penalti-puntua',
          zer: 'Area handiaren aurrean, ate erdiaren parean, marraztutako puntua.',
          neurria: 'Ate-marraren erdiko puntutik <strong>9 metrora</strong> (futbol 11n, 11 metrora).',
          zertarako: '<strong>Penaltiak</strong> hemendik jaurtitzen dira, baloia puntuaren gainean geldirik dagoela.'
        },
        {
          id: 'penalti-arkua', ikonoa: '🌙', izena: 'Area kanpoko arkua',
          zer: 'Area handitik kanpo marrazten den arku erdia.',
          neurria: '<strong>6 metroko erradioa</strong>, penalti-puntutik neurtuta.',
          zertarako: 'Penaltian, jaurtitzailea eta atezaina ez diren jokalariek arkutik kanpo egon behar dute, penalti-puntutik gutxienez 6 metrora.'
        },
        {
          id: 'jokoz-kanpo-marra', ikonoa: '🚩', izena: 'Jokoz kanpoko marra (12 m)',
          zer: 'Ate-marraren paraleloa den marra, alboko marra batetik bestera.',
          neurria: 'Ate-marratik <strong>12 metrora</strong>. Zelaiak bi ditu, bat ate bakoitzaren aurrean.',
          zertarako: 'Futbol 8an, <strong>jokoz kanpoa</strong> marra horren eta ate-marraren artean bakarrik adierazten da. Marra horren atzean ez dago jokoz kanporik.'
        },
        {
          id: 'izkinak', ikonoa: '⛳', izena: 'Izkinak: arkua eta banderatxoa',
          zer: 'Zelaiaren lau izkinetan, marraztutako arku txiki bat eta banderatxo bat.',
          neurria: 'Arkuak <strong>0,6 metroko erradioa</strong> du. Banderatxoaren makilak gutxienez <strong>1,5 metro</strong> garai da, eta ez du puntaduna izan behar.',
          zertarako: '<strong>Kornerra</strong> jaurtitzeko, baloia arkuaren barruan jartzen da. Banderatxoa ezin da kendu edo mugitu kornerra jaurtitzeko.'
        },
        {
          id: 'ateak', ikonoa: '🥅', izena: 'Ateak',
          zer: 'Ate-marra bakoitzaren erdian dagoen atea, bi zutoinez, langa batez eta sare batez egina.',
          neurria: '<strong>6 metro</strong> zabal eta <strong>2 metro</strong> garai (barruko neurriak).',
          zertarako: 'Baloia atean sartzen bada, gola da. Zati guztiak ezagutzeko, ikusi <strong>Atea</strong> mapa.',
          esteka: 'atea'
        },
        {
          id: 'eremu-teknikoa', ikonoa: '📋', izena: 'Entrenatzailearen gunea (eremu teknikoa)',
          zer: 'Talde bakoitzaren aulkiaren inguruko gunea, zelaitik kanpo.',
          neurria: 'Normalean marraz adierazten da: aulkitik <strong>metro bat</strong> alde banatara eta alboko marratik <strong>metro batera</strong> arte.',
          zertarako: 'Entrenatzaileak hemendik ematen ditu aginduak, eta zutik egon daiteke. Ezin da zelaira sartu epaileak baimena eman gabe, ezta beste bandara joan aginduak ematera ere.'
        },
        {
          id: 'aulkiak', ikonoa: '🪑', izena: 'Ordezkoen aulkiak (eserlekuak)',
          zer: 'Talde bakoitzaren eserlekua, zelaitik kanpo, alboko marraren ondoan. Bi aulkiak zelaiaren alde berean daude, erdiko marraren alde banatan.',
          neurria: 'Araudiak ez du neurri finkorik ematen. Talde bakoitzak berea du.',
          zertarako: 'Ordezkoak eta laguntzaileak bertan eserita egoten dira, aldaketaren zain. Aktan dauden guztiek beren aulkian eserita egon behar dute, aginduak ematen dituen entrenatzaileak izan ezik.'
        },
        {
          id: 'harmaila', ikonoa: '👨‍👩‍👧', izena: 'Harmaila (ikusleak)',
          zer: 'Ikusleentzako eserlekuak, zelaitik kanpo, hesi baten atzean.',
          neurria: 'Araudiak ez du neurri finkorik ematen, baina zelaitik bereizita egon behar du.',
          zertarako: 'Familiek eta lagunek partida ikusteko eta <strong>animatzeko</strong>. Ikusleak ezin dira zelaira sartu, eta errespetuz animatu behar dute: inoiz ez iraindu epailea, jokalariak edo entrenatzaileak.'
        }
      ]
    },
    atea: {
      izena: 'Atea',
      ikonoa: '🥅',
      oharra: 'Zutoinak eta langa benetan baino lodiago marraztuta daude, hobeto ikusteko. Neurriak futbol 8ko araudietatik hartuta daude.',
      zatiak: [
        {
          id: 'zutoinak', ikonoa: '🏛️', izena: 'Zutoinak',
          zer: 'Atearen bi makila bertikalak.',
          neurria: 'Haien artean <strong>6 metro</strong> daude (barruko neurria). Gehienez <strong>12 cm</strong> zabal eta lodi dira, zuriak, eta langaren zabalera berekoak. Karratuak, laukizuzenak, biribilak edo eliptikoak izan daitezke.',
          zertarako: 'Atearen alboak mugatzen dituzte. Baloiak zutoina jotzen badu eta barrura sartzen bada, gola da.'
        },
        {
          id: 'langa', ikonoa: '➖', izena: 'Langa',
          zer: 'Zutoinak goian lotzen dituen makila horizontala.',
          neurria: 'Beheko ertza lurretik <strong>2 metrora</strong> dago. Gehienez <strong>12 cm</strong> zabal da, zutoinen zabalera berekoa.',
          zertarako: 'Atearen goiko muga da. Baloia langaren gainetik pasatzen bada, ez da gola.'
        },
        {
          id: 'sarea', ikonoa: '🕸️', izena: 'Sarea',
          zer: 'Atearen atzean dagoen sarea, zutoinei, langari eta lurrari lotua.',
          neurria: 'Araudiak ez du neurririk ematen, baina ondo lotuta egon behar du eta ez du atezaina oztopatu behar. Kalamuz, jutez edo nylonez egina izan daiteke.',
          zertarako: 'Baloia harrapatzen du, eta horrela denek argi ikusten dute gola izan dela.'
        },
        {
          id: 'ate-marra-atea', ikonoa: '⬜', izena: 'Ate-marra (zutoinen artean)',
          zer: 'Bi zutoinen artean lurrean marraztutako marra.',
          neurria: '<strong>6 metro</strong> luze, eta zutoinen zabalera bera (gehienez 12 cm).',
          zertarako: 'Baloia <strong>osorik</strong> marra hau zeharkatzen badu, zutoinen artean eta langaren azpitik, <strong>gola</strong> da. Penaltian, atezainak gutxienez oin bat marraren gainean edo parean izan behar du.'
        },
        {
          id: 'ainguraketa', ikonoa: '⚓', izena: 'Ainguraketa (lurrari lotzea)',
          zer: 'Atea lurrari lotzen duten euskarriak eta pisuak.',
          neurria: 'Araudiak ez du neurririk ematen, baina ateak lurrean <strong>ondo ainguratuta</strong> egon behar du, baita ate eramangarriak ere.',
          zertarako: '<strong>Segurtasuna!</strong> Ainguratu gabeko ate bat gainera eror daiteke. Horregatik, ez da inoiz atean eskegi behar, ezta langaren gainera igo ere.'
        }
      ]
    }
  };

  /* ---------- SVG laguntzaileak ---------- */

  // Zelaian 10 unitate = metro 1. Zelaia: 60 m × 40 m (araudiak 50–65 m × 30–45 m onartzen ditu).
  const L = 600; // luzera
  const Z = 400; // zabalera

  function zatia(id, edukia) {
    const z = bilatu(id);
    return '<g class="mapa-zatia" data-zatia="' + id + '" tabindex="0" role="button" aria-label="' + z.izena + '">' +
      '<title>' + z.izena + '</title>' + edukia + '</g>';
  }

  // Marra ikusgaia eta sakatzeko marra lodi gardena
  function marra(d) {
    return '<path class="ik" d="' + d + '"/><path class="jo" d="' + d + '"/>';
  }

  function ispilua(x) { return L - x; }

  /* ---------- Zelaiaren marrazkia ---------- */

  function zelaiaSvg() {
    const s = [];
    s.push('<svg class="mapa-svg" viewBox="-70 -175 740 680" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Futbol 8ko zelaia">');
    s.push('<defs>' +
      '<pattern id="belar-marrak" width="100" height="400" patternUnits="userSpaceOnUse">' +
      '<rect width="50" height="400" fill="#3fb55c"/><rect x="50" width="50" height="400" fill="#37a953"/></pattern>' +
      '<pattern id="sare-txikia" width="5" height="5" patternUnits="userSpaceOnUse">' +
      '<path d="M5 0H0V5" fill="none" stroke="#fff" stroke-width="0.8" opacity="0.8"/></pattern>' +
      '</defs>');

    // Inguruko lurra
    s.push('<rect x="-70" y="-175" width="740" height="680" rx="24" fill="#2f8a47"/>');

    // Harmaila eta hesia
    let harmaila = '';
    const mailak = ['#90a4ae', '#b0bec5', '#90a4ae', '#b0bec5'];
    mailak.forEach((kolorea, i) => {
      harmaila += '<rect x="100" y="' + (-165 + i * 25) + '" width="400" height="25" fill="' + kolorea + '"/>';
    });
    const ikusleKoloreak = ['#ef476f', '#ffd23f', '#118ab2', '#ff8c42', '#8e5cf7', '#06d6a0', '#ff6fb5'];
    for (let errenkada = 0; errenkada < 4; errenkada++) {
      for (let i = 0; i < 16; i++) {
        if ((i * 7 + errenkada * 3) % 5 === 0) continue; // eserleku huts batzuk
        const x = 118 + i * 24.5 + (errenkada % 2) * 6;
        const y = -152 + errenkada * 25;
        harmaila += '<circle cx="' + x + '" cy="' + y + '" r="6" fill="' + ikusleKoloreak[(i + errenkada) % ikusleKoloreak.length] + '"/>';
      }
    }
    harmaila += '<path class="ik" d="M-40 -40H640" style="stroke:#eceff1"/>';
    for (let x = -40; x <= 640; x += 40) {
      harmaila += '<line x1="' + x + '" y1="-48" x2="' + x + '" y2="-32" stroke="#eceff1" stroke-width="3"/>';
    }
    harmaila += '<rect class="jo-bete" x="95" y="-170" width="410" height="140"/>';
    s.push(zatia('harmaila', harmaila));

    // Jokalekua (oinarria)
    s.push(zatia('jokalekua',
      '<rect x="0" y="0" width="' + L + '" height="' + Z + '" fill="url(#belar-marrak)"/>' +
      '<rect class="jo-bete" x="0" y="0" width="' + L + '" height="' + Z + '"/>'));

    // Area handiak: zutoin bakoitzetik 9 m alboetara (ateak 6 m) eta 9 m barrura
    s.push(zatia('area-handia',
      marra('M0 80H90V320H0') + marra('M' + L + ' 80H' + ispilua(90) + 'V320H' + L) +
      '<rect class="jo-bete" x="0" y="80" width="90" height="240"/>' +
      '<rect class="jo-bete" x="' + ispilua(90) + '" y="80" width="90" height="240"/>'));

    // Area txikiak: 3 m alboetara eta 3 m barrura
    s.push(zatia('area-txikia',
      marra('M0 140H30V260H0') + marra('M' + L + ' 140H' + ispilua(30) + 'V260H' + L) +
      '<rect class="jo-bete" x="0" y="140" width="30" height="120"/>' +
      '<rect class="jo-bete" x="' + ispilua(30) + '" y="140" width="30" height="120"/>'));

    // Area kanpoko arkuak: 6 m erradioa penalti-puntutik (9 m)
    s.push(zatia('penalti-arkua',
      marra('M90 140A60 60 0 0 1 90 260') + marra('M' + ispilua(90) + ' 140A60 60 0 0 0 ' + ispilua(90) + ' 260')));

    // Jokoz kanpoko marrak: 12 m
    s.push(zatia('jokoz-kanpo-marra',
      marra('M120 0V' + Z) + marra('M' + ispilua(120) + ' 0V' + Z)));

    // Erdiko zirkulua eta puntua: 6 m erradioa
    s.push(zatia('erdiko-zirkulua',
      '<circle class="ik" cx="300" cy="200" r="60"/><circle class="jo" cx="300" cy="200" r="60"/>' +
      '<circle class="ik-f" cx="300" cy="200" r="5" fill="#fff"/><circle class="jo-bete" cx="300" cy="200" r="16"/>'));

    // Erdiko marra
    s.push(zatia('erdiko-marra', marra('M300 0V' + Z)));

    // Alboko marrak
    s.push(zatia('alboko-marrak', marra('M0 0H' + L) + marra('M0 ' + Z + 'H' + L)));

    // Ate-marrak
    s.push(zatia('ate-marrak', marra('M0 0V' + Z) + marra('M' + L + ' 0V' + Z)));

    // Penalti-puntuak
    s.push(zatia('penalti-puntua',
      '<circle class="ik-f" cx="90" cy="200" r="5" fill="#fff"/><circle class="jo-bete" cx="90" cy="200" r="16"/>' +
      '<circle class="ik-f" cx="' + ispilua(90) + '" cy="200" r="5" fill="#fff"/><circle class="jo-bete" cx="' + ispilua(90) + '" cy="200" r="16"/>'));

    // Izkinak: 0,6 m-ko arkua eta banderatxoa
    let izkinak = '';
    [[0, 0, 1, 1], [L, 0, -1, 1], [0, Z, 1, -1], [L, Z, -1, -1]].forEach(([x, y, sx, sy]) => {
      const r = 6;
      const ekorketa = sx * sy > 0 ? 1 : 0;
      izkinak += '<path class="ik" d="M' + (x + sx * r) + ' ' + y + 'A' + r + ' ' + r + ' 0 0 ' + ekorketa + ' ' + x + ' ' + (y + sy * r) + '"/>';
      izkinak += '<polygon class="ik-f" points="' + x + ',' + y + ' ' + (x - sx * 18) + ',' + (y - sy * 6) + ' ' + (x - sx * 6) + ',' + (y - sy * 18) + '" fill="#ef476f"/>';
      izkinak += '<circle cx="' + x + '" cy="' + y + '" r="3" fill="#22313f"/>';
      izkinak += '<circle class="jo-bete" cx="' + x + '" cy="' + y + '" r="24"/>';
    });
    s.push(zatia('izkinak', izkinak));

    // Ateak (goitik ikusita): 6 m zabal, sarea 1,5 m atzera
    let ateak = '';
    [[0, -1], [L, 1]].forEach(([x, norabidea]) => {
      const atzea = x + norabidea * 15;
      ateak += '<rect x="' + Math.min(x, atzea) + '" y="170" width="15" height="60" fill="url(#sare-txikia)" stroke="#fff" stroke-width="1.5"/>';
      ateak += '<path class="ik" d="M' + x + ' 170H' + atzea + 'V230H' + x + '"/>';
      ateak += '<circle class="ik-f" cx="' + x + '" cy="170" r="4" fill="#fff"/><circle class="ik-f" cx="' + x + '" cy="230" r="4" fill="#fff"/>';
      ateak += '<rect class="jo-bete" x="' + (Math.min(x, atzea) - 6) + '" y="162" width="27" height="76"/>';
    });
    s.push(zatia('ateak', ateak));

    // Entrenatzailearen guneak eta ordezkoen aulkiak (zelaitik kanpo, alde berean)
    let guneak = '';
    let aulkiak = '';
    [[180, '#118ab2'], [330, '#ef476f']].forEach(([x, kolorea]) => {
      guneak += '<rect class="ik" x="' + x + '" y="410" width="90" height="62" rx="4" style="stroke-dasharray:8 6;fill:rgba(255,255,255,0.08)"/>';
      guneak += '<rect class="jo-bete" x="' + x + '" y="410" width="90" height="62"/>';
      // entrenatzailea zutik
      guneak += '<circle cx="' + (x + 45) + '" cy="420" r="5" fill="#ffd8b0" stroke="#22313f" stroke-width="1.5"/>';
      guneak += '<rect x="' + (x + 40) + '" y="425" width="10" height="9" rx="3" fill="#22313f"/>';

      aulkiak += '<rect class="ik-f" x="' + (x + 10) + '" y="442" width="70" height="20" rx="5" fill="' + kolorea + '" stroke="#22313f" stroke-width="2"/>';
      for (let i = 0; i < 5; i++) {
        aulkiak += '<rect x="' + (x + 15 + i * 13) + '" y="446" width="9" height="12" rx="2" fill="rgba(255,255,255,0.55)"/>';
      }
      aulkiak += '<rect class="jo-bete" x="' + (x + 8) + '" y="438" width="74" height="28"/>';
    });
    s.push(zatia('eremu-teknikoa', guneak));
    s.push(zatia('aulkiak', aulkiak));

    s.push('</svg>');
    return s.join('');
  }

  /* ---------- Atearen marrazkia (aurretik ikusita) ---------- */

  function ateaSvg() {
    // 40 unitate = metro 1. Atea: 6 m × 2 m → 240 × 80. Zutoinak lodiago marraztuta, hobeto ikusteko.
    const s = [];
    s.push('<svg class="mapa-svg" viewBox="-70 -62 380 200" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Futbol 8ko atea">');
    s.push('<defs>' +
      '<pattern id="sare-handia" width="8" height="8" patternUnits="userSpaceOnUse">' +
      '<path d="M8 0H0V8" fill="none" stroke="#ffffff" stroke-width="0.9" opacity="0.85"/></pattern>' +
      '<linearGradient id="zerua-atea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#d6f0ff"/></linearGradient>' +
      '</defs>');

    // Zerua eta belarra
    s.push('<rect x="-70" y="-62" width="380" height="122" fill="url(#zerua-atea)"/>');
    s.push('<rect x="-70" y="56" width="380" height="82" fill="#3fb55c"/>');

    // Sarea: goiko, alboetako eta atzeko azalak (perspektiban)
    const sarea =
      '<polygon points="0,0 240,0 222,16 18,16" fill="url(#sare-handia)"/>' +
      '<polygon points="0,0 18,16 18,66 0,80" fill="url(#sare-handia)"/>' +
      '<polygon points="240,0 222,16 222,66 240,80" fill="url(#sare-handia)"/>' +
      '<polygon points="18,16 222,16 222,66 18,66" fill="url(#sare-handia)"/>' +
      '<polygon class="jo-bete" points="0,0 240,0 240,80 0,80"/>';
    s.push(zatia('sarea', sarea));

    // Ainguraketa: atzeko euskarriak eta pisuak
    let aingura = '';
    aingura += '<path class="ik" d="M0 80L18 66H222L240 80" style="stroke:#78909c"/>';
    aingura += '<path class="jo" d="M0 80L18 66H222L240 80"/>';
    aingura += '<path class="ik" d="M18 16V66M222 16V66" style="stroke:#78909c;stroke-width:2.5"/>';
    [[10, 66], [212, 66]].forEach(([x, y]) => {
      aingura += '<rect class="ik-f" x="' + x + '" y="' + (y - 6) + '" width="16" height="10" rx="3" fill="#5d4037" stroke="#22313f" stroke-width="1.5"/>';
      aingura += '<rect class="jo-bete" x="' + (x - 4) + '" y="' + (y - 10) + '" width="24" height="18"/>';
    });
    s.push(zatia('ainguraketa', aingura));

    // Ate-marra (lur osoan zehar, zutoinen artekoa nabarmenduta)
    s.push('<rect x="-70" y="80" width="380" height="4" fill="#ffffff" opacity="0.7"/>');
    s.push(zatia('ate-marra-atea',
      '<rect class="ik-f" x="0" y="80" width="240" height="4" fill="#fff"/>' +
      '<rect class="jo-bete" x="0" y="76" width="240" height="14"/>'));

    // Zutoinak
    s.push(zatia('zutoinak',
      '<rect class="ik-f" x="-8" y="-8" width="8" height="90" fill="#fff" stroke="#b0bec5" stroke-width="1"/>' +
      '<rect class="ik-f" x="240" y="-8" width="8" height="90" fill="#fff" stroke="#b0bec5" stroke-width="1"/>' +
      '<rect class="jo-bete" x="-14" y="2" width="20" height="82"/>' +
      '<rect class="jo-bete" x="234" y="2" width="20" height="82"/>'));

    // Langa
    s.push(zatia('langa',
      '<rect class="ik-f" x="-8" y="-8" width="256" height="8" fill="#fff" stroke="#b0bec5" stroke-width="1"/>' +
      '<rect class="jo-bete" x="-8" y="-14" width="256" height="18"/>'));

    // Neurriak (ez dira sakatzekoak)
    s.push('<g class="mapa-neurriak" aria-hidden="true">' +
      '<path d="M0 -32H240M0 -38V-26M240 -38V-26" stroke="#22313f" stroke-width="1.5" fill="none"/>' +
      '<text x="120" y="-40" text-anchor="middle">6 m</text>' +
      '<path d="M270 0V80M264 0H276M264 80H276" stroke="#22313f" stroke-width="1.5" fill="none"/>' +
      '<text x="280" y="44">2 m</text>' +
      '</g>');

    s.push('</svg>');
    return s.join('');
  }

  /* ---------- Elkarrekintza ---------- */

  const egoera = { mapa: 'zelaia', hautatua: null, klik: function () {} };

  function bilatu(id) {
    for (const gakoa in MAPAK) {
      const z = MAPAK[gakoa].zatiak.find((zz) => zz.id === id);
      if (z) return z;
    }
    return null;
  }

  function $(id) { return document.getElementById(id); }

  function marraztuMapa() {
    const mapa = MAPAK[egoera.mapa];
    $('mapa-marrazkia').innerHTML = egoera.mapa === 'zelaia' ? zelaiaSvg() : ateaSvg();
    $('mapa-oharra').textContent = 'ℹ️ ' + mapa.oharra;

    document.querySelectorAll('.mapa-fitxa').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.mapa === egoera.mapa ? 'true' : 'false');
    });

    const zerrenda = $('mapa-zatiak');
    zerrenda.innerHTML = '';
    mapa.zatiak.forEach((z) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pilula mapa-botoia';
      b.dataset.zatia = z.id;
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span aria-hidden="true">' + z.ikonoa + '</span> ' + z.izena;
      b.addEventListener('click', () => hautatu(z.id));
      zerrenda.appendChild(b);
    });

    $('mapa-marrazkia').querySelectorAll('.mapa-zatia').forEach((g) => {
      g.addEventListener('click', () => hautatu(g.dataset.zatia, true));
      g.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          hautatu(g.dataset.zatia, true);
        }
      });
    });

    egoera.hautatua = null;
    erakutsiInfo(null);
  }

  function hautatu(id, marrazkitik) {
    const z = bilatu(id);
    if (!z) return;
    egoera.hautatua = id;
    egoera.klik();

    $('mapa-marrazkia').querySelectorAll('.mapa-zatia').forEach((g) => {
      g.classList.toggle('hautatua', g.dataset.zatia === id);
    });
    $('mapa-zatiak').querySelectorAll('.mapa-botoia').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.zatia === id ? 'true' : 'false');
    });

    erakutsiInfo(z);
    if (marrazkitik) {
      const info = $('mapa-info');
      const goia = info.getBoundingClientRect();
      if (goia.top > window.innerHeight - 80) info.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function erakutsiInfo(z) {
    const info = $('mapa-info');
    if (!z) {
      info.classList.remove('betea');
      info.innerHTML = '<p class="mapa-info-hutsa">👆 Sakatu marrazkiko zati bat edo beheko botoi bat, zer den, zer neurri duen eta zertarako balio duen jakiteko.</p>';
      return;
    }
    info.classList.add('betea');
    let html =
      '<h3 class="mapa-info-izenburua"><span aria-hidden="true">' + z.ikonoa + '</span> ' + z.izena + '</h3>' +
      '<dl class="mapa-info-zerrenda">' +
      '<div><dt>🤔 Zer da?</dt><dd>' + z.zer + '</dd></div>' +
      '<div><dt>📏 Neurria</dt><dd>' + z.neurria + '</dd></div>' +
      '<div><dt>🎯 Zertarako?</dt><dd>' + z.zertarako + '</dd></div>' +
      '</dl>';
    if (z.esteka) {
      html += '<button type="button" class="botoia botoia-urdina botoia-txikia mapa-esteka" data-mapa="' + z.esteka + '">' +
        MAPAK[z.esteka].ikonoa + ' ' + MAPAK[z.esteka].izena + ' mapa ikusi</button>';
    }
    info.innerHTML = html;
    const esteka = info.querySelector('.mapa-esteka');
    if (esteka) esteka.addEventListener('click', () => aldatuMapa(esteka.dataset.mapa));
  }

  function aldatuMapa(gakoa) {
    if (!MAPAK[gakoa] || gakoa === egoera.mapa) return;
    egoera.mapa = gakoa;
    egoera.klik();
    marraztuMapa();
  }

  /**
   * Mapa prestatzen du. Behin bakarrik deitu behar da.
   * @param {{klik?: Function}} aukerak  klik: botoiak sakatzean jotzeko soinua
   */
  function hasieratu(aukerak) {
    if (!$('mapa-marrazkia')) return;
    if (aukerak && typeof aukerak.klik === 'function') egoera.klik = aukerak.klik;
    document.querySelectorAll('.mapa-fitxa').forEach((b) => {
      b.addEventListener('click', () => aldatuMapa(b.dataset.mapa));
    });
    marraztuMapa();
  }

  erroa.ZelaiaMapa = { hasieratu: hasieratu, mapak: MAPAK };
})(window);
