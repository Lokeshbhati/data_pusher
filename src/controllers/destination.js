import httpStatus from "../utils/httpStatus.js";
import DestinationQuery from "../data/queries/destination.js";

class DestinationController {
    static prepareHeaderResponse = (row) => {
        return {
            headerId: row.header_id,
            headerKey: row.header_key,
            headerValue: row.header_value
        }
    }

    static prepareResponse = (row,headers) => {
        return {
            destinationId: row.destination_id,
            accountId: row.account_id,
            url: row.url,
            httpMethod: row.http_method,
            headers: headers.map(header => this.prepareHeaderResponse(header))
        }
    }

    static getDestination = async (req,res)=> {
        console.log(`Controller called: getDestination`);
        try {
            let destinations = DestinationQuery.getDestinations.all();
            if(destinations && destinations.length > 0){
                let data =[];
                for(let destination of destinations){
                    let destinationHeaders = DestinationQuery.getHeaders.all(destination.destination_id);
                    let response = this.prepareResponse(destination,destinationHeaders);
                    data.push(response);
                }
                console.log(`Destinations found: ${JSON.stringify(destinations)}`);
                return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, message: "Destinations fetched successfully!!", data });
            } else {
                console.log("Destinations not found");
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: "Destinations not found", data: [] });
            }
        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static getDestinationById  = async (req,res)=> {
        console.log(`Controller called: getDestinationById`);
        try {
            let destinationId = req.params.id;
            console.log(`Destination id: ${destinationId}`);
            let recoredDestination = DestinationQuery.getDestinationById.get(destinationId);
            if(recoredDestination){
                let destinationHeaders = DestinationQuery.getHeaders.all(destinationId);
                let data = this.prepareResponse(recoredDestination,destinationHeaders);
                console.log(`Recorded destination: ${JSON.stringify(recoredDestination)}`);
                return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, msg: `Destination fetched successfully for destination id: ${destinationId}`, data});
            } else {
                console.log(`Destination not found for destination id: ${destinationId}`);
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: `Destination not found for destination id: ${destinationId}`});
            }
        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static getDestinationsByAccountId  = async (req,res)=> {
        console.log(`Controller called: getDestinationsByAccountId`);
        try {
            let accountId = req.params.id;
            console.log(`Account id: ${accountId}`);
            let recoredDestinations = DestinationQuery.getDestinationsForAccountId.all(accountId);
            if(recoredDestinations && recoredDestinations.length >0){
                let data =[];
                for(let destination of recoredDestinations){
                    let destinationHeaders = DestinationQuery.getHeaders.all(destination.destination_id);
                    let response = this.prepareResponse(destination,destinationHeaders);
                    data.push(response);
                }
                console.log(`Recorded destinations: ${JSON.stringify(recoredDestinations)}`);
                return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, msg: `Destinations fetched successfully for account id: ${accountId}`, data});
            } else {
                console.log(`Destinations not found for account id: ${accountId}`);
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: `Destinations not found for account id: ${accountId}`, data: []});
            }
        } catch(err){
            console.error(err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static createDestination = async (req,res)=> {
        console.log(`Controller called: createDestination`);
        try {
            let { accountId, url, httpMethod, headers } = req.body;
            let newDestination = DestinationQuery.createDestination.get(accountId, url, httpMethod);
            console.log(`New destination: ${JSON.stringify(newDestination)}`);
            let newHeaders = [];
            for(let key in headers){
                let newHeader = DestinationQuery.insertHeader.get(newDestination.destination_id, key, headers[key]);
                console.log(`New header: ${JSON.stringify(newHeader)}`);
                newHeaders.push(newHeader);
            }
            let data = this.prepareResponse(newDestination,newHeaders);
            return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, msg: `Destination created successfully for destination id: ${newDestination.destination_id}`, data });
        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static updateDestination = async (req,res)=> {
        console.log(`Controller called: updateDestination`);
        try {
            let destinationId = req.params.id;
            console.log(`Destination id: ${destinationId}`);
            let { url, httpMethod } = req.body;
            let recoredAccount = DestinationQuery.getDestinationById.get(destinationId);
            if(recoredAccount){
                let updatedDestination = DestinationQuery.updateDestination.run(url, httpMethod, Number(destinationId));
                console.log(`Updated destination: ${JSON.stringify(updatedDestination)}`);
                return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, msg: `Destination updated successfully for destination id: ${destinationId}`});
            } else {
                console.log(`Destination not found for destination id: ${destinationId}`);
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: `Destination not found for destination id: ${destinationId}`});
            }
        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }

    static deleteDestination = async (req,res)=> {
        console.log(`Controller called: deleteDestination`);
        try {
            let destinationId = req.params.id;
            console.log(`Destination id: ${destinationId}`);
            let recoredAccount = DestinationQuery.getDestinationById.get(destinationId);
            if(recoredAccount){
                let deletedDestination = DestinationQuery.deleteDestination.run(Number(destinationId));
                console.log(`Deleted destination: ${JSON.stringify(deletedDestination)}`);
                return res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, msg: `Destination deleted successfully for destination id: ${destinationId}`});
            } else {
                console.log(`Destination not found for destination id: ${destinationId}`);
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: `Destination not found for destination id: ${destinationId}`});
            }
        } catch(err){
            console.error(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }
}

export default DestinationController;