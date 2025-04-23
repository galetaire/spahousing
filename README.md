# Description

The market monitored on this website is the Spanish real estate market.

# About the database

Even so I try to be cautious and avoid mistakes, errors can occur, so I encourage the review and verification of the database. If encountered any, the creation of ``Issues`` and ``Pull requests`` for the database are welcome, you can also reach me through various channels.

The database can be found in [spahousing/public/docs/](https://github.com/galetaire/spahousing/tree/main/public/docs), presented in two different file formats.
  - [spain_stats_ods.ods](https://github.com/galetaire/spahousing/blob/main/public/docs/spain_stats_ods.ods)
  - [spain_stats_csv.csv](https://github.com/galetaire/spahousing/blob/main/public/docs/spain_stats_csv.csv)

Full review and modification is better to be done in ``.ods``, since some indicators are originated from other internal indicators, and the formulas can only be seen and edited in the mentioned format. Alternatively, formulas and variable names can be consulted at the ``metadata.json`` file.

- [Metadata.json](https://github.com/galetaire/spahousing/raw/main/public/docs/metadata.json)

If you are creating data visualizations with ``D3js`` or ``chartjs`` you can import the ``.csv`` file from the repository using the import option from the ``D3js`` library, like this:

```
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
```

# Contact

You can reach me alternatively through X: [@HousingSpanish](https://x.com/HousingSpanish).

# License

All the self-made content is released under the terms of the _Creative Commons Attribution-ShareAlike 4.0 International Public License_. Consider that there is a lot of public domain data, and you do not have to comply with the license for elements of the material in the public domain.

Shield: [![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

This work is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg
