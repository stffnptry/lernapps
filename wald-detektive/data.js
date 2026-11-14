/* Wald-Detektive – Inhalte aus der Original-Spielbeschreibung / Sachkunde-PDF */
window.WALD_DATA = (() => {
  const TREES = {
    ahorn: {
      id: "ahorn",
      name: "Ahorn",
      group: "laub",
      article: "der",
      image: "assets/trees/ahorn.jpg",
      leaf: "assets/icons/ahorn-blatt.svg",
      fruit: "assets/icons/ahorn-frucht.svg",
      fruitName: "Ahornsamen",
      features: [
        "Handförmiges Blatt mit spitzen Lappen",
        "Frucht: Ahornsamen (Flügelfrüchte)",
      ],
    },
    buche: {
      id: "buche",
      name: "Buche",
      group: "laub",
      article: "die",
      image: "assets/trees/buche.jpg",
      leaf: "assets/icons/buche-blatt.svg",
      fruit: "assets/icons/buche-frucht.svg",
      fruitName: "Bucheckern",
      features: [
        "Ovales Blatt mit glattem Rand",
        "Frucht: Bucheckern",
      ],
    },
    eiche: {
      id: "eiche",
      name: "Eiche",
      group: "laub",
      article: "die",
      image: "assets/trees/eiche.jpg",
      leaf: "assets/icons/eiche-blatt.svg",
      fruit: "assets/icons/eiche-frucht.svg",
      fruitName: "Eicheln",
      features: [
        "Gelapptes Blatt mit welligem Rand",
        "Frucht: Eicheln",
      ],
    },
    kastanie: {
      id: "kastanie",
      name: "Kastanie",
      group: "laub",
      article: "die",
      image: "assets/trees/kastanie.jpg",
      leaf: "assets/icons/kastanie-blatt.svg",
      fruit: "assets/icons/kastanie-frucht.svg",
      fruitName: "Kastanien",
      features: [
        "Blatt aus mehreren Fingern (handförmig)",
        "Frucht: Kastanien in stacheliger Hülle",
      ],
    },
    fichte: {
      id: "fichte",
      name: "Fichte",
      group: "nadel",
      article: "die",
      image: "assets/trees/fichte.jpg",
      leaf: "assets/details/fichte-nadeln.jpg",
      fruit: "assets/details/fichte-zapfen.jpg",
      fruitName: "Zapfen",
      needleHint: "kurze, spitze Nadeln",
      features: [
        "Kurze, spitze Nadeln",
        "Zapfen hängen nach unten",
      ],
    },
    kiefer: {
      id: "kiefer",
      name: "Kiefer",
      group: "nadel",
      article: "die",
      image: "assets/trees/kiefer.jpg",
      leaf: "assets/details/kiefer-nadeln.jpg",
      fruit: "assets/details/kiefer-zapfen.jpg",
      fruitName: "Zapfen",
      needleHint: "lange, paarweise Nadeln",
      features: [
        "Lange Nadeln, die paarweise wachsen",
        "Zapfen an den Zweigen",
      ],
    },
    laerche: {
      id: "laerche",
      name: "Lärche",
      group: "nadel",
      article: "die",
      image: "assets/trees/laerche.jpg",
      leaf: "assets/details/laerche-nadeln.jpg",
      fruit: "assets/details/laerche-zapfen.jpg",
      fruitName: "Zapfen",
      needleHint: "weiche Nadelbüschel",
      features: [
        "Weiche Nadeln in Büscheln",
        "Verliert im Herbst ihre Nadeln",
      ],
    },
    tanne: {
      id: "tanne",
      name: "Tanne",
      group: "nadel",
      article: "die",
      image: "assets/trees/tanne.jpg",
      leaf: "assets/details/tanne-nadeln.jpg",
      fruit: "assets/details/tanne-zapfen.jpg",
      fruitName: "Zapfen",
      needleHint: "stumpfe Nadeln",
      features: [
        "Stumpfe Nadeln",
        "Zapfen stehen aufrecht",
      ],
    },
  };

  const LAUB = ["ahorn", "buche", "eiche", "kastanie"];
  const NADEL = ["fichte", "kiefer", "laerche", "tanne"];

  const LAYERS = [
    {
      id: "baum",
      name: "Baumschicht",
      order: 1,
      plants: ["Laub- und Nadelbäume"],
      animals: ["Eichhörnchen", "Baummarder", "Eulen", "Greifvögel"],
      info: "Ganz oben wachsen die großen Bäume. Hier leben Eichhörnchen, Baummarder, Eulen und Greifvögel.",
    },
    {
      id: "strauch",
      name: "Strauchschicht",
      order: 2,
      plants: ["Haselnuss", "Weißdorn", "Holunder"],
      animals: ["Vögel"],
      info: "In der Strauchschicht wachsen Haselnuss, Weißdorn und Holunder. Viele Vögel finden hier Schutz.",
    },
    {
      id: "kraut",
      name: "Krautschicht",
      order: 3,
      plants: ["Gräser", "Farne", "Kräuter", "Blütenpflanzen"],
      animals: ["Schmetterlinge", "Raupen", "Bienen"],
      info: "Gräser, Farne, Kräuter und Blütenpflanzen wachsen hier. Schmetterlinge, Raupen und Bienen sind unterwegs.",
    },
    {
      id: "boden",
      name: "Bodenschicht",
      order: 4,
      plants: ["Moose", "Flechten", "Pilze"],
      animals: ["Schnecken", "Spinnen", "Mäuse", "Igel"],
      info: "Auf dem Boden gibt es Moose, Flechten und Pilze. Schnecken, Spinnen, Mäuse und Igel leben hier.",
    },
    {
      id: "wurzel",
      name: "Wurzelschicht",
      order: 5,
      plants: ["Baumwurzeln"],
      animals: ["Regenwürmer", "Tausendfüßler"],
      info: "Unter der Erde liegen die Baumwurzeln. Regenwürmer und Tausendfüßler wühlen im Boden.",
    },
  ];

  const LAYER_ITEMS = [
    { id: "eichhoernchen", name: "Eichhörnchen", kind: "tier", layer: "baum", emoji: "🐿️" },
    { id: "baummarder", name: "Baummarder", kind: "tier", layer: "baum", emoji: "🦡" },
    { id: "eule", name: "Eule", kind: "tier", layer: "baum", emoji: "🦉" },
    { id: "greifvogel", name: "Greifvogel", kind: "tier", layer: "baum", emoji: "🦅" },
    { id: "vogel", name: "Vogel", kind: "tier", layer: "strauch", emoji: "🐦" },
    { id: "schmetterling", name: "Schmetterling", kind: "tier", layer: "kraut", emoji: "🦋" },
    { id: "raupe", name: "Raupe", kind: "tier", layer: "kraut", emoji: "🐛" },
    { id: "biene", name: "Biene", kind: "tier", layer: "kraut", emoji: "🐝" },
    { id: "schnecke", name: "Schnecke", kind: "tier", layer: "boden", emoji: "🐌" },
    { id: "spinne", name: "Spinne", kind: "tier", layer: "boden", emoji: "🕷️" },
    { id: "maus", name: "Maus", kind: "tier", layer: "boden", emoji: "🐭" },
    { id: "igel", name: "Igel", kind: "tier", layer: "boden", emoji: "🦔" },
    { id: "regenwurm", name: "Regenwurm", kind: "tier", layer: "wurzel", emoji: "🪱" },
    { id: "tausendfuessler", name: "Tausendfüßler", kind: "tier", layer: "wurzel", emoji: "ムカデ" },
    { id: "haselnuss", name: "Haselnuss", kind: "pflanze", layer: "strauch", emoji: "🌰" },
    { id: "weissdorn", name: "Weißdorn", kind: "pflanze", layer: "strauch", emoji: "🌿" },
    { id: "holunder", name: "Holunder", kind: "pflanze", layer: "strauch", emoji: "🫐" },
    { id: "farn", name: "Farn", kind: "pflanze", layer: "kraut", emoji: "🪴" },
    { id: "gras", name: "Gras", kind: "pflanze", layer: "kraut", emoji: "🌾" },
    { id: "bluete", name: "Blütenpflanze", kind: "pflanze", layer: "kraut", emoji: "🌸" },
    { id: "moos", name: "Moos", kind: "pflanze", layer: "boden", emoji: "🟢" },
    { id: "flechte", name: "Flechte", kind: "pflanze", layer: "boden", emoji: "🪨" },
    { id: "pilz", name: "Pilz", kind: "pflanze", layer: "boden", emoji: "🍄" },
    { id: "wurzel", name: "Baumwurzeln", kind: "pflanze", layer: "wurzel", emoji: "🌱" },
    { id: "baum", name: "Laub- und Nadelbäume", kind: "pflanze", layer: "baum", emoji: "🌳" },
  ];

  const LEAF_FALL = [
    {
      id: "s1",
      text: "Im Winter braucht der Baum seine Blätter nicht mehr.",
      season: "winter-start",
    },
    {
      id: "s2",
      text: "Er benötigt im Winter kaum Nahrung.",
      season: "winter-start",
    },
    {
      id: "s3",
      text: "Der Baum zieht Pflanzensaft aus den Blättern zurück.",
      season: "herbst",
    },
    {
      id: "s4",
      text: "Das Blattgrün verschwindet, andere Blattfarben werden sichtbar.",
      season: "herbst",
    },
    {
      id: "s5",
      text: "Die Blätter lösen sich von den Zweigen und fallen zu Boden.",
      season: "winter",
    },
  ];

  const LEAF_FALL_TF = [
    {
      text: "Im Winter braucht der Baum seine Blätter nicht mehr.",
      answer: true,
      explain: "Stimmt! Im Winter braucht der Baum seine Blätter nicht mehr.",
    },
    {
      text: "Alle Nadelbäume behalten ihre Nadeln im Winter.",
      answer: false,
      explain: "Falsch – die Lärche verliert im Herbst ihre Nadeln.",
    },
    {
      text: "Der Baum zieht im Herbst Pflanzensaft aus den Blättern zurück.",
      answer: true,
      explain: "Richtig! Der Saft wird zurückgezogen, bevor die Blätter fallen.",
    },
    {
      text: "Wenn das Blattgrün verschwindet, werden andere Blattfarben sichtbar.",
      answer: true,
      explain: "Genau – Gelb, Orange und Rot kommen zum Vorschein.",
    },
  ];

  return { TREES, LAUB, NADEL, LAYERS, LAYER_ITEMS, LEAF_FALL, LEAF_FALL_TF };
})();
