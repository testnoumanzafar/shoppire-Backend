const productModel = require('../models/Productmodel');
const { findOneAndDelete } = require('../models/usermodel');
 

const cloudinary = require('cloudinary').v2;


const addProduct =async (req, res)=>{
         try {
            const { name, description, price , category, subCategory, sizes, popular} = req.body
            console.log(req.files);
             const image1 =req.files.image1  
             const image2 =req.files.image2  
             const image3 =req.files.image3  
             const image4 =req.files.image4  

             const images =[image1, image2, image3, image4].filter((item)=> item !== undefined)
             console.log(images , 'array check');
             
                    // youtube code
            //  let imagesUrl = await Promise.all(
            //            images.map(async (item)=>{
            //             let result = await  cloudinary.uploader.upload(item.path, {resource_type: 'image'})

            //             return result.secure_url
            //            })
            //  )
            let imagesUrl = await Promise.all(
               images.map(async (item) => {
                   const file = Array.isArray(item) ? item[0].path : item.path;
                   console.log(file, 'check');
                   
                   let result = await cloudinary.uploader.upload(file, {
                       resource_type: 'image',
                   });
                   return result.secure_url;
               })
           );
             // youtube code
         // console.log( name, description, price , category, subCategory, sizes, popular);
         // console.log(imagesUrl);

         // const ProductData = {
         //    name,
         //    description,
         //    price: Number(price),
         //    category,
         //    subCategory,
         //    popular: popular === "true"? true : false,
         //    sizes: JSON.parse(sizes),
         //    image: imagesUrl,
         //    date: Date.now()
         // }
         // console.log(ProductData);
         // const product = new productModel(ProductData)
         // await product.save()

         const savePr = new productModel({
            name,
               description,
               price,
               category,
               subCategory,
               popular: popular === "true"? true : false,
               sizes: JSON.parse(sizes),
               image: imagesUrl,
               date: Date.now()
         })
         const allsave= await savePr.save()
  console.log(allsave, "saveall produst");
  
         res.status(200).json({success:true, message: "product added successfully"})

         } catch (error) {
            console.log(error.message);
            res.status(500).json({success:false, message:error.message})
         }
}

const removeProduct = async (req, res) => {
   try {
     const { id } = req.body;   
 
     if (!id) {
       return res.status(400).json({ success: false, message: "Product ID is required" });
     }
 
     const deletedProduct = await productModel.findOneAndDelete({ _id: id });
 
     if (!deletedProduct) {
       return res.status(404).json({ success: false, message: "Product not found" });
     }
 
     res.status(200).json({ success: true, message: "Successfully removed product" });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
 };
 
const listProduct =async (req, res)=>{
try {
  const allProd= await productModel.find({})
   res.status(200).json({success:true, products: allProd})
} catch (error) {
   res.status(500).json({success:false, message:error.message})
}


}
const singleProduct =async (req, res)=>{
     try {
      const {productid} = req.body
            const Sproduct =await productModel.findById(productid)
            console.log(Sproduct);
            
            res.status(500).json({success:true, message:"Product Remove"   })
     } catch (error) {
      res.status(500).json({success:false, message:error.message})
     }
}


module.exports = { singleProduct, listProduct, addProduct, removeProduct }