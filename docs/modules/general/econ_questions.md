---
title: "Five Big Questions in Empirical Economics"
description: "How modern econometrics connects economic theory, measurement, and causal evidence in labor and microeconomics."
tags: [econometrics, labor economics, microeconomics, policy evaluation, causal inference]
---

# Five Big Questions in Empirical Economics

Economics is most powerful when a theoretical question is translated into a measurable object and then disciplined by data. The five questions below are not meant to exhaust the field. They are a useful map of how modern empirical economics moves from simple models to credible estimates and then back to policy-relevant interpretation.

Each question follows the same logic:

1. **What is the economic problem?**
2. **What is the minimal theory?**
3. **What must be measured?**
4. **Which econometric tools connect measures to causal objects?**
5. **What have we learned, and what remains open?**

---

## 1. What is the return to human capital, and for whom?

### The problem

From Smith to Becker and Mincer, economists have asked why people invest in education, training, health, and skills. The classical human-capital answer is that schooling raises productivity and therefore wages. The modern answer is more subtle: schooling may raise productivity, reveal ability, open future options, change preferences, improve health, and sort people into different occupations, firms, and social networks.

The core empirical problem is that individuals **choose** their schooling. Those who obtain more education differ from those who do not, and the same degree may have different returns for different people.

### A simple theoretical framework

Start with a schooling choice model. Individual \(i\) chooses schooling level \(s\) to maximize expected lifetime utility:

$$
V_i(s)=E_i\left[\sum_{t=0}^{T}\beta^t Y_{it}(s)\right]-C_i(s),
$$

where \(Y_{it}(s)\) is earnings or utility at age \(t\) if schooling level \(s\) is chosen, and \(C_i(s)\) includes tuition, foregone earnings, effort costs, psychic costs, and borrowing constraints.

The empirical workhorse is the Mincer equation:

$$
\log w_i=\alpha+\rho S_i+g(Exp_i)+X_i'\beta+u_i.
$$

But the parameter \(\rho\) is causal only under strong conditions. A richer model allows individual-specific returns:

$$
\log w_i(s)=\alpha_i+\rho_i s+g_i(Exp_i)+u_i(s),
$$

with schooling chosen partly because of \(\alpha_i\), \(\rho_i\), costs, and expectations. This creates **ability bias**, **selection on gains**, and **dynamic continuation values**: completing one stage of education changes the feasible set of future choices.

### What we need to measure

A credible empirical design needs data on:

- schooling quantity: years, credentials, dropout, completion;
- schooling quality: institution, track, major, peer group, teacher/school value added;
- costs: tuition, grants, loans, foregone earnings, distance, admissions constraints;
- outcomes: wages, employment, occupations, health, smoking, family formation, crime, nonmarket benefits;
- pre-treatment characteristics: cognitive skills, noncognitive skills, family background, prior grades, location;
- dynamic states: earlier choices that determine later options.

### How econometrics helps

Different econometric strategies answer different versions of the question.

**Descriptive Mincer regressions** estimate conditional wage gaps. They are useful summaries but not automatically causal.

**Instrumental variables and regression discontinuity** exploit variation in schooling caused by compulsory-schooling laws, distance to college, admissions cutoffs, school construction, financial aid, or lotteries. These designs often estimate local effects for people shifted by the instrument.

**Generalized Roy and marginal treatment effect models** ask how returns vary with the latent cost or resistance to schooling. These models distinguish average treatment effects, treatment on the treated, and returns for marginal students.

**Dynamic discrete choice and dynamic treatment-effect models** explicitly represent sequential choices: high school track, college entry, major, persistence, graduation, labor-market entry. They are useful when a policy changes not only one schooling decision but an entire educational path.

### What the literature suggests

The main lesson is not simply “education pays.” Rather:

- average returns are often positive;
- returns vary by ability, background, degree, institution, field, and outside option;
- some students have low or even negative financial returns to some degrees;
- continuation values matter because one educational step opens future options;
- policies aimed at marginal students can have different returns from average returns.

### Open frontier

The next frontier is to estimate returns to **educational sequences**, not isolated credentials: primary skills → high school track → college major → occupation → firm. This requires linked administrative data, measurement of skills, and models that allow dynamic complementarities.

---

## 2. Who benefits from public programs, and why do average effects mislead?

### The problem

Governments run programs in education, training, health, childcare, housing, and employment. The central policy question is not only whether a program works on average, but **for whom**, **relative to what counterfactual**, and **at what scale**.

A small experimental effect may hide large gains for a subgroup. A large effect for current participants may not generalize to nonparticipants. A program may appear ineffective if the control group receives a close substitute.

### A simple theoretical framework

Let \(D_i\in\{0,1\}\) denote participation in a program. Potential outcomes are \(Y_i(1)\) and \(Y_i(0)\). The individual treatment effect is:

$$
\Delta_i=Y_i(1)-Y_i(0).
$$

Participation is not random. In a selection model:

$$
D_i=1\{\mu_D(Z_i,X_i)-U_{Di}\geq 0\},
$$

where \(Z_i\) shifts access or incentives, \(X_i\) are observed characteristics, and \(U_{Di}\) captures unobserved resistance to participation. If \(\Delta_i\) is correlated with \(U_{Di}\), then people select into treatment partly based on gains or costs.

### What we need to measure

A serious evaluation requires:

- program offers, eligibility, assignment, take-up, intensity, and duration;
- counterfactual alternatives: home care, other preschool, other schools, private providers, informal care;
- outcomes over time: test scores, earnings, health, crime, welfare use, taxes paid;
- costs: government cost, private cost, fiscal externalities, substitution from other public programs;
- margins of treatment: who is induced to participate by a given policy change.

### How econometrics helps

**Randomized controlled trials** identify internally valid effects for the experimental population, but interpretation depends on compliance and substitutes.

**Instrumental variables** identify local average treatment effects for compliers shifted by a specific instrument. This is powerful but instrument-specific.

**Control-function and selection models** use choice equations to correct selection and recover richer treatment-effect objects.

**Marginal treatment effects** estimate effects along the participation margin. They allow researchers to construct policy-relevant treatment effects for alternative expansions or targeting rules.

**Multiple-treatment methods** are needed when people choose among unordered alternatives: different schools, majors, programs, or care arrangements. In these settings, the relevant counterfactual is not “no treatment” but the next-best alternative.

### What the literature suggests

The main lesson is that “the effect of a program” is not a single universal number.

- Experiments estimate effects for the group moved by the experiment.
- Different instruments can identify different margins.
- Program substitutes can change both benefits and costs.
- Targeting can matter as much as program quality.
- Policy evaluation must distinguish internal validity from external validity.

### Open frontier

The frontier is to combine credible research designs with models rich enough to evaluate new policies, not only policies already observed. This means estimating effects by margin, modeling substitutes, and incorporating costs and equilibrium responses.

---

## 3. How do incentives, constraints, and family dynamics shape labor supply?

### The problem

Labor supply is where microeconomic theory meets tax policy, family economics, and inequality. How much do people work when wages, taxes, transfers, childcare costs, retirement incentives, or family circumstances change?

The challenge is that labor supply is both a continuous and discrete decision. People choose whether to work, how many hours to work, whether to enter welfare programs, when to retire, and how to divide work within the household.

### A simple theoretical framework

In a static model, an individual chooses consumption \(c\) and hours \(h\):

$$
\max_{h\geq 0} U(c, T-h; \theta_i)
$$

subject to

$$
c = wh + y - T(wh,y),
$$

where \(w\) is the wage, \(y\) is nonlabor income, \(T(\cdot)\) is the tax-transfer schedule, and \(\theta_i\) captures preferences and constraints.

With fixed costs of work \(F_i\), participation becomes:

$$
D_i=1\{V_i^{work}(w,y,T)-F_i \geq V_i^{nonwork}(y,T)\}.
$$

In a dynamic model, work today affects experience, future wages, savings, eligibility, and retirement options:

$$
V_t(a,e)=\max_{h,c}\{U(c,T-h)+\beta E[V_{t+1}(a',e')|h,c]\}.
$$

### What we need to measure

A labor-supply study needs:

- hours, participation, employment spells, retirement, job search;
- wages, including potential wages for nonworkers;
- taxes, transfers, benefits, childcare costs, pension rules, health insurance;
- family structure, spouse earnings, children, wealth and savings;
- constraints: fixed costs, hours restrictions, welfare eligibility, nonlinear budget sets;
- timing: whether the response is immediate, delayed, or lifecycle-based.

### How econometrics helps

**Structural labor-supply models** simulate behavior under nonlinear tax and transfer schedules. They are useful for counterfactual tax reform.

**Difference-in-differences and natural experiments** evaluate reforms using treated and comparison groups.

**Bunching designs** use excess mass near kinks or notches in tax schedules to infer behavioral elasticities.

**Panel data methods** control for persistent individual heterogeneity.

**Dynamic discrete choice models** handle lifecycle labor supply, retirement, savings, and human-capital accumulation.

### What the literature suggests

Modern labor-supply research emphasizes that:

- extensive-margin responses often matter more than intensive-margin hours responses;
- missing wages and nonparticipation are central identification problems;
- nonlinear tax and transfer schedules are not details: they define the actual choice set;
- family labor supply requires modeling within-household allocation;
- dynamic responses may differ from short-run responses.

### Open frontier

The frontier is to connect labor supply to employer behavior and job characteristics. Workers do not choose hours from an abstract budget set alone; they choose jobs with schedules, amenities, remote-work possibilities, childcare compatibility, and career consequences.

---

## 4. Are labor markets competitive, and how much do firms matter for inequality?

### The problem

Classical competitive models treat wages as equal to marginal productivity. Modern labor economics increasingly asks whether firms have wage-setting power and whether workers with similar skills earn different wages because they work at different firms.

This question matters for minimum wages, antitrust, noncompete agreements, unions, mergers, wage transparency, discrimination, and regional inequality.

### A simple theoretical framework

In a competitive labor market:

$$
w = MRPL.
$$

In a monopsonistic labor market, a firm faces an upward-sloping labor supply curve \(L(w)\). Profit is:

$$
\pi = R(L)-w(L)L.
$$

The first-order condition implies a markdown:

$$
w = \frac{MRPL}{1+1/\varepsilon_L},
$$

where \(\varepsilon_L\) is the labor supply elasticity to the firm. Lower \(\varepsilon_L\) means more wage-setting power.

A complementary worker-firm model decomposes wages as:

$$
w_{it}=\alpha_i+\psi_{j(i,t)}+X_{it}'\beta+\varepsilon_{it},
$$

where \(\alpha_i\) is worker skill and \(\psi_j\) is the firm wage premium.

### What we need to measure

A modern analysis needs:

- matched employer-employee data;
- wages, hours, tenure, mobility, layoffs, occupations;
- firm productivity, profits, revenue, vacancies, concentration, mergers;
- job amenities, commute time, remote work, schedule flexibility, risk;
- outside options and job-search frictions;
- institutions: unions, minimum wages, noncompetes, licensing, wage transparency.

### How econometrics helps

**Two-way fixed effects and mover designs** estimate firm wage premia from workers moving across firms.

**Event studies** analyze wage changes after mergers, plant closures, minimum-wage changes, or changes in noncompete enforceability.

**Labor-supply-to-the-firm estimation** estimates how separations, applications, or employment respond to wages.

**Search and matching models** connect wage dispersion, mobility, vacancy posting, and bargaining.

**Empirical Bayes methods** improve estimates of many firm-, school-, teacher-, judge-, or hospital-specific effects by shrinking noisy unit estimates toward an estimated distribution.

### What the literature suggests

The main shift is from “the labor market” to many imperfectly connected markets.

- Firms matter for wages, even conditional on worker characteristics.
- Workers face frictions and heterogeneous preferences over jobs.
- Concentration, noncompetes, and mobility barriers can create wage-setting power.
- Minimum wages can raise wages with limited employment losses in monopsonistic settings.
- Antitrust and labor-market regulation increasingly require direct measurement of employer power.

### Open frontier

The frontier is to measure not only wage markdowns but **total job-quality markdowns**: wages, schedules, risk, dignity, flexibility, and career progression. A job can be exploitative through low pay, poor amenities, or both.

---

## 5. How do migration, technology, and skill supply reshape wages and inequality?

### The problem

Labor markets are affected by aggregate shocks: immigration, college expansion, automation, trade, demographic change, and technological innovation. These shocks change the supply of skills, the demand for tasks, and the incentives of firms to adopt technologies.

The central question is not merely whether one group’s wages fall or rise after a shock. It is how the economy adjusts: through wages, employment, migration, capital, technology, occupational upgrading, firm entry, product prices, and industrial composition.

### A simple theoretical framework

A canonical skill model writes output as a CES aggregate of high- and low-skill labor:

$$
Y=\left[(A_H H)^{\frac{\sigma-1}{\sigma}}+(A_L L)^{\frac{\sigma-1}{\sigma}}\right]^{\frac{\sigma}{\sigma-1}},
$$

where \(H\) and \(L\) are skill supplies, \(A_H\) and \(A_L\) are skill-augmenting technologies, and \(\sigma\) is the elasticity of substitution.

The skill premium can be written approximately as:

$$
\log\left(\frac{w_H}{w_L}\right)
= \text{relative demand} - \frac{1}{\sigma}\log\left(\frac{H}{L}\right).
$$

A simple supply shock should reduce the relative wage of the affected skill group. But if technology responds endogenously, \(A_H\) or \(A_L\) may shift, so wages and supplies can rise together.

### What we need to measure

A credible empirical analysis needs:

- local and national skill supplies;
- migration flows and immigrant skill classifications;
- wages and employment by skill, occupation, region, firm, and cohort;
- capital, output, productivity, R&D, patents, technology adoption;
- tasks and occupational content;
- product prices and industry composition;
- worker mobility and native responses.

### How econometrics helps

**Spatial designs** compare local labor markets receiving different shocks.

**Shift-share instruments** use historical settlement patterns or industry exposure to predict local shocks, while requiring careful attention to exogeneity and inference.

**National skill-cell approaches** compare wage changes across education-experience groups.

**Event studies and difference-in-differences** exploit reforms, college openings, refugee dispersal, or technology shocks.

**Production-function estimation** measures whether productivity or marginal products change after skill-supply shocks.

**Structural and general-equilibrium models** translate reduced-form estimates into aggregate effects and counterfactual policy simulations.

### What the literature suggests

The key lesson is that labor-market shocks trigger adjustment.

- Local estimates need not equal aggregate effects because workers, firms, and capital move.
- Immigration effects depend on substitution between immigrant and native workers, task allocation, and regional adjustment.
- Skill-supply expansions can induce skill-complementary technical change.
- Technology affects labor demand, but workers and firms respond by changing tasks, training, and organization.
- Reduced-form evidence is most informative when mapped to an explicit model of adjustment.

### Open frontier

The frontier is to integrate micro data on workers and firms with macro models of adjustment. We need estimates that distinguish partial-equilibrium effects from total effects, and short-run disruption from long-run reallocation.

---

# A practical econometric template

For any empirical question, the workflow can be written as:

## 1. State the economic object

Examples:

- return to an extra year of schooling;
- effect of a program for marginal participants;
- labor-supply elasticity at a tax kink;
- firm wage markdown;
- aggregate wage effect of immigration.

## 2. Write the minimal model

The model should clarify:

- the choice set;
- the constraints;
- the source of heterogeneity;
- the equilibrium or counterfactual of interest;
- which parameter is policy-relevant.

## 3. Define the measurement system

Ask:

- What are the treatment, outcome, and state variables?
- Which variables are measured with error?
- Which counterfactual alternatives are observed or inferable?
- What is the unit of analysis: individual, family, firm, school, region, market?

## 4. Choose the identifying variation

Possible sources:

- randomized assignment;
- eligibility thresholds;
- admissions cutoffs;
- policy reforms;
- geographic rollout;
- shift-share exposure;
- distance or access shifters;
- panel movers;
- administrative rules.

## 5. Interpret the estimand

Do not ask only: “Is the estimate causal?” Ask also:

- causal for whom?
- relative to which alternative?
- at which margin?
- under which equilibrium environment?
- valid for which policy counterfactual?

## 6. Connect results back to theory

The final product is not a coefficient. It is an answer to a model-based question.

---

# Suggested reading map

## Human capital and education

- Becker, G. S. (1964). *Human Capital*.
- Mincer, J. (1974). *Schooling, Experience, and Earnings*.
- Card, D. (1999). “The Causal Effect of Education on Earnings.”
- Heckman, J. J., Humphries, J. E., and Veramendi, G. (2018). “Returns to Education: The Causal Effects of Education on Earnings, Health, and Smoking.”
- Rodríguez, J., Urzúa, S., and Reyes, L. (2016). “Heterogeneous Economic Returns to Post-Secondary Degrees: Evidence from Chile.”
- Mountjoy, J. (2022). “Community Colleges and Upward Mobility.”
- Humphries, J. E., Joensen, J. S., and Veramendi, G. (2023). “Complementarities in High School and College Investments.”

## Program evaluation and selection

- Roy, A. D. (1951). “Some Thoughts on the Distribution of Earnings.”
- Heckman, J. J. (1979). “Sample Selection Bias as a Specification Error.”
- Heckman, J. J., and Vytlacil, E. (2005). “Structural Equations, Treatment Effects, and Econometric Policy Evaluation.”
- Kline, P., and Walters, C. (2016). “Evaluating Public Programs with Close Substitutes: The Case of Head Start.”
- Cornelissen, T., Dustmann, C., Raute, A., and Schönberg, U. (2018). “Who Benefits from Universal Child Care?”
- Mogstad, M., and Torgovitsky, A. (2024). “Instrumental Variables with Unobserved Heterogeneity in Treatment Effects.”

## Labor supply and dynamic choice

- Blundell, R., MaCurdy, T., and Meghir, C. (2007). “Labor Supply Models: Unobserved Heterogeneity, Nonparticipation and Dynamics.”
- Keane, M. P., Todd, P. E., and Wolpin, K. I. (2011). “The Structural Estimation of Behavioral Models: Discrete Choice Dynamic Programming Methods and Applications.”
- Heckman, J. J., and Navarro, S. (2007). “Dynamic Discrete Choice and Dynamic Treatment Effects.”

## Firms, monopsony, and value added

- Robinson, J. (1933). *The Economics of Imperfect Competition*.
- Manning, A. (2003). *Monopsony in Motion*.
- Abowd, J. M., Kramarz, F., and Margolis, D. N. (1999). “High Wage Workers and High Wage Firms.”
- Card, D., Heining, J., and Kline, P. (2013). “Workplace Heterogeneity and the Rise of West German Wage Inequality.”
- Azar, J., and Marinescu, I. (2024). “Monopsony Power in the Labor Market: From Theory to Policy.”
- Walters, C. R. (2024). “Empirical Bayes Methods in Labor Economics.”

## Migration, technology, and macro-labor adjustment

- Katz, L. F., and Murphy, K. M. (1992). “Changes in Relative Wages, 1963–1987.”
- Acemoglu, D. (1998). “Why Do New Technologies Complement Skills?”
- Autor, D., Katz, L., and Kearney, M. (2008). “Trends in U.S. Wage Inequality.”
- Card, D. (1990). “The Impact of the Mariel Boatlift on the Miami Labor Market.”
- Carneiro, P., Liu, K., and Salvanes, K. G. (2023). “The Supply of Skill and Endogenous Technical Change.”
- Dustmann, C., and Schönberg, U. (2025). “Linking Empirical Evidence to Theory: A Framework for Understanding Immigration’s Labor Market Effects.”

---

# Closing idea

The common thread across these questions is **selection under constraints**. People select into schooling, work, programs, migration, firms, and occupations. Firms select technologies, locations, wage policies, and workers. Econometrics helps when it makes this selection explicit: what choices are made, what alternatives are available, what is observed, what is missing, and which counterfactual is being estimated.

A good empirical paper therefore does not begin with a regression. It begins with a question: **what economic object would change our understanding of behavior or policy if we could measure it well?**
