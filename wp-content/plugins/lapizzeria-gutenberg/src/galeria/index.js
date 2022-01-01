import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, useBlockProps } from '@wordpress/block-editor';
import { IconButton } from '@wordpress/components';

//logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';


registerBlockType('lapizzeria/galeria', {
    title: 'La Pizzeria Galeria',
    icon: { src: Logo },
    category: 'lapizzeria',
    attributes: {
        imagenes: {
            type: 'array'
        }
    },
    example: {},
    edit: props => {
        //extraer valores
        const { attributes: { imagenes = [] }, setAttributes } = props;

        console.log(imagenes);

        const borrarImagen = (imagenIndex) => {
            const nuevasImagenes = imagenes.filter((imagen,index) => index !== imagenIndex);
            setAttributes({imagenes: nuevasImagenes});
        }

        const onSeleccionarNuevaImagen = nuevaImagen => {
            const imagen = {
                thumb: nuevaImagen.sizes.medium.url,
                full: nuevaImagen.sizes.full.url,
                id: nuevaImagen.id
            }
            
            setAttributes({ imagenes: [...imagenes, imagen] })
        }

        const blockProps = useBlockProps();

        return(
            <div {...blockProps}>
                <div className="galeria-pizzeria" >
                    <MediaUpload
                        onSelect={onSeleccionarNuevaImagen}
                        type="image"
                        render={({open}) => (
                            <IconButton
                                className="lapizzeria-agregar-imagen"
                                onClick={open}
                                icon="format-image"
                                showToolTip="true"
                                label="Cambiar imagen"
                            />
                        )}
                    />
                    <h2 clasName="texto-primario">Galería</h2>
                    <ul className="listado-imagenes">
                        {imagenes.map((imagen,index) => (
                            <li className="imagen">
                                <div 
                                    className="borrar-imagen"
                                    onClick={() => borrarImagen(index)}>
                                        <span className="dashicons dashicons-trash"></span>

                                </div>
                                <img src={imagen.thumb} alt="" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
        
        );
    },
    save: props => {
        const { attributes: {imagenes = [] }} = props;

        if(imagenes.length === 0){
            return(
                <p>No hay imagenes</p>
            );
        }

        return(
            <>
                <div className="galeria-pizzeria">
                    <h2 clasName="texto-primario">Galería</h2>
                    <ul className="listado-imagenes">
                        {imagenes.map(imagen => (
                            <li className="imagen">
                                <a href={imagen.full} data-lightbox="galeria">
                                    <img src={imagen.thumb} alt="" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
})