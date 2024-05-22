const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password:String,
    cpassword:String
});

const User = mongoose.model('User', userSchema);
