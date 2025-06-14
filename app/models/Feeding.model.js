
import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({

        babyId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true,
        },
    
        time : {
            type : String,
            required : true,
        },
        type : {
            type : String,
            enum : ['Breastfeeding' , 'Bottle' , 'Solid Food'],
            required : true,
        },
        amount : {
            type : String,
            required : true,
        },
        notes : {
            type : String,
        }

},
    {
        timestamps : true
    });

    
const Feeding = mongoose.models.Feeding || mongoose.model("Feeding", feedSchema);

export default Feeding;