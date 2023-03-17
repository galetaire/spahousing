---
title: Multivariate model
date: 2023-03-01
description:
tag: All, Price, Volume, Credit, Labor, Demography
author: Last update on
---

import Image from 'next/image'

# Multivariate model: housing overview

<div align="center">_[**Dynamic chart**](/multivariate.html)_ / _[**Static chart**](/images/multivariate.png)_</div>
<span>[![Datos del mercado inmobiliario](/images/multivariate.png)](/images/multivariate.png)</span>

- The model groups together seven variables: nominal price, real price, sales, inflation, mortgages, interest rate and employment.

# Interpretation and observations

All variables are represented as a percentage. Some clarifications to facilitate its reading:

- **Unemployment, Inflation**: average rate for the given year.
- **Real price**[^1]: percentage of difference between the nominal and the inflation rate.
- **Mortgages, Home sales, Nominal price, Interest rate (_Mibor/Euribor_)**: percentage of annual change compared to the previous year.

# Data sources

- Housing prices, from 1985 to 2006, according to Sociedad de Tasación (_Access to data is under request, but can be seen in the linked publication_): [Publication](https://www.st-tasacion.es/ext/pdf/estudios/sep19/2-Evolucion_de_Precios_de_Vivienda.pdf), [Link](https://www.st-tasacion.es/informe-de-tendencias-digital/)
- Housing prices, from 2007 onwards, according to the notaries (_Grupo 5 > Acto 501 - Compraventa inmuebles > Inmuebles en fincas urbanas, viviendas_): [Link](http://www.notariado.org/liferay/web/cien/estadisticas-al-completo)
- Home sales (_Results > Annual > Dwellings transferred by type of acquisition  > Sales_): [Link](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736171438&menu=resultados&idp=1254735576757)
- Mortgages (_Results > Annual > National results and by Autonomous Community > Mortgages constituted, over the total properties, by nature of the property > Dwellings_): [Link](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736170236&menu=resultados&idp=1254735576757#!tabs-1254736169948)
- Unemployment (_Results > Annual > Unemployed persons > Unemployment rates by sex and age group_): [Link](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736176918&menu=resultados&idp=1254735976595#!tabs-1254736195128)
- Inflation data (_Table: average inflation Spain (CPI) - by year_): [Link](https://www.inflation.eu/en/inflation-rates/spain/historic-inflation/cpi-inflation-spain.aspx)
- Population according to INE (_Results > Main series since 1971 > National results, Resident population by date, sex and age > Data used is from January 1st of the current year_): [Link](https://www.ine.es/dyngs/INEbase/en/operacion.htm?c=Estadistica_C&cid=1254736176951&menu=resultados&idp=1254735572981)
- Euribor 1-year rate averaged, from 2002 onwards (_Euribor 1-year - Historical close, average of observations through period _): [Link](https://sdw.ecb.europa.eu/quickview.do?SERIES_KEY=143.FM.M.U2.EUR.RT.MM.EURIBOR1YD_.HSTA)
- Mibor 1-year rate averaged, from 1979 to 2001 (_Cuadro 19.1 del BE - Tipo de interés. De referencia. Oficiales. Mercado hipotecario. Interbancario. Mibor a 1 año_): [Link](https://www.bde.es/webbde/es/estadis/infoest/temas/sb_tiintref.html)

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>

[^1]: For details about the methodology for real price, please see this [notes](realprice).
