function seededRandom(seed) {
  let state = seed >>> 0;
  return function random() {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function normalGenerator(seed) {
  const random = seededRandom(seed);
  let spare = null;
  return function normal() {
    if (spare !== null) {
      const value = spare;
      spare = null;
      return value;
    }
    const u = Math.max(random(), 1e-12);
    const v = random();
    const mag = Math.sqrt(-2 * Math.log(u));
    spare = mag * Math.sin(2 * Math.PI * v);
    return mag * Math.cos(2 * Math.PI * v);
  };
}

function mean(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function sd(values) {
  const m = mean(values);
  return Math.sqrt(values.reduce((s, x) => s + (x - m) ** 2, 0) / (values.length - 1));
}

function drawAxes(ctx, width, height, margin) {
  ctx.strokeStyle = "#9ca3af";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin, height - margin);
  ctx.lineTo(width - margin, height - margin);
  ctx.moveTo(margin, margin);
  ctx.lineTo(margin, height - margin);
  ctx.stroke();
}

function clearCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return ctx;
}

function initSelectionDemo() {
  const root = document.getElementById("selection-demo");
  if (!root) return;

  const strengthInput = document.getElementById("selection-strength");
  const nInput = document.getElementById("selection-n");
  const button = document.getElementById("selection-resimulate");
  const canvas = document.getElementById("selection-canvas");
  const trueReturnEl = document.getElementById("true-return");
  const observedGapEl = document.getElementById("observed-gap");
  const biasEl = document.getElementById("selection-bias");
  let seed = 100;

  function render() {
    const n = Number(nInput.value);
    const selection = Number(strengthInput.value) / 50;
    const trueReturn = 0.25;
    const normal = normalGenerator(seed);
    const people = [];

    for (let i = 0; i < n; i += 1) {
      const ability = normal();
      const collegeScore = selection * ability + normal();
      people.push({ ability, collegeScore });
    }

    const sortedScores = people.map((p) => p.collegeScore).sort((a, b) => a - b);
    const cutoff = sortedScores[Math.floor(sortedScores.length / 2)];

    const collegeWages = [];
    const nonCollegeWages = [];
    const points = [];

    people.forEach((p) => {
      const college = p.collegeScore > cutoff;
      const wage = 2.5 + trueReturn * Number(college) + 0.35 * p.ability + 0.25 * normal();
      points.push({ wage, college });
      if (college) collegeWages.push(wage);
      else nonCollegeWages.push(wage);
    });

    const observedGap = mean(collegeWages) - mean(nonCollegeWages);
    const bias = observedGap - trueReturn;

    trueReturnEl.textContent = trueReturn.toFixed(3);
    observedGapEl.textContent = observedGap.toFixed(3);
    biasEl.textContent = bias.toFixed(3);

    const ctx = clearCanvas(canvas);
    const margin = 42;
    drawAxes(ctx, canvas.width, canvas.height, margin);
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "#374151";
    ctx.fillText("Simulated log wages by college status", margin, 24);

    const allWages = points.map((p) => p.wage);
    const minW = Math.min(...allWages);
    const maxW = Math.max(...allWages);
    const yScale = (w) =>
      canvas.height - margin - ((w - minW) / (maxW - minW)) * (canvas.height - 2 * margin);

    points.slice(0, 900).forEach((p) => {
      const xCenter = p.college ? canvas.width * 0.66 : canvas.width * 0.34;
      const jitter = (seededRandom(Math.floor(p.wage * 100000))() - 0.5) * 120;
      ctx.fillStyle = p.college ? "rgba(0, 99, 166, 0.35)" : "rgba(102, 102, 102, 0.35)";
      ctx.beginPath();
      ctx.arc(xCenter + jitter, yScale(p.wage), 2.2, 0, 2 * Math.PI);
      ctx.fill();
    });

    [
      { x: canvas.width * 0.34, y: mean(nonCollegeWages), label: "No college" },
      { x: canvas.width * 0.66, y: mean(collegeWages), label: "College" },
    ].forEach((group) => {
      ctx.strokeStyle = "#111827";
      ctx.lineWidth = 3;
      const y = yScale(group.y);
      ctx.beginPath();
      ctx.moveTo(group.x - 70, y);
      ctx.lineTo(group.x + 70, y);
      ctx.stroke();
      ctx.fillStyle = "#111827";
      ctx.fillText(group.label, group.x - 36, canvas.height - 16);
    });
  }

  strengthInput.addEventListener("input", render);
  nInput.addEventListener("input", render);
  button.addEventListener("click", () => {
    seed += 1;
    render();
  });
  render();
}

function initSamplingDemo() {
  const root = document.getElementById("sampling-demo");
  if (!root) return;

  const nInput = document.getElementById("sampling-n");
  const repsInput = document.getElementById("sampling-reps");
  const button = document.getElementById("sampling-resimulate");
  const canvas = document.getElementById("sampling-canvas");
  const popMeanEl = document.getElementById("population-mean");
  const meanMeansEl = document.getElementById("mean-of-means");
  const sdMeansEl = document.getElementById("sd-of-means");
  let seed = 300;

  function lognormal(normal) {
    return Math.exp(0.7 * normal());
  }

  function render() {
    const n = Number(nInput.value);
    const reps = Number(repsInput.value);
    const normal = normalGenerator(seed);
    const sampleMeans = [];
    const popMean = Math.exp(0.7 ** 2 / 2);

    for (let r = 0; r < reps; r += 1) {
      const draw = [];
      for (let i = 0; i < n; i += 1) draw.push(lognormal(normal));
      sampleMeans.push(mean(draw));
    }

    popMeanEl.textContent = popMean.toFixed(3);
    meanMeansEl.textContent = mean(sampleMeans).toFixed(3);
    sdMeansEl.textContent = sd(sampleMeans).toFixed(3);

    const ctx = clearCanvas(canvas);
    const margin = 42;
    drawAxes(ctx, canvas.width, canvas.height, margin);
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "#374151";
    ctx.fillText("Histogram of repeated sample means", margin, 24);

    const minX = Math.min(...sampleMeans);
    const maxX = Math.max(...sampleMeans);
    const bins = 24;
    const counts = Array(bins).fill(0);
    sampleMeans.forEach((x) => {
      const idx = Math.min(bins - 1, Math.floor(((x - minX) / (maxX - minX)) * bins));
      counts[idx] += 1;
    });
    const maxCount = Math.max(...counts);
    const plotW = canvas.width - 2 * margin;
    const plotH = canvas.height - 2 * margin;
    counts.forEach((count, i) => {
      const barW = plotW / bins - 2;
      const barH = (count / maxCount) * plotH;
      ctx.fillStyle = "#0063a6";
      ctx.fillRect(margin + i * (plotW / bins), canvas.height - margin - barH, barW, barH);
    });

    const xPop = margin + ((popMean - minX) / (maxX - minX)) * plotW;
    ctx.strokeStyle = "#b91c1c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xPop, margin);
    ctx.lineTo(xPop, canvas.height - margin);
    ctx.stroke();
    ctx.fillStyle = "#b91c1c";
    ctx.fillText("population mean", xPop + 6, margin + 16);
  }

  nInput.addEventListener("input", render);
  repsInput.addEventListener("input", render);
  button.addEventListener("click", () => {
    seed += 1;
    render();
  });
  render();
}

function initCorrelationDemo() {
  const root = document.getElementById("correlation-demo");
  if (!root) return;

  const rhoInput = document.getElementById("correlation-rho");
  const button = document.getElementById("correlation-resimulate");
  const canvas = document.getElementById("correlation-canvas");
  const targetEl = document.getElementById("target-corr");
  const sampleEl = document.getElementById("sample-corr");
  let seed = 500;

  function render() {
    const rho = Number(rhoInput.value) / 100;
    const normal = normalGenerator(seed);
    const xs = [];
    const ys = [];
    const n = 300;

    for (let i = 0; i < n; i += 1) {
      const x = normal();
      const z = normal();
      const y = rho * x + Math.sqrt(1 - rho ** 2) * z;
      xs.push(x);
      ys.push(y);
    }

    const mx = mean(xs);
    const my = mean(ys);
    const sx = sd(xs);
    const sy = sd(ys);
    const corr =
      xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / ((n - 1) * sx * sy);

    targetEl.textContent = rho.toFixed(2);
    sampleEl.textContent = corr.toFixed(2);

    const ctx = clearCanvas(canvas);
    const margin = 42;
    drawAxes(ctx, canvas.width, canvas.height, margin);
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "#374151";
    ctx.fillText("Simulated bivariate normal data", margin, 24);

    function xScale(x) {
      return margin + ((x + 3.2) / 6.4) * (canvas.width - 2 * margin);
    }
    function yScale(y) {
      return canvas.height - margin - ((y + 3.2) / 6.4) * (canvas.height - 2 * margin);
    }

    ctx.fillStyle = "rgba(0, 99, 166, 0.45)";
    xs.forEach((x, i) => {
      ctx.beginPath();
      ctx.arc(xScale(x), yScale(ys[i]), 3, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  rhoInput.addEventListener("input", render);
  button.addEventListener("click", () => {
    seed += 1;
    render();
  });
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  initSelectionDemo();
  initSamplingDemo();
  initCorrelationDemo();
  initOlsFitDemo();
  initAnscombeDemo();
  initFunctionalFormDemo();
  initExogeneityDemo();
  initOlsSamplingDemo();
});

function olsFit(xs, ys) {
  const mx = mean(xs);
  const my = mean(ys);
  const b1 =
    xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) /
    xs.reduce((s, x) => s + (x - mx) ** 2, 0);
  return { b0: my - b1 * mx, b1 };
}

function initOlsFitDemo() {
  const root = document.getElementById("ols-fit-demo");
  if (!root) return;

  const interceptInput = document.getElementById("ols-intercept");
  const slopeInput = document.getElementById("ols-slope");
  const reset = document.getElementById("ols-reset");
  const canvas = document.getElementById("ols-fit-canvas");
  const userSsrEl = document.getElementById("ols-user-ssr");
  const bestSsrEl = document.getElementById("ols-best-ssr");
  const bestSlopeEl = document.getElementById("ols-best-slope");

  const normal = normalGenerator(220);
  const xs = Array.from({ length: 36 }, () => 8 + 12 * seededRandom(Math.floor(100000 * Math.abs(normal())))());
  const ys = xs.map((x) => 25 + 6.5 * x + 12 * normal());
  const best = olsFit(xs, ys);
  const xMin = Math.min(...xs) - 1;
  const xMax = Math.max(...xs) + 1;
  const yMin = Math.min(...ys) - 15;
  const yMax = Math.max(...ys) + 15;

  function xScale(x) {
    return 42 + ((x - xMin) / (xMax - xMin)) * (canvas.width - 84);
  }
  function yScale(y) {
    return canvas.height - 42 - ((y - yMin) / (yMax - yMin)) * (canvas.height - 84);
  }
  function ssr(b0, b1) {
    return ys.reduce((s, y, i) => s + (y - b0 - b1 * xs[i]) ** 2, 0);
  }
  function drawLine(ctx, b0, b1, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(xScale(xMin), yScale(b0 + b1 * xMin));
    ctx.lineTo(xScale(xMax), yScale(b0 + b1 * xMax));
    ctx.stroke();
  }
  function render() {
    const b0 = Number(interceptInput.value);
    const b1 = Number(slopeInput.value) / 2;
    const ctx = clearCanvas(canvas);
    drawAxes(ctx, canvas.width, canvas.height, 42);
    ctx.fillStyle = "#374151";
    ctx.font = "13px sans-serif";
    ctx.fillText("Move the line; OLS minimizes SSR", 42, 24);
    drawLine(ctx, best.b0, best.b1, "rgba(185, 28, 28, 0.8)", 3);
    drawLine(ctx, b0, b1, "#0063a6", 3);
    xs.forEach((x, i) => {
      const yHat = b0 + b1 * x;
      ctx.strokeStyle = "rgba(102, 102, 102, 0.35)";
      ctx.beginPath();
      ctx.moveTo(xScale(x), yScale(ys[i]));
      ctx.lineTo(xScale(x), yScale(yHat));
      ctx.stroke();
      ctx.fillStyle = "#0063a6";
      ctx.beginPath();
      ctx.arc(xScale(x), yScale(ys[i]), 3.5, 0, 2 * Math.PI);
      ctx.fill();
    });
    userSsrEl.textContent = ssr(b0, b1).toFixed(0);
    bestSsrEl.textContent = ssr(best.b0, best.b1).toFixed(0);
    bestSlopeEl.textContent = best.b1.toFixed(2);
  }
  interceptInput.addEventListener("input", render);
  slopeInput.addEventListener("input", render);
  reset.addEventListener("click", () => {
    interceptInput.value = String(Math.round(best.b0));
    slopeInput.value = String(Math.round(best.b1 * 2));
    render();
  });
  render();
}

function initAnscombeDemo() {
  const root = document.getElementById("anscombe-demo");
  if (!root) return;
  const input = document.getElementById("anscombe-set");
  const button = document.getElementById("anscombe-cycle");
  const canvas = document.getElementById("anscombe-canvas");
  const slopeEl = document.getElementById("anscombe-slope");
  const interceptEl = document.getElementById("anscombe-intercept");
  const r2El = document.getElementById("anscombe-r2");
  const sets = [
    [[10,8.04],[8,6.95],[13,7.58],[9,8.81],[11,8.33],[14,9.96],[6,7.24],[4,4.26],[12,10.84],[7,4.82],[5,5.68]],
    [[10,9.14],[8,8.14],[13,8.74],[9,8.77],[11,9.26],[14,8.10],[6,6.13],[4,3.10],[12,9.13],[7,7.26],[5,4.74]],
    [[10,7.46],[8,6.77],[13,12.74],[9,7.11],[11,7.81],[14,8.84],[6,6.08],[4,5.39],[12,8.15],[7,6.42],[5,5.73]],
    [[8,6.58],[8,5.76],[8,7.71],[8,8.84],[8,8.47],[8,7.04],[8,5.25],[19,12.50],[8,5.56],[8,7.91],[8,6.89]],
  ];
  function render() {
    const data = sets[Number(input.value) - 1];
    const xs = data.map((d) => d[0]);
    const ys = data.map((d) => d[1]);
    const fit = olsFit(xs, ys);
    const yMean = mean(ys);
    const ssr = ys.reduce((s, y, i) => s + (y - fit.b0 - fit.b1 * xs[i]) ** 2, 0);
    const sst = ys.reduce((s, y) => s + (y - yMean) ** 2, 0);
    const ctx = clearCanvas(canvas);
    const margin = 42;
    drawAxes(ctx, canvas.width, canvas.height, margin);
    const xMin = 3, xMax = 20, yMin = 2, yMax = 14;
    const xScale = (x) => margin + ((x - xMin) / (xMax - xMin)) * (canvas.width - 2 * margin);
    const yScale = (y) => canvas.height - margin - ((y - yMin) / (yMax - yMin)) * (canvas.height - 2 * margin);
    ctx.fillStyle = "#374151";
    ctx.font = "13px sans-serif";
    ctx.fillText(`Anscombe dataset ${input.value}`, margin, 24);
    ctx.strokeStyle = "#b91c1c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xScale(xMin), yScale(fit.b0 + fit.b1 * xMin));
    ctx.lineTo(xScale(xMax), yScale(fit.b0 + fit.b1 * xMax));
    ctx.stroke();
    ctx.fillStyle = "#0063a6";
    data.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(xScale(x), yScale(y), 4, 0, 2 * Math.PI);
      ctx.fill();
    });
    slopeEl.textContent = fit.b1.toFixed(2);
    interceptEl.textContent = fit.b0.toFixed(2);
    r2El.textContent = (1 - ssr / sst).toFixed(2);
  }
  input.addEventListener("input", render);
  button.addEventListener("click", () => {
    input.value = String((Number(input.value) % 4) + 1);
    render();
  });
  render();
}

function initFunctionalFormDemo() {
  const root = document.getElementById("functional-form-demo");
  if (!root) return;
  const select = document.getElementById("functional-form-select");
  const button = document.getElementById("functional-resimulate");
  const canvas = document.getElementById("functional-canvas");
  const labelEl = document.getElementById("functional-label");
  const slopeEl = document.getElementById("functional-slope");
  const meaningEl = document.getElementById("functional-meaning");
  let seed = 720;

  function fitFor(form, xs, ys) {
    const tx = xs.map((x) => (form === "logx" || form === "loglog" ? Math.log(x) : x));
    const ty = ys.map((y) => (form === "logy" || form === "loglog" ? Math.log(y) : y));
    return olsFit(tx, ty);
  }
  function render() {
    const normal = normalGenerator(seed);
    const xs = Array.from({ length: 120 }, (_, i) => 1 + (i / 119) * 19);
    const ys = xs.map((x) => Math.exp(1.2 + 0.08 * x + 0.18 * normal()));
    const form = select.value;
    const fit = fitFor(form, xs, ys);
    const xMin = 0, xMax = 21, yMin = 0, yMax = Math.max(...ys) * 1.15;
    const ctx = clearCanvas(canvas);
    const margin = 42;
    drawAxes(ctx, canvas.width, canvas.height, margin);
    const xScale = (x) => margin + ((x - xMin) / (xMax - xMin)) * (canvas.width - 2 * margin);
    const yScale = (y) => canvas.height - margin - ((y - yMin) / (yMax - yMin)) * (canvas.height - 2 * margin);
    ctx.fillStyle = "rgba(0, 99, 166, 0.35)";
    xs.forEach((x, i) => {
      ctx.beginPath();
      ctx.arc(xScale(x), yScale(ys[i]), 2.5, 0, 2 * Math.PI);
      ctx.fill();
    });
    function pred(x) {
      if (form === "level") return fit.b0 + fit.b1 * x;
      if (form === "logy") return Math.exp(fit.b0 + fit.b1 * x);
      if (form === "logx") return fit.b0 + fit.b1 * Math.log(x);
      return Math.exp(fit.b0 + fit.b1 * Math.log(x));
    }
    ctx.strokeStyle = "#b91c1c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let j = 1; j <= 100; j += 1) {
      const x = 0.2 + (j / 100) * 20;
      const y = pred(x);
      if (j === 1) ctx.moveTo(xScale(x), yScale(y));
      else ctx.lineTo(xScale(x), yScale(y));
    }
    ctx.stroke();
    const labels = {
      level: ["level-level", "units per unit"],
      logy: ["log-level", "% per unit"],
      logx: ["level-log", "units per 1%"],
      loglog: ["log-log", "% per 1%"],
    };
    labelEl.textContent = labels[form][0];
    slopeEl.textContent = fit.b1.toFixed(3);
    meaningEl.textContent = labels[form][1];
  }
  select.addEventListener("change", render);
  button.addEventListener("click", () => {
    seed += 1;
    render();
  });
  render();
}

function initExogeneityDemo() {
  const root = document.getElementById("exogeneity-demo");
  if (!root) return;
  const selInput = document.getElementById("exog-selection");
  const nInput = document.getElementById("exog-n");
  const button = document.getElementById("exog-resimulate");
  const canvas = document.getElementById("exog-canvas");
  const trueEl = document.getElementById("exog-true");
  const olsEl = document.getElementById("exog-ols");
  const biasEl = document.getElementById("exog-bias");
  let seed = 820;

  function render() {
    const normal = normalGenerator(seed);
    const n = Number(nInput.value);
    const gamma = Number(selInput.value) / 60;
    const beta = 1;
    const xs = [];
    const ys = [];
    for (let i = 0; i < n; i += 1) {
      const ability = normal();
      const x = gamma * ability + normal();
      const y = beta * x + 1.2 * ability + normal();
      xs.push(x);
      ys.push(y);
    }
    const fit = olsFit(xs, ys);
    trueEl.textContent = beta.toFixed(2);
    olsEl.textContent = fit.b1.toFixed(2);
    biasEl.textContent = (fit.b1 - beta).toFixed(2);
    const ctx = clearCanvas(canvas);
    const margin = 42;
    drawAxes(ctx, canvas.width, canvas.height, margin);
    const xMin = Math.min(...xs), xMax = Math.max(...xs), yMin = Math.min(...ys), yMax = Math.max(...ys);
    const xScale = (x) => margin + ((x - xMin) / (xMax - xMin)) * (canvas.width - 2 * margin);
    const yScale = (y) => canvas.height - margin - ((y - yMin) / (yMax - yMin)) * (canvas.height - 2 * margin);
    ctx.fillStyle = "rgba(0, 99, 166, 0.25)";
    xs.slice(0, 900).forEach((x, i) => {
      ctx.beginPath();
      ctx.arc(xScale(x), yScale(ys[i]), 2, 0, 2 * Math.PI);
      ctx.fill();
    });
    ctx.strokeStyle = "#b91c1c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xScale(xMin), yScale(fit.b0 + fit.b1 * xMin));
    ctx.lineTo(xScale(xMax), yScale(fit.b0 + fit.b1 * xMax));
    ctx.stroke();
  }
  selInput.addEventListener("input", render);
  nInput.addEventListener("input", render);
  button.addEventListener("click", () => {
    seed += 1;
    render();
  });
  render();
}

function initOlsSamplingDemo() {
  const root = document.getElementById("ols-sampling-demo");
  if (!root) return;
  const nInput = document.getElementById("ols-sampling-n");
  const repsInput = document.getElementById("ols-sampling-reps");
  const button = document.getElementById("ols-sampling-resimulate");
  const canvas = document.getElementById("ols-sampling-canvas");
  const trueEl = document.getElementById("ols-sampling-true");
  const meanEl = document.getElementById("ols-sampling-mean");
  const sdEl = document.getElementById("ols-sampling-sd");
  let seed = 920;

  function render() {
    const normal = normalGenerator(seed);
    const n = Number(nInput.value);
    const reps = Number(repsInput.value);
    const beta = 1.5;
    const slopes = [];
    const ctx = clearCanvas(canvas);
    const margin = 42;
    drawAxes(ctx, canvas.width, canvas.height, margin);
    const xScale = (x) => margin + ((x + 2.5) / 5) * (canvas.width - 2 * margin);
    const yScale = (y) => canvas.height - margin - ((y + 4) / 8) * (canvas.height - 2 * margin);
    for (let r = 0; r < reps; r += 1) {
      const xs = [];
      const ys = [];
      for (let i = 0; i < n; i += 1) {
        const x = normal();
        const y = 0.5 + beta * x + normal();
        xs.push(x);
        ys.push(y);
      }
      const fit = olsFit(xs, ys);
      slopes.push(fit.b1);
      if (r < 160) {
        ctx.strokeStyle = "rgba(0, 99, 166, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xScale(-2.5), yScale(fit.b0 + fit.b1 * -2.5));
        ctx.lineTo(xScale(2.5), yScale(fit.b0 + fit.b1 * 2.5));
        ctx.stroke();
      }
    }
    ctx.strokeStyle = "#b91c1c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xScale(-2.5), yScale(0.5 + beta * -2.5));
    ctx.lineTo(xScale(2.5), yScale(0.5 + beta * 2.5));
    ctx.stroke();
    trueEl.textContent = beta.toFixed(2);
    meanEl.textContent = mean(slopes).toFixed(2);
    sdEl.textContent = sd(slopes).toFixed(2);
  }
  nInput.addEventListener("input", render);
  repsInput.addEventListener("input", render);
  button.addEventListener("click", () => {
    seed += 1;
    render();
  });
  render();
}
