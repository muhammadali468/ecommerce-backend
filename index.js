require("dotenv").config()
const express = require("express");
const cors = require("cors")
const db = require("./db")
const app = express()
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"]
}));

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
// user
const userLogin = require("./routes/Users/login");
const userRegister = require("./routes/Users/register");
// order
const order = require("./routes/Users/placeOrder");
const viewOrders = require("./routes/Admin/viewOrders");
// calculateProductPrice
const calculateProductPrice = require("./routes/Users/calculate");
const UserAuthentication = require("./middleware/userAuthentication");
const AdminAuthentication = require("./middleware/adminAuthentication");

const allRoutes = [calculateProductPrice, userRegister, userLogin, viewProduct, viewCategory, adminRegisterRoute, adminLoginRoute, adminTokenAuthRoute, adminLogoutRoute]
const userProtectedRoutes = [order]
const adminProtectedRoutes = [viewOrders, updateProduct, deleteProduct, addProduct, deleteCategory, adminChangePasswordRoute, adminResetPasswordLinkRoute, adminResetPasswordRoute, addCategory]

for (let i = 0; i < adminProtectedRoutes.length; i++) {
    app.use("/api/admin", AdminAuthentication, adminProtectedRoutes[i])
}
for (let i = 0; i < userProtectedRoutes.length; i++) {
    app.use("/api/user", UserAuthentication, userProtectedRoutes[i])
}
for (let i = 0; i < allRoutes.length; i++) {
    app.use("/api/public", allRoutes[i])
}

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
})