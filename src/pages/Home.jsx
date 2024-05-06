import { useState } from 'react';
import Select from 'react-select';
import india from '../assets/flags/in-flag.webp';
import australia from '../assets/flags/au-flag.webp';
import china from '../assets/flags/cn-flag.webp';
import bahrain from '../assets/flags/bh-flag.webp';
import france from '../assets/flags/fr-flag.webp';
import laos from '../assets/flags/la-flag.webp';
import poland from '../assets/flags/pl-flag.webp';
import portugal from '../assets/flags/pt-flag.webp';
import singapore from '../assets/flags/sg-flag.webp';
import southafrica from '../assets/flags/za-flag.webp';
import thailand from '../assets/flags/th-flag.webp';
import uk from '../assets/flags/uk-flag.webp';
import canada from '../assets/flags/ca-flag.webp';
import malaysia from '../assets/flags/my-flag.webp';
import qatar from '../assets/flags/qa-flag.webp';
import './Home.scss';

// JSON data for countries and their max digits
const countryData = [
    { value: "India", label: "IN", name: "India", maxDigits: 10, countryCode: "+91", flag: india },
    { value: "China", label: "CH", name: "China", maxDigits: 12, countryCode: "+86", flag: china },
    { value: "Australia", label: "AU", name: "Australia", maxDigits: 10, countryCode: "+61", flag: australia },
    { value: "Bahrain", label: "Bahrain", name: "Bahrain", maxDigits: 8, countryCode: "+973", flag: bahrain },
    { value: "France", label: "France", name: "France", maxDigits: 9, countryCode: "+33", flag: france },
    { value: "Laos", label: "Laos", name: "Laos", maxDigits: 8, countryCode: "+856", flag: laos },
    { value: "Poland", label: "Poland", name: "Poland", maxDigits: 9, countryCode: "+48", flag: poland },
    { value: "Portugal", label: "Portugal", name: "Portugal", maxDigits: 9, countryCode: "+351", flag: portugal },
    { value: "Singapore", label: "Singapore", name: "Singapore", maxDigits: 8, countryCode: "+65", flag: singapore },
    { value: "South Africa", label: "South Africa", name: "South Africa", maxDigits: 9, countryCode: "+27", flag: southafrica },
    { value: "Thailand", label: "Thailand", name: "Thailand", maxDigits: 9, countryCode: "+66", flag: thailand },
    { value: "United Kingdom", label: "United Kingdom", name: "United Kingdom", maxDigits: 10, countryCode: "+44", flag: uk },
    { value: "Canada", label: "Canada", maxDigits: 10, name: "Canada", countryCode: "+1", flag: canada },
    { value: "Malaysia", label: "Malaysia", maxDigits: 10, name: "Malaysia", countryCode: "+60", flag: malaysia },
    { value: "Qatar", label: "Qatar", maxDigits: 8, name: "Qatar", countryCode: "+974", flag: qatar }
];


function Home() {
    const [selectedCountry, setSelectedCountry] = useState(countryData[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleCountryChange = selectedOption => {
        setSelectedCountry(selectedOption);
        setPhoneNumber('');
        setIsValid(true);
    };

    const handlePhoneNumberChange = (event) => {
        let inputNumber = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        inputNumber = inputNumber.slice(0, selectedCountry.maxDigits); // Limit to maxDigits
        setPhoneNumber(inputNumber);
        validatePhoneNumber(inputNumber, selectedCountry.maxDigits);
    };
    

    const validatePhoneNumber = (number, max) => {
        setIsValid(number.length === max);
    };

    const handleSubmit = () => {
        const fullNumber = selectedCountry.countryCode + "-" + phoneNumber;
        console.log("Full Phone Number:", fullNumber);
        alert(selectedCountry.name + " " + fullNumber)
    };

    const formatOptionLabel = ({ label, flag, name }, { context }) => {
        return context === "value" ? (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={flag} alt={label} style={{ width: 24 }} />
            </div>
        ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={flag} alt={label} style={{ width: 20, marginRight: 10 }} />
                {name}
            </div>
        );
    };

    return (
        <div className="main">
            <div className='country_select'>
                <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryData}
                    formatOptionLabel={formatOptionLabel}
                    getOptionLabel={option => option.name}
                />
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    maxLength={selectedCountry.maxDigits}
                />
                <button onClick={handleSubmit}>Submit</button>

            </div>
            {!isValid && phoneNumber.length > 0 && (
                <div style={{ color: 'red' }}>
                  Please enter {selectedCountry.maxDigits} digits.
                </div>
            )}
        </div>
    );
}

export default Home;
