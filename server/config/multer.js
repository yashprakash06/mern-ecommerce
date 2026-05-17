import multer from "multer";
import path from "path";

// Configure storage location and filename
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

// Allow only image files
function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png|webp/;

  const extname = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"));
  }
}

// Create upload middleware
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;