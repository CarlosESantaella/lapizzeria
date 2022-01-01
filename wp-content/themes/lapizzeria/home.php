<?php get_header(); ?>
<?php 
    $page_blog = get_option('page_for_posts');
    $image_id = get_post_thumbnail_id($page_blog);
    $imagen_src = wp_get_attachment_image_src($image_id, 'full')[0];


?>
<div class="hero" style="background-image: url(<?= $imagen_src ?>);">
    <div class="contenido-hero">
        <h1><?= get_the_title($page_blog) ?></h1>
    </div>
</div>
<div class="seccion contenedor con-sidebar">
    <main class="contenido-principal">

        <?php while(have_posts()): the_post(); ?>
            <article class="entrada-blog">
                <a href="<?= the_permalink() ?>">
                
                    <?php the_post_thumbnail('especialidades'); ?>
                </a>
                <?php get_template_part('template-parts/informacion', 'entrada'); ?>
                <div class="contenido-entrada">
                    <?php // echo  wp_trim_words(get_the_content(), 30); ?>
                    <?php the_excerpt(); ?>
                    <a href="<?php the_permalink(); ?>" class="boton boton-primario">Leer Más</a>
                </div>
            </article>
        <?php endwhile; ?>
        <div class="paginacion">
            <?php // echo paginate_links(); ?>
            <?php next_posts_link('Siguientes'); ?>
            <?php previous_posts_link('Anteriores'); ?>
        </div>
       
       
    </main>
    <?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>