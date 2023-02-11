import dotenv from "dotenv"
dotenv.config()
const envIntVar = (name: string) => {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error(`Missing environment variable ${name}`);
    }
    return parseInt(value);
    }

const envStringVar = (name: string) => {
    const value = process.env[name];
    if (value === undefined) {
        throw new Error(`Missing environment variable ${name}`);
    }
    return value;
    }
export {envIntVar,envStringVar};

