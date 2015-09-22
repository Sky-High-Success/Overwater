<?php
/**
 * The Template for displaying home page.
 *
 * @package WordPress
 * @subpackage classiads
 * @since classiads 1.2.2
 */
?>

<?php include_once "template-travel-header.php";?>

<?php
echo do_shortcode('[layerslider id="2"]');
?> 

<div class="wrap">
<h3 class="home-travel-h3">Romantic Travel Packages</h3>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "maldives", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-maldives2.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "tahiti", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-tahiti.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "fiji", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-fiji.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "cook-islands", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-cook-islands.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "thailand", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-thailand.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "bali", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-bali1.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "mauritius", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-mauritius.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "malaysia", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-malaysia.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "vanuatu", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-vanuatu.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "vietnam", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-vietnam.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "samoa", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-samoa.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "philippines", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-philippines.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "seychelles", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-seychelles.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
<div class="box">
<div class="boxInner"><a href="<?php echo get_term_link( "caribbean", "package_taxonomy" );?>"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/01/package-caribbean.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>


<div class="box">
<div class="boxInner"><a href="http://romantictravel.com.au/taxonomy/qld-islands/"><img src="<?php echo get_home_url(null,"wp-content/uploads/2015/02/package-qld-islands-new.jpg"); ?>" alt="" /></a>
<div class="titleBox">MORE INFO</div>
</div>
</div>
</div>

 
                


<?php include_once "template-travel-footer.php";?>