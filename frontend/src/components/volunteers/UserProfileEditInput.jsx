import React from "react";

export function UserProfileEditInput({ fieldName, inputType, data, userData, setUserData }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const data = 
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    return (
        <>
            <div>{fieldName}</div>
            <input
                className="inline w-full border border-gray-400 bg-bg.offWhite p-1 rounded-lg"
                type={inputType}
                name={fieldName} 
                value={data}
                onChange={handleInputChange}
            />
        </>
    );
}
