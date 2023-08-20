import {connect} from '@/dbConfig/dbConfig'; //getting connect method from dbConfig folder/dbConfig.ts 

import User from '@/Models/userModel'; //get our schema model

import { NextRequest,NextResponse } from 'next/server'; //to listen to request and response on next
import bcryptjs from "bcryptjs"; //getting bcryptjs encrypt the password.
import jwt from 'jsonwebtoken'; //getting jsonwebtoken to generate token



connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const{email,password} = reqBody ;
        console.log(reqBody);

        const user = await User.findOne({email:email})

        if(!user){
        
            return NextResponse.json({error: 'User doesnot exist'},{
                status: 400
            })
        }

        //check password is matched or not
        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword){
            
            return NextResponse.json({error:"Invalid Password"},{
                status:400
            })
        }
        //create token data
        const tokenData = {
            id: user._id,
            username : user.username,
            email : user.email 
        }

        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1h'})

        const response = NextResponse.json({
            message:'Login Successful',
            success:true,
        })
        response.cookies.set('token',token,{
            httpOnly:true,
        })

        return response;

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500});
    }
}