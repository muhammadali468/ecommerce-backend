require("dotenv").config()
const express = require("express");
const cors = require("cors")
const db = require("./db")
const app = express()
app.use(express.json());
app.use(cors())

app.use("/categories", express.static("categories"));
app.use("/cats", express.static("cats"));
app.use("/products", express.static("products")); 

const PORT = process.env.PORT
// Admin
const adminRegisterRoute = require("./routes/Admin/register");
const adminLoginRoute = require("./routes/Admin/login");
const adminTokenAuthRoute = require("./routes/Admin/tokenAuth");
const adminChangePasswordRoute = require("./routes/Admin/changePassword");
const adminLogoutRoute = require("./routes/Admin/logout");
const adminResetPasswordLinkRoute = require("./routes/Admin/resetPasswordLink");
const adminResetPasswordRoute = require("./routes/Admin/resetPassword");
// category
const addCategory = require("./routes/Admin/addCategory");
const viewCategory = require("./routes/Admin/viewCategory");
const deleteCategory = require("./routes/Admin/deleteCategory");
// product
const addProduct = require("./routes/Product/addProduct");
const viewProduct = require("./routes/Product/getProducts");
const deleteProduct = require("./routes/Product/deleteProduct");
const updateProduct = require("./routes/Product/updateProduct");
const uploadProductImages = require("./routes/Product/uploadProductImages");
// user
const userLogin = require("./routes/Users/login");
const userRegister = require("./routes/Users/register");



const allRoutes = [userRegister, userLogin, uploadProductImages, updateProduct, deleteProduct,viewProduct, addProduct, deleteCategory, viewCategory, adminRegisterRoute, adminLoginRoute, adminTokenAuthRoute, adminChangePasswordRoute, adminLogoutRoute,adminResetPasswordLinkRoute,adminResetPasswordRoute, addCategory]

for(let i=0;i<allRoutes.length;i++){
    app.use("/api", allRoutes[i])
}

// app.use("/api", adminRegisterRoute)
// app.use("/api", adminLoginRoute)
// app.use("/api", adminTokenAuthRoute)
// app.use("/api", adminChangePasswordRoute)
// app.use("/api", adminLogoutRoute)
// app.use("/api", adminResetPasswordLinkRoute)
// app.use("/api", adminResetPasswordRoute)
// // category
// app.use("/api", addCategory)



// Login

app.get("/", (req, res) => {
    res.send("Server is working!");
});

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})