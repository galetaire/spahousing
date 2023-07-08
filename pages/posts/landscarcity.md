---
title: Urban land scarcity index
date:
description:
author: Last update on
---

import Image from 'next/image'

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>

# Measuring urban land scarcity

## Notes on the approach to measure urban land scarcity

In a market where supply and demand interact freely, **prices tend to reflect the relative scarcity of goods**. When a good is scarce and in high demand, its price is likely to increase. Conversely, if a good is abundant or there is low demand for it, the price may decrease. Based on this principle, we will use **the price as a measure to approximate urban land scarcity**.

It is important to note that **price should not be seen as a perfect information, since we do not live in a perfect free market**, and other factors also affect prices, such as government regulations, government subsidies, price controls, public or private monopolies, market speculation, branding, advertising, and other market interventions.

## 1. Urban land scarcity map

[![Land scarcity](/images/landscarcity.png)](/images/landscarcity.png)

- _Note_: We use official data from the MITMA, which groups urban land price by the size of municipalities. This causes some municipalities, such as Málaga (Andalusia), Barcelona (Catalonia) or Valldemossa (Mallorca), to have a lower value than expected, since its value is diluted by being part of a bigger group.

## Methodology

For measuring urban land scarcity, we have used a weighted value based on the urban land price of municipalities provided by the [MITMA](https://www.mitma.gob.es/el-ministerio/informacion-estadistica/vivienda-y-actuaciones-urbanas/estadisticas/suelo/estadisticas-de-precios-de-suelo-urbano).

The final value is the outcome of using the _price value of the last 15 years_ and _the price value of the last 5 years_, in order to have an score that captures both its current value and its price tendency. Being the formula as follows:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Land\:weighted\:value\:=[Average\:5\:years\times2]\:-Average\:15\:years)

Data sample for clarifications:

| Region | Municipalities | Average price last 15 years | Average price last 5 years | Weighted price value |
| --- | --- | --- | --- | --- |
| Andalusia | From 1000 to 5000  inhabitants | 110.3 | 116.4 | 122.1  |
| Andalusia | From 5000 to 10000  inhabitants | 128.3 | 116.5 | 104.8 |

Even if both current prices are similar, the average of the last 5 years is of around 116 euros per square meter. The weighted value of municipalities from 1000 to 5000 inhabitants is higher because the price pressure has been going up over the last 15 years. In contrast, in municipalities from 5000 to 10000 is lower because the pressure has been going down in the same period.

## Notes

For the mathematical notations, the [Latex Math Api](https://math.vercel.app/home) developed by [@uechz](https://twitter.com/uechz) has been used. A latex editor is accessible at [TutorialsPoint.com](https://www.tutorialspoint.com/latex_equation_editor.htm).

[^1]: If the price index is in decimal form, the expression would simply be: _Nominal value / Price index_.
