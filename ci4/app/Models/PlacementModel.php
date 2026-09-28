<?php

namespace App\Models;

use CodeIgniter\Model;

class PlacementModel extends Model
{
    protected $table = 'placements';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = false;
    protected $returnType = 'array';
    protected $allowedFields = [
        'id', 'studentName', 'studentImage', 'courseName', 'organization', 'hospitalName',
        'hospitalLogo', 'role', 'batchYear', 'salaryPackage', 'testimonial', 'verified'
    ];
}
