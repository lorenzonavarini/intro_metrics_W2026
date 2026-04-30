# 5. Simple Linear Regression Assumptions

The second OLS deck collects assumptions used to derive sampling properties of OLS. These are not mechanical properties. They are assumptions about the data-generating process.

## SLR.1: Linearity In Parameters

The population model is:

$$
Y_i = \beta_0 + \beta_1X_i + e_i.
$$

The model is linear in the parameters $\beta_0$ and $\beta_1$.

This does not rule out transformations. For example:

$$
\log(Y_i) = \beta_0 + \beta_1X_i + e_i
$$

is linear in parameters.

## SLR.2: Random Sampling

We observe a random sample:

$$
\{(X_i,Y_i): i=1,\ldots,n\}.
$$

Each observation follows the population model.

This can fail if:

- sampling excludes parts of the population;
- observations are dependent;
- the sample is selected based on outcomes or treatment status.

## SLR.3: Sample Variation In X

The sample values of $X_i$ are not all the same.

Without variation in $X$, the slope is undefined:

$$
\hat{\beta}_1 =
\frac{\widehat{Cov}(X,Y)}{\widehat{Var}(X)}.
$$

## SLR.4: Zero Conditional Mean

The error has expected value zero for every value of $X$:

$$
E[e_i|X_i] = 0.
$$

This is the central exogeneity assumption.

It implies:

$$
E[e_i]=0
$$

and:

$$
E[X_ie_i]=0.
$$

## When To Worry About SLR.4

In an experiment, random assignment can make $X_i$ independent of unobserved factors in $e_i$.

In observational data, $X_i$ may be related to unobserved determinants of $Y_i$.

Example: education and wages.

- $X_i$: years of education;
- $Y_i$: wage;
- $e_i$: ability, motivation, family background, networks.

If unobserved ability affects both education and wages, then:

$$
E[e_i|X_i] \neq 0.
$$

## Interactive Example: Violation Of Exogeneity

The true causal slope is fixed. The slider changes how strongly an omitted variable affects $X$. When the omitted variable also affects $Y$, OLS becomes biased.

<div class="interactive-card" id="exogeneity-demo">
  <div class="interactive-controls">
    <label>
      Omitted-variable selection
      <input id="exog-selection" type="range" min="0" max="100" value="50">
    </label>
    <label>
      Sample size
      <input id="exog-n" type="range" min="100" max="3000" step="100" value="1000">
    </label>
    <button type="button" id="exog-resimulate">Resimulate</button>
  </div>
  <div class="interactive-output">
    <canvas id="exog-canvas" width="760" height="340" aria-label="Exogeneity violation demo"></canvas>
    <div class="stat-grid">
      <div><span>True slope</span><strong id="exog-true"></strong></div>
      <div><span>OLS slope</span><strong id="exog-ols"></strong></div>
      <div><span>Bias</span><strong id="exog-bias"></strong></div>
    </div>
  </div>
</div>

## SLR.5: Homoskedasticity

The variance of the error is constant for all values of $X$:

$$
Var(e_i|X_i) = \sigma^2.
$$

If the error variance changes with $X$, the data are heteroskedastic.

Homoskedasticity is not required for unbiasedness, but it matters for the usual variance formulas and for efficiency.
