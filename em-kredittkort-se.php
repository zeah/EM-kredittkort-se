<?php
/*
Plugin Name: EM Kredittkort Sverige
Description: kredittkort liste for sverige
Version: 1.0.2
GitHub Plugin URI: zeah/EM-kredittkort-se
*/

defined('ABSPATH') or die('Blank Space');

// constant for plugin location
define('KREDITTKORT_SE_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once 'inc/kkse-posttype.php';
require_once 'inc/kkse-shortcode.php';

function init_emkredittkortse() {
	Kkse_posttype::get_instance();
	Kkse_shortcode::get_instance();
}
add_action('plugins_loaded', 'init_emkredittkortse');