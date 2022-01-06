---
title: Holistic housing market model
date: 2021-10-01
description: Data on the evolution of the housing market. The model consists of six main variables (price, inflation, home sales, credit, demographics and employment).
tag: Price, Volume, Credit, Labor, Demography
author: Galetaire
---

import Image from 'next/image'

# Holistic housing model, Spain

![Reload chart](/images/model.png)

- **Inflation, Unemployment**: average rate for any given year.
- **Population, Mortgages, Home sales, Real price and Nominal price**: annual percentage change compared to the previous one.

# Interpretation and observations

The model groups together the six variables that I consider essential in order to understand the housing market: price, volume, inflation, credit, demographics and employment. All the variables are represented in percentages. A couple of interpretations from the chart:

- **Observation A**: We can see how inflation has been decreasing. In 1989 it was above 5%, and in 2020 it was negative (the red area is below 0%).
- **Observation B**: We can see how the population has been decreasing on a yearly basis since 2010. On the other hand, between 2002 and 2006, the population increased a lot, due to an immigration wave.
- **Observation C**: We can observe that when unemployment increases, the evolution of the price of housing tends to be negative, both taking into account inflation (+i) and not (-i).
- **Observation D**: It is interesting to note how between 1986 and 1990 the rise in house prices was dominated by high inflation. We know this because the price bar is completely black, price (+i) is overlapping completely the price (-i).
- **Observation E**: The orange bar, price (-i), informs us of the de/revaluation of housing. For example, in 2013, there was a strong devaluation, and in 2017 a strong revaluation.

# Data sources

- Housing prices according to the notaries (Grupo 5, Acto 501): [Link](http://www.notariado.org/liferay/web/cien/estadisticas-al-completo)
- Housing prices according to _Sociedad de Tasación_: [Link](https://www.st-tasacion.es/informe-de-tendencias-digital/)
- Home sales: [Link](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736171438&menu=resultados&idp=1254735576757#!tabs-1254736158217)
- Mortgages: [Link](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736170236&menu=resultados&idp=1254735576757#!tabs-1254736158259)
- Labor Force Survey: [Link](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736176918&menu=ultiDatos&idp=1254735976595)
- Inflation data: [Link](https://www.inflation.eu/en/inflation-rates/spain/historic-inflation/cpi-inflation-spain.aspx)
- Population and projections according to _INE_: [Link](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736176953&menu=resultados&idp=1254735572981)
