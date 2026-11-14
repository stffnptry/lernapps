(() => {
  const {
    TREES, LAUB, NADEL, LAYERS, LAYER_ITEMS, LEAF_FALL, LEAF_FALL_TF,
  } = window.WALD_DATA;

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  const state = {
    unit: null,
    mode: null, // entdecken | ueben | testen
    wrong: [],
    reviewing: false,
  };

  const units = {
    baeume: {
      emoji: "🌳",
      title: "Der Baum-Detektiv",
      desc: "Lerne acht Bäume kennen – mit Blättern, Nadeln und Früchten.",
    },
    waldarten: {
      emoji: "🌲",
      title: "Welcher Wald ist das?",
      desc: "Laubwald, Nadelwald oder Mischwald – erkennst du den Unterschied?",
    },
    stockwerke: {
      emoji: "🏢",
      title: "Das Wald-Hochhaus",
      desc: "Fünf Stockwerke: Wer wohnt wo? Was wächst wo?",
    },
    laubfall: {
      emoji: "🍂",
      title: "Warum fallen die Blätter ab?",
      desc: "Eine Bildergeschichte vom Sommer bis zum Winter.",
    },
    pruefung: {
      emoji: "🏅",
      title: "Die große Waldprüfung",
      desc: "15 gemischte Aufgaben aus allen Themen.",
    },
  };

  function showScreen(id) {
    $$(".screen").forEach((s) => s.classList.remove("active"));
    $(`#${id}`).classList.add("active");
  }

  function setTop(title, showHome) {
    $("#top-title").textContent = title;
    $("#btn-home").hidden = !showHome;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickN(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  function tree(id) {
    return TREES[id];
  }

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function setFeedback(text, kind) {
    const f = $("#play-feedback");
    f.textContent = text || "";
    f.className = "feedback" + (kind ? ` ${kind}` : "");
  }

  function setProgress(i, total) {
    $("#play-count").textContent = total ? `${i} / ${total}` : "";
    $("#play-progress").style.width = total ? `${(i / total) * 100}%` : "0%";
  }

  function clearPlay() {
    $("#play-area").innerHTML = "";
    $("#play-actions").innerHTML = "";
    setFeedback("");
  }

  /* ---------- Navigation ---------- */
  $("#unit-grid").addEventListener("click", (e) => {
    const card = e.target.closest("[data-unit]");
    if (!card) return;
    openUnit(card.dataset.unit);
  });

  $("#btn-home").addEventListener("click", goHome);
  $("#btn-result-menu").addEventListener("click", goHome);
  $("#btn-result-home").addEventListener("click", () => {
    if (state.unit === "pruefung") goHome();
    else openUnit(state.unit);
  });
  $("#btn-retry-wrong").addEventListener("click", () => {
    state.reviewing = true;
    startUnitMode(state.mode === "testen" ? "testen" : "ueben", state.wrong);
  });

  $$("#screen-unit [data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => startUnitMode(btn.dataset.mode));
  });

  function goHome() {
    state.unit = null;
    state.mode = null;
    state.wrong = [];
    state.reviewing = false;
    showScreen("screen-home");
    setTop("Wald-Detektive", false);
  }

  function openUnit(id) {
    state.unit = id;
    state.wrong = [];
    state.reviewing = false;
    const u = units[id];
    $("#unit-emoji").textContent = u.emoji;
    $("#unit-title").textContent = u.title;
    $("#unit-desc").textContent = u.desc;
    setTop(u.title, true);

    if (id === "pruefung") {
      startUnitMode("testen");
      return;
    }
    showScreen("screen-unit");
  }

  function startUnitMode(mode, onlyQuestions) {
    state.mode = mode;
    state.wrong = onlyQuestions ? [] : state.wrong;
    showScreen("screen-play");
    setTop(units[state.unit].title, true);
    clearPlay();

    const runners = {
      baeume: runBaeume,
      waldarten: runWaldarten,
      stockwerke: runStockwerke,
      laubfall: runLaubfall,
      pruefung: runPruefung,
    };
    runners[state.unit](mode, onlyQuestions);
  }

  function finishResult(score, total, wrongList) {
    state.wrong = wrongList || [];
    $("#result-score").textContent = `${score} von ${total}`;
    let msg = "Weiter so, Wald-Detektiv!";
    if (score === total) msg = "Perfekt! Du kennst den Wald richtig gut! 🌟";
    else if (score / total >= 0.7) msg = "Stark! Schau dir die Fehler noch einmal an.";
    else msg = "Guter Anfang! Übe die schwierigen Fragen noch einmal.";
    $("#result-text").textContent = msg;
    const retry = $("#btn-retry-wrong");
    retry.hidden = state.wrong.length === 0;
    showScreen("screen-result");
  }

  /* ---------- Shared quiz runner ---------- */
  function runQuiz(questions, opts = {}) {
    const teach = opts.teach !== false && state.mode !== "testen";
    let i = 0;
    let score = 0;
    const wrong = [];

    $("#play-label").textContent =
      state.unit === "pruefung" ? "Waldprüfung" :
      state.mode === "entdecken" ? "Entdecken" :
      state.mode === "ueben" ? "Üben" : "Test";

    function next() {
      if (i >= questions.length) {
        finishResult(score, questions.length, wrong);
        return;
      }
      clearPlay();
      setProgress(i + 1, questions.length);
      const q = questions[i];
      q.render($("#play-area"), {
        teach,
        onAnswer(ok, explain) {
          if (ok) {
            score++;
            setFeedback(explain || "Richtig!", "ok");
          } else {
            wrong.push(q);
            setFeedback(explain || "Leider falsch.", "bad");
          }
          const actions = $("#play-actions");
          actions.innerHTML = "";
          const btn = el(`<button class="btn" type="button">Weiter</button>`);
          btn.addEventListener("click", () => {
            i++;
            next();
          });
          actions.appendChild(btn);
        },
      });
    }
    next();
  }

  function mcQuestion({ promptHtml, options, correct, explain }) {
    return {
      render(area, { teach, onAnswer }) {
        area.appendChild(el(`<div class="prompt-visual">${promptHtml}</div>`));
        const grid = el(`<div class="choice-grid"></div>`);
        let answered = false;
        shuffle(options).forEach((opt) => {
          const b = el(`<button class="choice" type="button"></button>`);
          b.textContent = opt.label;
          b.addEventListener("click", () => {
            if (answered) return;
            answered = true;
            const ok = opt.id === correct;
            $$(".choice", grid).forEach((c) => {
              c.disabled = true;
              if (c.textContent === options.find((o) => o.id === correct).label) {
                c.classList.add("correct");
              }
            });
            if (!ok) b.classList.add("wrong");
            const exp = teach || !ok
              ? (ok ? (explain?.ok || "Richtig!") : (explain?.bad || `Richtig wäre: ${options.find((o) => o.id === correct).label}`))
              : (ok ? "Richtig!" : `Richtig wäre: ${options.find((o) => o.id === correct).label}`);
            onAnswer(ok, exp);
          });
          grid.appendChild(b);
        });
        area.appendChild(grid);
      },
    };
  }

  /* ---------- 1) Bäume ---------- */
  function runBaeume(mode, onlyQuestions) {
    if (mode === "entdecken") {
      runBaeumeDiscover();
      return;
    }
    const qs = onlyQuestions || buildBaumQuestions(mode === "testen" ? 12 : 10);
    runQuiz(qs);
  }

  function runBaeumeDiscover() {
    $("#play-label").textContent = "Entdecken";
    let group = "laub";
    const area = $("#play-area");
    const actions = $("#play-actions");

    function render() {
      clearPlay();
      setProgress(0, 0);
      const ids = group === "laub" ? LAUB : NADEL;
      area.appendChild(el(`
        <div class="group-tabs">
          <button class="chip ${group === "laub" ? "active" : ""}" data-g="laub" type="button">🍃 Laubbäume</button>
          <button class="chip ${group === "nadel" ? "active" : ""}" data-g="nadel" type="button">🌲 Nadelbäume</button>
        </div>
      `));
      const grid = el(`<div class="steck-grid"></div>`);
      ids.forEach((id) => {
        const t = tree(id);
        const card = el(`
          <article class="steck">
            <img class="tree" src="${t.image}" alt="${t.name}">
            <div class="steck-body">
              <span class="tag">${t.group === "laub" ? "Laubbaum" : "Nadelbaum"}</span>
              <h3>${t.name}</h3>
              <ul>${t.features.map((f) => `<li>${f}</li>`).join("")}</ul>
              <div class="steck-thumbs">
                <img src="${t.leaf}" alt="${t.group === "laub" ? "Blatt" : "Nadeln"}">
                <img src="${t.fruit}" alt="${t.fruitName}">
              </div>
            </div>
          </article>
        `);
        grid.appendChild(card);
      });
      area.appendChild(grid);
      area.querySelectorAll("[data-g]").forEach((btn) => {
        btn.addEventListener("click", () => {
          group = btn.dataset.g;
          render();
        });
      });
      actions.appendChild(el(`<button class="btn gold" type="button" id="go-ueben">Weiter zum Üben →</button>`));
      $("#go-ueben").addEventListener("click", () => startUnitMode("ueben"));
    }
    render();
  }

  function buildBaumQuestions(n) {
    const qs = [];
    // Blatt / Nadel
    [...LAUB, ...NADEL].forEach((id) => {
      const t = tree(id);
      const pool = t.group === "laub" ? LAUB : NADEL;
      qs.push(mcQuestion({
        promptHtml: `<img src="${t.leaf}" alt=""><h2>Wem gehört ${t.group === "laub" ? "das Blatt" : "dieser Zweig"}?</h2>`,
        options: pool.map((pid) => ({ id: pid, label: tree(pid).name })),
        correct: id,
        explain: {
          ok: `Richtig! Das gehört zur ${t.name}.`,
          bad: `Das gehört zur ${t.name}. Merkmal: ${t.features[0]}`,
        },
      }));
    });
    // Frucht
    [...LAUB, ...NADEL].forEach((id) => {
      const t = tree(id);
      const pool = t.group === "laub" ? LAUB : NADEL;
      qs.push(mcQuestion({
        promptHtml: `<img src="${t.fruit}" alt=""><h2>Wem gehört ${t.group === "laub" ? "die Frucht" : "der Zapfen"}?</h2>`,
        options: pool.map((pid) => ({ id: pid, label: tree(pid).name })),
        correct: id,
        explain: {
          ok: `Ja! ${t.fruitName} von der ${t.name}.`,
          bad: `${t.fruitName} gehören zur ${t.name}.`,
        },
      }));
    });
    // Nadel-Detektiv explicit
    NADEL.forEach((id) => {
      const t = tree(id);
      qs.push(mcQuestion({
        promptHtml: `<img src="${t.leaf}" alt=""><h2>Nadel-Detektiv: ${t.needleHint} – welcher Baum?</h2>`,
        options: NADEL.map((pid) => ({ id: pid, label: tree(pid).name })),
        correct: id,
        explain: {
          ok: `Genau, die ${t.name}!`,
          bad: `Die ${t.name} hat ${t.needleHint}.`,
        },
      }));
    });
    // Baumpuzzle as special question once
    qs.push(makePuzzleQuestion("laub"));
    qs.push(makePuzzleQuestion("nadel"));

    return pickN(qs, Math.min(n, qs.length));
  }

  function makePuzzleQuestion(group) {
    const ids = group === "laub" ? LAUB : NADEL;
    return {
      render(area, { onAnswer }) {
        area.appendChild(el(`<div class="section-title">Baumpuzzle</div>`));
        area.appendChild(el(`<p class="section-sub">Ziehe Blatt/Nadeln und Frucht/Zapfen zum richtigen Baum – oder tippe zuerst die Karte, dann den Platz.</p>`));
        area.appendChild(el(`<p class="hint-tap">Tipp: Antippen funktioniert auch ohne Ziehen.</p>`));

        const board = el(`<div class="puzzle-board"></div>`);
        const slots = {};
        ids.forEach((id) => {
          const t = tree(id);
          const slot = el(`
            <div class="puzzle-slot" data-tree="${id}">
              <div>
                <div class="label">${t.name}</div>
                <img src="${t.image}" alt="" style="width:64px;height:64px;object-fit:cover;border-radius:12px;margin-top:6px">
              </div>
              <div class="puzzle-drop empty" data-slot="leaf" data-tree="${id}">Blatt</div>
              <div class="puzzle-drop empty" data-slot="fruit" data-tree="${id}">Frucht</div>
            </div>
          `);
          board.appendChild(slot);
          slots[id] = { leaf: null, fruit: null };
        });
        area.appendChild(board);

        const pieces = shuffle([
          ...ids.map((id) => ({ id: `${id}-leaf`, tree: id, kind: "leaf", src: tree(id).leaf })),
          ...ids.map((id) => ({ id: `${id}-fruit`, tree: id, kind: "fruit", src: tree(id).fruit })),
        ]);
        const pool = el(`<div class="puzzle-pool"></div>`);
        let selected = null;

        pieces.forEach((p) => {
          const item = el(`<button class="pool-item" type="button" draggable="true" data-id="${p.id}"></button>`);
          item.innerHTML = `<img src="${p.src}" alt="">`;
          item.addEventListener("click", () => {
            $$(".pool-item", pool).forEach((x) => x.classList.remove("selected"));
            if (selected === p.id) {
              selected = null;
              return;
            }
            selected = p.id;
            item.classList.add("selected");
          });
          item.addEventListener("dragstart", (e) => {
            selected = p.id;
            e.dataTransfer.setData("text/plain", p.id);
          });
          pool.appendChild(item);
        });
        area.appendChild(pool);

        function place(pieceId, drop) {
          const piece = pieces.find((p) => p.id === pieceId);
          if (!piece || !drop) return;
          const treeId = drop.dataset.tree;
          const kind = drop.dataset.slot;
          if (slots[treeId][kind]) return;
          if (piece.kind !== kind) {
            setFeedback("Das passt hier nicht – Blatt/Nadeln und Frucht/Zapfen nicht vertauschen.", "bad");
            return;
          }
          slots[treeId][kind] = piece.tree;
          drop.classList.remove("empty");
          drop.innerHTML = `<img src="${piece.src}" alt="">`;
          drop.dataset.filled = piece.tree;
          const btn = pool.querySelector(`[data-id="${pieceId}"]`);
          if (btn) btn.classList.add("used");
          selected = null;
          $$(".pool-item", pool).forEach((x) => x.classList.remove("selected"));
          setFeedback("");
          checkDone();
        }

        function checkDone() {
          const allFilled = ids.every((id) => slots[id].leaf && slots[id].fruit);
          if (!allFilled) return;
          const ok = ids.every((id) => slots[id].leaf === id && slots[id].fruit === id);
          $$(".puzzle-drop", board).forEach((d) => {
            d.style.pointerEvents = "none";
          });
          onAnswer(ok, ok
            ? "Super! Alle Bäume sind richtig zusammengesetzt."
            : "Noch nicht ganz – schau noch einmal in die Steckbriefe.");
        }

        board.addEventListener("click", (e) => {
          const drop = e.target.closest(".puzzle-drop");
          if (!drop || !selected) return;
          place(selected, drop);
        });
        board.addEventListener("dragover", (e) => {
          if (e.target.closest(".puzzle-drop")) e.preventDefault();
        });
        board.addEventListener("drop", (e) => {
          const drop = e.target.closest(".puzzle-drop");
          if (!drop) return;
          e.preventDefault();
          place(e.dataTransfer.getData("text/plain") || selected, drop);
        });
      },
    };
  }

  /* ---------- 2) Waldarten ---------- */
  function runWaldarten(mode, onlyQuestions) {
    if (mode === "entdecken") {
      runWaldartenDiscover();
      return;
    }
    const qs = onlyQuestions || buildWaldartenQuestions(mode === "testen" ? 8 : 6);
    runQuiz(qs);
  }

  function forestScene(type) {
    let ids;
    if (type === "laub") ids = pickN(LAUB, 4);
    else if (type === "nadel") ids = pickN(NADEL, 4);
    else ids = [...pickN(LAUB, 2), ...pickN(NADEL, 2)];
    return `<div class="forest-scene">${ids.map((id) => `<img src="${tree(id).image}" alt="${tree(id).name}">`).join("")}</div>`;
  }

  function runWaldartenDiscover() {
    $("#play-label").textContent = "Entdecken";
    clearPlay();
    const area = $("#play-area");
    const types = [
      { id: "laub", name: "Laubwald", text: "Nur Laubbäume – zum Beispiel Eiche, Buche, Ahorn und Kastanie." },
      { id: "nadel", name: "Nadelwald", text: "Nur Nadelbäume – Fichte, Kiefer, Lärche und Tanne." },
      { id: "misch", name: "Mischwald", text: "Laub- und Nadelbäume wachsen gemeinsam." },
    ];
    types.forEach((t) => {
      area.appendChild(el(`
        <div class="panel" style="margin-bottom:12px">
          <h3 style="font-weight:900;margin-bottom:8px">${t.name}</h3>
          <p style="font-weight:700;color:var(--text-light);margin-bottom:10px">${t.text}</p>
          ${forestScene(t.id)}
        </div>
      `));
    });
    $("#play-actions").appendChild(el(`<button class="btn gold" type="button" id="go-ueben">Weiter zum Üben →</button>`));
    $("#go-ueben").addEventListener("click", () => startUnitMode("ueben"));
  }

  function buildWaldartenQuestions(n) {
    const qs = [];
    ["laub", "nadel", "misch"].forEach((type) => {
      const label = type === "laub" ? "Laubwald" : type === "nadel" ? "Nadelwald" : "Mischwald";
      for (let k = 0; k < 2; k++) {
        qs.push(mcQuestion({
          promptHtml: `${forestScene(type)}<h2>Welcher Wald ist das?</h2>`,
          options: [
            { id: "laub", label: "Laubwald" },
            { id: "nadel", label: "Nadelwald" },
            { id: "misch", label: "Mischwald" },
          ],
          correct: type,
          explain: {
            ok: `Richtig – das ist ein ${label}!`,
            bad: `Das ist ein ${label}.`,
          },
        }));
      }
    });
    qs.push(makeBuildForestQuestion("misch"));
    qs.push(makeBuildForestQuestion("laub"));
    qs.push(makeBuildForestQuestion("nadel"));
    return pickN(qs, Math.min(n, qs.length));
  }

  function makeBuildForestQuestion(target) {
    const title = target === "laub" ? "Laubwald" : target === "nadel" ? "Nadelwald" : "Mischwald";
    return {
      render(area, { onAnswer }) {
        area.appendChild(el(`<div class="section-title">Baue einen ${title}!</div>`));
        area.appendChild(el(`<p class="section-sub">Ziehe oder tippe Bäume auf die Waldfläche. Mindestens 3 Bäume.</p>`));
        const build = el(`<div class="build-area" id="build-area"><div class="build-hint">Hier ist dein Wald</div></div>`);
        area.appendChild(build);
        const poolIds = shuffle([...LAUB, ...NADEL]);
        const pool = el(`<div class="puzzle-pool"></div>`);
        let selected = null;
        const placed = [];

        poolIds.forEach((id) => {
          const t = tree(id);
          const item = el(`<button class="pool-item" type="button" draggable="true" data-id="${id}" title="${t.name}"></button>`);
          item.innerHTML = `<img src="${t.image}" alt="${t.name}">`;
          item.addEventListener("click", () => {
            $$(".pool-item", pool).forEach((x) => x.classList.remove("selected"));
            selected = id;
            item.classList.add("selected");
            addTree(id);
          });
          item.addEventListener("dragstart", (e) => {
            selected = id;
            e.dataTransfer.setData("text/plain", id);
          });
          pool.appendChild(item);
        });
        area.appendChild(pool);

        function addTree(id) {
          if (placed.length >= 6) return;
          placed.push(id);
          const hint = build.querySelector(".build-hint");
          if (hint) hint.remove();
          const img = el(`<img src="${tree(id).image}" alt="${tree(id).name}">`);
          build.appendChild(img);
          setFeedback(`${placed.length} Baum/Bäume im Wald`, "");
        }

        build.addEventListener("dragover", (e) => e.preventDefault());
        build.addEventListener("drop", (e) => {
          e.preventDefault();
          addTree(e.dataTransfer.getData("text/plain") || selected);
        });

        const check = el(`<button class="btn" type="button">Prüfen</button>`);
        check.addEventListener("click", () => {
          if (placed.length < 3) {
            setFeedback("Setze mindestens 3 Bäume in den Wald.", "bad");
            return;
          }
          const hasLaub = placed.some((id) => tree(id).group === "laub");
          const hasNadel = placed.some((id) => tree(id).group === "nadel");
          let ok = false;
          if (target === "laub") ok = hasLaub && !hasNadel;
          else if (target === "nadel") ok = hasNadel && !hasLaub;
          else ok = hasLaub && hasNadel;
          check.disabled = true;
          onAnswer(ok, ok
            ? `Klasse! Das ist ein ${title}.`
            : target === "misch"
              ? "Ein Mischwald braucht Laub- und Nadelbäume."
              : `Ein ${title} darf nur ${target === "laub" ? "Laubbäume" : "Nadelbäume"} enthalten.`);
        });
        $("#play-actions").appendChild(check);
      },
    };
  }

  /* ---------- 3) Stockwerke ---------- */
  function runStockwerke(mode, onlyQuestions) {
    if (mode === "entdecken") {
      runStockwerkeDiscover();
      return;
    }
    const qs = onlyQuestions || buildStockQuestions(mode === "testen" ? 10 : 8);
    runQuiz(qs);
  }

  function runStockwerkeDiscover() {
    $("#play-label").textContent = "Entdecken";
    clearPlay();
    const area = $("#play-area");
    area.appendChild(el(`<p class="section-sub">Tippe auf ein Stockwerk, um mehr zu erfahren.</p>`));
    const tower = el(`<div class="tower"></div>`);
    LAYERS.forEach((layer) => {
      const box = el(`
        <div class="layer" data-id="${layer.id}">
          <div class="layer-title">${layer.name}</div>
          <div class="layer-info" hidden>${layer.info}<br><br><strong>Pflanzen:</strong> ${layer.plants.join(", ")}<br><strong>Tiere:</strong> ${layer.animals.join(", ")}</div>
        </div>
      `);
      box.addEventListener("click", () => {
        const info = box.querySelector(".layer-info");
        const open = !info.hidden;
        $$(".layer-info", tower).forEach((x) => { x.hidden = true; });
        $$(".layer", tower).forEach((x) => x.classList.remove("active"));
        if (!open) {
          info.hidden = false;
          box.classList.add("active");
        }
      });
      tower.appendChild(box);
    });
    area.appendChild(tower);
    $("#play-actions").appendChild(el(`<button class="btn gold" type="button" id="go-ueben">Weiter zum Üben →</button>`));
    $("#go-ueben").addEventListener("click", () => startUnitMode("ueben"));
  }

  function buildStockQuestions(n) {
    const animals = LAYER_ITEMS.filter((x) => x.kind === "tier");
    const plants = LAYER_ITEMS.filter((x) => x.kind === "pflanze");
    const qs = [];

    pickN(animals, 8).forEach((item) => {
      qs.push(makeLayerPlaceQuestion(item, "Wer wohnt wo?"));
    });
    pickN(plants, 6).forEach((item) => {
      qs.push(makeLayerPlaceQuestion(item, "Was wächst wo?"));
    });
    qs.push(makeNameLayersQuestion());
    return pickN(qs, Math.min(n, qs.length));
  }

  function makeLayerPlaceQuestion(item, title) {
    return {
      render(area, { onAnswer }) {
        area.appendChild(el(`<div class="section-title">${title}</div>`));
        const card = el(`<div class="drag-card" draggable="true" id="drag-item">${item.emoji} ${item.name}</div>`);
        const wrap = el(`<div style="display:flex;justify-content:center;margin:8px 0 12px"></div>`);
        wrap.appendChild(card);
        area.appendChild(wrap);
        area.appendChild(el(`<p class="hint-tap">Ziehe die Karte auf das Stockwerk oder tippe erst die Karte, dann das Stockwerk.</p>`));

        const tower = el(`<div class="tower"></div>`);
        let selected = false;
        let answered = false;
        card.addEventListener("click", () => {
          selected = !selected;
          card.classList.toggle("selected", selected);
        });
        card.addEventListener("dragstart", (e) => {
          selected = true;
          e.dataTransfer.setData("text/plain", item.id);
        });

        LAYERS.forEach((layer) => {
          const box = el(`
            <div class="layer" data-id="${layer.id}">
              <div class="layer-title">${layer.name}</div>
              <div class="layer-stuff"></div>
            </div>
          `);
          const tryPlace = () => {
            if (answered || !selected) return;
            answered = true;
            const ok = layer.id === item.layer;
            const stuff = box.querySelector(".layer-stuff");
            stuff.appendChild(el(`<span class="layer-chip">${item.emoji} ${item.name}</span>`));
            box.classList.add("correct-flash");
            const layerName = LAYERS.find((l) => l.id === item.layer).name;
            onAnswer(ok, ok
              ? `Richtig! ${item.name} gehört in die ${layerName}.`
              : `${item.name} gehört in die ${layerName}.`);
          };
          box.addEventListener("click", () => {
            if (selected) tryPlace();
          });
          box.addEventListener("dragover", (e) => {
            e.preventDefault();
            box.classList.add("drop-target");
          });
          box.addEventListener("dragleave", () => box.classList.remove("drop-target"));
          box.addEventListener("drop", (e) => {
            e.preventDefault();
            box.classList.remove("drop-target");
            selected = true;
            tryPlace();
          });
          tower.appendChild(box);
        });
        area.appendChild(tower);
      },
    };
  }

  function makeNameLayersQuestion() {
    return {
      render(area, { onAnswer }) {
        area.appendChild(el(`<div class="section-title">Stockwerke benennen</div>`));
        area.appendChild(el(`<p class="section-sub">Von oben nach unten: Ordne die Namen den Stockwerken zu.</p>`));

        const order = LAYERS.map((l) => l.id);
        const names = shuffle(LAYERS.map((l) => ({ id: l.id, name: l.name })));
        const placed = Array(5).fill(null);
        let selected = null;

        const slots = el(`<div class="name-slots"></div>`);
        for (let i = 0; i < 5; i++) {
          slots.appendChild(el(`
            <div class="name-slot" data-i="${i}">
              <span class="num">${i + 1}</span>
              <span class="slot-label">Tippe einen Namen</span>
            </div>
          `));
        }
        area.appendChild(slots);

        const pool = el(`<div class="puzzle-pool" style="margin-top:12px"></div>`);
        names.forEach((n) => {
          const b = el(`<button class="choice" style="width:auto;padding:10px 14px" type="button" data-id="${n.id}">${n.name}</button>`);
          b.addEventListener("click", () => {
            $$(".choice", pool).forEach((x) => x.classList.remove("correct"));
            selected = n.id;
            b.classList.add("correct");
          });
          pool.appendChild(b);
        });
        area.appendChild(pool);

        slots.addEventListener("click", (e) => {
          const slot = e.target.closest(".name-slot");
          if (!slot || !selected) return;
          const i = Number(slot.dataset.i);
          placed[i] = selected;
          slot.classList.add("filled");
          slot.querySelector(".slot-label").textContent = LAYERS.find((l) => l.id === selected).name;
          const btn = pool.querySelector(`[data-id="${selected}"]`);
          if (btn) {
            btn.disabled = true;
            btn.style.opacity = "0.4";
          }
          selected = null;
          $$(".choice", pool).forEach((x) => x.classList.remove("correct"));
        });

        const check = el(`<button class="btn" type="button">Prüfen</button>`);
        check.addEventListener("click", () => {
          if (placed.some((x) => !x)) {
            setFeedback("Fülle alle fünf Stockwerke aus.", "bad");
            return;
          }
          const ok = placed.every((id, i) => id === order[i]);
          check.disabled = true;
          onAnswer(ok, ok
            ? "Perfekt – von der Baumschicht bis zur Wurzelschicht!"
            : "Reihenfolge: Baum-, Strauch-, Kraut-, Boden-, Wurzelschicht.");
        });
        $("#play-actions").appendChild(check);
      },
    };
  }

  /* ---------- 4) Laubfall ---------- */
  function runLaubfall(mode, onlyQuestions) {
    if (mode === "entdecken") {
      runLaubfallDiscover();
      return;
    }
    const qs = onlyQuestions || buildLaubfallQuestions();
    runQuiz(qs);
  }

  function runLaubfallDiscover() {
    $("#play-label").textContent = "Entdecken";
    clearPlay();
    const area = $("#play-area");
    let stage = 0;
    area.appendChild(el(`
      <div class="season-tree" id="season-tree" data-stage="0">
        <div class="crown"></div>
        <div class="trunk"></div>
        <div class="ground-leaves"></div>
      </div>
      <p class="season-label" id="season-label">Sommer – der Baum ist grün</p>
      <div class="panel" style="margin-top:8px">
        <ol style="padding-left:1.2rem;font-weight:700;line-height:1.55;color:var(--text-light)" id="discover-steps">
          ${LEAF_FALL.map((s) => `<li>${s.text}</li>`).join("")}
        </ol>
      </div>
    `));
    const labels = [
      "Sommer – der Baum ist grün",
      "Der Baum braucht die Blätter im Winter nicht mehr",
      "Kaum Nahrung nötig",
      "Herbst – Pflanzensaft wird zurückgezogen",
      "Blattgrün verschwindet, Farben erscheinen",
      "Winter – die Blätter sind abgefallen",
    ];
    $("#play-actions").innerHTML = `
      <button class="btn secondary" type="button" id="leaf-prev">Zurück</button>
      <button class="btn" type="button" id="leaf-next">Weiter im Jahr →</button>
      <button class="btn gold" type="button" id="go-ueben">Zum Üben</button>
    `;
    const treeEl = $("#season-tree");
    const label = $("#season-label");
    function paint() {
      treeEl.dataset.stage = String(stage);
      label.textContent = labels[stage];
    }
    $("#leaf-prev").addEventListener("click", () => {
      stage = Math.max(0, stage - 1);
      paint();
    });
    $("#leaf-next").addEventListener("click", () => {
      stage = Math.min(5, stage + 1);
      paint();
    });
    $("#go-ueben").addEventListener("click", () => startUnitMode("ueben"));
  }

  function buildLaubfallQuestions() {
    const qs = [makeOrderLeafFallQuestion()];
    LEAF_FALL_TF.forEach((tf) => {
      qs.push({
        render(area, { onAnswer }) {
          area.appendChild(el(`<div class="prompt-visual"><h2>${tf.text}</h2><p class="section-sub">Stimmt das?</p></div>`));
          const row = el(`<div class="tf-row"></div>`);
          let answered = false;
          [["Ja, richtig", true], ["Nein, falsch", false]].forEach(([label, val]) => {
            const b = el(`<button class="btn ${val ? "" : "secondary"}" type="button">${label}</button>`);
            b.addEventListener("click", () => {
              if (answered) return;
              answered = true;
              const ok = val === tf.answer;
              $$("button", row).forEach((x) => { x.disabled = true; });
              onAnswer(ok, tf.explain);
            });
            row.appendChild(b);
          });
          area.appendChild(row);
        },
      });
    });
    return qs;
  }

  function makeOrderLeafFallQuestion() {
    return {
      render(area, { onAnswer }) {
        area.appendChild(el(`<div class="section-title">Bringe die Geschichte in die richtige Reihenfolge</div>`));
        const treeBox = el(`
          <div class="season-tree" id="order-tree" data-stage="0">
            <div class="crown"></div>
            <div class="trunk"></div>
            <div class="ground-leaves"></div>
          </div>
          <p class="season-label" id="order-season">Sommer</p>
        `);
        area.appendChild(treeBox);

        const cards = shuffle(LEAF_FALL.map((s, idx) => ({ ...s, idx })));
        const list = el(`<div class="order-list" id="order-list"></div>`);
        let selected = null;

        function paintList() {
          list.innerHTML = "";
          cards.forEach((c, i) => {
            const row = el(`
              <button class="order-card" type="button" data-i="${i}" draggable="true">
                <span class="handle">↕</span>
                <span>${c.text}</span>
              </button>
            `);
            row.addEventListener("click", () => {
              if (selected === null) {
                selected = i;
                row.classList.add("selected");
              } else {
                const tmp = cards[selected];
                cards[selected] = cards[i];
                cards[i] = tmp;
                selected = null;
                paintList();
                updateTree();
              }
            });
            row.addEventListener("dragstart", (e) => {
              selected = i;
              e.dataTransfer.setData("text/plain", String(i));
            });
            row.addEventListener("dragover", (e) => e.preventDefault());
            row.addEventListener("drop", (e) => {
              e.preventDefault();
              const from = Number(e.dataTransfer.getData("text/plain"));
              const to = i;
              const tmp = cards[from];
              cards[from] = cards[to];
              cards[to] = tmp;
              selected = null;
              paintList();
              updateTree();
            });
            list.appendChild(row);
          });
        }

        function updateTree() {
          let correctPrefix = 0;
          for (let i = 0; i < cards.length; i++) {
            if (cards[i].idx === i) correctPrefix++;
            else break;
          }
          $("#order-tree").dataset.stage = String(correctPrefix);
          const seasons = ["Sommer", "Herbst beginnt", "Herbst", "Bunte Blätter", "Blätter fallen", "Winter"];
          $("#order-season").textContent = seasons[correctPrefix];
        }

        area.appendChild(list);
        paintList();
        updateTree();

        const check = el(`<button class="btn" type="button">Prüfen</button>`);
        check.addEventListener("click", () => {
          const ok = cards.every((c, i) => c.idx === i);
          check.disabled = true;
          if (ok) {
            $("#order-tree").dataset.stage = "5";
            $("#order-season").textContent = "Winter";
          }
          onAnswer(ok, ok
            ? "Genau! So verlieren die Bäume ihre Blätter."
            : "Schau noch einmal: zuerst braucht der Baum die Blätter nicht mehr, dann wird der Saft zurückgezogen …");
        });
        $("#play-actions").appendChild(check);
      },
    };
  }

  /* ---------- 5) Prüfung ---------- */
  function runPruefung(_mode, onlyQuestions) {
    $("#play-label").textContent = "Waldprüfung";
    const qs = onlyQuestions || buildPruefungQuestions();
    runQuiz(qs, { teach: false });
  }

  function buildPruefungQuestions() {
    const qs = [];
    // trees
    pickN([...LAUB, ...NADEL], 4).forEach((id) => {
      const t = tree(id);
      const pool = t.group === "laub" ? LAUB : NADEL;
      qs.push(mcQuestion({
        promptHtml: `<img src="${t.leaf}" alt=""><h2>Welcher Baum ist das?</h2>`,
        options: pool.map((pid) => ({ id: pid, label: tree(pid).name })),
        correct: id,
        explain: { ok: `Richtig – ${t.name}!`, bad: `Das ist die ${t.name}.` },
      }));
    });
    qs.push(mcQuestion({
      promptHtml: `<img src="${tree("laerche").image}" alt=""><h2>Welcher Nadelbaum verliert im Herbst seine Nadeln?</h2>`,
      options: NADEL.map((pid) => ({ id: pid, label: tree(pid).name })),
      correct: "laerche",
      explain: {
        ok: "Richtig! Die Lärche ist der einzige der vier Nadelbäume, der im Herbst seine Nadeln verliert.",
        bad: "Die Lärche ist der einzige der vier Nadelbäume, der im Herbst seine Nadeln verliert.",
      },
    }));
    // forest types
    ["laub", "nadel", "misch"].forEach((type) => {
      const label = type === "laub" ? "Laubwald" : type === "nadel" ? "Nadelwald" : "Mischwald";
      qs.push(mcQuestion({
        promptHtml: `${forestScene(type)}<h2>Welche Waldart siehst du?</h2>`,
        options: [
          { id: "laub", label: "Laubwald" },
          { id: "nadel", label: "Nadelwald" },
          { id: "misch", label: "Mischwald" },
        ],
        correct: type,
        explain: { ok: `Ja, ${label}!`, bad: `Das ist ein ${label}.` },
      }));
    });
    // layers
    pickN(LAYER_ITEMS.filter((x) => x.kind === "tier"), 3).forEach((item) => {
      qs.push(mcQuestion({
        promptHtml: `<div style="font-size:3rem">${item.emoji}</div><h2>In welchem Stockwerk lebt ${item.name}?</h2>`,
        options: LAYERS.map((l) => ({ id: l.id, label: l.name })),
        correct: item.layer,
        explain: {
          ok: `Richtig – ${LAYERS.find((l) => l.id === item.layer).name}!`,
          bad: `${item.name} gehört in die ${LAYERS.find((l) => l.id === item.layer).name}.`,
        },
      }));
    });
    pickN(LAYER_ITEMS.filter((x) => x.kind === "pflanze"), 2).forEach((item) => {
      qs.push(mcQuestion({
        promptHtml: `<div style="font-size:3rem">${item.emoji}</div><h2>Wo wächst ${item.name}?</h2>`,
        options: LAYERS.map((l) => ({ id: l.id, label: l.name })),
        correct: item.layer,
        explain: {
          ok: `Genau – ${LAYERS.find((l) => l.id === item.layer).name}!`,
          bad: `${item.name} gehört in die ${LAYERS.find((l) => l.id === item.layer).name}.`,
        },
      }));
    });
    // leaf fall
    LEAF_FALL_TF.slice(0, 2).forEach((tf) => {
      qs.push({
        render(area, { onAnswer }) {
          area.appendChild(el(`<div class="prompt-visual"><h2>${tf.text}</h2><p class="section-sub">Stimmt das?</p></div>`));
          const row = el(`<div class="tf-row"></div>`);
          let answered = false;
          [["Ja, richtig", true], ["Nein, falsch", false]].forEach(([label, val]) => {
            const b = el(`<button class="btn ${val ? "" : "secondary"}" type="button">${label}</button>`);
            b.addEventListener("click", () => {
              if (answered) return;
              answered = true;
              $$("button", row).forEach((x) => { x.disabled = true; });
              onAnswer(val === tf.answer, tf.explain);
            });
            row.appendChild(b);
          });
          area.appendChild(row);
        },
      });
    });

    return pickN(qs, Math.min(15, qs.length));
  }

  // boot
  goHome();
})();
