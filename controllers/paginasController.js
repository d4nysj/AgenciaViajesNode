import {Viaje} from '../models/Viaje.js'
import {Testimonial} from '../models/Testimoniales.js'


const paginaInicio = async(req,res)=>{


    const DB = []
    DB.push(Viaje.findAll({limit:3}))
    DB.push(Testimonial.findAll({limit:3}))


   
   try {

    const resultado = await Promise.all(DB)

   
    res.render('inicio',{
        pagina: "Inicio",
        clase: 'home',
        viajes: resultado[0],
        testimoniales: resultado[1]
    })

   } catch (error) {
    console.log(error);
   }


}

    
    
const paginaNosotros = (req,res)=>{res.render('nosotros',{pagina:"Nosotros"})}
const paginaViajes = async (req,res)=>{
    //consultar base de datos primero 

    const viajes = await Viaje.findAll() 
    res.render('viajes', {
        pagina:'Próximos viajes',
        viajes
    })
}


// muestra un viaje por su slug

const paginaDetalleViaje = async(req,res)=>{
 
    const {slug}= req.params;

    try {
        
        const resultado = await Viaje.findOne({ where : { slug }})


        
        //console.log(resultado.titulo);
        res.render('viaje', {
            pagina:'Detalle Viaje',
            resultado
        })
    } catch (error) {
        console.log(error);
    }

}



const paginaTestimoniales = async (req,res)=>{
    
    try {
        
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina:'Testimoniales',
            testimoniales
        })

    } catch (error) {
        console.log(error);
    }
}


export {
    paginaInicio,paginaNosotros,paginaViajes,paginaTestimoniales,paginaDetalleViaje
}
