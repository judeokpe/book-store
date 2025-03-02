const { fromPath } = require("pdf2pic");
const path = require("path");

const extractCoverImage = async (pdfPath, outputDir) => {
  try {
    const options = {
      density: 100, // Image resolution
      savePath: outputDir,
      format: "png",
      width: 300, // Resize width
      height: 400, // Resize height
    };

    const pdf2pic = fromPath(pdfPath, options);
    const outputFileName = Date.now() + "-cover.png";
    const result = await pdf2pic(1, { responseType: "image", filename: outputFileName });

    if (result.success) {
      return `/uploads/${outputFileName}`;
    } else {
      console.error("Failed to generate cover image");
      return null;
    }
  } catch (error) {
    console.error("Error extracting cover image:", error);
    return null;
  }
};

module.exports = extractCoverImage;
