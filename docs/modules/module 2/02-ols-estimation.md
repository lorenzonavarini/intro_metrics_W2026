# 2. OLS Estimation

## From Population To Sample

The population parameters $\beta_0$ and $\beta_1$ are unknown. We estimate them from a sample:

$$
\{(x_i,y_i): i=1,\ldots,n\}.
$$

The OLS fitted line is:

$$
\hat{y}_i = \hat{\beta}_0 + \hat{\beta}_1 x_i.
$$

The residual is:

$$
\hat{e}_i = y_i - \hat{y}_i.
$$

Residuals are sample objects. Errors are population/model objects.

## Least Squares Objective

OLS chooses the intercept and slope that minimize the average squared residual:

$$
(\hat{\beta}_0,\hat{\beta}_1)
=
\arg\min_{b_0,b_1}
\frac{1}{n}\sum_{i=1}^{n}(y_i-b_0-b_1x_i)^2.
$$

We square residuals because positive and negative residuals would otherwise cancel.

## Interactive Example: Fit The Line

Move the slope and intercept sliders. The objective is smallest when the line is close to the OLS line.

<div class="interactive-card" id="ols-fit-demo">
  <div class="interactive-controls">
    <label>
      Intercept
      <input id="ols-intercept" type="range" min="-50" max="150" value="40">
    </label>
    <label>
      Slope
      <input id="ols-slope" type="range" min="-20" max="30" value="8">
    </label>
    <button type="button" id="ols-reset">Show OLS</button>
  </div>
  <div class="interactive-output">
    <canvas id="ols-fit-canvas" width="760" height="340" aria-label="OLS fitted line demo"></canvas>
    <div class="stat-grid">
      <div><span>Your SSR</span><strong id="ols-user-ssr"></strong></div>
      <div><span>OLS SSR</span><strong id="ols-best-ssr"></strong></div>
      <div><span>OLS slope</span><strong id="ols-best-slope"></strong></div>
    </div>
  </div>
</div>

## Closed-Form OLS Formulas

The OLS slope is:

$$
\hat{\beta}_1
=
\frac{\sum_{i=1}^n (x_i-\bar{x})(y_i-\bar{y})}
{\sum_{i=1}^n (x_i-\bar{x})^2}
=
\frac{\widehat{Cov}(x,y)}{\widehat{Var}(x)}.
$$

The intercept is:

$$
\hat{\beta}_0 = \bar{y} - \hat{\beta}_1\bar{x}.
$$

The slope is the sample covariance of $x$ and $y$, scaled by the sample variance of $x$.

## Code Version

### Python

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(123)
n = 200
x = rng.normal(size=n)
y = 1.0 + 2.0 * x + rng.normal(scale=1.5, size=n)

b1 = np.sum((x - x.mean()) * (y - y.mean())) / np.sum((x - x.mean()) ** 2)
b0 = y.mean() - b1 * x.mean()

print(round(b0, 3), round(b1, 3))
```

### R

```r
set.seed(123)
n <- 200
x <- rnorm(n)
y <- 1 + 2 * x + rnorm(n, sd = 1.5)

b1 <- sum((x - mean(x)) * (y - mean(y))) / sum((x - mean(x))^2)
b0 <- mean(y) - b1 * mean(x)

round(c(b0, b1), 3)
```

## Method Of Moments Interpretation

Start from:

$$
Y_i = \beta_0 + \beta_1X_i + e_i.
$$

If:

$$
E[e_i]=0
$$

and:

$$
E[X_ie_i]=0,
$$

then replace population moments by sample moments:

$$
\frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{\beta}_0-\hat{\beta}_1x_i)=0,
$$

$$
\frac{1}{n}\sum_{i=1}^{n}x_i(y_i-\hat{\beta}_0-\hat{\beta}_1x_i)=0.
$$

Solving these moment equations yields the same OLS formulas.
