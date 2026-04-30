# Module 2: Bivariate Regression and OLS

This module follows the two bivariate regression slide decks. It moves from the population simple regression model to sample OLS estimation, mechanical OLS properties, functional forms, and the assumptions under which OLS has useful sampling properties.

!!! note "Slides"
    - [Lecture 2a: Bivariate Regression and OLS](../../assets/slides/metrics_02.pdf)
    - [Lecture 2b: OLS Properties](../../assets/slides/metrics_02b.pdf)

## Learning Goals

By the end of this module, students should be able to:

- interpret a conditional expectation function;
- write and interpret the simple regression model;
- derive and compute the OLS slope and intercept;
- distinguish errors from residuals;
- explain mechanical OLS properties;
- compute and interpret $R^2$ without over-interpreting it;
- use log transformations and binary regressors;
- state the simple linear regression assumptions SLR.1-SLR.5;
- explain unbiasedness, variance, standard errors, and the Gauss-Markov result.

## Structure

1. [Conditional Expectations and SLR](01-conditional-expectations-slr.md)  
   Population regression line, slope, intercept, prediction error, and the link to causal language.

2. [OLS Estimation](02-ols-estimation.md)  
   Least squares objective, first-order conditions, closed-form formulas, and method-of-moments interpretation.

3. [OLS Mechanics and Fit](03-ols-mechanics-fit.md)  
   Residual properties, variance decomposition, $R^2$, and why fit is not the same as truth.

4. [Functional Forms and Dummies](04-functional-forms-dummies.md)  
   Level-level, log-level, level-log, log-log models, and binary independent variables.

5. [SLR Assumptions](05-slr-assumptions.md)  
   Linearity in parameters, random sampling, sample variation, zero conditional mean, and homoskedasticity.

6. [Unbiasedness, Variance, and Efficiency](06-ols-properties.md)  
   Expected value of OLS, sampling variance, standard errors, and the Gauss-Markov theorem.

## In-Class Use

The interactive panels are intended to be opened during class:

- fit a line and see residuals;
- change noise and sample size to see OLS sampling variation;
- compare functional-form interpretations;
- see how omitted variables violate the zero conditional mean assumption.
