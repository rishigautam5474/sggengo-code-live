import Gallery from "../models/gallery.model.js"

const galleryController = async (req, res) => {
try {
      const gallery = await Gallery.find({});

    if(gallery.length < 0) {
      return res.status(200).json({error: false, success: true, message: "Gallery not found"})
    }
    
    return res.status(200).json({error: false, success: true, message: "Gallery find", gallery})
} catch(error) {
  return res.status(500).json({error: true, success: false, message: "Something went wrong"});
}
}


const addGallery = async (req, res) => {
  try {
    const { mediaType } = req.body;

    if (!req?.files || !req?.files?.mediaUrl[0]?.path) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Image file is required",
      });
    }

    const imageUrl = req?.files?.mediaUrl[0]?.path; 

    const gallery = await Gallery.create({
      mediaUrl: imageUrl,
      mediaType,
    });

    return res.status(201).json({
      error: false,
      success: true,
      message: "Successfully picture is added",
      gallery,
    });
  } catch (error) {
    // console.error("Add Gallery Error:", error.message);
    return res.status(500).json({
      error: true,
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteMedia = async (req, res) => {
    const {id} = req?.params
    try {
      const deleteGallery = await Gallery.findByIdAndDelete(id);

      if(!deleteGallery) {
        return res.status(404).json({error: true, success: false, message: "Media not found"});
      }

      return res.status(200).json({error: false, success: true, message: "Media deleted successfully"})
      
    } catch(error) {
        return res.status(500).json({error: true, success: false, message: "Something went wrong"});
    }
}

export {galleryController, addGallery, deleteMedia}