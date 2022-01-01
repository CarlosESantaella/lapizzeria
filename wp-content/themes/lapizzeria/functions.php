<?php 

function lapizzeria_setup(){

    //Gutenberg

    //soporte a estilos por default de gutenberg en tu tema

    add_theme_support('wp-block-styles');

    //añadir soporte para contenido completo
    add_theme_support('align-wide');

    //añadir titulo
    add_theme_support('title-tag');

    //paleta de colores
    add_theme_support('editor-color-palette', array(
        array(
            'name' => 'Rojo',
            'slug' => 'rojo',
            'color' => '#a61206'
        ),
        array(
            'name' => 'Naranja',
            'slug' => 'naranja',
            'color' => '#f19f30'
        ),
        array(
            'name' => 'Verde',
            'slug' => 'verde',
            'color' => '#127427'
        ),
        array(
            'name' => 'Blanco',
            'slug' => 'blanco',
            'color' => '#ffffff'
        ),
        array(
            'name' => 'Negro',
            'slug' => 'negro',
            'color' => '#000000'
        )
    ));

    // deshabilita los colores personalizados
    add_theme_support('disable-custom-colors');
    
    //imagenes destacadas
    add_theme_support('post-thumbnails');

    //tamaño de imagenes
    add_image_size('nosotros', 437, 291, true);
    add_image_size('especialidades', 768, 515, true);
    add_image_size('especialidades_portrait', 435, 526, true);
}
add_action('after_setup_theme', 'lapizzeria_setup');

/**  CSS Y JAVASCRIPT */
function lapizzeria_styles(){   
    //css
    wp_enqueue_style('normalizeCSS', get_template_directory_uri().'/css/normalize.css', array(), '1.0.0', 'all');
    wp_enqueue_style('slicknav', 'https://cdnjs.cloudflare.com/ajax/libs/SlickNav/1.0.10/slicknav.css', array(), '1.0.10', 'all');
    wp_enqueue_style('googlefonts', 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&family=Raleway:wght@100;400;600&display=swap', array(), '1.0.0', 'all');
    wp_enqueue_style('style', get_stylesheet_uri(), array(), '1.0.0', 'all');

    //scripts
    wp_enqueue_script('slicknav', 'https://cdnjs.cloudflare.com/ajax/libs/SlickNav/1.0.10/jquery.slicknav.min.js', array('jquery'), '1.0.10', true);
    wp_enqueue_script('scripts', get_template_directory_uri().'/js/scripts.js', array('jquery'), '1.0', true);
}

add_action('wp_enqueue_scripts', 'lapizzeria_styles');


/** Menus */

function lapizzeria_menus(){
    register_nav_menus(array(
        'header-menu' => 'Header Menu',
        'redes-sociales' => 'Redes Sociales'
    ));
}
add_action('init', 'lapizzeria_menus');

/** Zona de widgets */

function lapizzeria_widgets(){
    register_sidebar(
        array(
            'name' => 'Blog sidebar',
            'id' => 'blog_sidebar',
            'before_widget' => '<div class="widget">',
            'after_widget' => '</div>',
            'before_title' => '<h3>',
            'after_title' => '</h3>'
        )
    );
}

add_action('widgets_init', 'lapizzeria_widgets');

/**Agregar botones a paginador */

function lapizzeria_botones_paginador(){

    return 'class="boton boton-secundario"';
}
add_filter('next_posts_link_attributes', 'lapizzeria_botones_paginador');
add_filter('previous_posts_link_attributes', 'lapizzeria_botones_paginador');