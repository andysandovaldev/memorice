(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const state = {
    cols: 4,
    rows: 3,
    category: "categoria-1",
    moves: 0,
    found: 0,
    seconds: 0,
    deck: [],
    locked: false,
    first: null,
    timer: null,
    started: false,
  };
  const names = {
    "categoria-1": "Categoría 1",
    "categoria-2": "Categoría 2",
    "categoria-3": "Categoría 3",
  };
  const levelNames = {
    "6x2": "Fácil",
    "6x3": "Intermedio",
    "6x4": "Experto",
  };

  const totalPairs = () => (state.cols * state.rows) / 2;
  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  $$(".level-card").forEach(button =>
    button.addEventListener("click", () => {
      state.cols = Number(button.dataset.cols);
      state.rows = Number(button.dataset.rows);
      $$(".level-card").forEach(item => {
        const selected = item === button;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    }),
  );
  $$(".category-card").forEach(button =>
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      $$(".category-card").forEach(item => {
        const selected = item === button;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    }),
  );

  function formatTime(seconds) {
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }
  function stopTimer() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
  }
  function startTimer() {
    stopTimer();
    state.timer = setInterval(() => {
      state.seconds++;
      $("#timer").textContent = formatTime(state.seconds);
    }, 1000);
  }
  function showGame() {
    $("#setup").classList.add("hidden");
    $("#game").classList.remove("hidden");
    $("#game").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function showSetup() {
    stopTimer();
    $("#game").classList.add("hidden");
    $("#setup").classList.remove("hidden");
    $("#setup").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startGame() {
    const count = totalPairs();
    const images = window.MEMORICE_IMAGES?.[state.category] || [];

    const picked = shuffle([...images]).slice(0, count);

    state.deck = shuffle(
      picked.flatMap((image, pair) => [
        { image, pair },
        { image, pair },
      ]),
    ).map((card, index) => ({
      ...card,
      index: index + 1,
    }));

    state.moves = 0;
    state.found = 0;
    state.seconds = 0;
    state.first = null;
    state.locked = false;
    state.started = false;
    $("#moves").textContent = "0";
    $("#pairs").innerHTML = `0 <small>/ ${count}</small>`;
    $("#timer").textContent = "00:00";
    $("#win-message").classList.add("hidden");
    const board = $("#board");
    board.style.setProperty("--cols", state.cols);
    board.style.setProperty("--rows", state.rows);
    board.innerHTML = "";
    state.deck.forEach((card, index) => {
      const button = document.createElement("button");
      button.className = "memory-card";
      button.type = "button";
      button.dataset.index = index;
      button.setAttribute("aria-label", `Carta ${index + 1}, oculta`);
      const back = document.createElement("span");
      back.className = "back-face";
      back.textContent = card.index;
      back.setAttribute("aria-hidden", "true");
      const front = document.createElement("span");
      front.className = "front-face";

      const img = document.createElement("img");
      img.src = card.image;
      img.alt = "Imagen de la pareja";
      img.loading = "lazy";
      front.appendChild(img);

      button.append(back, front);
      button.addEventListener("click", () => flipCard(button, card));
      board.appendChild(button);
    });
    showGame();
  }

  function flipCard(button, card) {
    if (
      state.locked ||
      button.classList.contains("flipped") ||
      button.classList.contains("matched")
    )
      return;
    if (!state.started) {
      state.started = true;
      startTimer();
    }
    button.classList.add("flipped");
    button.setAttribute("aria-label", "Carta revelada");
    if (!state.first) {
      state.first = { button, card };
      return;
    }
    state.moves++;
    $("#moves").textContent = state.moves;
    if (state.first.card.pair === card.pair) {
      button.classList.add("matched");
      state.first.button.classList.add("matched");
      button.setAttribute("aria-label", "Pareja encontrada");
      state.first.button.setAttribute("aria-label", "Pareja encontrada");
      state.found++;
      $("#pairs").innerHTML = `${state.found} <small>/ ${totalPairs()}</small>`;
      state.first = null;
      if (state.found === totalPairs()) finishGame();
    } else {
      const first = state.first.button;
      state.first = null;
      state.locked = true;
      setTimeout(() => {
        button.classList.remove("flipped");
        first.classList.remove("flipped");
        button.setAttribute("aria-label", "Carta oculta");
        first.setAttribute("aria-label", "Carta oculta");
        state.locked = false;
      }, 850);
    }
  }
  function finishGame() {
    stopTimer();
    $(".game-tip").classList.add("hidden");
    $("#win-message").classList.remove("hidden");
    $("#win-summary").textContent =
      `Completaste ${totalPairs()} parejas en ${state.moves} movimientos y ${formatTime(state.seconds)}.`;
    $("#game-title").textContent = "¡Lo lograste!";
    $("#win-message").scrollIntoView({ behavior: "smooth", block: "center" });
  }
  $("#start-game").addEventListener("click", startGame);
  $("#restart").addEventListener("click", startGame);
  $("#play-again").addEventListener("click", startGame);
  $("#change-settings").addEventListener("click", showSetup);
})();
