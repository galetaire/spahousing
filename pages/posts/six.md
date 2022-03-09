---
title: Holistic housing market model
date: 2022-03-09
description: Data on the evolution of the housing market. The model consists of six main variables (price, inflation, home sales, credit, demographics and employment).
tag: Price, Volume, Credit, Labor, Demography
author: Galetaire
---

import Image from 'next/image'

# Holistic housing market model

![Reload chart](/images/model.png)

- **Inflation, Unemployment**: average rate for the given year.
- **Population, Mortgages, Home sales, Real price and Nominal price**: percentage of annual change compared to the previous year.

# Interpretation and observations

The model groups together the six variables that I consider essential in order to understand the housing market: price, volume, inflation, credit, demographics and employment. All the variables are represented in percentages. A couple of interpretations from the chart:

- **Observation A**: We can see how inflation has been on a decreasing trend.
- **Observation B**: We can see how between 2001 and 2008, the population increased a lot, due to an immigration wave.
- **Observation C**: We can observe that when unemployment increases, the evolution of the price of housing tends to be negative.
- **Observation D**: Between 1986 and 1990 the rise in house prices was dominated by high inflation. We know this because the price bar is completely black, this means nominal price is overlapping completely the real price.
- **Observation E**: The orange bar, real price, informs us of the de/revaluation of housing. For example, in 2012, there was a strong devaluation, and in 2017 a strong revaluation.

# Data sources

- Housing prices according to the notaries (Grupo 5, Acto 501): [Link](http://www.notariado.org/liferay/web/cien/estadisticas-al-completo)
- Housing prices according to _Sociedad de Tasación_: [Link](https://www.st-tasacion.es/informe-de-tendencias-digital/)
- Home sales: [Link](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736171438&menu=resultados&idp=1254735576757#!tabs-1254736158217)
- Mortgages: [Link](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736170236&menu=resultados&idp=1254735576757#!tabs-1254736158259)
- Labor Force Survey: [Link](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736176918&menu=ultiDatos&idp=1254735976595)
- Inflation data: [Link](https://www.inflation.eu/en/inflation-rates/spain/historic-inflation/cpi-inflation-spain.aspx)
- Population and projections according to _INE_: [Link](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736176953&menu=resultados&idp=1254735572981)
