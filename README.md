# Viva Piñata Task helper
## Introducción
Este proyecto nace de una pequeña idea de una jugadora de facilitarse el proceso de conseguir el 100% de Viva Piñata.

Siempre me ha apenado el hecho de que Viva Piñata es un juego que está bastante abandonado. Incluso en la wiki no tienen toda la información debido a la falta de interés e interesados dispuestos a conseguirla. Así que, en cuanto me pidieron que hiciera un task manager, se me iluminó esta idea.

## Objetivos
* Facilitar el acceso a información al jugador.
* Aumentar la cantidad y calidad de la información disponible sobre el juego.
* Ofrecer funcionalidades de registro útiles para el jugador.

## Proceso
Empecé por hacer una tabla en Supabase donde poder almacenar la información necesaria, para así usarla de API, ya que no hay una API existente de Viva Piñata (al menos, no encontré ninguna). 

Luego, me centré en crear la lógica de autenticación para el usuario. Empecé por lo más básico y fui añadiendo comprobaciones, así la funcionalidad sería lo más completa posible.

Una vez la autenticación funcionaba decentemente, pasé a la creación de perfiles. Me parecía vacío tener un usuario sin un perfil, así que me puse a crear la funcionalidad, la cual permitiría registrar un nombre de usuario, un avatar y el nombre de la granja.

Después de pelearme un rato con el perfil, pude pasar finalmente a la funcionalidad de tareas. Empecé con tres tareas básicas para no complicarme y ya luego iría añadiendo todas las que se me ocurriesen. Al haberme peleado tanto con la tabla de perfiles, la tabla de tareas se me hizo mucho más fácil y en poco tiempo tuve la base de la funcionalidad. 

Por cada paso que iba haciendo, iba creando los componentes y vistas que viera necesarias, además de ir añadiendo CSS temporal que me permitiera tener una visión más clara del resultado final.

Finalmente, solo me quedaba repasar que todo funcionase correctamente. Como siempre, se arreglaba algo y se rompía otra cosa, pero he conseguido llegar a un estado lo suficientemente óptimo para presentar el proyecto. También quise añadir unas funcionalidades extras, como el registro de logros por piñatas y el registro de emails (para hacer comprobaciones sencillas sin necesidad de entrar a back-end).

## Futuras funcionalidades

Tengo una amplia y ambiciosa visión para el futuro de este proyecto. Hay muchas funcionalidades que pienso añadir, como ahora un buscador, filtros y permitir varios registros de jardines (por si se quieren llevar más de un jardín a la vez). También pienso añadir las páginas informativas que faltan (aldeanos, plantas y semillas, objetos...), lo cual requerirá aumentar la información en Supabase de la "API" que he creado.

## Conclusión

Al presentar el proyecto, la página recién está en pañales. Le queda mucho camino por delante y pienso llevarlo hasta el final. Aun así, estoy contenta con lo que he podido hacer en este tiempo y considero que he conseguido una buena base que presentar.

## Gracias por leer <3.