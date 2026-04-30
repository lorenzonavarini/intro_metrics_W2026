# 2. Data, Models, and Causality

## Data Structures

Econometric datasets usually have one of three structures.

| Structure | What varies? | Example |
|---|---|---|
| Cross-section | units | workers observed in one year |
| Time series | time | monthly inflation for Austria |
| Panel data | units and time | workers followed over several years |

Each structure supports different comparisons. Cross-sections compare units. Time series compare periods. Panels can compare changes within units over time.

## A Simple Model

For individual $i$, let $y_i$ denote wages. A generic wage model is:

$$
y_i = f(x_{1i}, \ldots, x_{ki}, u_{1i}, \ldots, u_{\ell i}),
$$

where:

- $x_i$ are observed characteristics;
- $u_i$ are unobserved characteristics.

In practice, data rarely contain all relevant determinants. This is why interpretation is not automatic.

## Observed And Unobserved Variables

For wages, observed variables might include:

- education;
- age;
- labor market experience;
- region;
- occupation.

Unobserved variables might include:

- ability;
- motivation;
- family networks;
- information;
- preferences.

If unobserved variables affect both college attendance and wages, the observed college wage gap mixes the causal return with selection.

## Interactive Example: Selection Bias

The true causal return to college is fixed. The slider changes how strongly unobserved ability affects college attendance. When selection is stronger, the observed wage gap moves away from the true causal effect.

<div class="interactive-card" id="selection-demo">
  <div class="interactive-controls">
    <label>
      Selection on ability
      <input id="selection-strength" type="range" min="0" max="100" value="60">
    </label>
    <label>
      Sample size
      <input id="selection-n" type="range" min="100" max="3000" step="100" value="1000">
    </label>
    <button type="button" id="selection-resimulate">Resimulate</button>
  </div>
  <div class="interactive-output">
    <canvas id="selection-canvas" width="760" height="320" aria-label="Simulated wages by college status"></canvas>
    <div class="stat-grid">
      <div><span>True causal return</span><strong id="true-return"></strong></div>
      <div><span>Observed wage gap</span><strong id="observed-gap"></strong></div>
      <div><span>Bias</span><strong id="selection-bias"></strong></div>
    </div>
  </div>
</div>

## Code Version

### Python

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(123)
n = 1000
true_return = 0.25
selection_strength = 1.2

ability = rng.normal(size=n)
college_latent = selection_strength * ability + rng.normal(size=n)
college = college_latent > np.median(college_latent)

log_wage = 2.5 + true_return * college + 0.35 * ability + rng.normal(scale=0.25, size=n)
df = pd.DataFrame({"log_wage": log_wage, "college": college, "ability": ability})

observed_gap = (
    df.loc[df["college"], "log_wage"].mean()
    - df.loc[~df["college"], "log_wage"].mean()
)

print(f"True return: {true_return:.3f}")
print(f"Observed gap: {observed_gap:.3f}")
print(f"Bias: {observed_gap - true_return:.3f}")
```

### R

```r
set.seed(123)
n <- 1000
true_return <- 0.25
selection_strength <- 1.2

ability <- rnorm(n)
college_latent <- selection_strength * ability + rnorm(n)
college <- college_latent > median(college_latent)

log_wage <- 2.5 + true_return * college + 0.35 * ability + rnorm(n, sd = 0.25)
df <- data.frame(log_wage, college, ability)

observed_gap <- mean(df$log_wage[df$college]) - mean(df$log_wage[!df$college])

cat("True return:", true_return, "\n")
cat("Observed gap:", round(observed_gap, 3), "\n")
cat("Bias:", round(observed_gap - true_return, 3), "\n")
```

## Potential Outcomes

For causal inference, define two potential outcomes:

$$
Y_i(1) = \text{outcome if treated}
$$

$$
Y_i(0) = \text{outcome if untreated}.
$$

The individual treatment effect is:

$$
\tau_i = Y_i(1) - Y_i(0).
$$

The problem is that only one of these is observed for each person.

## Experiments

An ideal experiment solves the comparability problem by random assignment.

Example: fertilizer and crop yields.

1. Divide a field into plots.
2. Randomly assign fertilizer to half of the plots.
3. Measure crop yield after harvest.
4. Compare average yield in treated and control plots.

The difference in means is credible because treatment assignment is unrelated to soil quality in expectation.

## Observational Data

Most social science data are observational. They come from:

- surveys;
- administrative records;
- firms, schools, hospitals, platforms, or governments.

Advantages:

- often large scale;
- often reflect real behavior;
- sometimes cover entire populations.

Main limitation:

- treatment or exposure is not randomly assigned.

This course focuses on the assumptions under which ordinary least squares and related tools can still be informative with observational data.
