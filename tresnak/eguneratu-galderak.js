#!/usr/bin/env node
/*
 * «Tribial futbol galderak.md» dokumentua js/dokumentua.js fitxategira kopiatzen du,
 * aplikazioa zerbitzaririk gabe (index.html zuzenean irekita) ibil dadin.
 *
 * Erabilera:  node tresnak/eguneratu-galderak.js
 * (edo Windows-en: eguneratu-galderak.bat fitxategian klik bikoitza)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { parseatu } = require('../js/parser.js');

const ERROA = path.join(__dirname, '..');
const DOKUMENTUA = path.join(ERROA, 'Tribial futbol galderak.md');
const IRTEERA = path.join(ERROA, 'js', 'dokumentua.js');

const md = fs.readFileSync(DOKUMENTUA, 'utf8');
const datuak = parseatu(md);

console.log('Dokumentua: ' + path.basename(DOKUMENTUA));
console.log('Galderak guztira: ' + datuak.galderak.length);
for (const k of datuak.kategoriak) {
  const zenbaketa = { erraza: 0, ertaina: 0, zaila: 0 };
  datuak.galderak
    .filter((g) => g.kategoria === k.id)
    .forEach((g) => { zenbaketa[g.zailtasuna] = (zenbaketa[g.zailtasuna] || 0) + 1; });
  console.log(
    '  ' + k.ikonoa + ' ' + k.izena.padEnd(16) +
    ' erraza: ' + zenbaketa.erraza + '  ertaina: ' + zenbaketa.ertaina + '  zaila: ' + zenbaketa.zaila
  );
}
console.log('Arau bereziak: ' + datuak.arauBereziak.length);

if (datuak.abisuak.length) {
  console.warn('\nABISUAK:');
  datuak.abisuak.forEach((a) => console.warn('  - ' + a));
}

if (!datuak.galderak.length) {
  console.error('\nEz da galderarik aurkitu. Ez da js/dokumentua.js eguneratu.');
  process.exit(1);
}

const edukia =
  '// FITXATEGI HAU AUTOMATIKOKI SORTUA DA. EZ EDITATU ESKUZ.\n' +
  '// Iturria: «Tribial futbol galderak.md». Eguneratzeko: node tresnak/eguneratu-galderak.js\n' +
  'window.TRIBIAL_DOKUMENTUA = ' + JSON.stringify(md) + ';\n';

fs.writeFileSync(IRTEERA, edukia, 'utf8');
console.log('\nEguneratuta: ' + path.relative(ERROA, IRTEERA));
