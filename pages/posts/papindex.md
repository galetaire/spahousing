---
title: Purchasing-age population index
date:
description:
tag: All, Price, Volume, Credit
author: Explanatory notes about the index
---

import Image from 'next/image'

# Purchasing-age population index

The PAP is an index that draws two ceilings based on demographics. The idea is to model rational demand based on population^1^.

- Assuming that every 1 person needs 1 house, that would be the demographic upper limit of purchases.
- Assuming that humans mate, then each couple (2 people) would need 1 house, that would be the lower limit.

# How are the limits created?

The demographic limits are created by considering the number of people between 25 and 50 years of age on a given year, and then this limits can be crossed with the number of sales or mortgages for the same year.

- The upper bound is the total number of people between 25 and 50 divided by 26 (the total number of age groups).

![Equation](https://math.vercel.app/?bgcolor=auto&from=Upper\:limit=\frac{Population\:aged\:25\:to\:50}{Number\:of\:age\:groups})

- The lower bound is the upper bound divided by 2 (simulates the potential number of couples).

![Equation](https://math.vercel.app/?bgcolor=auto&from=Lower\:limit=\frac{Upper\:limit}{2})

## Why the range between 25 and 50 years of age?

The logic comes from a decision to avoid "noise" in the data. Around 70% of purchases are concentrated in this age group (_example source_: [Statista](https://es.statista.com/estadisticas/937303/porcentaje-de-compradores-de-viviendas-por-grupo-de-edad-espana/)). The approximate landscape is the following:

- Age group between 0 - 24, represents 24% of the population and 5% of purchases.
- Age group between 25 - 50, represents 35% of the population and 70% of purchases.
- Age group between 51 - 1xx, represents 41% of the population and 25% of purchases.

The bands could move especially upwards, towards 60 years of age. Actually, the values for the limits using the age group between 25 - 60 has been reviewed and is available in the public database. But the values do not vary significantly from those shown by the 25 - 50 group, and only serve to flatten the curve, which we interpret as noise.

Overall, the 25 - 50 age bracket occupies the majority of purchases providing the least noise.

## Other notes

For the mathematical notations, the [Latex Math Api](https://math.vercel.app/home) developed by [@uechz](https://twitter.com/uechz) has been used. A latex editor is accessible at [TutorialsPoint.com](https://www.tutorialspoint.com/latex_equation_editor.htm).

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>

^1^ However, this index is far from achieving a perfect demand side. We must consider that 85% of purchases come from individuals, but 15% are from legal entities (not considered in the demographic curve). Also, purchases made by foreign non-residents are not considered either in the demographic limits.
