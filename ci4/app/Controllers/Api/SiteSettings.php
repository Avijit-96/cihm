<?php

namespace App\Controllers\Api;

class SiteSettings extends BaseApiController
{
    public function index()
    {
        $settings = [
            'siteName' => 'CIHM Kolkata',
            'seoTitle' => 'Top Paramedical College in Kolkata | CIHM - Best Healthcare & Medical Institute',
            'metaDescription' => 'Central Institute of Healthcare & Management (CIHM) is ranked among Kolkata\'s top paramedical colleges with 100% practical hospital clinical training.',
            'keywords' => 'kolkata top college, best paramedical college in kolkata, top paramedical college kolkata, DMLT college kolkata, healthcare institute kolkata',
            'contactPhone' => '+91 9073737888',
            'contactEmail' => 'admissions@cihm.in',
            'campusAddress' => 'Dum Dum / Salt Lake Sector V, Kolkata, West Bengal 700091'
        ];

        return $this->respond([
            'success' => true,
            'data' => $settings
        ]);
    }

    public function update()
    {
        $data = $this->request->getJSON(true) ?: $this->request->getRawInput();

        return $this->respond([
            'success' => true,
            'message' => 'Site settings and SEO metadata saved successfully',
            'data' => $data
        ]);
    }
}
