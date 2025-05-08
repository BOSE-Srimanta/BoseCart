import jwt from 'jsonwebtoken';

const authUser = async (req, res, next)=>{
    console.log("this is auth user")
    req.body = {...req.body}
    const {token} = await req.cookies;
    //console.log("COOKIES" , req.cookies)

    if(!token){
        return res.json({ success: false, message: 'Token not found' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        
        // console.log("Decoded Token:", tokenDecode);
       // console.log("Decoded Token ID:", tokenDecode.id);

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
            
        }else{
            return res.json({ success: false, message: 'Token decode. Id not found' });
        }
        console.log("moving on to next")
        next();

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default authUser;