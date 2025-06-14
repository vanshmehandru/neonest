import Feeding from "@/app/models/Feeding.model";
import User from "@/app/models/User.model";
import { authenticateToken } from "@/lib/auth";
import connectDB from "@/lib/connectDB";


await connectDB();

export async function POST(req) {
    try{
        const body = await req.json();
        const {time , type , amount , notes} = body;
        if(!time || !type || !amount ){
            return Response.json({
                "error" : "Kindly fill all the fields"
            },{status : 422});
        }

        const user = await authenticateToken(req);
        const userId = user.user.id;
        const userExists = await User.findById(userId);
        if(!userExists){
            return Response.json({
                "error" : "Invalid"
            },{status : 400});
        }

        const newFeed = new Feeding({
            babyId : userId,
            time,
            type,
            amount,
            notes
        })
        await newFeed.save();

        return Response.json({
            "success" : "Feed added successfully!"
        },{status : 201});

    }
    catch(error){
        console.log(error);
        return Response.json({
            error
        } , {status : 500})
    }
}



export async function GET(req) {
    try{
        const user = await authenticateToken(req);
        const userId = user.user.id;
        const feeds = await Feeding.find({babyId : userId});
        if(feeds.length == 0){
            return Response.json({
                "success" : "no feed exists",
                "feed" : [],
            },{status : 404});
        }
        console.log(feeds);
            return Response.json({
                "success" : "feed fetched successfully",
                "feed" : feeds,
            },{status : 200});

    }
    catch(error){
        console.log(error);
        return Response.json({
            error
        } , {status : 500})
    }
}