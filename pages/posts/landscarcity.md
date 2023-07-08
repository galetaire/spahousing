---
title: Urban land scarcity index
date:
description:
tag: All, Price
author: See the notes at the end for clarifications
---

import Image from 'next/image'

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>

# Measuring urban land scarcity

[![Land scarcity](/images/landscarcity.png)](/images/landscarcity.png)

**Note**: The data used is the official data from the MITMA, which groups urban land price by the size of municipalities. This causes some municipalities, such as Málaga (Andalusia), Barcelona (Catalonia) or Valldemossa (Mallorca), to have a lower value than expected.

## Methodology

For measuring urban land scarcity, we have used a weighted value based on the urban land price of municipalities provided by the [MITMA](https://www.mitma.gob.es/el-ministerio/informacion-estadistica/vivienda-y-actuaciones-urbanas/estadisticas/suelo/estadisticas-de-precios-de-suelo-urbano).

The final value is the outcome of using the _average price of the last 15 years_ and the _average price of the last 5 years_, in order to have a value that captures both its current price and its price tendency. Being the formula as follows:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Land\:weighted\:value\:=[Average\:5\:years\times2]\:-Average\:15\:years)

Data sample for better understanding:

| Spanish region | Municipalities by inhabitants | Average price last 15 years | Average price last 5 years | Weighted price value |
| --- | --- | --- | --- | --- |
| Andalusia | From 1000 to 5000 | 110.3 | 116.4 | 122.1  |
| Andalusia | From 5000 to 10000 | 128.3 | 116.5 | 104.8 |

**Commentary for the data sample**: Even if both prices are similar (around 116 euros per square meter). The weighted value for municipalities from 1000 to 5000 is higher because the price pressure went upward over the last 15 years. In contrast, municipalities from 5000 to 10000 is lower because the pressure went downward.

* Download full dataset: [Land value](https://github.com/galetaire/spahousing/raw/main/public/docs/landvalue.XLS)

## Notes on the approach to measure urban land scarcity

In a market where supply and demand interact freely, **prices tend to reflect the relative scarcity of goods**. When a good is scarce and in high demand, its price is likely to increase. Conversely, if a good is abundant or there is low demand for it, the price may decrease. Based on this principle, we have used **the price as a measure to approximate urban land scarcity**.

It is important to note that **price should not be seen as a perfect information, since we do not live in a perfect free market**, and other factors also affect prices, such as government regulations, government subsidies, price controls, money creation, public or private monopolies, market speculation, branding, advertising, and other market interventions.

## Other notes

For the mathematical notations, the [Latex Math Api](https://math.vercel.app/home) developed by [@uechz](https://twitter.com/uechz) has been used. A latex editor is accessible at [TutorialsPoint.com](https://www.tutorialspoint.com/latex_equation_editor.htm).

[^1]: If the price index is in decimal form, the expression would simply be: _Nominal value / Price index_.
