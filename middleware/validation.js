const { body, validationResult } = require('express-validator');

// Middleware for validating product creation and update requests
exports.validateProduct = [
    body('name').isString().isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters long'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').optional().isString().isLength({ max: 500 }).withMessage('Description can be up to 500 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware for validating file uploads
exports.validateFileUpload = (req, res, next) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const file = req.file;

    if (file) {
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ message: 'Invalid file type. Only JPEG, JPG, and PNG are allowed.' });
        }

        if (file.size > 1024 * 1024 * 5) { // 5MB
            return res.status(400).json({ message: 'File size exceeds the maximum limit of 5MB.' });
        }
    }
    
    next();
};
