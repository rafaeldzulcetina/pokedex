

# Vue JS - Diferencias entre Computed y Watch

Ambos parecen hacer lo mismo, ¿cierto? 🤔. Sin embargo, una propiedad computada puede ser mejor que un watch en algunos casos o viceversa.

### Computed

Podemos pensar en una propiedad computada como una propiedad (como las que retornamos en el data), pero con la diferencia de que Vue puede evaluar automáticamente su valor cada vez que una de sus dependencias cambia. Ej.:

```js
export default {
  computed: {
    total() {
      return this.precio * this.cantidad;
    }
  }
}
```
_El valor de la propiedad total será calculado cada vez que cambie el precio o la cantidad_

### Watch

Un watcher es básicamente una función que se ejecuta automáticamente cuando la propiedad observada cambia. Si tomamos el ejemplo anterior, podríamos hacerlo de la siguiente forma con watchers:

```js
export default {
  watch: {
    cantidad(val) {
      this.total = this.precio * val;
    },
    precio(val) {
      this.total = this.cantidad * val;
    }
  }
}
```

El resultado final es el mismo, pero la solución con watchers es repetitiva. Si el valor de la propiedad total también dependiera del impuesto, tendríamos que observar una tercera propiedad. Esta es la principal razón por la que es mejor idea utilizar una propiedad computada.

Si bien las propiedades computadas son más apropiadas en la mayoría de los casos, los watchers son más poderosos y nos permiten realizar operaciones complejas como llamadas http o ejecutar alguna lógica asíncrona que no sería posible con una propiedad computada.

Supongamos que queremos obtener las películas en donde actuó un determinado actor. Podríamos hacerlo de la siguiente forma:

````js
export default {
  data() {
    return {
      actorId: null,
      movies: [],
    };
  },
  methods: {
    getMovies() {
      // http request
      axios.get(`movies/actor/${this.actorId}`)
      .then(resp => {
        this.movies = resp.data;
      });
    }
  },
  watch: {
    actorId(val) {
      if(val) this.getMovies();
    }
  }
}
````
_Observamos la propiedad actorId para que siempre que cambie de valor, llamemos una API que nos devolverá las películas relacionadas al actor._


#### Conclusión

Es mejor idea pensar en una propiedad computada siempre que necesitemos calcular un valor en función a otras propiedades, teniendo en cuenta que Vue volverá a evaluar la propiedad cada vez que alguna de sus dependencias cambie y no necesitaremos un watch personalizado por cada dependencia. Pero un watch sería mejor si en cambio necesitamos realizar algo más complejo como llamadas http, configurar un timer o guardar datos en el local storage.

___
#### [Regresar al repo](https://github.com/rafaelcetina/pokedex)
