
const mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/learning')
  .then(() => console.log('Connected!'));
 

const orderSchema =new Schema({
    name:String,
    price:Number
})
const userSchema = new Schema({
    name:String,
    order:[{
        type:Schema.Types.ObjectId,
        ref: "Order"
    }]
})
userSchema.post("findOneAndDelete",async(data)=>{
    console.log("port mid is working");
    await Order.deleteMany({_id:{ $in: data.order }});
    mongoose.disconnect();
 })
const Order = mongoose.model("Order",orderSchema);
const User = mongoose.model("User",userSchema);
const adding = async()=>{
    let c1 = new User({
        name:"harsh soni"
    });
    let o1 = new Order({
        name:"burger",
        price:120
    });
    let o2 = new Order({
        name:"samosha",
        price:12
    });
    c1.order.push(o1);
    c1.order.push(o2);
    await o1.save();
    await o2.save();
    await c1.save();
}

let deleting = async()=>{
    await User.findByIdAndDelete("66894323c50b6a6297f7b6ae");
}
/* adding(); */
deleting();

/* 
{let add = async()=>{
     
    let o1 = new Order({
        name:"samosha",
        price:10
    });

    let o2 = new Order({
        name:"pizza",
        price:100
    })
   
    await o1.save();
    await o2.save();
    let c1= new User({
        name: "harsh",
        order:[o1._id,o2._id]
     })
     await c1.save();
    
}
const show = async()=>{
 let result =   await User.find({}).populate("order");
 console.log(result[0]);
 mongoose.disconnect();
}
show();
}
 */