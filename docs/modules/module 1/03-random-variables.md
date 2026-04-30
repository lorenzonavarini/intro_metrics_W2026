# 3. Random Variables and Moments

## Why Probability Enters Econometrics

Econometric estimates vary because data vary. Probability gives us the language to describe that variation.

A random variable is a numerical description of an uncertain outcome. Examples:

- age of a randomly selected person;
- wage of a randomly selected worker;
- test score of a randomly selected student;
- whether a student completes a degree.

## Discrete And Continuous Variables

| Type | Example | Description |
|---|---|---|
| Discrete | degree completion | takes countable values |
| Continuous | wage, height, test score | takes values on an interval |

Discrete random variables are described by probabilities. Continuous random variables are described by densities and cumulative distribution functions.

## Mean

The mean describes the location of a distribution.

For a discrete random variable:

$$
E[X] = \sum_k k \Pr(X = k).
$$

For a continuous random variable:

$$
E[X] = \int_{-\infty}^{+\infty} x f_X(x) dx.
$$

The mean is a population object. The sample mean is a statistic computed from data.

## Median

The median is the value that splits the distribution in half. For skewed distributions, the mean and median can differ substantially.

Income and wages are often right-skewed. In such cases:

- the mean is pulled toward high values;
- the median may better describe a typical observation;
- logs often make the distribution more symmetric.

## Variance And Standard Deviation

Variance measures dispersion:

$$
Var(X) = E[(X - \mu_X)^2] = E[X^2] - E[X]^2.
$$

The standard deviation is:

$$
\sigma_X = \sqrt{Var(X)}.
$$

Standard deviation is often easier to interpret because it is measured in the same units as the variable.

## Standardization

Standardization transforms a variable into standard-deviation units:

$$
Z = \frac{X - \mu_X}{\sigma_X}.
$$

Then:

$$
E[Z] = 0,
$$

$$
Var(Z) = 1.
$$

### Python

```python
import numpy as np

x = np.array([165, 170, 172, 181, 190])
z = (x - x.mean()) / x.std(ddof=0)

print(z)
print(z.mean())
print(z.var())
```

### R

```r
x <- c(165, 170, 172, 181, 190)
z <- (x - mean(x)) / sd(x) * sqrt((length(x) - 1) / length(x))

z
mean(z)
var(z) * (length(z) - 1) / length(z)
```

## Higher Moments

Higher moments describe additional features of a distribution:

- skewness: asymmetry;
- kurtosis: tail thickness;
- finite moments: how extreme the tails can be.

For empirical work, this matters because extreme observations can make means and regressions unstable.

## Covariance

Covariance measures linear association:

$$
Cov(X,Y) = E[(X-\mu_X)(Y-\mu_Y)].
$$

Equivalent form:

$$
Cov(X,Y) = E[XY] - E[X]E[Y].
$$

If $Cov(X,Y)>0$, high values of $X$ tend to be associated with high values of $Y$. If $Cov(X,Y)<0$, high values of $X$ tend to be associated with low values of $Y$.

## Correlation

Correlation rescales covariance:

$$
Corr(X,Y) = \frac{Cov(X,Y)}{\sigma_X\sigma_Y}.
$$

Properties:

- $-1 \le Corr(X,Y) \le 1$;
- it has no units;
- it measures linear association;
- zero correlation does not necessarily mean no relationship.

## Interactive Example: Correlation

Use the slider to change the correlation between two variables.

<div class="interactive-card" id="correlation-demo">
  <div class="interactive-controls">
    <label>
      Correlation
      <input id="correlation-rho" type="range" min="-95" max="95" value="-40">
    </label>
    <button type="button" id="correlation-resimulate">Resimulate</button>
  </div>
  <div class="interactive-output">
    <canvas id="correlation-canvas" width="760" height="320" aria-label="Scatter plot with selected correlation"></canvas>
    <div class="stat-grid">
      <div><span>Target correlation</span><strong id="target-corr"></strong></div>
      <div><span>Sample correlation</span><strong id="sample-corr"></strong></div>
    </div>
  </div>
</div>

### Python

```python
import numpy as np

rng = np.random.default_rng(123)
n = 300
rho = -0.4

x = rng.normal(size=n)
z = rng.normal(size=n)
y = rho * x + np.sqrt(1 - rho**2) * z

print(np.corrcoef(x, y)[0, 1])
```

### R

```r
set.seed(123)
n <- 300
rho <- -0.4

x <- rnorm(n)
z <- rnorm(n)
y <- rho * x + sqrt(1 - rho^2) * z

cor(x, y)
```

## Normal Distribution

The normal distribution is widely used because many estimators are approximately normal in large samples.

$$
X \sim N(\mu, \sigma^2).
$$

The standard normal is:

$$
Z \sim N(0,1).
$$

The normal distribution is useful, but many economic variables are not normal. Wages, income, wealth, and firm size are often skewed.
