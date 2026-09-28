<?php

namespace App\Controllers\Api;

use App\Models\CourseModel;

class Courses extends BaseApiController
{
    protected $modelName = CourseModel::class;

    public function index()
    {
        $model = new CourseModel();
        $courses = $model->where('status', 'published')->findAll();
        
        return $this->respond([
            'success' => true,
            'count' => count($courses),
            'data' => $courses
        ]);
    }

    public function show($slug = null)
    {
        $model = new CourseModel();
        $course = $model->where('slug', $slug)->first();

        if (!$course) {
            return $this->failNotFound("Course not found");
        }

        // Related courses
        $related = $model->where('category', $course['category'])
                         ->where('id !=', $course['id'])
                         ->findAll(4);

        $course['relatedCourses'] = $related;

        return $this->respond([
            'success' => true,
            'data' => $course
        ]);
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?: $this->request->getPost();
        
        if (empty($data['name']) || empty($data['slug'])) {
            return $this->fail('Course name and slug are required', 400);
        }

        $model = new CourseModel();
        if (empty($data['id'])) {
            $data['id'] = 'course-' . time();
        }

        $model->insert($data);
        return $this->respondCreated([
            'success' => true,
            'message' => 'Course created successfully',
            'data' => $data
        ]);
    }

    public function update($id = null)
    {
        $model = new CourseModel();
        $data = $this->request->getJSON(true) ?: $this->request->getRawInput();

        if (!$model->find($id)) {
            return $this->failNotFound("Course with ID {$id} not found");
        }

        $model->update($id, $data);
        return $this->respond([
            'success' => true,
            'message' => 'Course updated successfully',
            'data' => $data
        ]);
    }

    public function delete($id = null)
    {
        $model = new CourseModel();
        if (!$model->find($id)) {
            return $this->failNotFound("Course with ID {$id} not found");
        }

        $model->delete($id);
        return $this->respondDeleted([
            'success' => true,
            'message' => 'Course deleted successfully'
        ]);
    }
}
