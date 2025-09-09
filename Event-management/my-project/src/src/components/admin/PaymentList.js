// src/components/payment/PaymentList.js
import React from "react";
import {
  VscCreditCard,
  VscCheck,
  VscError,
  VscCalendar,
  VscSearch,
} from "react-icons/vsc";
import { FaClock, FaDollarSign } from "react-icons/fa";

const PaymentList = ({ payments }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <VscCreditCard className="mr-2 text-blue-600" />
        Payment History
      </h2>

      {/* Search bar */}
      <div className="mb-4 flex items-center border rounded-lg px-3 py-2 w-80">
        <VscSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search payments..."
          className="flex-1 outline-none"
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{payment.id}</td>
              <td className="p-3 flex items-center text-green-600 font-semibold">
                <FaDollarSign className="mr-1" /> {payment.amount}
              </td>
              <td className="p-3">
                {payment.status === "SUCCESS" ? (
                  <span className="flex items-center text-green-600 font-medium">
                    <VscCheck className="mr-1" /> Success
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 font-medium">
                    <VscError className="mr-1" /> Failed
                  </span>
                )}
              </td>
              <td className="p-3 flex items-center text-gray-700">
                <VscCalendar className="mr-1" /> {payment.date}
              </td>
              <td className="p-3 flex items-center text-gray-700">
                <FaClock className="mr-1" /> {payment.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
