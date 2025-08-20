const logger = {
    info: (msg , data = null) => {
        console.log("[INFO]:",msg,data);
    },
    error: (msg , data = null) => {
        console.error("[ERROR]:" ,msg, data);
    },
};
export default logger;