<?php

namespace App\Controllers\Api;

use App\Models\PartnerHospitalModel;

class PartnerHospitals extends BaseApiController
{
    protected $modelName = PartnerHospitalModel::class;

    public function index()
    {
        $model = new PartnerHospitalModel();
        $partners = $model->where('active', 1)->findAll();
        
        return $this->respond([
            'success' => true,
            'count' => count($partners),
            'data' => $partners
        ]);
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?: $this->request->getPost();
        
        if (empty($data['name'])) {
            return $this->fail('Hospital partner name is required', 400);
        }

        $model = new PartnerHospitalModel();
        if (empty($data['id'])) {
            $data['id'] = 'hosp-' . time();
        }

        $model->insert($data);
        return $this->respondCreated([
            'success' => true,
            'message' => 'Partner hospital created successfully',
            'data' => $data
        ]);
    }

    public function update($id = null)
    {
        $model = new PartnerHospitalModel();
        $data = $this->request->getJSON(true) ?: $this->request->getRawInput();

        if (!$model->find($id)) {
            return $this->failNotFound("Partner hospital with ID {$id} not found");
        }

        $model->update($id, $data);
        return $this->respond([
            'success' => true,
            'message' => 'Partner hospital updated successfully',
            'data' => $data
        ]);
    }

    public function delete($id = null)
    {
        $model = new PartnerHospitalModel();
        if (!$model->find($id)) {
            return $this->failNotFound("Partner hospital with ID {$id} not found");
        }

        $model->delete($id);
        return $this->respondDeleted([
            'success' => true,
            'message' => 'Partner hospital removed successfully'
        ]);
    }
}
