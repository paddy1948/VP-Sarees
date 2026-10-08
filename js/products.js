/* ============================================
   VP SAREES — SHARED PRODUCT DATA
   ============================================ */

const VPProducts = [

    {
        id: 1,
        name: "Elegant Silk Saree",

        gallery: [
            "https://images.pexels.com/photos/32244572/pexels-photo-32244572.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],

        price: 2499,
        oldPrice: 3499,
        discount: 29,

        fabric: "Silk",
        color: "Red",
        pattern: "Traditional",

        isNew: false,
        isFeatured: true,

        description:
            "An elegant traditional saree designed for a timeless and graceful look. Perfect for festive occasions, celebrations and special moments."
    },


    {
        id: 2,
        name: "Royal Blue Saree",

        gallery: [
            "https://images.pexels.com/photos/34904955/pexels-photo-34904955.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],

        price: 1999,
        oldPrice: 2799,
        discount: 29,

        fabric: "Silk Blend",
        color: "Royal Blue",
        pattern: "Elegant",

        isNew: true,
        isFeatured: false,

        description:
            "A graceful royal blue saree designed for an elegant traditional appearance. Suitable for festive occasions and special celebrations."
    },


    {
        id: 3,
        name: "Classic Red Saree",

        gallery: [
            "https://images.pexels.com/photos/29467387/pexels-photo-29467387.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],

        price: 2199,
        oldPrice: 2999,
        discount: 27,

        fabric: "Silk",
        color: "Red",
        pattern: "Classic",

        isNew: false,
        isFeatured: true,

        description:
            "A classic red saree with a timeless traditional appearance, designed for weddings, celebrations and festive occasions."
    },


    {
        id: 4,
        name: "Kerala Classic Saree",

        gallery: [
            "https://images.pexels.com/photos/27625767/pexels-photo-27625767.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],

        price: 1799,
        oldPrice: 2499,
        discount: 28,

        fabric: "Cotton",
        color: "Cream",
        pattern: "Kerala Classic",

        isNew: false,
        isFeatured: false,

        description:
            "A beautiful Kerala-inspired saree with a clean traditional appearance, perfect for cultural occasions and elegant everyday styling."
    },


    {
        id: 5,
        name: "Ivory Grace Saree",

        gallery: [
            "https://images.pexels.com/photos/36640487/pexels-photo-36640487.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],

        price: 2299,
        oldPrice: 3199,
        discount: 28,

        fabric: "Silk Blend",
        color: "Ivory",
        pattern: "Elegant",

        isNew: true,
        isFeatured: false,

        description:
            "An elegant ivory saree offering a refined and graceful appearance for celebrations, gatherings and special occasions."
    },


    {
        id: 6,
        name: "Heritage Saree",

        gallery: [
            "https://images.pexels.com/photos/27155553/pexels-photo-27155553.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],

        price: 2699,
        oldPrice: 3799,
        discount: 29,

        fabric: "Silk",
        color: "Traditional",
        pattern: "Heritage",

        isNew: false,
        isFeatured: true,

        description:
            "A heritage-inspired saree combining traditional styling with an elegant appearance, ideal for weddings, festivals and special occasions."
    }

];


/* ============================================
   HELPER FUNCTIONS
   ============================================ */

function getProductById(id) {

    return VPProducts.find(
        (product) =>
            product.id === Number(id)
    );

}


function getAllProducts() {

    return [...VPProducts];

}


/* ============================================
   EXPORT
   ============================================ */

export {
    VPProducts,
    getProductById,
    getAllProducts
};