import httpStatus from "../utils/httpStatus.js";

class DestinationController {
    static getDestination = async (req,res)=> {
        console.log(`Controller called: getDestination`);
        try {

        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static getDestinationById  = async (req,res)=> {
        console.log(`Controller called: getDestinationById`);
        try {

        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static createDestination = async (req,res)=> {
        console.log(`Controller called: createDestination`);
        try {

        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static updateDestination = async (req,res)=> {
        console.log(`Controller called: updateDestination`);
        try {

        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static deleteDestination = async (req,res)=> {
        console.log(`Controller called: deleteDestination`);
        try {

        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }
}

export default DestinationController;