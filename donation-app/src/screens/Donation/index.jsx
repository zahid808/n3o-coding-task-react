import React, { useState, useEffect, Fragment } from 'react'
import { getAllDonations } from '../../services/helper';
import Loader from '../../components/Loader'
import { Table, notification } from "antd";
import ViewDonation from './ViewDonation';

const MainDonation = () => {
    const [donations, setDonationsList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDonationsOnLoadPage()
    },[])

    const getDonationsOnLoadPage = async () => {
       setLoading(true);
        try {
            let res = await getAllDonations();
            console.log("res-->", res)
            setLoading(false);
            if (res.status === 200 && res?.data?.length > 0) {
                setLoading(false);
                //setDonationsList(res?.data)

                let filterList = res?.data?.map((itm, key) => {
                    return {
                      ...itm,
                      id: key +1,
                      sr: key + 1,
                      name: itm?.name,
                      reference: itm?.reference?.text,
                      price: itm?.price,
                      status: itm?.name?.name,
                      location: itm?.location,
                      theme: itm?.theme,
                    };
                  });
                  setDonationsList(filterList);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };

    return (
        <Fragment>
            {loading && <Loader />}
            <div className='donation-wrapper'>
                <h1 className='title'>Welcome to Donation App</h1>
                <div className='donation-view-wrapper'>
                    <ViewDonation data={donations} rowKey={"id"} scroll={"scroll"} />
                </div>
            </div>
        </Fragment>
    )
}


export default MainDonation