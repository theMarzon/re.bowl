<div align="center">
    <br />
    <p>
        <img src="https://raw.githubusercontent.com/theMarzon/re.bowl/main/assets/icon.svg" width="100" /></a>
    </p>
</div>

## Acerca de

Este es un proyecto creado para utilizar las clases `Map` como [**Cache**](https://en.wikipedia.org/wiki/Cache_(computing)) haciendo una gestión más eficiente de los datos en esta.

### Algoritmos

_Para la explicación se utilizarán las siguientes entradas:_

| Key | Value     |
|-----|-----------|
| `A` | `"Hello"` |
| `B` | `"Hello"` |
| `C` | `"World"` |
| `D` | `"Bye"`   |

La manera en la que se gestionan los datos es mediante referencias:

- Pointers:

    | Key | Reference        |
    |-----|------------------|
    | `A` | `STRING:9834436` |
    | `B` | `STRING:9834436` |
    | `C` | `STRING:8917624` |
    | `D` | `STRING:31312`   |

- Containers:

    | Reference        | Value       |
    |------------------|-------------|
    | `STRING:9834436` | `"Hello"`   |
    | `STRING:9834436` | `"Hello"`   |
    | `STRING:8917624` | `"World"`   |
    | `STRING:31312`   | `"Bye"`     |

Así, en vez de guardar el valor original todo el tiempo, se reutilizan los valores ya existentes mediante referencias (evitando valores duplicados).

## Credits

Font used in the icon [here.](https://www.jetbrains.com/lp/mono)
