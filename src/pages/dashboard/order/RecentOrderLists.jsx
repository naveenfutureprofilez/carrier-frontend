import React, { useContext, useEffect, useState } from 'react'
import AuthLayout from '../../../layout/AuthLayout';
import Api from '../../../api/Api';
import { UserContext } from '../../../context/AuthProvider';
import TimeFormat from '../../common/TimeFormat';
import Loading from '../../common/Loading';
import { Link } from 'react-router-dom';
import Nocontent from '../../common/NoContent';
import Badge from '../../common/Badge';
import Currency from '../../common/Currency';
import OrderView from './OrderView';

export default function RecentOrdersLists() {

   const [loading, setLoading] = useState(true);
   const [lists, setLists] = useState([]);
   const {Errors} = useContext(UserContext);

   const fetchLists = () => {
      setLoading(true);
      const resp = Api.get(`/order/listings`);
      resp.then((res) => {
         setLoading(false);
         if (res.data.status === true) {
            setLists(res.data.orders);
         } else {
            setLists([]);
         }
         setLoading(false);
      }).catch((err) => {
         setLoading(false);
      });
   }

   useEffect(() => {
      fetchLists();
   }, []);


  return (
   <>
         <div className='flex justify-between items-center pt-12'>
            <h2 className='text-white text-2xl'>Recent Orders</h2>
         </div>

         {loading ? <Loading />
            :
            <>
               {lists && lists.length > 0 ? 
                  <div className='recent-orders overflow-hidden mt-6 border border-gray-900 rounded-[30px]'>
                     <table className='w-full p-2' cellPadding={'20'}>
                        <tr>
                           <th className='text-sm text-start text-gray-400 uppercase border-b border-gray-900'>Order ID</th>
                           <th className='text-sm text-start text-gray-400 uppercase border-b border-gray-900'>Customer / Carrier </th>
                           <th className='text-sm text-start text-gray-400 uppercase border-b border-gray-900'>Customer Payment</th>
                           <th className='text-sm text-start text-gray-400 uppercase border-b border-gray-900'>Carrier Payment</th>
                           <th className='text-sm text-start text-gray-400 uppercase border-b border-gray-900'>Documents</th>
                        </tr>
                        {lists && lists.map((c, index) => {
                           return <tr key={`carriew-${index}`}>

                              <td className='text-sm text-start   border-b border-gray-900'>
                                 <p className='whitespace-nowrap uppercase text-gray-200'>Order No. : {c.customer_order_no || "--"}</p>
                                 <p className='uppercase text-gray-200'>{c.company_name || "--"}</p>
                                 <p className='text-gray-400'><TimeFormat date={c.createdAt || "--"} /></p>
                              </td>
                              
                              <td className='text-sm text-start text-gray-200 capitalize border-b border-gray-900'>
                                 <p>Customer : {c.customer?.name || "--"}</p>
                                 <p className='mt-1'>Carrier : {c.carrier?.name || "--"}</p>
                              </td>

                              <td className='text-sm text-start text-gray-200 capitalize border-b border-gray-900'>
                                 <p className='mt-1'>Payment Status : <Badge title={true} status={c.payment_status} /></p>
                                 {c.payment_status === 'paid' && <p className='mt-1'>Payment method : {c.payment_method}</p>}
                                 {c.payment_status_date ? <p className='text-[12px] text-gray-400 mt-1'>Updated at <TimeFormat date={c.payment_status_date || ""} /></p> : ''}
                              </td>
                              
                              <td className='text-sm text-start text-gray-200 capitalize border-b border-gray-900'>
                                 <p className='mt-1'>Payment Status : <Badge title={true} status={c.carrier_payment_status} /></p>
                                 <p className='mt-1'>Carrier Amount : <Currency amount={c.carrier_amount} currency={c.revenue_currency || 'usd'} /></p>
                                 {c.carrier_payment_status === 'paid' && <p className='mt-1'>Payment method : {c.carrier_payment_method}</p>}
                                 {c.carrier_payment_date ? <p className='text-[12px] text-gray-400 mt-1'>Updated at <TimeFormat date={c.carrier_payment_date || ""} /></p> : ''}
                              </td>
                              
                               
                              <td className='text-sm text-start text-gray-200 capitalize border-b border-gray-900'>
                                 <OrderView order={c} fetchLists={fetchLists} />
                              </td>
                           </tr>
                        })}
                     </table>
                  </div>
                  : 
                  <Nocontent text="No orders found" />
               }
            </>
         }
   </>
  )
}
