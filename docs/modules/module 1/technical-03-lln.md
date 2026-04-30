# Technical T3: Law of Large Numbers

The law of large numbers says that sample averages become stable as sample size grows.

## Statement

Let $X_1,\ldots,X_n$ be independent draws from the same population with mean $\mu$.

The sample mean is:

$$
\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n}X_i.
$$

The law of large numbers says:

$$
\bar{X}_n \rightarrow \mu
$$

as $n$ grows.

## Interactive Graph

The graph shows a running sample mean. With few observations, the mean moves around. As more observations arrive, it stabilizes near the population mean.

<div class="interactive-card" id="lln-demo">
  <div class="interactive-controls">
    <label>
      Sample size
      <input id="lln-n" type="range" min="20" max="3000" step="20" value="600">
    </label>
    <label>
      Distribution
      <select id="lln-dist">
        <option value="normal">normal</option>
        <option value="lognormal">lognormal</option>
        <option value="bernoulli">bernoulli</option>
      </select>
    </label>
    <button type="button" id="lln-resimulate">Resimulate</button>
  </div>
  <div class="interactive-output">
    <canvas id="lln-canvas" width="760" height="340" aria-label="Law of large numbers running mean"></canvas>
    <div class="stat-grid">
      <div><span>Population mean</span><strong id="lln-popmean"></strong></div>
      <div><span>Final sample mean</span><strong id="lln-finalmean"></strong></div>
      <div><span>Absolute error</span><strong id="lln-error"></strong></div>
    </div>
  </div>
</div>

## R Code

```r
set.seed(123)
n <- 1000

x <- rnorm(n, mean = 2, sd = 1)
running_mean <- cumsum(x) / seq_along(x)

plot(
  running_mean,
  type = "l",
  xlab = "Sample size",
  ylab = "Running sample mean"
)
abline(h = 2, col = "red", lwd = 2)
```

## Interpretation

The law of large numbers is about sampling noise. It does not guarantee that the data measure the right object or that the sample is representative.

Large samples reduce random error. They do not automatically remove bias.
