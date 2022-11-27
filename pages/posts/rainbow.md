---
title: Housing cycles
date: 2022-11-01
description:
tag: Price, Demography
author: Last update on
---

import Image from 'next/image'

# Rainbow model: housing cycles

[![Ciclos inmobiliarios](/images/rainbow.png)](/images/rainbow.png)

- **Color range interpretation** ➞ **Red** = strong overprice; **Orange** = slightly overprice; **Yellow** = neutral; **Green** = slightly underprice; **Blue** = strong underprice.

# Interpretation and observations

```
This is an experimental indicator, open to improvements and corrections.
Must be read as an informative indicator, not a scientific measure.
```

The rainbow curve describes a demographic channel, which, overlapped with the real price, evaluates the stage of the price cycle. A few notes and considerations:

- The real price data is derived from an alternative formula, [real price notes](realprice).
- The demographic curve has been price-adjusted, generating the rainbow curve.
- The equation from the rainbow curve is derived from the demographic curve (quadratic function).
- The yellow line is the reference line, adding two levels up and two levels down.

Equations chart:

[![Reload chart](/images/rainbowsource.png)](/images/rainbowsource.png)

Full dataset chart, from 1964 to 2070:

[![Reload chart](/images/rainbowmax.png)](/images/rainbowmax.png)

# Data sources

- Housing prices, from 1964 to 1984, have been extrapolated using the apparent cement consumption: [Link](https://tematicas.org/sintesis-economica/indicadores-de-produccion-y-demanda-nacional/consumo-aparente-de-cemento/)
- Housing prices, from 1985 to 2006, according to Sociedad de Tasación (_Access to data is under request, but can be seen in the linked publication_): [Publication](https://www.st-tasacion.es/ext/pdf/estudios/sep19/2-Evolucion_de_Precios_de_Vivienda.pdf), [Link](https://www.st-tasacion.es/informe-de-tendencias-digital/)
- Housing prices, from 2007 onwards, according to the notaries (_Grupo 5 > Acto 501 - Compraventa inmuebles > Inmuebles en fincas urbanas, viviendas_): [Link](http://www.notariado.org/liferay/web/cien/estadisticas-al-completo)
- Inflation data (_Table: average inflation Spain (CPI) - by year_): [Link](https://www.inflation.eu/en/inflation-rates/spain/historic-inflation/cpi-inflation-spain.aspx)
- Population and projections according to INE (_range of used population was that between 25 and 50 years old_): [Population consolidated](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736176951&menu=resultados&idp=1254735572981), [Population projection](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736176953&menu=resultados&idp=1254735572981)

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>
