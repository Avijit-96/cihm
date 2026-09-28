<?php

namespace App\Models;

use CodeIgniter\Model;

class PartnerHospitalModel extends Model
{
    protected $table = 'partner_hospitals';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = false;
    protected $returnType = 'array';
    protected $allowedFields = [
        'id', 'name', 'logo', 'type', 'location', 'moUYear', 'bedCapacity', 'active'
    ];
}
