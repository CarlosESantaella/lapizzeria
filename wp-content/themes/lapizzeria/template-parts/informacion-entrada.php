<header class="informacion-entrada">
    <div class="fecha">
        <time>
            <?php the_time('d'); ?>
            <span><?php the_time('M'); ?></span>
        </time>
    </div>
    <?php if(is_home()): ?>
    <div class="titulo-entrada">
        <h2><?php the_title(); ?></h2>
    </div>
    <?php endif; ?>
</header>
<p class="author">
    Escrito por:
    <span>
        <?= get_the_author_meta('display_name'); ?>
    </span>
</p>