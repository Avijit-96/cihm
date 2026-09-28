<?php

namespace App\Models;

use CodeIgniter\Model;

class HeroSlideModel extends Model
{
    protected $table = 'hero_slides';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = false;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = [
        'id', 'headline', 'subheadline', 'year', 'badgeColor', 'blockColor', 'cardTheme',
        'description', 'image', 'altText', 'ctaText', 'ctaUrl', 'secondaryCtaText',
        'secondaryCtaUrl', 'order', 'enabled'
    ];
}
