---
title: Urban land price index
date:
description:
tag: All, Price
author: Explanatory notes about the index
---

import Image from 'next/image'

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>

# Measuring urban land price

[![Land price](/images/landprice2.png)](/images/landprice2.png)

| Color | Label | Range
| --------- | ------- | ------|
| 🟥 | No scarcity | One square meter costs up to 69 euros |
| 🟨 | Low scarcity | One square meter costs from 70 to 108 euros |
| 🟩 | Medium scarcity | One square meter costs from 109 to 177 euros |
| 🟦 | High scarcity | One square meter costs from 178 euros up to 770 euros |

## Methodology

For measuring urban land price, we have used a weighted value based on the urban land price of municipalities provided by the [MITMA](https://www.mitma.gob.es/el-ministerio/informacion-estadistica/vivienda-y-actuaciones-urbanas/estadisticas/suelo/estadisticas-de-precios-de-suelo-urbano).

The final value is the outcome of using the _average price of the last 15 years_ and the _average price of the last 5 years_, in order to have a value that captures both its current price and its price tendency. Being the formula as follows:

![Equation](https://math.vercel.app/?bgcolor=auto&from=Land%5C%3Aweighted%5C%3Avalue%5C%3A%3D%5BAverage%5C%3A5%5C%3Ayears%5Ctimes2%5D%5C%3A-Average%5C%3A15%5C%3Ayears.svg)

Data sample for better understanding:

| Spanish region | Municipalities by inhabitants | Average price last 15 years | Average price last 5 years | Weighted price value |
| --- | --- | --- | --- | --- |
| Andalusia | From 1000 to 5000 | 110.3 | 116.4 | 122.1  |
| Andalusia | From 5000 to 10000 | 128.3 | 116.5 | 104.8 |

**Commentary for the data sample**: Even if both prices are similar (around 116 euros per square meter). The weighted value for municipalities from 1000 to 5000 is higher because the price pressure went upward over the last 15 years. In contrast, municipalities from 5000 to 10000 is lower because the pressure went downward.

The data provided by the MITMA groups urban land price by the size of municipalities. This causes some municipalities, such as Málaga (Andalusia), Barcelona (Catalonia) or Valldemossa (Mallorca), to have a lower value than expected. In order to tame this issue, we have used the average net income per person as corrector.

The corrector relies on the average income per person from each municipality, which is divided by the national average income per person (12.982 euros per year).

![Equation](https://math.vercel.app/?bgcolor=auto&from=Income%5C%3Acorrector%3D%5Cfrac%7BAverage%5C%3Aincome%5C%3Aper%5C%3Aperson%5C%3A%28municipality%29%7D%7BAverage%5C%3Aincome%5C%3Aper%5C%3Aperson%5C%3A%28spain%29%7D.svg)

The result is then used as a multiplier. Data sample for better understanding:

| Municipality | Weighted price value | Income corrector | Land price value |
| --- | --- | --- | --- |
| Barcelona | 233 | 1.35 | 314.6  |
| Sant Antoni de Portmany | 339 | 0.98 | 332.2 |

The Land price value is the one represented on the map.

* Download full dataset: [Land value](https://github.com/galetaire/spahousing/raw/main/public/docs/landvalue.XLS)

## Notes on the use of urban land price as an scarcity index

In a market where supply and demand interact freely, **prices tend to reflect the relative scarcity of goods**. When a good is scarce and in high demand, its price is likely to increase. Conversely, if a good is abundant or there is low demand for it, the price may decrease. Based on this principle, we could use **the price as a measure to approximate urban land scarcity**.

It is important to note that **price should not be seen as a perfect information, since we do not live in a perfect free market**, and other factors also affect prices, such as government regulations, government subsidies, price controls, money creation, public or private monopolies, market speculation, branding, advertising, and other market interventions.

## Other notes

For the mathematical notations, the [Latex Math Api](https://math.vercel.app/home) developed by [@uechz](https://twitter.com/uechz) has been used. A latex editor is accessible at [TutorialsPoint.com](https://www.tutorialspoint.com/latex_equation_editor.htm).

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>
