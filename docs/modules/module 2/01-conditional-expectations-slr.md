# 1. Conditional Expectations and Simple Regression

## Motivation

Most applied econometrics studies relationships between an outcome $y$ and an explanatory variable $x$.

Examples:

- years of education and wages;
- oil prices and stock prices;
- manufacturing employment and imports;
- price and quantity;
- class size and test scores.

The first object is often not a causal effect but a conditional expectation:

$$
E[Y|X=x].
$$

## Conditional Expectation Function

The conditional expectation function summarizes the expected value of $Y$ for each value of $X$.

A simple linear conditional expectation function is:

$$
E[Y_i|X_i=x_i] = \beta_0 + \beta_1 x_i.
$$

Interpretation:

- $\beta_0$ is the expected value of $Y$ when $X=0$;
- $\beta_1$ is the change in the conditional mean when $X$ increases by one unit.

## Prediction Error

The conditional expectation does not predict each individual outcome perfectly. Define:

$$
\varepsilon_i = Y_i - E[Y_i|X_i].
$$

If the CEF is linear:

$$
\varepsilon_i = Y_i - (\beta_0 + \beta_1 X_i).
$$

This error captures the part of $Y_i$ not explained by the conditional mean.

## Simple Regression Model

The simple regression model writes:

$$
Y_i = \beta_0 + \beta_1 X_i + \varepsilon_i.
$$

The line $\beta_0 + \beta_1 X_i$ is the systematic part. The error $\varepsilon_i$ is the unsystematic or unobserved part.

## Interpretation of the Slope

If all other factors contained in $\varepsilon_i$ are held fixed:

$$
\Delta Y = \beta_1 \Delta X.
$$

For wages and education:

$$
wage_i = \beta_0 + \beta_1 education_i + \varepsilon_i.
$$

Then $\beta_1$ is the average difference in hourly wage associated with one additional year of education in the conditional mean.

!!! warning "Correlation is not automatically causality"
    The phrase "associated with" is deliberate. A simple regression does not by itself show that an additional year of education causes wages to increase.

## Binary Regressor Preview

If $D_i$ is an indicator for college:

$$
E[Y_i|D_i] = \beta_0 + \beta_1 D_i.
$$

Then:

$$
E[Y_i|D_i=0] = \beta_0,
$$

$$
E[Y_i|D_i=1] = \beta_0 + \beta_1,
$$

so:

$$
\beta_1 = E[Y_i|D_i=1] - E[Y_i|D_i=0].
$$

For a binary regressor, the slope is a difference in conditional means.

## Scale Changes

Slope and intercept depend on the units of measurement.

If education is measured in years:

$$
wage_i = \beta_0 + \beta_1 education_i + \varepsilon_i.
$$

If education is measured in decades:

$$
decades_i = \frac{education_i}{10},
$$

then the slope becomes ten times larger:

$$
wage_i = \beta_0 + (10\beta_1)decades_i + \varepsilon_i.
$$

The relationship is the same; the units changed.
