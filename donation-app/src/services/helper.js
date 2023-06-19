import http from "./httpServices";
import { donationItemsAll, createDonationItems } from '../globalConstant'


const getAllDonations = async () => {
    const data = await http.get(donationItemsAll);
    if (data.status === 200) {
        return data;
    }
};

const createDonation = async (req) => {
    const data = await http.post(createDonationItems, req);
    if (data.status === 200) {
        return data;
    }
};

export {
    getAllDonations,
    createDonation
}