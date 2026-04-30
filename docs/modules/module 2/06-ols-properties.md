# 6. Unbiasedness, Variance, and Efficiency

## Road Map

After deriving OLS mechanically, we ask what the estimator does across repeated random samples.

The key questions:

- Is OLS correct on average?
- How much does it vary across samples?
- Is it efficient compared with other linear unbiased estimators?

## Unbiasedness

Under SLR.1-SLR.4:

$$
E[\hat{\beta}_0] = \beta_0
$$

and:

$$
E[\hat{\beta}_1] = \beta_1.
$$

This does not mean each sample estimate is correct. It means the estimator is correct on average across repeated random samples.

## OLS Decomposition

Plug the true model into the OLS slope:

$$
\hat{\beta}_1
=
\beta_1
+
\frac{\sum_{i=1}^{n}(x_i-\bar{x})e_i}
{\sum_{i=1}^{n}(x_i-\bar{x})^2}.
$$

The second term is sampling error. Under zero conditional mean, this term is zero on average.

## Interactive Example: Repeated Samples

Each thin line is an OLS fit from a different sample. The average of many slopes is close to the true slope when the assumptions hold.

<div class="interactive-card" id="ols-sampling-demo">
  <div class="interactive-controls">
    <label>
      Sample size
      <input id="ols-sampling-n" type="range" min="10" max="250" step="10" value="30">
    </label>
    <label>
      Number of samples
      <input id="ols-sampling-reps" type="range" min="20" max="500" step="20" value="120">
    </label>
    <button type="button" id="ols-sampling-resimulate">Resimulate</button>
  </div>
  <div class="interactive-output">
    <canvas id="ols-sampling-canvas" width="760" height="340" aria-label="OLS repeated samples demo"></canvas>
    <div class="stat-grid">
      <div><span>True slope</span><strong id="ols-sampling-true"></strong></div>
      <div><span>Mean slope</span><strong id="ols-sampling-mean"></strong></div>
      <div><span>SD of slopes</span><strong id="ols-sampling-sd"></strong></div>
    </div>
  </div>
</div>

## Variance Of OLS

Under SLR.1-SLR.5:

$$
Var(\hat{\beta}_1|X)
=
\frac{\sigma^2}
{\sum_{i=1}^{n}(x_i-\bar{x})^2}.
$$

The variance of the slope is smaller when:

- the error variance $\sigma^2$ is smaller;
- the sample has more variation in $X$;
- the sample size is larger, all else equal.

## Estimating Error Variance

The error variance $\sigma^2$ is unknown. We estimate it using residuals:

$$
\hat{\sigma}^2 =
\frac{1}{n-2}\sum_{i=1}^{n}\hat{e}_i^2.
$$

The denominator is $n-2$ because we estimated two parameters, $\beta_0$ and $\beta_1$.

## Standard Errors

The standard error of $\hat{\beta}_1$ is:

$$
SE(\hat{\beta}_1)
=
\sqrt{
\frac{\hat{\sigma}^2}
{\sum_{i=1}^{n}(x_i-\bar{x})^2}
}.
$$

Standard errors measure sampling uncertainty.

## Gauss-Markov Theorem

Under SLR.1-SLR.5, OLS is BLUE:

- **B**est: minimum variance;
- **L**inear: among estimators linear in $Y$;
- **U**nbiased: correct on average;
- **E**stimator.

This is an efficiency result. It does not say OLS is unbiased if SLR.4 fails.

## Code Example: OLS With Standard Errors

### Python

```python
import numpy as np
import statsmodels.api as sm

rng = np.random.default_rng(123)
n = 200
x = rng.normal(size=n)
y = 1.0 + 2.0 * x + rng.normal(scale=1.5, size=n)

X = sm.add_constant(x)
fit = sm.OLS(y, X).fit()

print(fit.summary())
```

### R

```r
set.seed(123)
n <- 200
x <- rnorm(n)
y <- 1 + 2 * x + rnorm(n, sd = 1.5)

fit <- lm(y ~ x)
summary(fit)
```

## Interpretation

The coefficient estimate answers: what slope did this sample produce?

The standard error answers: how much would the estimate tend to vary across repeated samples, under the maintained assumptions?

The causal interpretation still depends on whether the zero conditional mean assumption is credible.
