import {Testimonial} from '../models/Testimoniales.js'

const guardarTestimonial = async(req,res)=>{

    //validar formulario para que no venga vacio

    const {nombre,correo,mensaje} = req.body

    const errores = []

    if(nombre.trim() === '' ){
        errores.push({mensaje: 'El nombre es obligatorio'})
    }
    
    if(correo.trim() === '' ){
        errores.push({mensaje: 'El correo es obligatorio'})
    }

    if(mensaje.trim() === '' ){
        errores.push({mensaje: 'El mensaje es obligatorio'})
    }

    //console.log(req.body);

    if (errores.length > 0){


        const testimoniales = await Testimonial.findAll()

            //muestra vista con errores
 
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        //almacenamos en la base de datos

        try {
            
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales')

        } catch (error) {
            console.log(error);
        }

    }

}


export {
    guardarTestimonial
}