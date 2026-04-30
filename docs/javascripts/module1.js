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
});
