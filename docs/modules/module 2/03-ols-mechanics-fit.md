# 3. OLS Mechanics and Fit

## Mechanical Properties

Some OLS properties hold mechanically for any dataset, regardless of whether the model is correct.

These are algebraic facts from the least-squares problem.

## 1. OLS Requires Variation In X

The slope is:

$$
\hat{\beta}_1 =
\frac{\widehat{Cov}(x,y)}{\widehat{Var}(x)}.
$$

If $x$ has no variation, $\widehat{Var}(x)=0$ and the slope is undefined.

## 2. Average Residual Is Zero

With an intercept:

$$
\sum_{i=1}^n \hat{e}_i = 0.
$$

If the average residual were not zero, shifting the line up or down would improve the fit.

## 3. Residuals Are Uncorrelated With X

OLS also implies:

$$
\sum_{i=1}^n x_i\hat{e}_i = 0.
$$

If residuals were linearly related to $x$, tilting the line would improve the fit.

## 4. Variance Decomposition

OLS decomposes variation in $y$ into explained and residual parts:

$$
\sum_{i=1}^{n}(y_i-\bar{y})^2
=
\sum_{i=1}^{n}(\hat{y}_i-\bar{y})^2
+
\sum_{i=1}^{n}\hat{e}_i^2.
$$

In short:

$$
SST = SSE + SSR.
$$

## Goodness Of Fit

The coefficient of determination is:

$$
R^2 = \frac{SSE}{SST} = 1 - \frac{SSR}{SST}.
$$

It is the share of sample variation in $y$ explained by the fitted line.

## Interactive Example: $R^2$ And Pattern Recognition

The four datasets below have similar regression summaries but very different shapes. This is the lesson of Anscombe's quartet: always graph your data.

<div class="interactive-card" id="anscombe-demo">
  <div class="interactive-controls">
    <label>
      Dataset
      <input id="anscombe-set" type="range" min="1" max="4" step="1" value="1">
    </label>
    <button type="button" id="anscombe-cycle">Next dataset</button>
  </div>
  <div class="interactive-output">
    <canvas id="anscombe-canvas" width="760" height="340" aria-label="Anscombe quartet demo"></canvas>
    <div class="stat-grid">
      <div><span>Slope</span><strong id="anscombe-slope"></strong></div>
      <div><span>Intercept</span><strong id="anscombe-intercept"></strong></div>
      <div><span>R squared</span><strong id="anscombe-r2"></strong></div>
    </div>
  </div>
</div>

## Code Version

### Python

```python
import seaborn as sns
import statsmodels.api as sm

df = sns.load_dataset("anscombe")

for name, group in df.groupby("dataset"):
    X = sm.add_constant(group["x"])
    fit = sm.OLS(group["y"], X).fit()
    print(name, fit.params.to_dict(), round(fit.rsquared, 3))
```

### R

```r
data(anscombe)

for (j in 1:4) {
  x <- anscombe[[paste0("x", j)]]
  y <- anscombe[[paste0("y", j)]]
  fit <- lm(y ~ x)
  print(c(dataset = j, coef(fit), r2 = summary(fit)$r.squared))
}
```

## Interpretation Warning

A high $R^2$ does not prove:

- the model is causal;
- the model is correctly specified;
- the coefficient is unbiased;
- the relationship will remain stable out of sample.

A low $R^2$ also does not mean the coefficient is useless. In micro data, meaningful relationships can coexist with substantial individual-level noise.
