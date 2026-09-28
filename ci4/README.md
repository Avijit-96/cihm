# CIHM Kolkata - CodeIgniter 4 (CI4) Backend Integration

Welcome to the **CodeIgniter 4 (CI4)** backend architecture for **Central Institute of Healthcare & Management (CIHM)**.
This project seamlessly integrates:
- **React 18 SPA**: High-performance frontend with Tailwind CSS, mirror glass hero sliders, real-time study connect, course directory, hospital partner cloud, and placement verified registry.
- **Node.js / Express**: Fast development server, SSR sitemaps, Server-Sent Events, and JSON database persistence.
- **CodeIgniter 4 (PHP)**: Robust enterprise MVC framework with RESTful ResourceControllers, CORS filters, MySQL/PostgreSQL models, database migrations, and seeders.
- **Tailwind CSS**: Modern utility-first styling with responsive mirror frosted glass effects and crisp color accents.

---

## Directory Layout

```
ci4/
├── app/
│   ├── Config/
│   │   ├── App.php             # Base application configuration
│   │   ├── Database.php        # MySQL / PostgreSQL connection config
│   │   ├── Filters.php         # CORS and security filters
│   │   └── Routes.php          # RESTful routing for React client
│   ├── Controllers/
│   │   └── Api/
│   │       ├── BaseApiController.php   # CORS & JSON response helpers
│   │       ├── HeroSlides.php          # Mirror glass slides CRUD
│   │       ├── Courses.php             # Paramedical courses directory
│   │       ├── PartnerHospitals.php    # Kolkata hospital network & logos
│   │       ├── Placements.php          # Pass out students & packages
│   │       ├── Enquiries.php           # Admission inquiries & CRM
│   │       └── SiteSettings.php        # Kolkata Top Ranking SEO metadata
│   ├── Models/
│   │   ├── HeroSlideModel.php
│   │   ├── CourseModel.php
│   │   ├── PartnerHospitalModel.php
│   │   ├── PlacementModel.php
│   │   └── EnquiryModel.php
│   └── Database/
│       ├── Migrations/
│       └── Seeds/
├── public/
│   ├── index.php               # Front controller
│   └── .htaccess               # Apache URL rewrite rules
├── schema.sql                  # Ready-to-import MySQL / MariaDB SQL dump
├── composer.json               # CI4 package specifications
└── .env.example                # Environment variables template
```

---

## Quick Start: Running CI4 Backend

### Prerequisites
- PHP 8.1+ with extensions: `intl`, `mbstring`, `mysqli` (or `pdo_pgsql`), `curl`
- Composer 2+
- MySQL 5.7+ / 8.0+ or MariaDB 10.3+

### 1. Database Setup
Import the pre-configured database schema into your database:
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS cihm_kolkata CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p cihm_kolkata < ci4/schema.sql
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp ci4/.env.example ci4/.env
```
Update your database credentials in `.env`:
```ini
CI_ENVIRONMENT = development

database.default.hostname = localhost
database.default.database = cihm_kolkata
database.default.username = root
database.default.password = your_password
database.default.DBDriver = MySQLi
database.default.DBPrefix =
database.default.port = 3306
```

### 3. Run the CI4 Built-In Server
```bash
cd ci4
php spark serve --port 8080
```
Your CI4 REST API is now live at `http://localhost:8080/api/`!

### 4. Connect React SPA to CI4
In your root `.env` or client environment, set:
```ini
VITE_API_URL=http://localhost:8080/api
```
The React frontend will communicate directly with CodeIgniter 4 controllers!

---

## RESTful API Endpoints in CI4

| HTTP Verb | Endpoint | Description |
|-----------|----------|-------------|
| `GET` | `/api/status` | System health & CI4 module manifest |
| `GET` | `/api/hero-slides` | Active slides with mirror glass styles |
| `POST` | `/api/hero-slides` | Create new hero slide (Admin) |
| `PUT` | `/api/hero-slides/{id}` | Update slide text/image/blockColor |
| `DELETE` | `/api/hero-slides/{id}` | Delete hero slide |
| `GET` | `/api/courses` | List published paramedical courses |
| `GET` | `/api/courses/{slug}` | Course details with related programs |
| `GET` | `/api/partner-hospitals` | Hospital network with logos & MoUs |
| `POST` | `/api/partner-hospitals` | Add hospital partner (Apollo, Fortis, etc.) |
| `GET` | `/api/placements` | Pass out students with salary packages |
| `POST` | `/api/enquiries` | Submit admission lead from website |
| `GET` | `/api/site-settings` | Kolkata Top Ranking SEO metadata |
