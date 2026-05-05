const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listing.js');

main()
.then(()=>{
    console.log("connection successful");
    initDB();
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Mywanderlust')
}

const initDB= async () => {
    await Listing.deleteMany({});
    const newData = initData.data.map((obj)=>({...obj,owner:'69cd7253de7f56ca4d592918'}))
    await Listing.insertMany(newData);
    console.log("Data was initalized")
}