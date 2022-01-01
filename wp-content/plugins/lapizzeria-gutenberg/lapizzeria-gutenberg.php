<?php
/*
    Plugin Name: La Pizzeria Gutenberg Blocks
    Plugin URI: 
    Description: Agrega bloques de Gutenberg nativos
    Version: 1.0
    Author: Carlos Santaella
    Author URI: 
    License: GPL2
    License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/
if(!defined('ABSPATH')) exit;

/** Categorias Personalizadas */
function lapizzeria_categoria_personalizada($categories, $post) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'lapizzeria', 
                'title' => 'La Pizzeria',
                'icon' => 'store'
            )
        )
    );
}
add_filter('block_categories_all', 'lapizzeria_categoria_personalizada', 10, 2);

function lapizzeria_registrar_bloques() {

    // Si gutenberg no existe, salir
    if(!function_exists('register_block_type')) {
        return;
    }
 
    // automatically load dependencies and version
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
 
    wp_register_script(
        'lapizzeria-editor-script',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_register_style(
        'lapizzeria-editor-styles',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),  
    );

    wp_register_style(
        'lapizzeria-frontend-styles',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    $blocks = array(
        'lapizzeria/boxes',
        'lapizzeria/galeria',
        'lapizzeria/hero',
        'lapizzeria/textoimagen',
        'lapizzeria/contenedor'
    );
    foreach($blocks as $block){

        register_block_type( $block, array(
            'api_version' => 2,
            'style' => 'lapizzeria-frontend-styles',
            'editor_style' => 'lapizzeria-editor-styles',
            'editor_script' => 'lapizzeria-editor-script'
        ) );
    }

    //registrar bloque dinamico
    register_block_type('lapizzeria/menu', array(
        'api_version' => 2,
        'style' => 'lapizzeria-frontend-styles',
        'editor_style' => 'lapizzeria-editor-styles',
        'editor_script' => 'lapizzeria-editor-script',
        'render_callback' => 'lapizzeria_especialidades_front_end' //query a la base de datos
    ));
 
}
add_action( 'init', 'lapizzeria_registrar_bloques' );

/**consulta a la base de datos para mostrar los resultados en el front end */

function lapizzeria_especialidades_front_end($attrs){
    // echo '<pre>';
    // var_dump($attrs);
    // echo '</pre>';

    //extraer los valores y agregar defaults
    $cantidad = (isset($attrs['cantidadMostrar']))? $attrs['cantidadMostrar'] : 4;
    $titulo = (isset($attrs['tituloBloque']))? $attrs['tituloBloque'] : 'Nuestras Especialidades';
    $tax_query = array();
    if(isset($attrs['categoriaMenu'])){
        $tax_query[] = array(
            'taxonomy' => 'categoria-menu',
            'terms' => $attrs['categoriaMenu'],
            'field' => 'term_id'
        );
    }
    
    //obtener los datos del query

    $especialidades = wp_get_recent_posts(array(
        'post_type' => 'especialidades',
        'post_status' => 'publish',
        'numberposts' => $cantidad,
        'tax_query' => $tax_query
    ));

    //revisar que haya resultados
    if(count($especialidades) == 0){
        return 'No hay Especialidades';
    }

    $cuerpo = '';
    $cuerpo .= '<h2 class="titulo-menu">'.$titulo.'</h2>';
    $cuerpo .= '<ul class="nuestro-menu">';
    foreach($especialidades as $esp):
        //obtener objeto del post
        $post = get_post($esp['ID']);
        setup_postdata($post);
        $cuerpo .= sprintf(
            '<li class="container-plato">
                %1$s
                <div class="platillo">
                    <div class="precio-titulo">
                        <h3>%2$s</h3>
                        <p>$ %3$s</p>
                    </div>
                    <div class="contenido-platillo">
                        <p>
                            %4$s
                        </p>
                    </div>
                </div>
            </li>',
            get_the_post_thumbnail($post, 'especialidades'),
            get_the_title($post),
            get_field('precio', $post),
            get_the_content($post)
        );
        wp_reset_postdata();
    endforeach;
    $cuerpo .= '</ul>';

    return $cuerpo;
}

/** agregar lighbox al plugin */
function lapizzeria_frontend_scripts(){
    wp_enqueue_style('lightbox', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.css', array(), '2.11.3', 'all');
    wp_enqueue_script('lighbox', 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js', array('jquery'), '2.11.3', true);
}
add_action('wp_enqueue_scripts', 'lapizzeria_frontend_scripts');