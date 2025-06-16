import React, { useState } from "react";

const QuotationForm = () => {

    const fields = [
        { label: "Company Name", name: "companyName", type: "text", required: true },
        { label: "Contact Person", name: "contactPerson", type: "text", required: true },
        { label: "Email Address", name: "email", type: "email", required: true },
        { label: "Phone Number", name: "phone", type: "tel", required: false },
        { label: "Product Name / ID", name: "product", type: "text", required: true },
        { label: "Quantity", name: "quantity", type: "number", required: true },
        { label: "Delivery Location", name: "deliveryLocation", type: "text", required: true },
        { label: "Preferred Delivery Date", name: "deliveryDate", type: "date", required: false },
    ]

    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        product: "",
        quantity: "",
        specs: "",
        deliveryLocation: "",
        deliveryDate: "",
        paymentTerms: "",
        notes: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // send formData to server or API here
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 shadow-xl">
            <table className="w-full table-auto">
                <tbody className=" grid grid-cols-3">
                    {fields.map((field) => (
                        <tr key={field.name}>
                            <td className="p-3 font-medium text-gray-700 w-1/3">{field.label}</td>
                            <td className="p-3">
                                <input
                                    type={field.type}
                                    name={field.name}
                                    required={field.required}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td className="p-3 font-medium text-gray-700">Custom Specifications</td>
                        <td className="p-3">
                            <textarea
                                name="specs"
                                value={formData.specs}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="p-3 font-medium text-gray-700">Payment Terms</td>
                        <td className="p-3">
                            <select
                                name="paymentTerms"
                                value={formData.paymentTerms}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                <option value="">Select</option>
                                <option value="Net 30">Net 30</option>
                                <option value="Prepaid">Prepaid</option>
                                <option value="COD">Cash on Delivery</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="p-3 font-medium text-gray-700">Additional Notes</td>
                        <td className="p-3">
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className="p-3 font-medium text-gray-700">Upload File</td>
                        <td className="p-3">
                            <input
                                type="file"
                                name="file"
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2" className="text-center p-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
                            >
                                Submit Quotation Request
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
};

export default QuotationForm;