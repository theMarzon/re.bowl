<div align="center">
    <br />
    <p>
        <img src="https://raw.githubusercontent.com/theMarzon/re.bowl/main/assets/icon.svg" width="100" /></a>
    </p>
</div>

## About

This is a project created for the use of `Map` classes as [**Cache**](https://en.wikipedia.org/wiki/Cache_(computing)) making a more efficient management of it.

### Algorithm

> The following entries will be used for the explanation:
>
> | Key | Value     |
> |-----|-----------|
> | `A` | `"Hello"` |
> | `B` | `"Hello"` |
> | `C` | `"Hello"` |
> | `D` | `"World"` |
> | `E` | `"World"` |
> | `F` | `"Bye"`   |

A container is created (if it does not exist) in which the value of the input will be stored, the name of which will be a [**Hash**](https://en.wikipedia.org/wiki/Hash_function) generated using the value of the input.

> However, the algorithm that generates the [**Hashes**](https://en.wikipedia.org/wiki/Hash_function) is limited to `2 ^ 53 - 1` entries per type (and may even give errors if the data is too large).

Once the container is created, a pointer is created in which the name of the previously created container will be stored, the name of this container will be the key of the entry.

- Pointers:

    | Key | Reference        |
    |-----|------------------|
    | `A` | `STRING:9834436` |
    | `B` | `STRING:9834436` |
    | `C` | `STRING:9834436` |
    | `D` | `STRING:8917624` |
    | `E` | `STRING:8917624` |
    | `F` | `STRING:31312`   |

- Containers:

    | Reference        | Value     |
    |------------------|-----------|
    | `STRING:9834436` | `"Hello"` |
    | `STRING:8917624` | `"World"` |
    | `STRING:31312`   | `"Bye"`   |

Duplicate entries are thus avoided.

## Credits

Font used in the icon is [here.](https://www.jetbrains.com/lp/mono)
