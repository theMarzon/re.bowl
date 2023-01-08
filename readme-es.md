<div align="center">
    <br />
    <p>
        <img src="https://raw.githubusercontent.com/theMarzon/re.bowl/main/assets/icon.svg" width="100" /></a>
    </p>
</div>

## Acerca de

Este es un proyecto creado para la utilización de clases `Map` como [**Cache**](https://en.wikipedia.org/wiki/Cache_(computing)) haciendo una gestión más eficiente de esta.

### Algoritmo

> Para la explicación se utilizarán las siguientes entradas:
>
> | Llave | Valor     |
> |-------|-----------|
> | `A`   | `"Hola"`  |
> | `B`   | `"Hola"`  |
> | `C`   | `"Hola"`  |
> | `D`   | `"Mundo"` |
> | `E`   | `"Mundo"` |
> | `F`   | `"Adiós"` |

Se crea (si no existe) un contenedor en el cual se almacenara el valor de la entrada, el nombre de este será un [**Hash**](https://en.wikipedia.org/wiki/Hash_function) generado mediante el valor de la entrada.

> Sin embargo el algoritmo que genera los [**Hashes**](https://en.wikipedia.org/wiki/Hash_function) esta limitado a `2 ^ 53 - 1` entradas por tipo (Incluso puede dar errores si los datos son demasiado grandes).

Una vez creado el contenedor se crea un puntero en el cual se almacenara el nombre del contenedor anteriormente creado, el nombre de este será la llave de la entrada.

- Punteros:

    | Llave | Referencia       |
    |-------|------------------|
    | `A`   | `STRING:9834436` |
    | `B`   | `STRING:9834436` |
    | `C`   | `STRING:9834436` |
    | `D`   | `STRING:8917624` |
    | `E`   | `STRING:8917624` |
    | `F`   | `STRING:31312`   |

- Contenedores:

    | Referencia       | Valor     |
    |------------------|-----------|
    | `STRING:9834436` | `"Hola"`  |
    | `STRING:8917624` | `"Mundo"` |
    | `STRING:31312`   | `"Adiós"` |

Así evitando las entradas duplicadas.

## Créditos

La fuente utilizada en el icono está [aquí.](https://www.jetbrains.com/lp/mono)
