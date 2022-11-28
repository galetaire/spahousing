---
title: Real price notes
date: 2022-11-01
description:
tag: Price
author: Last update on
---

import Image from 'next/image'

# Notes on the real value calculations

The real value is the measure that takes into account the time period's inflation rate, being the purpose to remove the price effect from a data series. It is important to clarify how the real value has been calculated, since 3 different methods have been used for 3 different visualizations:

1. _Real change rate_, used in the [Multivariate model](multivariate).
2. _Real value_, used in [Price](price).
3. _Real value overrated_, used in the [Rainbow model](rainbow).

Data base sample, for following examples:

| Year | Nominal value | Nominal rate (%) | CPI (%) | CPI, 100=1985 | Overrated inflation |
| --- | --- | --- | --- | --- | --- |
| 1985 | 204 | - | 8,83 | 100  | 18,0 |
| 1986 | 244 | 19,61 | 8,80 | 108,8 | 39,5 |
| 1987 | 308 | 26,23 | 5.26 | 114,1 | 55,7 |
| 1988 | 404 | 31,09 | 4,83 | 118,9 | 75,2 |
| 1989 | 503 | 24,46 | 6,79 | 125,7 | 109,3 |
| 1990 | 573 | 13,93 | 6,72 | 132,4 | 147,8 |

## 1. Real change rate

The _real change rate_ is the difference between the change in nominal price year-on-year minus the inflation rate (CPI) year-on-year. The expression is the following:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real\:change\:rate\:_{t}=Nominal\:rate\:_{t}-Inflation\:rate\:_{t})

Where _t_ means the reference year.

Let's see a basic example for the year(_t_) 1989:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real\:change\:rate\:_{1989}=24,46\:-6,79\:=17,67)

Therefore, the real price rate increased by 17,67% in 1989.

## 2. Real value

The _real value_ is a methodology to deflate any nominal data series into real values, using a concrete base year for a selected price index. The method is explained in more depth in this entry from the [Federal Reserve - Bank of Dallas](https://www.dallasfed.org/research/basics/nominal.aspx). The expression is the following[^1]:

![Equation](https://math.vercel.app?from=Real\:value\:_{t}=\frac{Nominal\:value\:_{t}}{Price\:index\:_{t}}\times100)

Where _t_ means the reference year.

Let's see an example for the year(_t_) 1987, using the year 1985 as the base year (100) for the price index (CPI):

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real\:value\:_{1987}=\frac{308}{114,10}\times100=269,93)

Therefore, the real house value (at 1985 euros) for the year 1987 equals to 269,93€.

## 3. Real value overrated

The _real value overrated_ is a formula that discounts the amount of inflation rate on a yearly basis, generating an aggregated compound that overcounts inflation and exacerbates the values, both positively and negatively. It is inaccurate for analyzing the real value (the previous _real value_ should be used instead), but convenient for maximizing trends. The expression is the following:

![Equation](https://math.vercel.app?from=Real\:value\:overrated\:_{t}=Nominal\:value\:_{t}-Overrated\:Inflation\:_{t})

Where _t_ means the reference year, and _Overrated inflation_ is the following expression:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Overrated\:Inflation\:_{t}=\displaystyle\sum\limits_{t=1985}^n\:\frac{Nominal\:value\:_{t}\:\times\:Inflation\:rate\:_{t}}{100})

Where the sum expression starts at the year 1985(_t_), and ends at the year _(n)_.

Let's see a basic example for the year 1987(_n_). As for the _Overrated inflation_, it is the sum of the years 1985, 1986 and 1987:

![Equation](https://math.vercel.app?from=Overrated\:Inflation\:_{1987}=\frac{204\:\times\:8,83\:}{100}\:+\:\frac{244\:\:\times\:8,80\:}{100}+\frac{308\:\:\times\:5,26\:}{100}=55,70)

Then:

![Equation](https://math.vercel.app?from=Real\:value\:overrated\:_{1987}=308\:-55,70=252,30)

Therefore, the real _overrated_ house value (at 1985 euros) for the year 1987 equals to 252,30€.

### Real value vs. Real value overrated

As means of comparison, in the following charts we can see the behaviour of both the _Real value_ and the _Real value overrated_.

[![Overrated](/images/overrated1.png)](/images/overrated1.png)
[![Overrated](/images/overrated2.png)](/images/overrated2.png)

## Notes

For the mathematical notations, the [Latex Math Api](https://math.vercel.app/home) developed by [@uechz](https://twitter.com/uechz) has been used. A latex editor is accessible at [TutorialsPoint.com](https://www.tutorialspoint.com/latex_equation_editor.htm).

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>

[^1]: If the price index is in decimal form, the expression would be the following: [Equation](https://math.vercel.app?from=Real\:value\:_{t}=\frac{Nominal\:value\:_{t}}{Price\:index\:(decimal form)\:_{t}})
