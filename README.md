## API REST Tienda online
Proyecto del curso de backend con nodejs  
Para levantar el contenedor que contiene postgres, 
usar el comando:   
`
  docker-compose up -d nameService
`   
Para mostrar los contenedores levantados, usar:  
`
  docker-compose ps
`  
Para bajar un contenedor, usar:  
`
  docker-compose down
`  
Una forma de conectarse al contenedor después 
de levantar es usar:  
`
  docker-compose exec postgres bash
`  
Para conectarte a mysql dentro del contenedor, usar  
`
  psql -h localhost -d my_store -U userName
`
Para saber si tienes alguna tabla dentro de la base de datos en postgres, usar  
`
  \d+
`  
Para salir de la base de datos, usar:  
`
  \q
`  
Para salir del contenedor, usar:  
`
  exit
`



