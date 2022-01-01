import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, 
         MediaUpload, 
         RichText, 
         URLInputButton, 
         BlockControls, 
         AlignmentToolbar,
         InspectorControls } from '@wordpress/block-editor';
import { IconButton, PanelBody, TextControl } from '@wordpress/components';

// logo del bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/hero', {
    apiVersion: 2,
    title: 'La Pizzeria Hero',
    icon: {src: Logo},
    category: 'lapizzeria',
    attributes: {
        imagenHero: {
            type: 'string',
            selector: '.hero-block'
        },
        tituloHero: {
            type: 'string',
            source: 'html',
            selector: '.hero-block h1'
        },
        textoHero: {
            type: 'string',
            source: 'html',
            selector: '.hero-block p'
        },
        urlHero: {
            type: 'string',
            source: 'attribute',
            attribute: 'href'
        },
        alinearContenido: {
            type: 'string',
            default: 'center'
        },
        alturaHero: {
            type: 'number'
        },
        align: {
            type: 'string',
            default: 'wide'
        }
    },
    supports: {
        align: ['wide', 'full']
    },
    edit: props => {
        //extraer los valores
        const { attributes: { imagenHero, tituloHero, textoHero, urlHero, alinearContenido, alturaHero }, setAttributes } = props;


        const blockProps = useBlockProps();

        const onSeleccionarImagen = nuevaImagen => {
            setAttributes({ imagenHero: nuevaImagen.sizes.full.url });
        }

        const onChangeTitulo = nuevoTitulo => {
            setAttributes({ tituloHero: nuevoTitulo });
        }

        const onChangeTexto = nuevoTexto => {
            setAttributes({ textoHero: nuevoTexto });
        }

        const onChangeURL = nuevaURL => {
            setAttributes({ urlHero: nuevaURL });
        }

        const onChangeAlinearContenido = nuevaAlineacion => {
            setAttributes({ alinearContenido: nuevaAlineacion});
        }

        const onChangeAlturaHero = nuevaAltura => {
            setAttributes({ alturaHero: nuevaAltura });
        }

        return(
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody
                        title={'Altura hero'}
                        initialOpen={true}>
                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                    Altura en Pixeles
                                </label>
                                <TextControl
                                    type="number"
                                    max={700}
                                    min={300}
                                    step={10}
                                    value={alturaHero || 400}
                                    onChange={onChangeAlturaHero}
                                />
                            </div>
                        </div>
                    </PanelBody>
                </InspectorControls>
                <div 
                    className="hero-block"
                    style={{backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55))
                                                ,url(${imagenHero})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            textAlign: alinearContenido,
                            height: `${alturaHero||400}px`}}>
                    <BlockControls>
                        <AlignmentToolbar 
                            onChange={onChangeAlinearContenido}
                            value={alinearContenido}
                        />
                    </BlockControls>
                    <MediaUpload
                        onSelect={onSeleccionarImagen}
                        type="image"
                        render={({open}) => (
                            <IconButton
                                className="lapizzeria-agregar-imagen"
                                onClick={open}
                                icon="format-image"
                                showTooltip="true"
                                label="agregar imagen"
                            />
                        )}
                    />
                    <div className="contenido-hero">
                        
                        <h1 className="titulo" style={{textAlign: alinearContenido}}>
                            <RichText 
                                placeholder={'Agrega el Titulo del Hero'}
                                onChange={onChangeTitulo}
                                value={tituloHero}
                            />
                        </h1>
                        <p style={{textAlign: alinearContenido}}>
                            <RichText 
                                placeholder={'Agrega el Texto del Hero'}
                                onChange={onChangeTexto}
                                value={textoHero}
                            />
                        </p>
                        <div style={{textAlign: alinearContenido}}>
                            <a href={urlHero} className="boton boton-primario">Leer Más</a>
                        </div>
                        <URLInputButton
                            onChange={onChangeURL}
                            url={urlHero}
                        />
                    </div>   
                </div>
            </div>
        );
    },
    save: props => {
        //extraer los valores
        const { attributes: { imagenHero, tituloHero, textoHero, urlHero, alinearContenido, alturaHero, align }, setAttributes } = props;

        return(
            <>
                <div 
                    className={`hero-block ${align}`}
                    style={{backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55))
                                                ,url(${imagenHero})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                textAlign: alinearContenido,
                                                height: `${alturaHero||500}px`}}>
                    <div className="contenido-hero">
                        <h1 className="titulo">
                            <RichText.Content value={tituloHero}
                            />
                        </h1>
                        <p>
                            <RichText.Content value={textoHero}
                            />
                        </p>
                        <div>
                            <a href={urlHero} className="boton boton-primario">Leer Más</a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
});