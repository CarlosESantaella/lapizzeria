import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps,
         RichText,
         ColorPalette,
         BlockControls,
         AlignmentToolbar,
         MediaUpload,
         InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, IconButton } from '@wordpress/components';

//icono
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/contenedor', {
    apiVersion: 2,
    title: 'La Pizzeria Contenedor',
    icon: { src: Logo },
    category: 'lapizzeria',
    attributes: {
        imagenFondo:{
            type: 'string',
            selector: '.bloque-contenedor'
        }
    },
    edit: (props) => {

        //extraer valores props
        const { attributes: { imagenFondo }, setAttributes } = props;

        const blockProps = useBlockProps();

        const onSeleccionarNuevaImagen = nuevaImagen => {
            setAttributes({ imagenFondo: nuevaImagen.sizes.full.url });
        }

        return(
            <div {...blockProps}>
                <div className="bloque-contenedor" style={{ backgroundImage: `url(${imagenFondo})` }}>
                    <div className="contenido-bloque">
                        <div className="imagen-fondo">
                            <MediaUpload
                                onSelect={onSeleccionarNuevaImagen}
                                type="imagen"
                                render={({open}) => (
                                    <IconButton
                                        className="lapizzeria-agregar-imagen"
                                        onClick={open}
                                        icon="format-image"
                                        showTooltip="true"
                                        label="Agregar/Cambiar Imagen"
                                    />
                                )}
                            />
                        </div>
                        <div className="bloques-internos">
                            <InnerBlocks />
                            {/* TODO: bloques internos */}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    save: (props) => {

        const { attributes: { imagenFondo }} = props;

        return(
            <>
                <div className="bloque-contenedor" style={{ backgroundImage: `url(${imagenFondo})` }}>
                    <div className="contenido-bloque">
                        <div className="imagen-fondo">

                        </div>
                        <div className="bloques-internos">
                            <InnerBlocks.Content />
                            {/* TODO: bloques internos */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
});