import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, 
         RichText,
         MediaUpload,
         URLInputButton,
         BlockControls,
         AlignmentToolbar } from '@wordpress/block-editor';
import { IconButton } from '@wordpress/components';


//icono
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/textoimagen', {
    apiVersion: 2,
    title: 'La Pizzeria Texto Imagen',
    icon: { src: Logo},
    category: 'lapizzeria',
    attributes: {
        headingBox: {
            type: 'string',
            source: 'html',
            selector: '.texto-ingredientes h1'
        },
        paragraphBox: {
            type: 'string',
            source: 'html',
            selector: '.texto-ingredientes p'
        },
        imageTI: {
            type: 'string',
            selector: '.ingredientes-bloque'
        },
        enlaceBloque: {
            type: 'string',
            source: 'attribute',
            attribute: 'href'
        },
        imagenBloque: {
            type: 'string',
            source: 'attribute',
            selector: '.imagen-ingredientes img',
            attribute: 'src',
            default: Logo
        },
        align: {
            type: 'string',
            default: 'wide'
        }
    },
    supports: {
        align: ['wide', 'full']
    },
    edit: (props) => {

        const { attributes : { headingBox, paragraphBox, imageTI, enlaceBloque, imagenBloque }, setAttributes} = props;

        const blockProps = useBlockProps();

        const onChangeHeadingBox = nuevoTexto => {
            setAttributes({ headingBox: nuevoTexto });
        }
        const onChangeParagraphBox = nuevoParrafo => {
            setAttributes({ paragraphBox: nuevoParrafo });
        }
        const onSelectImagen = nuevaImagen => {
            setAttributes({ imageTI: nuevaImagen.sizes.full.url });
        }
        const onChangeURL = nuevaURL => {
            setAttributes({ enlaceBloque: nuevaURL });
        }
        const onSelectImagenIngredientes = nuevaImagen => {
            setAttributes({ imagenBloque: nuevaImagen.sizes.full.url });
        }

        return(
            <div {...blockProps}>
                
                <div className="ingredientes-bloque" style={{ backgroundImage: `url(${imageTI})` }}>
                    <MediaUpload
                        onSelect={onSelectImagen}
                        type="image"
                        render={({open}) => (
                            <IconButton 
                                className="lapizzeria-agregar-imagen"
                                onClick={open}
                                icon="format-image"
                                showTooltip="true"
                                label="Agregar Imagen"
                            />
                        )}
                    />
                    <div className="contenido-ingredientes">
                        <div className='texto-ingredientes'>
                            <h1 className="titulo">
                                <RichText 
                                    value={headingBox}
                                    onChange={onChangeHeadingBox}
                                    placeholder="ingrese un texto del título..."
                                />
                            </h1>
                            <p>
                                <RichText
                                    value={paragraphBox}
                                    onChange={onChangeParagraphBox}
                                    placeholder="Ingrese el texto del párrafo..."
                                />
                            </p>
                            <div>
                                <a className="boton boton-secundario" href={enlaceBloque}>Leer Más</a>
                            </div>
                            <URLInputButton
                                onChange={onChangeURL}
                                url={enlaceBloque}
                            />
                        </div>
                        <div className="imagen-ingredientes">
                        <img src={imagenBloque} alt="" />
                        <MediaUpload
                            onSelect={onSelectImagenIngredientes}
                            type="image"
                            render={({open}) => (
                                <IconButton 
                                    className="lapizzeria-agregar-imagen"
                                    onClick={open}
                                    icon="format-image"
                                    showTooltip="true"
                                    label="Agregar Imagen"
                                />
                            )}
                        />
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    save: (props) => {

        const { attributes: { headingBox, paragraphBox, imageTI, enlaceBloque, imagenBloque, align } } = props;

        return(
            <>
                <div className={`ingredientes-bloque ${align}`} style={{ backgroundImage: `url(${imageTI})` }}>

                    <div className="contenido-ingredientes">
                        <div className='texto-ingredientes'>
                            <h1 className="titulo">
                                <RichText.Content
                                    value={headingBox}
                                />
                            </h1>
                            <p>
                                <RichText.Content
                                    value={paragraphBox}
                                />
                            </p>
                            <div>
                                <a className="boton boton-secundario" href={enlaceBloque}>Leer Más</a>
                            </div>
                        </div>
                        <div className="imagen-ingredientes">
                            <img src={imagenBloque} alt="" />
                        </div>
                    </div>
                </div>
            </>
        );
    }

});