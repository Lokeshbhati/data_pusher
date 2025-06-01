import HttpStatus from "../utils/httpStatus.js";

function authMiddleware(req, res, next) {
    try{
        const token = req.headers['cl-x-token'];
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                status: HttpStatus.UNAUTHORIZED,
                error: 'Unauthenticated. Missing CL-X-TOKEN header.'
            });
        }

        req.appSecretToken = token;
        next();
    } catch(err){
        console.error(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: err.message
        });
    }
}

export default authMiddleware;