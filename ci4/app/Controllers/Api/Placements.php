<?php

namespace App\Controllers\Api;

use App\Models\PlacementModel;

class Placements extends BaseApiController
{
    protected $modelName = PlacementModel::class;

    public function index()
    {
        $model = new PlacementModel();
        $placements = $model->findAll();
        
        return $this->respond([
            'success' => true,
            'count' => count($placements),
            'data' => $placements
        ]);
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?: $this->request->getPost();
        
        if (empty($data['studentName'])) {
            return $this->fail('Student name is required', 400);
        }

        $model = new PlacementModel();
        if (empty($data['id'])) {
            $data['id'] = 'plc-' . time();
        }

        $model->insert($data);
        return $this->respondCreated([
            'success' => true,
            'message' => 'Placement record added successfully',
            'data' => $data
        ]);
    }

    public function update($id = null)
    {
        $model = new PlacementModel();
        $data = $this->request->getJSON(true) ?: $this->request->getRawInput();

        if (!$model->find($id)) {
            return $this->failNotFound("Placement record with ID {$id} not found");
        }

        $model->update($id, $data);
        return $this->respond([
            'success' => true,
            'message' => 'Placement record updated successfully',
            'data' => $data
        ]);
    }

    public function delete($id = null)
    {
        $model = new PlacementModel();
        if (!$model->find($id)) {
            return $this->failNotFound("Placement record with ID {$id} not found");
        }

        $model->delete($id);
        return $this->respondDeleted([
            'success' => true,
            'message' => 'Placement record deleted successfully'
        ]);
    }
}
