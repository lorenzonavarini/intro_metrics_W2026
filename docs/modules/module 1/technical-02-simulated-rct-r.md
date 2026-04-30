# Technical T2: Simulated RCT in R

This technical module simulates a randomized controlled trial and shows how the causal effect is recovered from the data.

## Causal Setup

Each unit has two potential outcomes:

$$
Y_i(1) = \text{outcome if treated},
$$

$$
Y_i(0) = \text{outcome if untreated}.
$$

The individual treatment effect is:

$$
\tau_i = Y_i(1) - Y_i(0).
$$

The average treatment effect is:

$$
ATE = E[Y_i(1) - Y_i(0)].
$$

In real data, we observe only one potential outcome for each unit. In a simulation, we can create both and verify what randomization does.

## Simulate Potential Outcomes

```r
library(dplyr)
library(ggplot2)

set.seed(123)
n <- 1000

rct <- tibble(
  id = 1:n,
  ability = rnorm(n),
  y0 = 50 + 5 * ability + rnorm(n, sd = 8),
  tau = 4,
  y1 = y0 + tau
)

true_ate <- mean(rct$y1 - rct$y0)
true_ate
```

Here, the true treatment effect is 4 for every unit.

## Random Assignment

```r
rct <- rct |>
  mutate(
    treated = rbinom(n, size = 1, prob = 0.5),
    observed_y = if_else(treated == 1, y1, y0)
  )

head(rct)
```

The observed outcome is:

$$
Y_i = D_iY_i(1) + (1-D_i)Y_i(0).
$$

## Estimate The Effect

The difference in means is:

$$
\hat{\tau}
=
\bar{Y}_{treated}
-
\bar{Y}_{control}.
$$

```r
estimate <- rct |>
  group_by(treated) |>
  summarise(mean_y = mean(observed_y), .groups = "drop")

estimate

diff_means <- with(
  rct,
  mean(observed_y[treated == 1]) - mean(observed_y[treated == 0])
)

diff_means
```

Because treatment is randomly assigned, treated and control units are comparable in expectation.

## Regression Version

```r
fit <- lm(observed_y ~ treated, data = rct)
summary(fit)
```

With a binary treatment and no controls, the coefficient on `treated` equals the difference in means.

## Check Balance

Randomization should balance pre-treatment variables in expectation:

```r
rct |>
  group_by(treated) |>
  summarise(
    mean_ability = mean(ability),
    n = n(),
    .groups = "drop"
  )
```

Small differences can appear in one sample, but they shrink as sample size increases.

## Visualize The RCT

```r
ggplot(rct, aes(x = factor(treated), y = observed_y)) +
  geom_boxplot() +
  labs(
    x = "Treatment status",
    y = "Observed outcome"
  )
```

## Repeated Experiments

```r
one_experiment <- function(n = 1000) {
  ability <- rnorm(n)
  y0 <- 50 + 5 * ability + rnorm(n, sd = 8)
  y1 <- y0 + 4
  treated <- rbinom(n, 1, 0.5)
  observed_y <- ifelse(treated == 1, y1, y0)
  mean(observed_y[treated == 1]) - mean(observed_y[treated == 0])
}

estimates <- replicate(1000, one_experiment())

mean(estimates)
sd(estimates)
```

The average estimate across repeated experiments is close to the true ATE.

## What Makes It Causal?

The causal interpretation comes from random assignment:

$$
D_i \perp (Y_i(1), Y_i(0)).
$$

This means treatment status is independent of potential outcomes. Therefore the control group tells us what would have happened to the treated group without treatment, in expectation.

!!! warning "Important"
    The regression command does not create causality. The research design does. In this example, the design is random assignment.
