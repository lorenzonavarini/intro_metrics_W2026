# Technical T4: Central Limit Theorem

The central limit theorem explains why normal approximations are so common in econometrics.

## Statement

Let $X_1,\ldots,X_n$ be independent draws from a population with mean $\mu$ and variance $\sigma^2$.

For large $n$:

$$
\frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}}
\approx
N(0,1).
$$

The sample mean becomes approximately normal even when the original data are not normal.

## Interactive Graph

The graph shows the distribution of repeated sample means. Increase the sample size to see the sampling distribution become tighter and more bell-shaped.

<div class="interactive-card" id="clt-demo">
  <div class="interactive-controls">
    <label>
      Sample size per draw
      <input id="clt-n" type="range" min="2" max="200" step="2" value="20">
    </label>
    <label>
      Repeated samples
      <input id="clt-reps" type="range" min="100" max="2000" step="100" value="800">
    </label>
    <button type="button" id="clt-resimulate">Resimulate</button>
  </div>
  <div class="interactive-output">
    <canvas id="clt-canvas" width="760" height="340" aria-label="Central limit theorem sampling distribution"></canvas>
    <div class="stat-grid">
      <div><span>Mean of means</span><strong id="clt-mean"></strong></div>
      <div><span>SD of means</span><strong id="clt-sd"></strong></div>
      <div><span>Theoretical SE</span><strong id="clt-theory"></strong></div>
    </div>
  </div>
</div>

## R Code

```r
set.seed(123)
reps <- 1000
n <- 20

sample_means <- replicate(reps, {
  x <- rexp(n, rate = 1)
  mean(x)
})

hist(
  sample_means,
  breaks = 30,
  main = "Sampling distribution of the mean",
  xlab = "Sample mean"
)
abline(v = 1, col = "red", lwd = 2)
```

## Why It Matters

The CLT is the reason we can often use standard errors, confidence intervals, and hypothesis tests based on normal approximations.

But the approximation can be poor in small samples, especially with very skewed data or extreme outliers.
