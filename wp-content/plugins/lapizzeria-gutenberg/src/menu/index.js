import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

//logo para el bloque
import { ReactComponent as Logo } from '../pizzeria-icon.svg';

registerBlockType('lapizzeria/menu', {
    apiVersion: 2,
    title: 'La Pizzeria Menu',
    icon: { src: Logo},
    category: 'lapizzeria',
    attributes: {
        cantidadMostrar: {
            type: 'number'
        },
        categoriaMenu: {
            type: 'number'
        },
        tituloBloque: {
            type: 'string',
            default: 'Titulo Bloque'
        }
    },
    example: {},
    edit: withSelect((select, props) => {

        //extraer los valores

        const { attributes: { cantidadMostrar, categoriaMenu }, setAttributes} = props;
        
        const onChangeCantidadMostrar = nuevaCantidad => {
            setAttributes({ cantidadMostrar: nuevaCantidad });
        }
        const onChangeCategoriaMenu = nuevaCategoria => {
            setAttributes({ categoriaMenu: nuevaCategoria });
        }
        const onChangeTituloBloque = nuevoTitulo => {
            setAttributes({ tituloBloque: nuevoTitulo });
        }

        return {
            categorias: select("core").getEntityRecords('taxonomy', 'categoria-menu'),
            // enviar petición a la api
            especialidades: select('core').getEntityRecords('postType', 'especialidades', {
                per_page: cantidadMostrar || 4,
                'categoria-menu': categoriaMenu
            }),
            onChangeCantidadMostrar,
            onChangeCategoriaMenu,
            onChangeTituloBloque,
            props
        };
    }) 
    (({ categorias, especialidades, onChangeCantidadMostrar, onChangeCategoriaMenu, onChangeTituloBloque, props }) => {
        if(!especialidades || !categorias) return 'Cargando...';
        if(especialidades && especialidades.length === 0) return 'No hay resultados';
        
        const blockProps = useBlockProps();
        //extraer props
        const { attributes: { cantidadMostrar, categoriaMenu, tituloBloque }} = props;

        //verificar categorias
        if(!categorias){
           console.log('No hay categorias');
        }
        if(categorias && categorias.length === 0){
           console.log('No hay resultados');
        }

        //generar label y value a categorias
        var categoriasArray = [];
        categoriasArray[0] = { label: 'Todos', value: ' '};
        let contador = 1;
        categorias.forEach( categoria => {
            categoria['label'] = categoria.name;
            categoria['value'] = categoria.id;
            categoriasArray[contador] = { label: categoria.name, value: categoria.id};
            contador++;
        });
        // arreglo con valores por default
        const opcionDefault = [{ label: 'Todos', value: '0'}];

        const listadoCategorias = [ ...categorias, ...opcionDefault ];
        console.log(categoriasArray);

        return(
            <div {...blockProps}>     

                <InspectorControls>
                    <PanelBody
                        title={'Cantidad a mostrar'}
                        initialOpen={true}>

                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                        Cantidad a mostrar
                                </label>
                                <RangeControl 
                                    onChange={onChangeCantidadMostrar}
                                    min={2}
                                    max={10}
                                    value={cantidadMostrar || 4}
                                />
                                
                            </div>

                        </div>

                    </PanelBody>
                    <PanelBody
                        title={'Categoría de Especialidad'}
                        initialOpen={false}>

                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                    Categoría de Especialidad
                                </label>
                                <SelectControl 
                                    options={ categoriasArray }
                                    onChange={onChangeCategoriaMenu}
                                    value={categoriaMenu}
                                />
                                
                            </div>
                        </div>
                    </PanelBody>
                    <PanelBody
                        title={'Titulo Bloque'}
                        initialOpen={false}>

                        <div className="components-base-control">
                            <div className="components-base-control__field">
                                <label className="components-base-control__label">
                                    Titulo Bloque
                                </label>
                                <TextControl
                                    onChange={onChangeTituloBloque}
                                    value={ tituloBloque }
                                />
                                
                            </div>
                        </div>
                    </PanelBody>
                </InspectorControls>
                <h2  className="titulo-menu" >{ tituloBloque }</h2>
                <ul className="nuestro-menu">
                    {especialidades.map(especialidad => (
                        <li class="container-plato">
                            <img class="img-menu" src={especialidad.imagen_destacada} alt="" />
                            <div className="platillo">
                                <div className="precio-titulo">
                                    <h3>{especialidad.title.rendered}</h3>
                                    <p>$ {especialidad.precio}</p>
                                </div>
                                <div className="contenido-platillo">
                                    <p>
                                        <RichText.Content value={especialidad.content.rendered.substring(0, 180)} />
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }),
    save: () => {
        return null;
    }
});