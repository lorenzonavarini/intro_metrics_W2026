# 5. Random Sampling and Convergence

## Random Sampling

A random sample is a collection of random variables:

$$
X_1, X_2, \ldots, X_n.
$$

In the simplest case, the observations are independent and identically distributed:

$$
X_i \overset{iid}{\sim} F.
$$

This means each observation is drawn from the same population distribution and one draw does not affect another.

## Why Sampling Matters

In empirical work, we rarely observe the full population. We observe a sample and use it to learn about a population object.

Example:

- population object: average wage in Austria;
- sample statistic: average wage in a survey sample.

The sample statistic is random because a different sample would produce a different number.

## Interactive Example: Sampling Variation

This panel draws repeated samples from the same population. Increase the sample size and watch the sample mean become more stable.

<div class="interactive-card" id="sampling-demo">
  <div class="interactive-controls">
    <label>
      Sample size per draw
      <input id="sampling-n" type="range" min="5" max="500" step="5" value="30">
    </label>
    <label>
      Number of repeated samples
      <input id="sampling-reps" type="range" min="50" max="1000" step="50" value="300">
    </label>
    <button type="button" id="sampling-resimulate">Resimulate</button>
  </div>
  <div class="interactive-output">
    <canvas id="sampling-canvas" width="760" height="320" aria-label="Sampling distribution of sample means"></canvas>
    <div class="stat-grid">
      <div><span>Population mean</span><strong id="population-mean"></strong></div>
      <div><span>Mean of sample means</span><strong id="mean-of-means"></strong></div>
      <div><span>SD of sample means</span><strong id="sd-of-means"></strong></div>
    </div>
  </div>
</div>

## Code Version

### Python

```python
import numpy as np

rng = np.random.default_rng(123)
reps = 300
n = 30

sample_means = []
for _ in range(reps):
    x = rng.lognormal(mean=0, sigma=0.7, size=n)
    sample_means.append(x.mean())

sample_means = np.array(sample_means)
print(sample_means.mean())
print(sample_means.std(ddof=1))
```

### R

```r
set.seed(123)
reps <- 300
n <- 30

sample_means <- replicate(reps, {
  x <- rlnorm(n, meanlog = 0, sdlog = 0.7)
  mean(x)
})

mean(sample_means)
sd(sample_means)
```

## Law Of Large Numbers

The law of large numbers says that, under regularity conditions, the sample mean converges to the population mean:

$$
\bar{X}_n \rightarrow \mu.
$$

Interpretation: with larger samples, sampling noise in the mean becomes smaller.

Important caveat: larger samples reduce variance, not bias. A large non-representative sample can still estimate the wrong object.

## Central Limit Theorem

The central limit theorem says that sample averages are approximately normally distributed in large samples:

$$
\frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}}
\overset{approx}{\sim}
N(0,1).
$$

This result explains why normal approximations appear throughout econometrics.

## Standard Error

The standard deviation of the sampling distribution of an estimator is its standard error.

For the sample mean:

$$
SE(\bar{X}) = \frac{\sigma}{\sqrt{n}}.
$$

In practice $\sigma$ is unknown, so we estimate it with the sample standard deviation:

$$
\widehat{SE}(\bar{X}) = \frac{s}{\sqrt{n}}.
$$

## Confidence Intervals

A large-sample 95% confidence interval for a mean is:

$$
\bar{X} \pm 1.96 \times \widehat{SE}(\bar{X}).
$$

This interval captures sampling uncertainty. It does not solve problems of measurement error, selection bias, omitted variables, or invalid assumptions.
