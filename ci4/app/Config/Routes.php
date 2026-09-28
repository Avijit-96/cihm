<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Routes extends BaseConfig
{
    /**
     * Router default setup for CIHM Kolkata Healthcare & Paramedical Institute
     */
    public $defaultNamespace = 'App\Controllers';
    public $defaultController = 'Home';
    public $defaultMethod = 'index';
    public $translateURIDashes = false;
    public $override404 = null;
    public $autoRoute = false;
}

// --------------------------------------------------------------------
// Route Definitions
// --------------------------------------------------------------------

$routes->get('/', 'Home::index');

/**
 * CIHM RESTful API Endpoints matching React & Node contracts
 * Accessible via /api/... or /ci4/api/...
 */
$routes->group('api', ['namespace' => 'App\Controllers\Api'], function ($routes) {
    // CORS Preflight
    $routes->options('(:any)', 'BaseApiController::optionsHandler');

    // Site Settings & SEO
    $routes->get('site-settings', 'SiteSettings::index');
    $routes->put('site-settings', 'SiteSettings::update');
    $routes->get('admin/site-settings', 'SiteSettings::index');
    $routes->put('admin/site-settings', 'SiteSettings::update');

    // Hero Slides & Mirror Glass Cover Blocks
    $routes->get('hero-slides', 'HeroSlides::index');
    $routes->post('hero-slides', 'HeroSlides::create');
    $routes->put('hero-slides/(:segment)', 'HeroSlides::update/$1');
    $routes->delete('hero-slides/(:segment)', 'HeroSlides::delete/$1');
    $routes->post('admin/hero-slides', 'HeroSlides::create');
    $routes->put('admin/hero-slides/(:segment)', 'HeroSlides::update/$1');
    $routes->delete('admin/hero-slides/(:segment)', 'HeroSlides::delete/$1');

    // Courses Directory
    $routes->get('courses', 'Courses::index');
    $routes->get('courses/(:segment)', 'Courses::show/$1');
    $routes->post('courses', 'Courses::create');
    $routes->put('courses/(:segment)', 'Courses::update/$1');
    $routes->delete('courses/(:segment)', 'Courses::delete/$1');
    $routes->post('admin/courses', 'Courses::create');
    $routes->put('admin/courses/(:segment)', 'Courses::update/$1');
    $routes->delete('admin/courses/(:segment)', 'Courses::delete/$1');

    // Partner Hospitals & Clinical Tie-ups
    $routes->get('partner-hospitals', 'PartnerHospitals::index');
    $routes->post('partner-hospitals', 'PartnerHospitals::create');
    $routes->put('partner-hospitals/(:segment)', 'PartnerHospitals::update/$1');
    $routes->delete('partner-hospitals/(:segment)', 'PartnerHospitals::delete/$1');
    $routes->post('admin/partner-hospitals', 'PartnerHospitals::create');
    $routes->put('admin/partner-hospitals/(:segment)', 'PartnerHospitals::update/$1');
    $routes->delete('admin/partner-hospitals/(:segment)', 'PartnerHospitals::delete/$1');

    // Alumni Placements & Pass Out Students
    $routes->get('placements', 'Placements::index');
    $routes->post('placements', 'Placements::create');
    $routes->put('placements/(:segment)', 'Placements::update/$1');
    $routes->delete('placements/(:segment)', 'Placements::delete/$1');
    $routes->post('admin/placements', 'Placements::create');
    $routes->put('admin/placements/(:segment)', 'Placements::update/$1');
    $routes->delete('admin/placements/(:segment)', 'Placements::delete/$1');

    // Admission & Lead Inquiries
    $routes->get('enquiries', 'Enquiries::index');
    $routes->post('enquiries', 'Enquiries::create');
    $routes->put('enquiries/(:segment)', 'Enquiries::update/$1');
    $routes->delete('enquiries/(:segment)', 'Enquiries::delete/$1');

    // Clinical Blogs & Knowledgebase
    $routes->get('blogs', 'Blogs::index');
    $routes->get('blogs/(:segment)', 'Blogs::show/$1');
    $routes->post('blogs', 'Blogs::create');
    $routes->put('blogs/(:segment)', 'Blogs::update/$1');
    $routes->delete('blogs/(:segment)', 'Blogs::delete/$1');

    // Reviews & Testimonials
    $routes->get('reviews', 'Reviews::index');
    $routes->post('reviews', 'Reviews::create');

    // Study Connect / Real-time Rooms
    $routes->get('study-rooms', 'StudyRooms::index');
    $routes->get('study-rooms/(:segment)/messages', 'StudyRooms::messages/$1');
    $routes->post('study-rooms/(:segment)/messages', 'StudyRooms::sendMessage/$1');

    // System Health & Bridge Status
    $routes->get('status', 'BaseApiController::status');
});
