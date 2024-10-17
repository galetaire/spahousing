---
title: Real price notes
date: 2024-10-01
description:
tag: All, Price
author: Last update on
---

import Image from 'next/image'

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>

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

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real%5C%3Achange%5C%3Arate%5C%3A_%7Bt%7D%3DNominal%5C%3Arate%5C%3A_%7Bt%7D-Inflation%5C%3Arate%5C%3A_%7Bt%7D.svg)

Where _t_ means the reference year.

Let's see a basic example for the year(_t_) 1989:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real%5C%3Achange%5C%3Arate%5C%3A_%7B1989%7D%3D24%2C46%5C%3A-6%2C79%5C%3A%3D17%2C67.svg)

Therefore, the real price rate increased by 17,67% in 1989.

## 2. Real value

The _real value_ is a methodology to deflate any nominal data series into real values, using a concrete base year for a selected price index. The method is explained in more depth in this entry from the [Federal Reserve - Bank of Dallas](https://www.dallasfed.org/research/basics/nominal.aspx). The expression is the following[1]:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real%5C%3Avalue%5C%3A_%7Bt%7D%3D%5Cfrac%7BNominal%5C%3Avalue%5C%3A_%7Bt%7D%7D%7BPrice%5C%3Aindex%5C%3A_%7Bt%7D%7D%5Ctimes100.svg)

Where _t_ means the reference year.

Let's see an example for the year(_t_) 1987, using the year 1985 as the base year (100) for the price index (CPI):

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real%5C%3Avalue%5C%3A_%7B1987%7D%3D%5Cfrac%7B308%7D%7B114%2C10%7D%5Ctimes100%3D269%2C93.svg)

Therefore, the real house value (at 1985 euros) for the year 1987 equals to 269,93€.

## 3. Real value overrated

The _real value overrated_ is a formula that discounts the amount of inflation rate on a yearly basis, generating a compound that overrates inflation. It is inaccurate for analyzing the real value (the previous _real value_ should be used instead), but convenient for maximizing trends. The expression is the following:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real%5C%3Avalue%5C%3Aoverrated%5C%3A_%7Bt%7D%3DNominal%5C%3Avalue%5C%3A_%7Bt%7D-Overrated%5C%3AInflation%5C%3A_%7Bt%7D.svg)

Where _t_ means the reference year, and the _Overrated inflation_ is expressed as follows:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Overrated%5C%3AInflation%5C%3A_%7Bt%7D%3D%5Cdisplaystyle%5Csum%5Climits_%7Bt%3D1985%7D%5En%5C%3A%5Cfrac%7BNominal%5C%3Avalue%5C%3A_%7Bt%7D%5C%3A%5Ctimes%5C%3AInflation%5C%3Arate%5C%3A_%7Bt%7D%7D%7B100%7D.svg)

Where the sum expression starts at the year 1985(_t_), and ends at the year _(n)_.

Let's see a basic example for the year 1987(_n_).

As for the _Overrated inflation_, it is the sum of the years 1985, 1986 and 1987:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Overrated%5C%3AInflation%5C%3A_%7B1987%7D%3D%5Cfrac%7B204%5C%3A%5Ctimes%5C%3A8%2C83%5C%3A%7D%7B100%7D%5C%3A%2B%5C%3A%5Cfrac%7B244%5C%3A%5C%3A%5Ctimes%5C%3A8%2C80%5C%3A%7D%7B100%7D%2B%5Cfrac%7B308%5C%3A%5C%3A%5Ctimes%5C%3A5%2C26%5C%3A%7D%7B100%7D%3D55%2C70.svg)

Then:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Real%5C%3Avalue%5C%3Aoverrated%5C%3A_%7B1987%7D%3D308%5C%3A-55%2C70%3D252%2C30.svg)

Therefore, the real _overrated_ house value (at 1985 euros) for the year 1987 equals to 252,30€.

### Real value vs. Real value overrated

As means of comparison, in the following charts we can see the behaviour of both the _Real value_ and the _Real value overrated_.

[![Overrated](/images/overrated1.png)](/images/overrated1.png)
[![Overrated](/images/overrated2.png)](/images/overrated2.png)

## Notes

For the mathematical notations, the [Latex Math Api](https://math.vercel.app/home) developed by [@uechz](https://twitter.com/uechz) has been used. A latex editor is accessible at [TutorialsPoint.com](https://www.tutorialspoint.com/latex_equation_editor.htm).

[1] If the price index is in decimal form, the expression would simply be: _Nominal value / Price index_.
