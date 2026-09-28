<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class BaseApiController extends ResourceController
{
    use ResponseTrait;

    protected $format = 'json';

    public function initController(\CodeIgniter\HTTP\RequestInterface $request, \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger)
    {
        parent::initController($request, $response, $logger);
        
        // Ensure proper CORS headers for React + Vite SPA frontend
        $this->response->setHeader('Access-Control-Allow-Origin', '*');
        $this->response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $this->response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    }

    public function optionsHandler()
    {
        return $this->response->setStatusCode(200);
    }

    public function status()
    {
        return $this->respond([
            'success' => true,
            'service' => 'CIHM Kolkata Paramedical Institute - CodeIgniter 4 Backend API',
            'version' => '4.5.1',
            'php_version' => PHP_VERSION,
            'timestamp' => date('c'),
            'database' => 'MySQL / PostgreSQL Compatible',
            'supported_modules' => [
                'hero-slides' => 'Hero Slides & Mirror Glass Config',
                'courses' => 'Paramedical & Healthcare Courses',
                'partner-hospitals' => 'Hospital MoUs & Network Logos',
                'placements' => 'Pass Out Students & Verification',
                'enquiries' => 'Admission Enquiries & CRM',
                'blogs' => 'Clinical Knowledge Articles',
                'site-settings' => 'SEO & Kolkata Top Ranking'
            ]
        ]);
    }
}
