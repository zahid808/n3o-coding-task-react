import React, { useState, useEffect } from 'react'
import { getAllDonations } from '../../services/helper';
import Loader from '../../components/Loader'
import { Table, Button, Popconfirm, notification } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import ViewDonation from './ViewDonation';
import AddDonationModal from '../../components/addDonationModal';

const MainDonation = () => {
    const [donations, setDonationsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getDonationsOnLoadPage()
    }, [])

    /**********Get All Donations logic here***********/
    const getDonationsOnLoadPage = async () => {
        setLoading(true);
        try {
            let res = await getAllDonations();
            setLoading(false);
            if (res.status === 200 && res?.data?.length > 0) {
                setLoading(false);

                let filterList = res?.data?.map((itm, key) => {
                    return {
                        ...itm,
                        id: key + 1,
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
        <>
            {loading && <Loader />}
            <div className='donation-wrapper'>
                <h1 className='title'>Welcome to Donation App</h1>

                <div className='donation-view-wrapper'>
                    <div className='add-donation'>
                        <Button
                            icon={<UserAddOutlined />}
                            className="btn-txt mt-2"
                            type="primary"
                            size="middle"
                            onClick={() => setShowModal(true)}
                        >
                            Add Donation
                        </Button>
                    </div>
                    <ViewDonation data={donations} rowKey={"id"} scroll={"scroll"} />
                </div>
            </div>

            {
                showModal && <AddDonationModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    getDonationsOnLoadPage={getDonationsOnLoadPage} />
            }
        </>
    )
}


export default MainDonation