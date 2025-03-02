const poppler = require("pdf-poppler");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const extractCoverImage = async (pdfPath, outputDir) => {
  try {
    const outputImage = path.join(outputDir, "cover.png");

    // Convert PDF to image (first page only)
    await poppler.convert(pdfPath, {
      format: "png",
      out_dir: outputDir,
      out_prefix: "cover",
      page: 1,
    });

    const convertedImagePath = path.join(outputDir, "cover-1.png");

    // Check if image exists before processing
    if (!fs.existsSync(convertedImagePath)) {
      throw new Error("PDF conversion failed. Image not found.");
    }

    // Resize using sharp
    const resizedImagePath = convertedImagePath.replace(".png", "-resized.png");
    await sharp(convertedImagePath).resize(300, 400).toFile(resizedImagePath);

    // Delete the original image
    fs.unlinkSync(convertedImagePath);

    return `/uploads/cover-resized.png`;
  } catch (error) {
    console.error("Error extracting cover image:", error);
    return null;
  }
};

module.exports = extractCoverImage;
