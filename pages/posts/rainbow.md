---
title: Housing market cycle indicator
date: 2021-06-01
description: Model to predict real-estate cycles. Showing data on the evolution of housing prices (inflation-adjusted), crossed with the demographic curve (rainbow).
tag: Price, Demography
author: Galetaire
---

import Image from 'next/image'

# Housing market cycle indicator: the rainbow model, Catalonia

![Reload chart](/images/rainbow.png)

- **Real value cycle** ➞ **Red** = strong overprice; **Orange** = slightly overprice; **Yellow** = neutral; **Green** = slightly underprice; **Blue** = strong underprice.

# Interpretation and observations

The rainbow curve describes a demographic channel in order to evaluate bull or bear market conditions in the price of housing. The equation, derived from the demographic curve (quadratic polynomial), has been price-adjusted. This is an experimental indicator, open to improvements and corrections.

Equations chart:

![Reload chart](/images/rainbowsource.png)

Full dataset chart, from 1964 to 2060:

![Reload chart](/images/rainbowmax.png)

# Data sources

- Housing prices according to the notaries (Grupo 5, Acto 501): [Link](http://www.notariado.org/liferay/web/cien/estadisticas-al-completo)
- Housing prices according to _Sociedad de Tasación_: [Link](https://www.st-tasacion.es/informe-de-tendencias-digital/)
- Inflation data: [Link](https://www.inflation.eu/en/inflation-rates/spain/historic-inflation/cpi-inflation-spain.aspx)
- Apparent cement consumption: [Link](https://tematicas.org/sintesis-economica/indicadores-de-produccion-y-demanda-nacional/consumo-aparente-de-cemento/)
- Population and projections according to _INE_: [Link](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736176953&menu=resultados&idp=1254735572981)
