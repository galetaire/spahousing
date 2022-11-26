---
title: Real price notes
date:
description:
tag:
author:
---

import Image from 'next/image'

# Notes on the real value calculations

The real value is the measure that takes into account the time period's inflation rate, being the purpose to remove the price effect from a data series. It is important to clarify how the real value has been calculated in every visualization, since different methods have been used depending on each indicator goal.

3 different methods have been used for 3 different visualizations:

- _Real change rate_, used in the [Multivariate model](posts/multivariate).
- _Real value_, used in the [Price](posts/price) visualization.
- _Real value overrated_, used in the [Rainbow model](posts/rainbow).

A real data sample, used for following examples:

| Year | Nominal value | Nominal change % | CPI | CPI 100 =1985 | Overrated inflation |
| --- | --- | --- | --- | --- | --- |
| 1985 | 204 | - | 8,83 | 100  | 18,0 |
| 1986 | 244 | 19,61 | 8,80 | 108,8 | 39,5 |
| 1987 | 308 | 26,23 | 5.26 | 114,1 | 55,7 |
| 1988 | 404 | 31,09 | 4,83 | 118,9 | 75,2 |
| 1989 | 503 | 24,46 | 6,79 | 125,7 | 109,3 |
| 1990 | 573 | 13,93 | 6,72 | 132,4 | 147,8 |

## Real change rate

The _real change rate_ is the difference between the change in nominal price year-on-year minus the inflation rate (CPI) year-on-year. The expression is the following:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real\:change\:rate\:_{t}=Nominal\:rate\:_{t}-Inflation\:rate\:_{t})

Where _t_ means the reference year. Let's see a basic example for the year(_t_) 1989:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real\:change\:rate\:_{1989}=24,46\:-6,79\:=17,67)

## Real value

The _real value_ is a simple methodology to deflate any nominal data series to real values, using a base year for the price index. The method is explained in more depth in this entry from the [Federal Reserve - Bank of Dallas](https://www.dallasfed.org/research/basics/nominal.aspx). The expression is the following:

![Equation](https://math.vercel.app?from=Real\:value\:_{t}=\frac{Nominal\:value\:_{t}}{Price\:index\:_{t}}\times100)

Where _t_ means the reference year, and where we use the year 1985 as the base year (100) for the price index. Let's see a basic example for the year(_t_) 1988:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real\:value\:_{1988}=\frac{404}{118,90}\times100=339,78)

## Real value overrated

The _real value overrated_ is a formula that discounts the amount of inflation rate on a yearly basis, generating an aggregated discount that distorts the value to the extremes, both for positive and negative rates. It is inaccurate for analysing the real value (the previous _real value_ should be used instead), but convenient for maximizing trends.

![Equation](https://math.vercel.app?from=Real\:value\:overrated\:_{t}=Nominal\:value\:_{t}-Overrated\:Inflation\:_{t})

Where _t_ means the reference year, being the _Overrated inflation_ the following expression:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Overrated\:Inflation\:_{t}=\displaystyle\sum\limits_{t=1985}^n\:\frac{Nominal\:value\:_{t}\:\times\:Inflation\:rate\:_{t}}{100})

Where the sum expression starts at the year 1985(_t_), and ends at the last available data year _n_. Let's see a basic example for the year(_n_) 1988:

![Equation](https://math.vercel.app?from=Real\:value\:overrated\:_{1988}=404\:-75,20=328,80)

Where the _Overrated inflation_ is the sum of the years 1985, 1986, 1987 and 1988:

![Equation](https://math.vercel.app?from=Overrated\:Inflation\:_{1988}=\frac{204\:\times\:8,83\:}{100}+\frac{244\:\:\times\:8,80\:}{100}+\frac{308\:\:\times\:5,26\:}{100}+\frac{404\:\:\times\:4,83\:}{100}=75,20)

## Real value vs. Real value overrated

As means of comparison, in the following charts we can see the behaviour of both the _Real value_ and the _Real value overrated_.

[![Overrated](/images/overrated1.png)](/images/overrated1.png)
[![Overrated](/images/overrated2.png)](/images/overrated2.png)

## Notes

For the mathematical notations, the [Latex Math Api](https://math.vercel.app/home) developed by [@uechz](https://twitter.com/uechz) has been used. A latex editor is accessible at [TutorialsPoint.com](https://www.tutorialspoint.com/latex_equation_editor.htm).
