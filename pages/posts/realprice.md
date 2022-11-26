---
title: Real price notes
date: 2022-11-01
description:
tag:
author: Last update on
---

import Image from 'next/image'

# Notes on the real value calculations

The real value is the measure that takes into account the time period's inflation rate, being the purpose to remove the price effect from a data series. It is important to clarify how the real value has been calculated in every visualization, since different methods have been used depending on each indicator goal.

3 different methods have been used for 3 different visualizations:

- Real change rate, used in the [Multivariate model](posts/multivariate).
- Real value, used in the [Price topic](posts/price).
- Real value overrated, used in the [Rainbow model](posts/rainbow).

A real data sample, for example purposes:

| Year | Nominal value | Nominal change % | CPI | CPI 100 =1985
| --- | --- | --- | --- |
| 1985 | 204 | - | 8,83 | 100  |  
| 1986 | 244 | 19,61 | 8,80 | 108,8 |
| 1987 | 308 | 26,23 | 5.26 | 114,1 |
| 1988 | 404 | 31,09 | 4,83 | 118,9 |
| 1989 | 503 | 24,46 | 6,79 | 125,7 |
| 1990 | 573 | 13,93 | 6,72 | 132,4 |

## Real change rate

The _real change rate_ is the difference between the change in nominal price year-on-year minus the inflation rate (CPI) year-on-year. The expression is the following:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real\:change\:rate\:_{t}=Nominal\:rate\:_{t}-Inflation\:rate\:_{t})

Where _t_ means the reference year. Let's see a basic example for the year(_t_) 1989:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real\:change\:rate\:_{1989}=24,46\:-6,79\:=17,67)

## Real value

![Equation](https://math.vercel.app?from=Real\:value\:_{t}=\frac{Nominal\:value\:_{t}}{Price\:index\:_{t}}\times100)

## Real value overrated

![Equation](https://math.vercel.app?from=Real\:value\:overrated\:_{t}=Nominal\:value\:_{t}-Overrated\:Inflation\:_{t})

then

![Equation](https://math.vercel.app/?bgcolor=auto&from=Overrated\:Inflation\:_{t}=\displaystyle\sum\limits_{t=1985}^n\:\frac{Nominal\:value\:_{t}\:\times\:Inflation\:_{t}}{100})


https://math.vercel.app/home
https://www.tutorialspoint.com/latex_equation_editor.htm

https://www.dallasfed.org/research/basics/nominal.aspx
