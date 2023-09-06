const production = {
    BASE_URL: 'https://shorturl.somee.com'
};
const development = {
    BASE_URL: 'https://localhost:7049'
};

export const urlConfig = process.env.NODE_ENV === 'development' ? development : production;
