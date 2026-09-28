<?php

namespace App\Models;

use CodeIgniter\Model;

class CourseModel extends Model
{
    protected $table = 'courses';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = false;
    protected $returnType = 'array';
    protected $allowedFields = [
        'id', 'slug', 'name', 'code', 'degreeType', 'duration', 'category', 'eligibility',
        'shortDescription', 'description', 'image', 'feesPerSemester', 'totalFees',
        'seatsAvailable', 'status', 'metaTitle', 'metaDescription', 'order'
    ];
}
