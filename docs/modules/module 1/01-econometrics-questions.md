# 1. Econometrics and Questions

## Road Map

This page follows the introduction deck:

1. what econometrics is;
2. what kinds of economic questions it answers;
3. why the same observed relationship can support different interpretations;
4. how the college-and-wages example motivates the rest of the course.

## What Is Econometrics?

Econometrics is the statistical toolkit economists use to answer economic questions with data.

The phrase has three important parts:

- **economic questions**: the object is not just a pattern in data, but a question about behavior, markets, policy, or institutions;
- **with data**: the argument must be disciplined by observed evidence;
- **statistical toolkit**: data are incomplete and noisy, so uncertainty is part of the analysis.

## Three Types Of Questions

| Type | Example | Interpretation |
|---|---|---|
| Descriptive | Has inequality increased since 1960? | Summarize what happened. |
| Causal | Does college increase wages? | Compare what would happen with and without college. |
| Forecasting | What will unemployment be next quarter? | Predict future outcomes. |

The distinction matters because the required assumptions differ. A graph can answer a descriptive question, but causal claims require a credible counterfactual.

!!! example "Class discussion"
    Consider the question: "Do smaller classes improve test scores?"

    Ask students to classify three versions:

    - Are test scores higher in districts with smaller classes?
    - What would happen to test scores if a district reduced class size?
    - What will next year's test scores be in a district with small classes?

## What Econometrics Can Do

Econometrics is used to:

1. test or falsify economic theories;
2. quantify relationships between variables;
3. evaluate policies and programs;
4. forecast future outcomes.

Examples:

- Do households save more when interest rates rise?
- What is the gender wage gap?
- Does a minimum wage increase reduce employment?
- How many households will take up a new insurance product?

## Running Example: College And Wages

Suppose a policymaker asks whether university education is worth the public investment. We might start with:

$$
\bar{w}_{college} - \bar{w}_{no\ college}.
$$

This is the observed wage gap between college and non-college workers.

The key question is whether this gap equals the causal return to college. It usually does not without additional assumptions, because college graduates may differ from non-graduates in other ways.

## Dependent And Independent Variables

For the college example:

| Role | Variable | Meaning |
|---|---|---|
| Dependent variable | wage or log wage | outcome to be explained |
| Independent variable | college | variable whose relationship with wages we study |
| Controls | age, experience, region, parental background | observed differences we may want to hold fixed |
| Unobservables | ability, motivation, information, networks | determinants we may not observe |

A simple empirical question starts from a pair of variables. A credible econometric answer asks what else must be true for the relationship to have the interpretation we want.

## First Code Example: Wage Gap

### Python

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(123)
n = 1000

college = rng.binomial(1, 0.45, size=n)
log_wage = 2.5 + 0.25 * college + rng.normal(scale=0.35, size=n)

df = pd.DataFrame({"log_wage": log_wage, "college": college})
gap = df.groupby("college")["log_wage"].mean().diff().iloc[-1]

print(round(gap, 3))
```

### R

```r
set.seed(123)
n <- 1000

college <- rbinom(n, size = 1, prob = 0.45)
log_wage <- 2.5 + 0.25 * college + rnorm(n, sd = 0.35)

df <- data.frame(log_wage, college)
gap <- with(df, mean(log_wage[college == 1]) - mean(log_wage[college == 0]))

round(gap, 3)
```

## Interpretation

This code computes a difference in means. It does not by itself prove causality. It is an estimator for a group difference. Whether that group difference estimates a causal return depends on how college attendance was assigned or selected.
