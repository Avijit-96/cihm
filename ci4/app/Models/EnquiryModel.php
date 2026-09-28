<?php

namespace App\Models;

use CodeIgniter\Model;

class EnquiryModel extends Model
{
    protected $table = 'enquiries';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = false;
    protected $returnType = 'array';
    protected $allowedFields = [
        'id', 'name', 'email', 'phone', 'courseOfInterest', 'message', 'qualification',
        'city', 'status', 'notes', 'createdAt'
    ];
}
