# Technical T5: What Are Standard Errors?

A standard error is the standard deviation of an estimator across repeated samples.

## Estimator Versus Estimate

The estimate is the number from one sample.

The estimator is the rule that would produce different estimates in different samples.

The standard error describes how much those estimates vary.

## For The Sample Mean

If:

$$
Var(X)=\sigma^2,
$$

then:

$$
Var(\bar{X}) = \frac{\sigma^2}{n}.
$$

So the standard error is:

$$
SE(\bar{X}) = \frac{\sigma}{\sqrt{n}}.
$$

Because $\sigma$ is unknown, we estimate:

$$
\widehat{SE}(\bar{X}) = \frac{s}{\sqrt{n}}.
$$

## Interactive Graph

The graph repeatedly draws samples and plots the resulting sample means. The standard error is the spread of this distribution.

<div class="interactive-card" id="se-demo">
  <div class="interactive-controls">
    <label>
      Sample size
      <input id="se-n" type="range" min="5" max="500" step="5" value="40">
    </label>
    <label>
      Population SD
      <input id="se-sigma" type="range" min="5" max="200" step="5" value="100">
    </label>
    <button type="button" id="se-resimulate">Resimulate</button>
  </div>
  <div class="interactive-output">
    <canvas id="se-canvas" width="760" height="340" aria-label="Standard error sampling distribution"></canvas>
    <div class="stat-grid">
      <div><span>Empirical SE</span><strong id="se-empirical"></strong></div>
      <div><span>Theoretical SE</span><strong id="se-theory"></strong></div>
      <div><span>One estimate</span><strong id="se-one"></strong></div>
    </div>
  </div>
</div>

## R Code

```r
set.seed(123)
reps <- 1000
n <- 40
mu <- 10
sigma <- 2

sample_means <- replicate(reps, {
  x <- rnorm(n, mean = mu, sd = sigma)
  mean(x)
})

empirical_se <- sd(sample_means)
theoretical_se <- sigma / sqrt(n)

empirical_se
theoretical_se
```

## Confidence Interval

A common large-sample confidence interval for a mean is:

$$
\bar{X} \pm 1.96 \times \widehat{SE}(\bar{X}).
$$

This interval is about sampling uncertainty. It does not account for selection bias, bad measurement, or a non-random sample.

## Main Lesson

Standard errors get smaller when:

- the sample size increases;
- the underlying data are less noisy.

Standard errors do not tell us whether the estimator targets the right estimand.
