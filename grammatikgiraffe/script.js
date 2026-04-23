// --- DATENBANKEN ---

const kData = [
    { s: "<u>Der Hund</u> bellt laut.", c: "Nominativ", q: "Wer oder was bellt laut?", a: "Der Hund" },
    { s: "Das Haus <u>meines Opas</u> ist alt.", c: "Genitiv", q: "Wessen Haus ist alt?", a: "meines Opas" },
    { s: "Ich helfe <u>dem Kind</u> beim Lernen.", c: "Dativ", q: "Wem helfe ich beim Lernen?", a: "dem Kind" },
    { s: "Wir sehen <u>den Turm</u> in der Ferne.", c: "Akkusativ", q: "Wen oder was sehen wir in der Ferne?", a: "den Turm" },
    { s: "<u>Die Katze</u> schläft friedlich.", c: "Nominativ", q: "Wer oder was schläft friedlich?", a: "Die Katze" },
    { s: "Die Farbe <u>des Autos</u> ist blau.", c: "Genitiv", q: "Wessen Farbe ist blau?", a: "des Autos" },
    { s: "Er schenkt <u>ihr</u> eine bunte Blume.", c: "Dativ", q: "Wem schenkt er eine bunte Blume?", a: "ihr" },
    { s: "Ich esse <u>einen roten Apfel</u>.", c: "Akkusativ", q: "Wen oder was esse ich?", a: "einen Apfel" },
    { s: "<u>Mein Bruder</u> lacht viel.", c: "Nominativ", q: "Wer oder was lacht viel?", a: "Mein Bruder" },
    { s: "Das ist der Ball <u>des Jungen</u>.", c: "Genitiv", q: "Wessen Ball ist das?", a: "des Jungen" }
];

const wData = [
    { s: ["Die", "gelbe", "Giraffe", "frisst", "Blätter."], t: ["bestimmter Artikel", "Adjektiv", "Nomen", "Verb", "Nomen"] },
    { s: ["Ein", "lustiges", "Einhorn", "pupst", "leise."], t: ["unbestimmter Artikel", "Adjektiv", "Nomen", "Verb", "Adjektiv"] },
    { s: ["Sie", "sucht", "ihren", "Schatz."], t: ["Pronomen", "Verb", "Pronomen", "Nomen"] },
    { s: ["Wir", "bauen", "ein", "großes", "Haus."], t: ["Pronomen", "Verb", "unbestimmter Artikel", "Adjektiv", "Nomen"] }
];

const sData = [
    {n:"schnell",p:"schnell",k:"schneller",s:"am schnellsten",b:true},
    {n:"gut",p:"gut",k:"besser",s:"am besten",b:true},
    {n:"tot",p:"tot",k:"-",s:"-",b:false},
    {n:"hoch",p:"hoch",k:"höher",s:"am höchsten",b:true},
    {n:"leer",p:"leer",k:"-",s:"-",b:false},
    {n:"groß",p:"groß",k:"größer",s:"am größten",b:true}
];

const kartenData = [
    { t: "Verb", d: "Ein <b>Tunwort</b>. Es beschreibt eine Handlung oder einen Vorgang. Man kann es konjugieren (ich gehe, du gehst).<br><i>Beispiel: rennen, schlafen.</i>" },
    { t: "Nomen", d: "Ein <b>Hauptwort oder Namenwort</b>. Es bezeichnet Lebewesen, Dinge oder Gefühle. Man schreibt es immer groß und kann Artikel davor setzen.<br><i>Beispiel: Baum, Giraffe, Liebe.</i>" },
    { t: "Adjektiv", d: "Ein <b>Eigenschaftswort oder Wiewort</b>. Es beschreibt Eigenschaften (wie etwas ist). Man kann es meistens steigern.<br><i>Beispiel: bunt, schlau, groß.</i>" },
    { t: "Pronomen", d: "Ein <b>Fürwort</b>. Es steht 'für' ein Nomen. Es kann ein Nomen ersetzen oder Besitz anzeigen.<br><i>Beispiel: er, sie, mein, diese.</i>" },
    { t: "bestimmter Artikel", d: "Fester Begleiter eines Nomens. Er gibt das Geschlecht an. Es gibt nur drei: <b>der, die, das</b>." },
    { t: "unbestimmter Artikel", d: "Ein Begleiter, wenn man etwas nicht ganz genau meint. Es gibt zwei: <b>ein, eine</b>." },
    { t: "Kasus", d: "Das Fachwort für den grammatika-lischen <b>Fall</b>. Im Deutschen gibt es genau vier davon (Nominativ, Genitiv, Dativ, Akkusativ)." },
    { t: "Genus", d: "Das <b>Geschlecht</b> eines Wortes: maskulin (der), feminin (die) oder neutrum (das)." },
    { t: "Numerus", d: "Die <b>Anzahl</b>: Singular steht für die Einzahl (eins), Plural steht für die Mehrzahl (viele)." },
    { t: "Nominativ", d: "Der <b>1. Fall</b>. Man fragt danach mit: <b>Wer oder was?</b> Es ist meist das Hauptwort (Subjekt) im Satz." },
    { t: "Genitiv", d: "Der <b>2. Fall</b>. Er zeigt oft Besitz oder Zugehörigkeit an. Man fragt danach mit: <b>Wessen?</b>" },
    { t: "Dativ", d: "Der <b>3. Fall</b>. Er zeigt oft das Ziel einer Handlung an. Man fragt danach mit: <b>Wem?</b>" },
    { t: "Akkusativ", d: "Der <b>4. Fall</b>. Man fragt danach mit: <b>Wen oder was?</b>" },
    { t: "Steigerungsform(en)", d: "Die Veränderung von Adjektiven zum Vergleichen: Positiv (gut), Komparativ (besser), Superlativ (am besten)." },
    { t: "Präsens", d: "Die Zeitform für die <b>Gegenwart</b>. Etwas passiert gerade jetzt oder ist allgemeingültig.<br><i>Beispiel: Ich spiele.</i>" },
    { t: "Perfekt", d: "Die Zeitform der <b>gesprochenen Vergangenheit</b>. Man nutzt sie meist beim Erzählen mit Freunden.<br><i>Beispiel: Ich habe gespielt.</i>" },
    { t: "Präteritum", d: "Die Zeitform der <b>geschriebenen Vergangenheit</b>. Man nutzt sie vor allem in Büchern oder Berichten.<br><i>Beispiel: Ich spielte.</i>" },
    { t: "Infinitiv", d: "Die <b>Grundform</b> eines Verbs. So steht es im Wörterbuch (unbeugsam).<br><i>Beispiel: gehen, essen.</i>" },
    { t: "Imperativ", d: "Die <b>Befehlsform</b>. Damit fordert man jemanden direkt zu etwas auf.<br><i>Beispiel: Hör zu! Lauf!</i>" }
];

// --- LOGIK ENGINE ---

let state = {
    kasus: { shuffled: [], idx: 0 },
    wortarten: { shuffled: [], idx: 0 },
    steigerungen: { shuffled: [], idx: 0 },
    lernkarten: { shuffled: [], idx: 0 }
};

function shuffle(array) {
    let a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function resetTab(type) {
    closeFeedback();
    if (type === 'konjugationen') {
        document.getElementById('d-w1').innerText = '?'; document.getElementById('d-w2').innerText = '?';
        document.getElementById('d-w3').innerText = '?'; document.getElementById('d-w4').innerText = '?';
        document.getElementById('d-task-area').innerText = ''; 
        document.getElementById('d-solBtn').disabled = true;
    }
    if (type === 'kasus') {
        state.kasus.shuffled = shuffle(kData); state.kasus.idx = 0;
        document.getElementById('k-sentence').innerHTML = '<div>Bereit?</div>';
        document.getElementById('kasus-options').classList.add('hidden-options');
        document.querySelectorAll('#kasus .option-card').forEach(c => c.classList.remove('selected'));
    }
    if (type === 'wortarten') {
        state.wortarten.shuffled = shuffle(wData); state.wortarten.idx = 0;
        document.getElementById('w-sentence').innerHTML = '<div>Los geht\'s!</div>';
        document.getElementById('wortarten-options').classList.add('hidden-options');
        document.querySelectorAll('#wortarten .option-card').forEach(c => c.classList.remove('selected'));
    }
    if (type === 'steigerungen') {
        state.steigerungen.shuffled = shuffle(sData); state.steigerungen.idx = 0;
        document.getElementById('s-adj').innerHTML = '<div>?</div>';
        document.getElementById('s-solBtn').disabled = true;
    }
    if (type === 'lernkarten') {
        state.lernkarten.shuffled = shuffle(kartenData); state.lernkarten.idx = 0;
        const c = state.lernkarten.shuffled[0];
        document.getElementById('card-term').innerText = c.t;
        document.getElementById('card-def').innerHTML = c.d;
        state.lernkarten.idx = 1;
        document.getElementById('current-card').classList.remove('is-flipped');
        document.getElementById('lernkarten').classList.remove('stack-empty');
        document.getElementById('next-card-btn').disabled = false;
    }
}

function openTab(tabId, btn) {
    document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
    const titles = { konjugationen: ['Konjugationen', 'Bilde die richtige Form!'], kasus: ['Kasus', 'Bestimme den Fall!'], wortarten: ['Wortarten', 'Was für ein Wort ist das?'], steigerungen: ['Steigerungen', 'Kannst du steigern?'], lernkarten: ['Lernkarten', 'Fachbegriffe lernen!'] };
    document.getElementById('topic-title').innerText = titles[tabId][0];
    document.getElementById('topic-subtitle').innerText = titles[tabId][1];
    document.querySelectorAll('.help-box').forEach(box => box.style.display = 'none');
    closeFeedback();
}

function toggleHelp(id) {
    const el = document.getElementById(id);
    const isVisible = el.style.display === 'block';
    document.querySelectorAll('.help-box').forEach(box => box.style.display = 'none');
    el.style.display = isVisible ? 'none' : 'block';
}

function closeFeedback() { document.getElementById('feedback').style.display = 'none'; }

function showFeedback(title, desc, isCorrect) {
    const fb = document.getElementById('feedback');
    document.getElementById('fb-title').innerText = title;
    document.getElementById('fb-desc').innerText = desc;
    fb.style.backgroundColor = isCorrect ? '#e1f9e5' : '#fff0f0';
    fb.style.border = isCorrect ? '2px solid #b7ebb9' : '2px solid #ffcccc';
    const icon = document.getElementById('fb-icon-box');
    icon.innerText = isCorrect ? '✓' : '✕';
    icon.style.backgroundColor = isCorrect ? '#27ae60' : '#e74c3c';
    fb.style.display = 'flex';
}

async function runSlot(id, items, finalValue, isLarge = false, animClass = 'roll-anim') {
    return new Promise(resolve => {
        const el = document.getElementById(id);
        const currentContent = el.querySelector('div') ? el.querySelector('div').innerHTML : el.innerText;
        let html = `<div>${currentContent}</div>`;
        for(let i=0; i<10; i++) {
            let rand = items[Math.floor(Math.random() * items.length)];
            if(typeof rand === 'string') rand = rand.replace(/<u>|<\/u>/g, "");
            html += `<div>${rand}</div>`;
        }
        html += `<div>${finalValue}</div>`;
        el.innerHTML = html;
        el.classList.remove('roll-anim', 'roll-anim-delayed-1', 'roll-anim-delayed-2', 'roll-anim-delayed-3', 'roll-anim-large');
        requestAnimationFrame(() => { requestAnimationFrame(() => { el.classList.add(animClass); }); });
        let duration = animClass.includes('3') ? 1600 : (animClass.includes('2') ? 1400 : (animClass.includes('1') ? 1200 : 1000));
        if(isLarge) duration = 1200;
        setTimeout(() => { el.classList.remove(animClass); el.innerHTML = `<div>${finalValue}</div>`; resolve(finalValue); }, duration);
    });
}

// --- SPIELLOGIK ---

async function spinKonjugation() {
    closeFeedback(); document.getElementById('d-solBtn').disabled = true; document.getElementById('d-task-area').innerText = "";
    const dData = { w1: ["Singular", "Plural"], w2: ["1. Person", "2. Person", "3. Person"], w3: ["Präsens", "Perfekt", "Präteritum"], w4: ["antworten", "arbeiten", "bauen", "lernen", "machen", "malen", "putzen", "spielen", "suchen", "wohnen", "essen", "fahren", "gehen", "helfen", "laufen", "lesen", "sehen", "sprechen", "trinken"] };
    const v2=dData.w2[Math.floor(Math.random()*3)], v1=dData.w1[Math.floor(Math.random()*2)], v3=dData.w3[Math.floor(Math.random()*3)], v4=dData.w4[Math.floor(Math.random()*dData.w4.length)];
    await Promise.all([runSlot('d-w2', dData.w2, v2, false, 'roll-anim'), runSlot('d-w1', dData.w1, v1, false, 'roll-anim-delayed-1'), runSlot('d-w3', dData.w3, v3, false, 'roll-anim-delayed-2'), runSlot('d-w4', dData.w4, v4, false, 'roll-anim-delayed-3')]);
    window.currentD = [v1, v2, v3, v4];
    document.getElementById('d-task-area').innerText = `Aufgabe: Bilde die ${v2} ${v1} (${v3}) von "${v4}".`;
    document.getElementById('d-solBtn').disabled = false;
}

function showKonjugationSolution() {
    const irregulars = { "essen": { prae: ["esse", "isst", "isst", "essen", "esst", "essen"], praet: "aß", perf: "gegessen", aux: "haben" }, "fahren": { prae: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"], praet: "fuhr", perf: "gefahren", aux: "sein" }, "gehen": { prae: ["gehe", "gehst", "geht", "gehen", "geht", "gehen"], praet: "ging", perf: "gegangen", aux: "sein" }, "helfen": { prae: ["helfe", "hilfst", "hilft", "helfen", "helft", "helfen"], praet: "half", perf: "geholfen", aux: "haben" }, "laufen": { prae: ["laufe", "läufst", "läuft", "laufen", "lauft", "laufen"], praet: "lief", perf: "gelaufen", aux: "sein" }, "lesen": { prae: ["lese", "liest", "liest", "lesen", "lest", "lesen"], praet: "las", perf: "gelesen", aux: "haben" }, "sehen": { prae: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"], praet: "sah", perf: "gesehen", aux: "haben" }, "sprechen": { prae: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"], praet: "sprach", perf: "gesprochen", aux: "haben" }, "trinken": { prae: ["trinke", "trinkst", "trinkt", "trinken", "trinkt", "trinken"], praet: "trank", perf: "getrunken", aux: "haben" } };
    const [num, pers, tense, verb] = window.currentD; let idx = (parseInt(pers) - 1) + (num === "Plural" ? 3 : 0);
    const pr = ["ich", "du", "er/sie/es", "wir", "ihr", "sie"]; let sol = pr[idx] + " ";
    if (tense === "Präsens") { if (irregulars[verb]) sol += irregulars[verb].prae[idx]; else { let s = verb.replace(/en$/, ""); let ends = ["e", "st", "t", "en", "t", "en"]; if ((s.endsWith('t') || s.endsWith('d')) && [1, 2, 4].includes(idx)) s += "e"; sol += s + ends[idx]; } }
    else if (tense === "Präteritum") { if (irregulars[verb]) sol += irregulars[verb].praet + ["", "st", "", "en", "t", "en"][idx]; else { let s = verb.replace(/en$/, ""); let ends = ["te", "test", "te", "ten", "tet", "ten"]; if (s.endsWith('t') || s.endsWith('d')) s += "e"; sol += s + ends[idx]; } }
    else { let aux = irregulars[verb] ? irregulars[verb].aux : "haben"; let part = irregulars[verb] ? irregulars[verb].perf : "ge" + verb.replace(/en$/, "") + "t"; let aF = aux === "haben" ? ["habe", "hast", "hat", "haben", "habt", "haben"] : ["bin", "bist", "ist", "sind", "seid", "sind"]; sol += aF[idx] + " " + part; }
    showFeedback("Giraffen-Lösung:", sol, true);
}

async function spinKasus() {
    closeFeedback(); document.getElementById('kasus-options').classList.add('hidden-options');
    document.querySelectorAll('#kasus .option-card').forEach(c => c.classList.remove('selected'));
    if (state.kasus.idx >= state.kasus.shuffled.length) reshuffleTab('kasus');
    window.currentK = state.kasus.shuffled[state.kasus.idx++];
    const sentences = kData.map(d => d.s.replace(/<u>|<\/u>/g, " "));
    await runSlot('k-sentence', sentences, window.currentK.s, true, 'roll-anim-large');
    document.getElementById('kasus-options').classList.remove('hidden-options');
}

function checkKasus(choice, btn) {
    document.querySelectorAll('#kasus .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
    if (choice === window.currentK.c) { confetti(); showFeedback("Richtig!", `Frage: "${window.currentK.q}" — Antwort: "${window.currentK.a}".`, true); }
    else showFeedback("Oje!", `Überlege nochmal mit der Frage: "${window.currentK.q}"!`, false);
}

async function spinWortarten() {
    closeFeedback(); document.getElementById('wortarten-options').classList.add('hidden-options');
    document.querySelectorAll('#wortarten .option-card').forEach(c => c.classList.remove('selected'));
    if (state.wortarten.idx >= state.wortarten.shuffled.length) reshuffleTab('wortarten');
    const sObj = state.wortarten.shuffled[state.wortarten.idx++];
    const wordIdx = Math.floor(Math.random() * sObj.s.length);
    window.currentW = { word: sObj.s[wordIdx].replace(".", ""), type: sObj.t[wordIdx] };
    const finalSatz = sObj.s.map((w, i) => i === wordIdx ? `<u>${w}</u>` : w).join(" ");
    await runSlot('w-sentence', wData.map(d => d.s.join(" ")), finalSatz, true, 'roll-anim-large');
    document.getElementById('wortarten-options').classList.remove('hidden-options');
}

function checkWortart(choice, btn) {
    document.querySelectorAll('#wortarten .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
    if (choice === window.currentW.type) { confetti(); showFeedback("Stimmt!", `"${window.currentW.word}" ist ein ${window.currentW.type}.`, true); }
    else showFeedback("Falsch", `"${window.currentW.word}" ist ein ${window.currentW.type}.`, false);
}

async function spinSteigerung() {
    closeFeedback(); document.getElementById('s-solBtn').disabled = true;
    if (state.steigerungen.idx >= state.steigerungen.shuffled.length) reshuffleTab('steigerungen');
    window.currentS = state.steigerungen.shuffled[state.steigerungen.idx++];
    await runSlot('s-adj', sData.map(d => d.n), window.currentS.n, true, 'roll-anim-large');
    document.getElementById('s-solBtn').disabled = false;
}

function showSteigerungSolution() { showFeedback("Lösung:", window.currentS.b ? `${window.currentS.p} → ${window.currentS.k} → ${window.currentS.s}.` : `"${window.currentS.n}" kann man nicht steigern!`, true); }

function shuffleAndNext() {
    if (state.lernkarten.idx >= state.lernkarten.shuffled.length) {
        document.getElementById('lernkarten').classList.add('stack-empty');
        document.getElementById('card-term').innerText = "Stapel leer!";
        document.getElementById('card-def').innerHTML = "Alle Karten geschafft! Klicke auf 'Mischen', um von vorne zu beginnen.";
        document.getElementById('next-card-btn').disabled = true;
        return;
    }
    const container = document.querySelector('.flashcard-container');
    const card = document.getElementById('current-card');
    card.classList.remove('is-flipped');
    container.classList.add('shuffling');
    setTimeout(() => {
        const c = state.lernkarten.shuffled[state.lernkarten.idx++];
        document.getElementById('card-term').innerText = c.t;
        document.getElementById('card-def').innerHTML = c.d;
    }, 350);
    setTimeout(() => { container.classList.remove('shuffling'); }, 700);
}

document.addEventListener('DOMContentLoaded', () => { resetTab('kasus'); resetTab('wortarten'); resetTab('steigerungen'); resetTab('lernkarten'); });