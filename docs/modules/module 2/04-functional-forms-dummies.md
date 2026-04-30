# 4. Functional Forms and Dummy Variables

## Why Functional Forms Matter

A level-level model assumes that one additional unit of $x$ changes the conditional mean of $y$ by the same absolute amount everywhere:

$$
Y_i = \beta_0 + \beta_1X_i + e_i.
$$

For education and wages, this means the fifth and twelfth year of education have the same absolute wage association.

Sometimes a proportional interpretation is more plausible. Logs help with this.

## Four Common Forms

| Model | Equation | Interpretation of $\beta_1$ |
|---|---|---|
| Level-level | $Y=\beta_0+\beta_1X+e$ | one-unit increase in $X$ associated with $\beta_1$ unit change in $Y$ |
| Log-level | $\log(Y)=\beta_0+\beta_1X+e$ | one-unit increase in $X$ associated with about $100\beta_1$ percent change in $Y$ |
| Level-log | $Y=\beta_0+\beta_1\log(X)+e$ | one percent increase in $X$ associated with about $\beta_1/100$ unit change in $Y$ |
| Log-log | $\log(Y)=\beta_0+\beta_1\log(X)+e$ | one percent increase in $X$ associated with about $\beta_1$ percent change in $Y$ |

## Log Approximation

For small changes:

$$
\Delta \log(Y) \approx \frac{\Delta Y}{Y}.
$$

This is why differences in logs are often interpreted as percentage changes.

## Interactive Example: Functional Form Interpretation

Change the model form and compare the fitted curve in the original $y$ scale.

<div class="interactive-card" id="functional-form-demo">
  <div class="interactive-controls">
    <label>
      Model form
      <select id="functional-form-select">
        <option value="level">level-level</option>
        <option value="logy">log-level</option>
        <option value="logx">level-log</option>
        <option value="loglog">log-log</option>
      </select>
    </label>
    <button type="button" id="functional-resimulate">Resimulate</button>
  </div>
  <div class="interactive-output">
    <canvas id="functional-canvas" width="760" height="340" aria-label="Functional form demo"></canvas>
    <div class="stat-grid">
      <div><span>Displayed model</span><strong id="functional-label"></strong></div>
      <div><span>Estimated slope</span><strong id="functional-slope"></strong></div>
      <div><span>Interpretation</span><strong id="functional-meaning"></strong></div>
    </div>
  </div>
</div>

## Python

```python
import numpy as np
import statsmodels.api as sm

rng = np.random.default_rng(123)
n = 400
education = rng.integers(8, 21, size=n)
log_wage = 1.5 + 0.08 * education + rng.normal(scale=0.25, size=n)
wage = np.exp(log_wage)

X = sm.add_constant(education)
fit = sm.OLS(np.log(wage), X).fit()

print(fit.params)
print("Approx. percent difference per year:", 100 * fit.params[1])
```

## R

```r
set.seed(123)
n <- 400
education <- sample(8:20, n, replace = TRUE)
log_wage <- 1.5 + 0.08 * education + rnorm(n, sd = 0.25)
wage <- exp(log_wage)

fit <- lm(log(wage) ~ education)
coef(fit)
100 * coef(fit)["education"]
```

## Binary Independent Variables

A binary variable takes values 0 and 1. It can code qualitative information.

Examples:

- college graduate;
- treated in a training program;
- male/female indicator;
- eligible for a policy.

For:

$$
Y_i = \beta_0 + \beta_1D_i + e_i,
$$

we have:

$$
E[Y_i|D_i=0] = \beta_0,
$$

$$
E[Y_i|D_i=1] = \beta_0+\beta_1.
$$

So $\beta_1$ is the mean difference between the two groups.

!!! warning "Dummy-variable language"
    "Dummy variable" is common econometric terminology, but "indicator variable" is often clearer.
