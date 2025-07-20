import Gallery from "../models/gallery.model.js";
import ErrorResponse from "../utils/errorHandler.js";

const getAllMedia = async (req, res, next) => {
  const media = await Gallery.find({});

  if (!media) {
    return next(new ErrorResponse(404, "Media not found"));
  }

  return res
    .status(200)
    .json({ error: false, success: true, message: "Gallery find", media });
};

const addMedia = async (req, res, next) => {
    const { mediaType } = req.body;

    if (!req?.files || !req?.files?.mediaUrl[0]?.path) {
      return next(new ErrorResponse(400, "Image file is required"))
    }

    const mediaFile = req?.files?.mediaUrl[0]?.path;

    if(!mediaFile) {
      return next(new ErrorResponse(400, "Image file is required"))
    }

    const gallery = await Gallery.create({
      mediaUrl: mediaFile,
      mediaType,
    });

    return res.status(201).json({
      error: false,
      success: true,
      message: "Successfully picture is added",
      gallery,
    });
};

const deleteMedia = async (req, res, next) => {
  const { id } = req?.params;

    const deleteGallery = await Gallery.findByIdAndDelete(id);

    if (!deleteGallery) {
      return next(new ErrorResponse(404, "Media not found"))
    }

    return res
      .status(200)
      .json({
        error: false,
        success: true,
        message: "Media deleted successfully",
      });
};

export { getAllMedia, addMedia, deleteMedia };
