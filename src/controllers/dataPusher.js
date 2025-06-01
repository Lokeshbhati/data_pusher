import AccountQuery from "../data/queries/account.js";
import DestinationQuery from "../data/queries/destination.js";
import AxiosHttpClient from "../utils/axiosHttpClient.js";
import httpStatus from "../utils/httpStatus.js";

class DataPusherController {
    static GET = "get";
    static POST = "post";
    static convertHeadersToObject = (headers) => {
        return headers.reduce((acc, { header_key, header_value }) => {
            acc[header_key] = header_value;
            return acc;
        }, {});
    }

    static pushIncomingData = async (req, res)=> {
        try{
            let appSecretToken = req.appSecretToken;
            let incomingData = req.body;
            console.log(`Incoming data: ${JSON.stringify(incomingData)}`);
            if(!incomingData){
                console.log("Invalid Data");
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: "Invalid Data" });
            }
            console.log(`App secret token recieved!`);
            let account = AccountQuery.getAccountsByAppSecretToken.get(appSecretToken);
            console.log(`Account: ${JSON.stringify(account)}`);
            if(account){
                let recoredDestinations = DestinationQuery.getDestinationsForAccountId.all(account.account_id);
                if(recoredDestinations && recoredDestinations.length >0){
                    let destinationData =[];
                    for(let destination of recoredDestinations){
                        let destinationHeaders = DestinationQuery.getHeaders.all(destination.destination_id);
                        if(destination.http_method == this.GET){
                            await AxiosHttpClient.getRequest(destination.url, incomingData, this.convertHeadersToObject(destinationHeaders));
                        } else if(destination.http_method == this.POST) {
                            await AxiosHttpClient.postRequest(destination.url, incomingData, destinationHeaders);
                        }
                    }
                    console.log(`Data pushed successfully!!`);
                    res.status(httpStatus.OK).json({ success: true, status: httpStatus.OK, message: "Data pushed successfully!!" });
                }
            } else {
                console.log("Accounts not found");
                return res.status(httpStatus.BAD_REQUEST).json({ success: false, status: httpStatus.BAD_REQUEST, message: "Accounts not found" });
            }
        } catch(err){
            console.error(err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, status: httpStatus.INTERNAL_SERVER_ERROR, error: err.message })
        }
    }
}

export default DataPusherController;