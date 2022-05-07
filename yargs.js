// 1. El servidor debe ser levantado por instrucción de una aplicación Node que use el
//paquete Yargs para capturar los argumentos en la línea de comando. Se deberá
//ejecutar el comando para levantar el servidor solo si el valor de la propiedad “key” es la correcta (123).
const yargs = require('yargs')
// Paso 1
const child = require('child_process')// para realizar llamado a la terminal de distintos docs del servidor creado
// Paso 2
const key = '123'
const argv = yargs
    .command(
        // Paso 3
        'login',
        // Paso 4 node yargs.js login -p=123
        'Comando para acceder al cambio de imagen',
        {
            // Paso 5
            key: {
                describe: 'Contraseña',
                demand: true,
                alias: 'p',
            }
        },
        (args) => {//metodo callback
            // Paso 6
            if (args.key == key) {
                child.exec('node index.js', (err, stdout) => {//stdout verifica el comando
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(stdout)
                    }
                })
            } else {
                console.log('Credenciales incorrectas')
            }
        }
    )
    .help().argv