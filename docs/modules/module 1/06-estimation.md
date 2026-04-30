# 6. Matrix Notation and Estimation

## Estimand, Estimator, Estimate

The slides introduce three terms that are central for the rest of the course.

| Term | Meaning | Example |
|---|---|---|
| Estimand | target population object | average return to college |
| Estimator | rule or formula | sample mean, difference in means, OLS |
| Estimate | number produced in the sample | 0.25 log points |

The distinction matters because the same estimator can target different estimands under different assumptions.

## Sample Mean As An Estimator

The sample mean is:

$$
\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i.
$$

It is an estimator for:

$$
\mu = E[X].
$$

When the sample is randomly drawn from the population, $\bar{X}$ is a natural estimator of $\mu$.

## Difference In Means

For a binary treatment $D$:

$$
\hat{\Delta}
=
\frac{1}{n_1}\sum_{i:D_i=1} Y_i
-
\frac{1}{n_0}\sum_{i:D_i=0} Y_i.
$$

This estimates an observed group difference. It estimates a causal effect only under additional assumptions, such as random assignment.

## Vectors

A vector is an ordered list of numbers:

$$
x =
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}.
$$

In data, a vector often stores one variable for all observations.

Example: wages for $n$ workers.

## Matrices

A matrix is a rectangular array of numbers:

$$
X =
\begin{bmatrix}
1 & x_{11} & x_{12} \\
1 & x_{21} & x_{22} \\
\vdots & \vdots & \vdots \\
1 & x_{n1} & x_{n2}
\end{bmatrix}.
$$

Rows are observations. Columns are variables. The first column of ones represents the intercept.

## OLS Preview

Ordinary least squares estimates the coefficients in:

$$
y_i = \beta_0 + \beta_1 x_{1i} + \cdots + \beta_k x_{ki} + u_i.
$$

In matrix notation:

$$
y = X\beta + u.
$$

The OLS estimator is:

$$
\hat{\beta} = (X'X)^{-1}X'y.
$$

For now, read this as a rule that turns data into coefficient estimates. Later modules study when these coefficients have causal interpretations.

## Code Example: Difference In Means And Regression

With a binary treatment, a regression with only an intercept and the treatment variable gives the same coefficient as the difference in means.

### Python

```python
import numpy as np
import pandas as pd
import statsmodels.api as sm

rng = np.random.default_rng(123)
n = 500
d = rng.binomial(1, 0.5, size=n)
y = 1.0 + 0.4 * d + rng.normal(scale=1.0, size=n)

df = pd.DataFrame({"y": y, "d": d})

diff = df.loc[df["d"] == 1, "y"].mean() - df.loc[df["d"] == 0, "y"].mean()

X = sm.add_constant(df["d"])
model = sm.OLS(df["y"], X).fit()

print(round(diff, 3))
print(round(model.params["d"], 3))
```

### R

```r
set.seed(123)
n <- 500
d <- rbinom(n, size = 1, prob = 0.5)
y <- 1.0 + 0.4 * d + rnorm(n)

df <- data.frame(y, d)

diff <- mean(df$y[df$d == 1]) - mean(df$y[df$d == 0])
model <- lm(y ~ d, data = df)

round(diff, 3)
round(coef(model)["d"], 3)
```

## Recap

- An estimand is the object we want.
- An estimator is the rule we use.
- An estimate is the number we get.
- Matrix notation compactly represents many observations and variables.
- OLS is a formula for projecting $y$ onto the columns of $X$.
- Interpretation depends on assumptions, not only on the formula.
