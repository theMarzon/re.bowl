<div align="center">
	<br />
	<p>
		<img src="https://raw.githubusercontent.com/theMarzon/re.bowl/main/assets/icon.svg" width="100" /></a>
	</p>
</div>

## About

Este proyecto fue creado para crear objetos `Cache` de forma optima.

Los objetos genericos guardan la informacion de la siguiente manera:

| Key   | Value     |
|-------|-----------|
| `A`   | `"Hello"` |
| `B`   | `"Hello"` |
| `C`   | `"World"` |

Pero este proyecto los guarda con el uso de referencias:

- Pointers:

	| Key   | Hash	   |
	|-------|----------|
	| `A`   | 39238943 |
	| `B`   | 39238943 |
	| `C`   | 43898490 |

- Containers:

	| Hash	   | Value     |
	|----------|-----------|
	| 39238943 | `"Hello"` |
	| 39238943 | `"Hello"` |
	| 43898490 | `"World"` |

## Credits

Font used in the icon [here.](https://www.jetbrains.com/lp/mono)
