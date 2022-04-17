---
title: Housing cycles
date: 2022-03-09
description: Model to predict real-estate cycles. Showing data on the evolution of housing prices (inflation-adjusted), crossed with the demographic curve (rainbow).
tag: Price, Demography
author: Galetaire
---

import Image from 'next/image'

# The rainbow model, cycle indicator

![Ciclos inmobiliarios](/images/rainbow.png)

- **Color range interpretation** ➞ **Red** = strong overprice; **Orange** = slightly overprice; **Yellow** = neutral; **Green** = slightly underprice; **Blue** = strong underprice.

# Interpretation and observations

```
This is an experimental indicator, open to improvements and corrections.
Must be read as an informative indicator, not a scientific measure.
```

The rainbow curve describes a demographic channel, which, overlapped with the real price, evaluates the stage of the price cycle. A few notes and considerations:

- The real price data is unaltered.
- The demographic curve has been price-adjusted, generating the rainbow curve.
- The equation from the rainbow curve is derived from the demographic curve (quadratic function).
- The yellow line is the reference line, adding two levels up and two levels down.

Equations chart:

![Reload chart](/images/rainbowsource.png)

Full dataset chart, from 1964 to 2070:

![Reload chart](/images/rainbowmax.png)

# Data sources

- Housing prices according to the notaries (Grupo 5, Acto 501): [Link](http://www.notariado.org/liferay/web/cien/estadisticas-al-completo)
- Housing prices according to _Sociedad de Tasación_: [Link](https://www.st-tasacion.es/informe-de-tendencias-digital/)
- Inflation data: [Link](https://www.inflation.eu/en/inflation-rates/spain/historic-inflation/cpi-inflation-spain.aspx)
- Apparent cement consumption: [Link](https://tematicas.org/sintesis-economica/indicadores-de-produccion-y-demanda-nacional/consumo-aparente-de-cemento/)
- Population and projections according to _INE_: [Link](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736176953&menu=resultados&idp=1254735572981)
