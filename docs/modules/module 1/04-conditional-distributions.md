# 4. Conditional Distributions

## Motivation

Econometrics rarely studies one variable in isolation. We usually ask how the distribution of one variable changes when another variable is fixed.

Examples:

- test scores conditional on class size;
- wages conditional on education;
- employment conditional on minimum wage policy;
- marathon completion conditional on age.

## Conditional Probability

For two events $A$ and $B$ with $\Pr(B)>0$:

$$
\Pr(A|B) = \frac{\Pr(A \cap B)}{\Pr(B)}.
$$

Interpretation: among cases where $B$ happened, what fraction also have $A$?

## Discrete Example

Let:

- $A$ = completes a marathon;
- $B$ = older than 50.

Then:

$$
\Pr(A|B) = \frac{\Pr(A \cap B)}{\Pr(B)}.
$$

In data, this is a group mean when $A$ is coded as 0/1.

### Python

```python
import pandas as pd

df = pd.DataFrame({
    "completed": [1, 0, 1, 1, 0, 0, 1],
    "age": [55, 61, 42, 53, 36, 58, 66],
})

prob = df.loc[df["age"] > 50, "completed"].mean()
print(prob)
```

### R

```r
df <- data.frame(
  completed = c(1, 0, 1, 1, 0, 0, 1),
  age = c(55, 61, 42, 53, 36, 58, 66)
)

mean(df$completed[df$age > 50])
```

## Conditional Mean

The conditional mean is:

$$
E[Y|X=x].
$$

It is the average value of $Y$ among units with $X=x$.

For binary treatment $D$:

$$
E[Y|D=1] - E[Y|D=0]
$$

is the observed difference in average outcomes between treated and untreated units.

## Conditional Means And Causality

The observed difference:

$$
E[Y|D=1] - E[Y|D=0]
$$

is generally not the same as:

$$
E[Y(1) - Y(0)].
$$

It becomes causal only under assumptions. One strong assumption is random assignment:

$$
D \perp (Y(1), Y(0)).
$$

In words, treatment status is independent of potential outcomes.

## Bayes' Rule

Bayes' rule rewrites conditional probabilities:

$$
\Pr(A|B) = \frac{\Pr(B|A)\Pr(A)}{\Pr(B)}.
$$

This is useful whenever we observe one conditional probability but need another.

## Classroom Example

Suppose:

- 10% of students studied more than 20 hours;
- 80% of those students passed;
- 50% of all students passed.

What is the probability that a randomly selected student studied more than 20 hours conditional on passing?

$$
\Pr(Study|Pass) =
\frac{\Pr(Pass|Study)\Pr(Study)}{\Pr(Pass)}
= \frac{0.8 \times 0.1}{0.5}
= 0.16.
$$

## Conditional Distributions In Regression

Regression is a way of summarizing conditional expectations. The population regression function is:

$$
E[Y|X=x].
$$

A linear regression approximates this function with a line:

$$
E[Y|X=x] \approx \beta_0 + \beta_1 x.
$$

This is why regression coefficients are about conditional comparisons.
