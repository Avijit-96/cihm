<?php

namespace App\Controllers\Api;

use App\Models\EnquiryModel;

class Enquiries extends BaseApiController
{
    protected $modelName = EnquiryModel::class;

    public function index()
    {
        $model = new EnquiryModel();
        $enquiries = $model->orderBy('createdAt', 'DESC')->findAll();
        
        return $this->respond([
            'success' => true,
            'count' => count($enquiries),
            'data' => $enquiries
        ]);
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?: $this->request->getPost();
        
        if (empty($data['name']) || empty($data['phone'])) {
            return $this->fail('Name and phone number are required', 400);
        }

        $model = new EnquiryModel();
        if (empty($data['id'])) {
            $data['id'] = 'enq-' . time();
        }
        $data['createdAt'] = date('Y-m-d H:i:s');
        $data['status'] = $data['status'] ?? 'new';

        $model->insert($data);
        return $this->respondCreated([
            'success' => true,
            'message' => 'Admission inquiry submitted successfully. Counselor will contact within 2 hours.',
            'data' => $data
        ]);
    }

    public function update($id = null)
    {
        $model = new EnquiryModel();
        $data = $this->request->getJSON(true) ?: $this->request->getRawInput();

        if (!$model->find($id)) {
            return $this->failNotFound("Inquiry with ID {$id} not found");
        }

        $model->update($id, $data);
        return $this->respond([
            'success' => true,
            'message' => 'Inquiry updated successfully',
            'data' => $data
        ]);
    }

    public function delete($id = null)
    {
        $model = new EnquiryModel();
        if (!$model->find($id)) {
            return $this->failNotFound("Inquiry with ID {$id} not found");
        }

        $model->delete($id);
        return $this->respondDeleted([
            'success' => true,
            'message' => 'Inquiry removed successfully'
        ]);
    }
}
