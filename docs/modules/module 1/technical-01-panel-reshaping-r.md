# Technical T1: Reshaping Panel Data in R

This technical module shows how to move between common empirical data structures using R.

The core object is a panel dataset with repeated observations for units over time:

$$
i = 1,\ldots,N,\qquad t = 1,\ldots,T.
$$

## Goal

Starting from a panel dataset, we will create:

- a time series by aggregating over units within each time period;
- a cross-section by selecting or summarizing one observation per unit;
- a long panel from a wide panel.

## Setup

```r
library(dplyr)
library(tidyr)
library(ggplot2)

set.seed(123)

panel <- tidyr::expand_grid(
  id = 1:100,
  year = 2020:2024
) |>
  mutate(
    ability = rnorm(100)[id],
    treatment = as.integer(id <= 50 & year >= 2022),
    wage = 20 + 1.5 * (year - 2020) + 2 * treatment + ability + rnorm(n())
  )

head(panel)
```

The data are in **long format**: each row is a unit-year observation.

| id | year | treatment | wage |
|---:|---:|---:|---:|
| 1 | 2020 | 0 | ... |
| 1 | 2021 | 0 | ... |
| 1 | 2022 | 1 | ... |

## From Panel To Time Series

A time series has one observation per time period. We get it by aggregating across units:

```r
time_series <- panel |>
  group_by(year) |>
  summarise(
    mean_wage = mean(wage),
    treated_share = mean(treatment),
    .groups = "drop"
  )

time_series
```

Plot:

```r
ggplot(time_series, aes(x = year, y = mean_wage)) +
  geom_line(linewidth = 1) +
  geom_point(size = 2) +
  labs(x = "Year", y = "Average wage")
```

Interpretation: the unit of observation is now a year, not a person.

## From Panel To Cross-Section

A cross-section has one observation per unit. One option is to keep a single year:

```r
cross_section_2024 <- panel |>
  filter(year == 2024)

head(cross_section_2024)
```

Another option is to summarize each unit over time:

```r
cross_section_summary <- panel |>
  group_by(id) |>
  summarise(
    avg_wage = mean(wage),
    ever_treated = max(treatment),
    wage_growth = wage[year == 2024] - wage[year == 2020],
    .groups = "drop"
  )

head(cross_section_summary)
```

Interpretation: the unit of observation is now a person.

## From Long Panel To Wide Panel

Wide format stores different time periods in different columns:

```r
panel_wide <- panel |>
  select(id, year, wage) |>
  pivot_wider(
    names_from = year,
    values_from = wage,
    names_prefix = "wage_"
  )

head(panel_wide)
```

This format is useful for some descriptive tables, but most regression workflows prefer long data.

## From Wide Panel To Long Panel

Convert back to long format:

```r
panel_long_again <- panel_wide |>
  pivot_longer(
    cols = starts_with("wage_"),
    names_to = "year",
    values_to = "wage",
    names_prefix = "wage_"
  ) |>
  mutate(year = as.integer(year))

head(panel_long_again)
```

## Check Yourself

```r
nrow(panel)
nrow(time_series)
nrow(cross_section_2024)
nrow(panel_wide)
nrow(panel_long_again)
```

Expected:

- original panel: $N \times T = 500$ rows;
- time series: $T = 5$ rows;
- cross-section: $N = 100$ rows;
- wide panel: $N = 100$ rows;
- long-again panel: $N \times T = 500$ rows.

## Common Mistakes

- Forgetting that aggregation changes the unit of observation.
- Treating repeated observations as independent cross-sectional observations without thinking about dependence within units.
- Using wide data when the modeling function expects long data.
- Losing identifiers when reshaping.
