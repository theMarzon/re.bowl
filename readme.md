<div align="center">
	<br />
	<p>
		<img src="https://raw.githubusercontent.com/theMarzon/re.bowl/main/assets/icon.svg" width="100" /></a>
	</p>
</div>

## About

Un objeto generico, un `Map` o un `Set` no cuentan con un algoritmo que les permitan optimizar sus entradas.

Por lo que creamos este proyecto para darle a un `Map` la capacidad de gestionar de manera mas eficiente los datos (aunque con notorias limitaciones).

## Algorithm

_Para explicar el funcionamiento del algoritmo se utilizaran las siguientes entradas:_

| Key | Value     |
|-----|-----------|
| `A` | `"Hello"` |
| `B` | `"Hello"` |
| `C` | `"World"` |

### Value Repetition

Cuando el algoritmo detecta que el valor de una entrada ya existe en el `Map`, guarda la referencia a ese valor guardado en el `Map` en vez que el valor mismo:

- Pointers:

	| Key | Hash        |
	|-----|-------------|
	| `A` | `304920493` |
	| `B` | `304920493` |
	| `C` | `100920100` |

- Containers:

	| Hash        | Value     |
	|-------------|-----------|
	| `304920493` | `"Hello"` |
	| `100920100` | `"World"` |

## Credits

Font used in the icon [here.](https://www.jetbrains.com/lp/mono)
