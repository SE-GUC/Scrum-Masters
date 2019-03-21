const express = require("express");
const router = express.Router();
const companyController = require("../../controllers/company-controller");

router.use(express.json());

router.get("/", companyController.listAllCompanies);
router.get("/:id", companyController.getCompany);

router.post("/", companyController.createCompany);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
