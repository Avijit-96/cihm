<?php

namespace App\Controllers\Api;

use App\Models\HeroSlideModel;

class HeroSlides extends BaseApiController
{
    protected $modelName = HeroSlideModel::class;

    public function index()
    {
        $model = new HeroSlideModel();
        $slides = $model->where('enabled', 1)->orderBy('order', 'ASC')->findAll();
        
        return $this->respond([
            'success' => true,
            'count' => count($slides),
            'data' => $slides
        ]);
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?: $this->request->getPost();
        
        if (empty($data['headline'])) {
            return $this->fail('Headline is required', 400);
        }

        $model = new HeroSlideModel();
        if (empty($data['id'])) {
            $data['id'] = 'slide-' . time();
        }

        $model->insert($data);
        return $this->respondCreated([
            'success' => true,
            'message' => 'Hero slide created successfully',
            'data' => $data
        ]);
    }

    public function update($id = null)
    {
        $model = new HeroSlideModel();
        $data = $this->request->getJSON(true) ?: $this->request->getRawInput();

        if (!$model->find($id)) {
            return $this->failNotFound("Slide with ID {$id} not found");
        }

        $model->update($id, $data);
        return $this->respond([
            'success' => true,
            'message' => 'Hero slide updated successfully',
            'data' => $data
        ]);
    }

    public function delete($id = null)
    {
        $model = new HeroSlideModel();
        if (!$model->find($id)) {
            return $this->failNotFound("Slide with ID {$id} not found");
        }

        $model->delete($id);
        return $this->respondDeleted([
            'success' => true,
            'message' => 'Hero slide deleted successfully'
        ]);
    }
}
