---
title: Stock development
date: 2023-12-01
description:
tag: All, Volume
author: Last update on
---

import Image from 'next/image'

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>

# Stock development

[![Número de viviendas](/images/stockyearly.png)](/images/stockyearly.png)

- **Number of dwellings**: new homes built annually since 1971.
  - **Left axis (bars)**: total number of new dwellings per year.
  - **Right axis (line)**: number of inhabitants per dwelling.

[![Estoc y balance de viviendas](/images/stockbalance.png)](/images/stockbalance.png)

- **Housing surplus or deficit**: difference between housing growth and population growth. Blue color implies housing surplus; green color implies housing deficit.

[![Tipo de vivienda](/images/typehouse.png)](/images/typehouse.png)

- **Distribution of new houses build per type (in %)**: Single-Family or Condominiums.

[![Viviendas por persona](/images/houseperson.png)](/images/houseperson.png)

| Color | Label | Number of inhabitants per dwelling |
| --------- | ------- | ------|
| 🟦 | No scarcity | There is one house for each 0.06 - 0.99 person |
| 🟩 | Low scarcity | There is one house for each 1.00 - 1.99 people |
| 🟨 | Medium scarcity | There is one house for each 2.00 - 2.49 people |
| 🟥 | High scarcity | There is one house for each 2.50 - 3.48 people |

[![Antiguedad de las viviendas](/images/stockperiods.png)](/images/stockperiods.png)

- **Construction period**: number of today existing dwellings per period of construction. The **red bar** is a final estimate based on the current pace of construction. If the pace remains as 2021 (95.000 per year), the number of houses built between 2021 and 2040 will be of ≈1.800.000.

[![Consumo de cemento](/images/cement.png)](/images/cement.png)

- **Cement consumption**, Spain.
  - **Left axis (bars)**: cement consumption per year, in metric tons.
  - **Right axis (line)**: real housing price[1] in euros per square meter.

# Interpretation and observations

The evolution of the housing stock is a key factor in the supply balance. A couple of observations from the previous charts:

- **Observation A**: the number of houses built per year dropped drastically in 2009.
- **Observation B**: houses per inhabitant increased from 1971 to 2000.
- **Observation C**: most of the current Spain houses were built between 1961 and 1980.
- **Observation D**: the stock has experienced a couple of deficit years since 2017.
- **Observation E**: the cement consumption and the real price correlate positively.

# Data sources

- Housing stock, from 1971 to 2000, according to Atlas Digital de las Áreas Urbanas (_Parque de Viviendas > Viviendas según tipo > Viviendas familiares > Select from available years 1970, 1981, 1991, 2001, 2011 > Tabla and Sintesis_): [Link](https://atlasau.mitma.gob.es/#c=indicator&view=map1). Based on the data from 1970, 1981 and 1991, the remaining years gaps have been estimated, in a similar way as done by Banco de España (_Observatorio de Vivienda y Suelo > Boletines periódicos > Boletín Anual 2021 > Tabla 8.1_): [Link](https://www.mitma.gob.es/arquitectura-vivienda-y-suelo/urbanismo-y-politica-de-suelo/estudios-y-publicaciones/observatorio-de-vivienda-y-suelo)
- Housing stock, from 2001 onwards (_Total de viviendas por comunidades autónomas y provincias_): [Link](https://apps.fomento.gob.es/BoletinOnline2/?nivel=2&orden=33000000)
- Buildings per period of construction (_Nacional> Viviendas > Número de viviendas principales según tipo de edificación y año de construcción_): [Link](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736176952&menu=resultados&idp=1254735572981)
- Apparent cement consumption (_Housing prices from 1964 to 1984 have been extrapolated based in this variable_): [Link](https://tematicas.org/sintesis-economica/indicadores-de-produccion-y-demanda-nacional/consumo-aparente-de-cemento/)
- Housing prices, from 1985 to 2006, according to Sociedad de Tasación (_Access to data is under request, but can be seen in the linked publication_): [Publication](https://www.st-tasacion.es/ext/pdf/estudios/sep19/2-Evolucion_de_Precios_de_Vivienda.pdf), [Link](https://www.st-tasacion.es/informe-de-tendencias-digital/)
- Housing prices, from 2007 onwards, according to the notaries (_Grupo 5 > Acto 501 - Compraventa inmuebles > Inmuebles en fincas urbanas, viviendas_): [Link](http://www.notariado.org/liferay/web/cien/estadisticas-al-completo)
- Inflation data (_Table: average inflation Spain (CPI) - by year_): [Link](https://www.inflation.eu/en/inflation-rates/spain/historic-inflation/cpi-inflation-spain.aspx)
- Average number of persons per household (_Proyección del número medio de personas por hogar en España hasta 2037_): [Link](https://www.epdata.es/proyeccion-numero-medio-personas-hogar-espana-2035/de078c7c-473a-4ade-bc1e-668b2a9677ae)
- Censo de viviendas 2021 (_Crear tablas > Municipios > Todos los municipios > Viviendas familiares_):[Link](https://www.ine.es/Censo2021/Inicio.do)

<div class="meta-line"><a class="meta-back" href="/">← Back to home page</a></div>

[1] The real price represented is the _Real value overrated_. For details about the methodology, please see this [notes](realprice).
