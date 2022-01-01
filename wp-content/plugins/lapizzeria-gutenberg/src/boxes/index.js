import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

/**
 * 7 pasos para crear un bloque en gutenberg
 * 1.- importar el componente(s) que utilizaras
 * 2.- coloca el componente donde deseas utilizarlo
 * 3.- crea una función para que lea los contenidos
 * 4.- registra un atributo
 * 5.- extraer el contenido desde props
 * 6.- guarda el contenido con setAttributes
 * 7.- lee los contenidos guardados en save()
 * 
 */
 
registerBlockType( 'lapizzeria/boxes', {
    apiVersion: 2,
    title: 'Pizzeria Cajas',
    icon: { src: Logo },
    category: 'lapizzeria',
    attributes: {
        headingBox: {
            type: 'string',
            source: 'html',
            selector: '.box h2'
        },
        textoBox: {
            type: 'string',
            source: 'html',
            selector: '.box p'
        },
        colorFondo: {
            type: 'string'
        },
        colorTexto: {
            type: 'string'
        },
        alineacionContenido: {
            type: 'string',
            default: 'center'
        }
    },
    example: {},
    edit(props) {



        //extraer contenido desde props
        const { attributes: { headingBox, textoBox, colorFondo, colorTexto, alineacionContenido }, setAttributes } = props;
        
        const onChangeHeadingBox = nuevoHeading => {
            setAttributes({ headingBox: nuevoHeading });
        }
        
        const onChangeTextoBox = nuevoTexto => {
            setAttributes({ textoBox: nuevoTexto });
        }
        
        const onChangeColorFondo = nuevoColor => {
            setAttributes({ colorFondo: nuevoColor });
        }
        
        const onChangeColorTexto = nuevoColor => {
            setAttributes({ colorTexto: nuevoColor })
        }
        
        const onChangeAlinearContenido = nuevaAlineacion => {
            setAttributes({ alineacionContenido: nuevaAlineacion })
        }
        // value={headingBox}
        // onChange={onChangeHeadingBox}
        // tagName="h2"
        // placeholder="Agrega el encabezado"


        // value={textoBox}
        // onChange={onChangeTextoBox}
        // placeholder="Agrega el Texto3"
        // tagName="p"
        const blockProps = useBlockProps();
        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title={'Color de Fondo'}
                        initialOpen={true}
                        >

                        <div
                            className="components-base-control">
                            <div
                                className="components-base-control__field">
                                <label 
                                    className="components-base-control__label">
                                        Color de Fondo
                                </label>
                                <ColorPalette 
                                    onChange={onChangeColorFondo}
                                    value={colorFondo}
                                />
                            </div>

                        </div>

                    </PanelBody>
                    <PanelBody
                        title={'Color del Texto'}
                        initialOpen={false}
                    >

                        <div
                            className="components-base-control">
                            <div
                                className="components-base-control__field">
                                <label 
                                    className="components-base-control__label">
                                        Color del Texto
                                </label>
                                <ColorPalette 
                                    onChange={onChangeColorTexto}
                                    value={colorTexto}
                                />
                            </div>

                        </div>

                    </PanelBody>
                </InspectorControls>

                <BlockControls>
                    <AlignmentToolbar 
                        onChange={onChangeAlinearContenido}
                        value={alineacionContenido}
                    />
                </BlockControls>

                <div {...blockProps} className="box" style={{ backgroundColor: colorFondo, color: colorTexto, textAlign: alineacionContenido }} >

                    <RichText 
                        
                        value={headingBox}
                        onChange={onChangeHeadingBox}
                        tagName="h2"
                        placeholder="Agrega el encabezado"
                    />
                    <RichText 
                        value={textoBox}
                        onChange={onChangeTextoBox}
                        placeholder="Agrega el Texto3"
                        tagName="p"
                    />
                
                </div>
                    
                
            </>
        );
    },
    save(props) {

        //extraer contenido desde props
        const { attributes: { headingBox, textoBox, colorFondo, colorTexto, alineacionContenido } } = props;
        const blockProps = useBlockProps.save();
 
        return (
            <>
                <div {...blockProps} className="box" style={{ backgroundColor: colorFondo, color: colorTexto, textAlign: alineacionContenido }} >

                    <RichText.Content 
                        
                        tagName="h2"
                        value={headingBox}
                    />
                    <RichText.Content
                        tagName="p"
                        value={textoBox}
                    />
                </div>
            </>
           
        );
    },
} );
