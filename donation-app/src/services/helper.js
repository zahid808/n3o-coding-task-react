import http from "./httpServices";
import { donationItemsAll } from '../globalConstant'


const getAllDonations = async () => {
    const data = await http.get(donationItemsAll);
    if (data.status === 200) {
        return data;
    }
};

export {
    getAllDonations
}