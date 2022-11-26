---
title: Real price notes
date: 2022-11-01
description:
tag:
author: Last update on
---

import Image from 'next/image'

# Real value calculations

The real value is the measure that takes into account the time period's inflation rate. The purpose of the real value is to remove the price effect from a data series or change nominal data to real value data. It is important, however, to clarify how the real value has been calculated in every visualization, since different methods have been used depending on each indicator goal.

Three different methods have been used for three different visualizations:

- Real change rate, used in the [Multivariate model](posts/multivariate).
- Real value, used in the [Price topic](posts/price).
- Real value overrated, used in the [Rainbow model](posts/rainbow).

## Real change rate

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real\:change\:rate\:_{t}=Nominal\:rate\:_{t}-Inflation\:rate\:_{t})

## Real value

![Equation](https://math.vercel.app?from=Real\:value\:_{t}=\frac{Nominal\:value\:_{t}}{Price\:index\:_{t}}\times100)

## Real value overrated

![Equation](https://math.vercel.app?from=Real\:value\:overrated\:_{t}=Nominal\:value\:_{t}-Overrated\:Inflation\:_{t})

then

![Equation](https://math.vercel.app/?bgcolor=auto&from=Overrated\:Inflation\:_{t}=\displaystyle\sum\limits_{t=1985}^n\:\frac{Nominal\:value\:_{t}\:\times\:Inflation\:_{t}}{100})


https://math.vercel.app/home
https://www.tutorialspoint.com/latex_equation_editor.htm

https://www.dallasfed.org/research/basics/nominal.aspx
